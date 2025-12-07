"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuthStore } from "@/lib/auth-store"
import { AlertCircle, CheckCircle2, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ActivationForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setUser } = useAuthStore()
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [useManualToken, setUseManualToken] = useState(false)

  useEffect(() => {
    const emailParam = searchParams.get("email")
    const tokenParam = searchParams.get("token")
    if (emailParam) setEmail(emailParam)
    if (tokenParam) {
      setToken(tokenParam)
      handleActivation(tokenParam)
    }
  }, [searchParams])

  const handleActivation = async (activationToken?: string) => {
    const tokenToUse = activationToken || token

    if (!tokenToUse) {
      setError("请输入激活令牌")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenToUse }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "激活失败")
      }

      setSuccess(true)
      setUser(data.user)
      localStorage.setItem("auth_user", JSON.stringify(data.user))

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } catch (err) {
      const message = err instanceof Error ? err.message : "激活失败，请重试"
      setError(message)
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
          <CardTitle>账户激活成功！</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">您的账户已成功激活，现在您可以登录了</p>
          <p className="text-xs text-center text-muted-foreground">页面将在2秒后自动跳转到登录页面...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>激活账户</CardTitle>
        <CardDescription>{email ? `激活邮箱: ${email}` : "输入激活令牌以激活您的账户"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {useManualToken ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">激活令牌</Label>
              <Input
                id="token"
                type="text"
                placeholder="输入来自邮件的激活令牌"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button onClick={() => handleActivation()} className="w-full" disabled={isLoading || !token}>
              {isLoading ? "激活中..." : "激活账户"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setUseManualToken(false)
                setToken("")
                setError("")
              }}
              className="w-full"
              disabled={isLoading}
            >
              返回
            </Button>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <Mail className="w-12 h-12 text-blue-500" />
            </div>
            <p className="text-sm text-muted-foreground">请检查您的邮箱（包括垃圾邮件文件夹）</p>
            <p className="text-xs text-muted-foreground">
              我们已向 <strong>{email || "您的邮箱"}</strong> 发送了激活链接
            </p>
            <Button onClick={() => setUseManualToken(true)} variant="outline" className="w-full">
              或手动输入激活令牌
            </Button>
            <div className="pt-4">
              <a href="/auth/login" className="text-primary hover:underline text-sm">
                返回登录
              </a>
            </div>
          </div>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">激活链接有效期为24小时。如果链接已过期，请重新注册</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
