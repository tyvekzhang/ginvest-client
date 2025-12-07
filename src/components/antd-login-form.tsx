"use client"

import { Form, Input, Button, Card, message, Divider, Space, Checkbox } from "antd"
import { MailOutlined, LockOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { useAuthStore } from "@/lib/auth-store"

interface LoginFormData {
  email: string
  password: string
}

export function AntdLoginForm() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { setUser } = useAuthStore()
  const router = useRouter()

  const onFinish = async (values: LoginFormData) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/auth/login", {
        email: values.email,
        password: values.password,
      })

      if (response.data.success) {
        const userData = response.data.user
        setUser(userData)
        localStorage.setItem("auth_user", JSON.stringify(userData))
        message.success("登录成功！")
        router.push("/dashboard")
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "登录失败"
      message.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">登录账户</h2>

      <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="email"
          label="邮箱地址"
          rules={[
            { required: true, message: "请输入邮箱地址" },
            { type: "email", message: "请输入有效的邮箱地址" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="your@email.com" size="large" />
        </Form.Item>

        <Form.Item name="password" label="密码" rules={[{ required: true, message: "请输入密码" }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="输入您的密码" size="large" />
        </Form.Item>

        <Form.Item>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading} disabled={loading}>
            {loading ? "登录中..." : "登录"}
          </Button>
        </Form.Item>

        <Divider>或</Divider>

        <Space direction="vertical" className="w-full" size="small">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            还没有账户？{" "}
            <Link href="/auth/register" className="text-blue-500 hover:text-blue-600 font-semibold">
              立即注册
            </Link>
          </p>
        </Space>
      </Form>
    </Card>
  )
}
