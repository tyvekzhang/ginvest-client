"use client"

import { useState } from "react"
import { Modal, Checkbox } from "antd"
import { motion } from "framer-motion"
import { X, CheckCircle2, Shield } from "lucide-react"

interface SimpleClickCaptchaProps {
  open: boolean
  onSuccess: () => void
  onCancel: () => void
}

export default function SimpleClickCaptcha({ open, onSuccess, onCancel }: SimpleClickCaptchaProps) {
  const [isChecked, setIsChecked] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleCheckboxChange = (e: any) => {
    const checked = e.target.checked
    setIsChecked(checked)

    if (checked) {
      setIsVerifying(true)

      // 模拟验证过程
      setTimeout(() => {
        setIsVerifying(false)
        setIsSuccess(true)

        // 验证成功后延迟关闭
        setTimeout(() => {
          onSuccess()
          // 重置状态
          setTimeout(() => {
            setIsChecked(false)
            setIsSuccess(false)
          }, 300)
        }, 600)
      }, 800)
    }
  }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={360}
      closeIcon={<X size={20} />}
      centered
      maskClosable={false}
    >
      <div className="p-6">
        <div className="text-center mb-6">
          <Shield className="w-12 h-12 text-blue-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">安全验证</h3>
          <p className="text-sm text-gray-500 mt-1">请完成验证以继续</p>
        </div>

        {/* 验证框 */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              {!isSuccess ? (
                <>
                  <Checkbox
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    disabled={isVerifying}
                    className="scale-125"
                  />
                  <span className="text-sm text-gray-700 select-none">
                    {isVerifying ? "正在验证..." : "我不是机器人"}
                  </span>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-3 w-full"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">验证成功</span>
                </motion.div>
              )}

              {isVerifying && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="ml-auto"
                >
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />
                </motion.div>
              )}
            </div>

            {/* reCAPTCHA 风格的品牌标识 */}
            <div className="flex items-center justify-end mt-3 pt-3 border-t border-gray-200">
              <Shield className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-xs text-gray-400">安全验证</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-4 text-xs text-gray-400 text-center">此验证有助于保护您的账户安全</div>
      </div>
    </Modal>
  )
}