"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { registerSchema, type RegisterInput } from "@/lib/schemas"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<RegisterInput>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [registeredEmail, setRegisteredEmail] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      // Validate form data
      const validatedData = registerSchema.parse(formData)

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "注册失败")
      }

      setSuccess(true)
      setSuccessMessage(data.message)
      setRegisteredEmail(data.email)
      setFormData({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      })

      // Show activation link for demo
      if (data.activationToken) {
        console.log("Activation token:", data.activationToken)
      }

      // Redirect to activation page after 2 seconds
      setTimeout(() => {
        router.push(`/auth/activate?email=${encodeURIComponent(data.email)}`)
      }, 2000)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("password")) {
          setErrors({ confirmPassword: error.message })
        } else if (error.message.includes("邮箱")) {
          setErrors({ email: error.message })
        } else if (error.message.includes("用户名")) {
          setErrors({ username: error.message })
        } else {
          setErrors({ submit: error.message })
        }
      } else {
        setErrors({ submit: "注册失败，请重试" })
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <CardTitle>注册成功！</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground text-center">
            激活链接已发送至 <strong>{registeredEmail}</strong>
          </p>
          <p className="text-xs text-muted-foreground text-center">请在24小时内点击邮件中的激活链接以完成账户激活</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>创建新账户</CardTitle>
        <CardDescription>填写下方信息注册您的账户</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.submit && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.submit}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">邮箱地址</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">用户名</Label>
            <Input
              id="username"
              name="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.username ? "border-destructive" : ""}
            />
            {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">确认密码</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.confirmPassword ? "border-destructive" : ""}
            />
            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "注册中..." : "注册"}
          </Button>

          <div className="text-center text-sm">
            已有账户？{" "}
            <a href="/auth/login" className="text-primary hover:underline">
              立即登录
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
