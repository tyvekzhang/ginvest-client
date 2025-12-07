"use client"

import { Form, Input, Button, Card, message, Space, Divider, Alert } from "antd"
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"

interface RegisterFormData {
  email: string
  username: string
  password: string
  confirmPassword: string
}

export function AntdRegisterForm() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activationLink, setActivationLink] = useState("")
  const router = useRouter()

  const onFinish = async (values: RegisterFormData) => {
    try {
      setLoading(true)
      const response = await axios.post("/api/auth/register", {
        email: values.email,
        username: values.username,
        password: values.password,
      })

      if (response.data.success) {
        message.success("注册成功！请查看激活链接")
        setActivationLink(response.data.activationToken)
        setSuccess(true)
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "注册失败"
      message.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <Space direction="vertical" className="w-full" size="large">
          <Alert message="注册成功！" description="请检查邮件中的激活链接来激活您的账户" type="success" showIcon />

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">演示激活链接：</p>
            <code className="text-xs text-blue-600 dark:text-blue-400 break-all">
              /auth/activate?token={activationLink}
            </code>
          </div>

          <Link href={`/auth/activate?token=${activationLink}`}>
            <Button type="primary" block size="large">
              点击这里激活账户
            </Button>
          </Link>

          <Button type="default" block size="large" onClick={() => router.push("/auth/login")}>
            返回登录
          </Button>
        </Space>
      </Card>
    )
  }

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">创建新账户</h2>

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

        <Form.Item
          name="username"
          label="用户名"
          rules={[
            { required: true, message: "请输入用户名" },
            { min: 3, message: "用户名至少3个字符" },
            { max: 20, message: "用户名最多20个字符" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="username" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            { required: true, message: "请输入密码" },
            { min: 6, message: "密码至少6个字符" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="至少6个字符" size="large" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="确认密码"
          dependencies={["password"]}
          rules={[
            { required: true, message: "请确认密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error("两次输入的密码不一致"))
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="再次输入密码" size="large" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={loading} disabled={loading}>
            {loading ? "注册中..." : "注册"}
          </Button>
        </Form.Item>

        <Divider>或</Divider>

        <p className="text-center text-gray-600 dark:text-gray-400">
          已有账户？{" "}
          <Link href="/auth/login" className="text-blue-500 hover:text-blue-600 font-semibold">
            立即登录
          </Link>
        </p>
      </Form>
    </Card>
  )
}
