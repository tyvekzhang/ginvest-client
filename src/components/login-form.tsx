"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginSchema, type LoginInput } from "@/lib/schemas"
import { useAuthStore } from "@/lib/auth-store"
import { AlertCircle } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [formData, setFormData] = useState<LoginInput>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
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
      const validatedData = loginSchema.parse(formData)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "登录失败")
      }

      // Save user to store and localStorage
      setUser(data.user)
      localStorage.setItem("auth_user", JSON.stringify(data.user))

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ submit: error.message })
      } else {
        setErrors({ submit: "登录失败，请重试" })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>登录</CardTitle>
        <CardDescription>输入您的邮箱和密码登录</CardDescription>
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "登录中..." : "登录"}
          </Button>

          <div className="text-center text-sm space-y-2">
            <div>
              还没有账户？{" "}
              <a href="/auth/register" className="text-primary hover:underline">
                立即注册
              </a>
            </div>
            <div>
              <a href="#" className="text-primary hover:underline">
                忘记密码？
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
