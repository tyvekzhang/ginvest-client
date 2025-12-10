"use client"

import { Space } from "antd"
import { useEffect, useState } from "react"

const MotivationalPage = () => {
  const motivationalQuotes = [
    { emoji: "💪", text: "每一天都是新的开始，你已经在成长的道路上！" },
    { emoji: "🌟", text: "相信自己，你拥有无限的潜力和可能性！" },
    { emoji: "🎯", text: "坚持不懈，你正在朝着梦想迈进，不要放弃！" },
    { emoji: "🚀", text: "突破自己，你能做到比想象中更伟大的事情！" },
    { emoji: "🌈", text: "用微笑面对挑战，因为你足够强大！" },
    { emoji: "✨", text: "今天的努力，就是明天的成就，加油！" },
    { emoji: "❤️", text: "你很棒，记住这一点，因为这是真的！" },
  ]

  const [quote, setQuote] = useState<(typeof motivationalQuotes)[0] | null>(null)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
    setQuote(motivationalQuotes[randomIndex])
  }, [])

  if (!quote) {
    return null
  }

  return (
    <div className="h-full flex items-center justify-center p-4">
      <Space className="bg-background rounded-2xl  p-2 md:p-12 max-w-2xl w-full text-center">
        <div className="text-3~xl">{quote.emoji}</div>
        <p className="text-xl md:text-xxl text-gray-800 leading-relaxed text-balance">{quote.text}</p>
      </Space>
    </div>
  )
}

export default MotivationalPage
