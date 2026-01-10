"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button, Card, Checkbox, Divider, Form, Input, Typography, message } from "antd"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"
import { register, sendVerificationCode } from "@/service/auth-service"
import type { SendVerificationCodeRequest } from "@/types/auth"
import SimpleClickCaptcha from "@/components/click-captcha"

const { Title, Text } = Typography

// ---------------- 装饰背景圆 ------------------
const CardDecorativeBubble = () => {
  return (
    <motion.div
      animate={{ scale: 1.2 }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full -mr-16 -mt-16"
    />
  )
}

// ---------------- 注册页组件 ------------------
export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()
  const [countdown, setCountdown] = useState(0)
  const [showCaptcha, setShowCaptcha] = useState(false)

  useEffect(() => {
    useAuthStore.persist.rehydrate()
  }, [])

  // ---------- 基础验证 ----------
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  // ---------- 表单提交 ----------
  const onFinish = async (values: any) => {
    delete values.confirmPassword
    try {
      register(values).then((res) => {
        const msg = res.message
        if (msg !== undefined) {
          message.success(msg)
          router.push("/auth/login")
        } else {
          console.log(res)
        }
      })
    } catch (error) {
      message.error("注册失败，请检查信息是否正确")
    }
  }

  const handleSendCode = async () => {
    const email = form.getFieldValue("email")
    if (!email || !validateEmail(email)) {
      message.error("请输入有效的邮箱地址")
      return
    }

    // Show captcha modal
    setShowCaptcha(true)
  }

  const handleCaptchaSuccess = async () => {
    setShowCaptcha(false)

    const email = form.getFieldValue("email")
    const req: SendVerificationCodeRequest = {
      email: email,
    }

    message.success("验证码已发送, 请查看邮箱")
    await sendVerificationCode(req)

    setCountdown(60)

    const timer = setInterval(() => {
      setCountdown((pre) => {
        if (pre <= 1) {
          clearInterval(timer)
          return 0
        }
        return pre - 1
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <Card className="shadow-lg border-0 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/95 relative">
          <CardDecorativeBubble />

          {/* 页标题 */}
          <div className="text-center mb-6 flex flex-col items-center space-y-2 mt-6">
            <Title level={2} className="mb-2 bg-clip-text text-secondary">
              🎉用户注册
            </Title>
          </div>

          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
            validateTrigger="onBlur"
            className="space-y-6"
          >
            {/* 邮箱 */}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "请输入邮箱" },
                {
                  validator(_, value) {
                    if (!value) return Promise.resolve()
                    return validateEmail(value) ? Promise.resolve() : Promise.reject("请输入有效邮箱")
                  },
                },
              ]}
            >
              <Input
                prefix={<Mail className="text-gray-400" size={18} />}
                placeholder="邮箱地址"
                className="rounded-lg h-12"
              />
            </Form.Item>

            {/* 验证码 */}
            <Form.Item
              name="code"
              rules={[
                { required: true, message: "请输入验证码" },
                { len: 6, message: "验证码为 6 位数字" },
              ]}
            >
              <div className="flex space-x-2">
                <Input
                  prefix={<User className="text-gray-400" size={18} />}
                  placeholder="验证码"
                  className="rounded-lg h-12 flex-1"
                />
                <Button className="h-12" onClick={handleSendCode} disabled={countdown > 0}>
                  {countdown > 0 ? `${countdown}s` : "获取验证码"}
                </Button>
              </div>
            </Form.Item>

            {/* 密码 */}
            <Form.Item
              name="password"
              rules={[
                {
                  validator(_, value) {
                    if (!value) return Promise.reject("请输入密码")

                    // 必须包含数字和字母，且不少于 8 位
                    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~!]).{8,}$/

                    return regex.test(value) ? Promise.resolve() : Promise.reject("密码需包含数字和字母，且不少于 8 位")
                  },
                },
              ]}
            >
              <Input.Password
                prefix={<Lock className="text-gray-400" size={18} />}
                placeholder="密码"
                className="rounded-lg h-12"
                iconRender={(visible) => (visible ? <Eye size={18} /> : <EyeOff size={18} />)}
              />
            </Form.Item>

            {/* 确认密码 */}
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "请再次输入密码" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject("两次输入的密码不一致")
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<Lock className="text-gray-400" size={18} />}
                placeholder="确认密码"
                className="rounded-lg h-12"
                iconRender={(visible) => (visible ? <Eye size={18} /> : <EyeOff size={18} />)}
              />
            </Form.Item>

            {/* 协议勾选 */}
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator(_, value) {
                    return value ? Promise.resolve() : Promise.reject("请同意用户协议")
                  },
                },
              ]}
              className="mb-0"
            >
              <Checkbox>
                我已阅读并同意
                <Link href="/legal/terms" className="text-blue-500 ml-1" target="_blank">
                  服务条款
                </Link>
                和
                <Link href="/legal/privacy" className="text-blue-500 ml-1" target="_blank">
                  隐私政策
                </Link>
              </Checkbox>
            </Form.Item>

            {/* 提交按钮 */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full mt-8 h-12 rounded-lg bg-primary border-0 hover:opacity-80 transition-all duration-200"
              >
                {loading ? "注册中..." : "注册"}
              </Button>
            </Form.Item>
          </Form>

          <Divider />

          <div className="text-center pb-4">
            <Text type="secondary" className="text-sm">
              已有账户？
              <Link href="/auth/login" className="text-blue-500 ml-1">
                前往登录
              </Link>
            </Text>
          </div>
        </Card>
      </div>

      <SimpleClickCaptcha open={showCaptcha} onSuccess={handleCaptchaSuccess} onCancel={() => setShowCaptcha(false)} />
    </div>
  )
}
