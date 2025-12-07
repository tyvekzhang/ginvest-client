"use client"

import { Card, Result, Button, message, Space, Spin } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

export function AntdActivationForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const token = searchParams.get("token")

    if (!token) {
      setError("缺少激活token")
      setLoading(false)
      return
    }

    const activate = async () => {
      try {
        setLoading(true)
        const response = await axios.post("/api/auth/activate", { token })

        if (response.data.success) {
          setSuccess(true)
          setUser(response.data.user)
          message.success("账户激活成功！")
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || err.message || "激活失败"
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    activate()
  }, [searchParams])

  if (loading) {
    return (
      <Card className="max-w-md mx-auto text-center py-8">
        <Space direction="vertical" className="w-full">
          <Spin />
          <p className="text-gray-600 dark:text-gray-400">正在激活账户...</p>
        </Space>
      </Card>
    )
  }

  if (success && user) {
    return (
      <Card className="max-w-md mx-auto">
        <Result
          status="success"
          title="账户激活成功！"
          subTitle={`欢迎 ${user.username}，您的账户已成功激活`}
          extra={
            <Space>
              <Link href="/auth/login">
                <Button type="primary">现在登录</Button>
              </Link>
              <Link href="/">
                <Button>返回首页</Button>
              </Link>
            </Space>
          }
        />
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto">
      <Result
        status="error"
        title="激活失败"
        subTitle={error || "激活链接无效或已过期"}
        extra={
          <Space>
            <Link href="/auth/register">
              <Button type="primary">重新注册</Button>
            </Link>
            <Link href="/">
              <Button>返回首页</Button>
            </Link>
          </Space>
        }
      />
    </Card>
  )
}
