"use client"

import { Card, Space, Typography, Divider } from "antd"
import { DollarSign, Percent, Activity, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const { Title, Text } = Typography

// 金融领域常用色彩
const COLORS = {
  chinaRed: "#ff8c42",
  chinaRedLight: "#fff1f0",
  chinaRedBorder: "#ffa39e",
  usaBlue: "#5B91FD",
  usaBlueLight: "#e6f4ff",
  usaBlueBorder: "#91caff",
  positive: "#52c41a",
  positiveLight: "#f6ffed",
  negative: "#ff4d4f",
  warning: "#faad14",
  neutral: "#8c8c8c",
  gridLine: "#e8e8e8",
  background: "#f5f7fa",
  cardBg: "#ffffff",
  textPrimary: "#262626",
  textSecondary: "#8c8c8c",
}

const FinancialDashboard = () => {
  // ---------- 1. 励志名言（自动滚动） ----------
const motivationalQuotes = [
  { emoji: "💪", text: "每一天都是新的开始，你已经在成长的道路上！" },
  { emoji: "🌟", text: "相信自己，你拥有无限的潜力和可能性！" },
  { emoji: "🎯", text: "坚持不懈，你正在朝着梦想迈进，不要放弃！" },
  { emoji: "🚀", text: "突破自己，你能做到比想象中更伟大的事情！" },
  { emoji: "🌈", text: "用微笑面对挑战，因为你足够强大！" },
  { emoji: "✨", text: "今天的努力，就是明天的成就，加油！" },
  { emoji: "❤️", text: "你很棒，记住这一点，因为这是真的！" },
  { emoji: "🎨", text: "创造属于你的精彩，世界因你而不同！" },
  { emoji: "🏆", text: "成功在向你招手，继续前进吧！" },
  { emoji: "💎", text: "你是独一无二的宝藏，闪闪发光吧！" },
  { emoji: "🌺", text: "绽放你的美好，让世界看到你的光芒！" },
  { emoji: "🦋", text: "蜕变需要时间，但你正在成为最好的自己！" },
  { emoji: "⭐", text: "即使在黑暗中，你也是最亮的那颗星！" },
  { emoji: "🌻", text: "向阳而生，你的未来充满希望！" },
  { emoji: "🎯", text: "目标明确，脚步坚定，成功必将属于你！" },
  { emoji: "💫", text: "梦想不会逃跑，逃跑的总是自己。加油！" },
  { emoji: "🔥", text: "燃烧激情，点亮人生，你可以的！" },
  { emoji: "🌠", text: "每一步前进，都是离成功更近的一步！" },
  { emoji: "📈", text: "数据证明，你正在不断进步！" },
  { emoji: "🛡️", text: "保护好自己的心，勇敢前行！" },
  { emoji: "🧭", text: "方向对了，慢一点也没关系，你正在前进！" },
  { emoji: "⏳", text: "耐心一点，好的事情正在悄悄发生。" },
  { emoji: "🌊", text: "别怕起伏，每一次波动都在塑造更强的你。" },
  { emoji: "📚", text: "你今天学到的东西，正在成为明天的底气。" },
  { emoji: "🔑", text: "答案一直在你手里，只差勇敢地打开。" },
  { emoji: "🪜", text: "一步一个台阶，你正在稳稳向上。" },
  { emoji: "⚙️", text: "持续运转，比短暂爆发更接近成功。" },
  { emoji: "🌱", text: "现在看不见成果，是因为你正在扎根。" },
  { emoji: "🎵", text: "保持节奏，不必和别人比较，你有自己的旋律。" },
  { emoji: "🏁", text: "别急着冲刺，走到终点才算真正的赢家。" },
]


  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length)
    }, 20000)
    return () => clearInterval(interval)
  }, [motivationalQuotes.length])

  const currentQuote = motivationalQuotes[currentQuoteIndex]

  // ---------- 2. 中美银行利率数据 ----------
  const bankRatesData = [
    { month: "2023-Q2", china: 4.2, usa: 4.13 },
    { month: "2023-Q3", china: 4.2, usa: 4.6 },
    { month: "2023-Q4", china: 4.2, usa: 3.84 },
    { month: "2024-Q1", china: 3.95, usa: 4.21 },
    { month: "2024-Q2", china: 3.95, usa: 4.33 },
    { month: "2024-Q3", china: 3.85, usa: 3.5 },
    { month: "2024-Q4", china: 3.6, usa: 3.85 },
    { month: "2025-Q1", china: 3.6, usa: 3.98 },
    { month: "2025-Q2", china: 3.5, usa: 3.8 },
    { month: "2025-Q3", china: 3.5, usa: 3.71 },
    { month: "2025-Q4", china: 3.5, usa: 3.73 },
    { month: "2026-Q1", china: 3.5, usa: 3.64 },
  ]

  // ---------- 3. 汇率数据 ----------
  const exchangeRateData = [
    { quarter: "2023-Q2", date: "2023-06-30", rate: 7.2674, high: 7.2857, low: 7.2518 },
    { quarter: "2023-Q3", date: "2023-09-29", rate: 7.2955, high: 7.2985, low: 7.2812 },
    { quarter: "2023-Q4", date: "2023-12-29", rate: 7.1264, high: 7.1301, low: 7.0876 },
    { quarter: "2024-Q1", date: "2024-03-29", rate: 7.2577, high: 7.2644, low: 7.2473 },
    { quarter: "2024-Q2", date: "2024-06-28", rate: 7.3001, high: 7.3062, low: 7.2903 },
    { quarter: "2024-Q3", date: "2024-09-30", rate: 7.0067, high: 7.014, low: 6.9735 },
    { quarter: "2024-Q4", date: "2024-12-31", rate: 7.3368, high: 7.369, low: 7.3053 },
    { quarter: "2025-Q1", date: "2025-03-31", rate: 7.2658, high: 7.2736, low: 7.2534 },
    { quarter: "2025-Q2", date: "2025-06-30", rate: 7.1572, high: 7.1709, low: 7.1568 },
    { quarter: "2025-Q3", date: "2025-09-30", rate: 7.1288, high: 7.133, low: 7.1246 },
    { quarter: "2025-Q4", date: "2025-12-31", rate: 6.9742, high: 6.9944, low: 6.9733 },
    { quarter: "2026-Q1", date: "2026-01-07", rate: 6.9894, high: 6.9928, low: 6.9787 },
  ]

  // ---------- 4. 中美国债利率数据 ----------
  const bondYieldData = [
    { year: "2年", china: 1.4388, usa: 3.47 },
    { year: "5年", china: 1.6732, usa: 3.72 },
    { year: "10年", china: 1.9019, usa: 4.18 },
    { year: "30年", china: 2.3345, usa: 4.86 },
  ]

  const latestBankRate = bankRatesData[bankRatesData.length - 1]
  const latestExchangeRate = exchangeRateData[exchangeRateData.length - 1]
  const latestBond10Y = bondYieldData.find((b) => b.year === "10年")

  return (
    <div className="min-h-screen p-4" style={{
      height: "100vh",
      overflowY: "auto",
      backgroundColor: COLORS.background,
    }}>
      <Space direction="vertical" className="w-full max-w-7xl mx-auto">
        {/* ---------- 励志名言模块 ---------- */}
        <Card
          style={{
            border: "none",
          }}
        >
          <div className="flex items-center justify-center">
            <Space size="large" className="text-center w-full">
              <div className="text-4xl">{currentQuote.emoji}</div>
              <Text className="text-xl md:text-2xl font-medium text-gray-800" >
                {currentQuote.text}
              </Text>
            </Space>
          </div>
        </Card>
        {/* ---------- 中美国债利率 ---------- */}
        <Card
          title={
            <Space>
              <Activity className="w-5 h-5" style={{ color: "#722ed1" }} />
              <span style={{ color: COLORS.textPrimary, fontWeight: 600 }}>中美国债收益率曲线</span>
            </Space>
          }
          className="shadow-sm"
          style={{ border: `1px solid ${COLORS.gridLine}` }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bondYieldData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
              <XAxis dataKey="year" tick={{ fill: COLORS.textSecondary, fontSize: 12 }} />
              <YAxis
                tick={{ fill: COLORS.textSecondary, fontSize: 12 }}
                label={{
                  value: "收益率 (%)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: COLORS.textSecondary },
                }}
              />
              <Tooltip
                formatter={(value: number) => [value.toFixed(2) + "%", "收益率"]}
                labelFormatter={(label) => `期限: ${label}`}
                contentStyle={{ borderRadius: 4, border: `1px solid ${COLORS.gridLine}` }}
              />
              <Legend />
              <Bar
                dataKey="china"
                fill={COLORS.chinaRed}
                name="中国国债"
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              />
              <Bar
                dataKey="usa"
                fill={COLORS.usaBlue}
                name="美国国债"
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>

          <Divider style={{ borderColor: COLORS.gridLine }} />
          <div className="grid grid-cols-2 gap-4">
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: COLORS.chinaRedLight, border: `1px solid ${COLORS.chinaRedBorder}` }}
            >
              <Text style={{ color: COLORS.textSecondary }}>中国10年期国债</Text>
              <Title level={4} className="mt-2! mb-0" style={{ color: COLORS.chinaRed }}>
                {latestBond10Y?.china.toFixed(2)}%
              </Title>
            </div>
            <div
              className="text-center p-4 rounded-lg"
              style={{ backgroundColor: COLORS.usaBlueLight, border: `1px solid ${COLORS.usaBlueBorder}` }}
            >
              <Text style={{ color: COLORS.textSecondary }}>美国10年期国债</Text>
              <Title level={4} className="mt-2! mb-0" style={{ color: COLORS.usaBlue }}>
                {latestBond10Y?.usa.toFixed(2)}%
              </Title>
            </div>
          </div>
        </Card>
        {/* ---------- 中美银行利率 ---------- */}
        <Card
          title={
            <Space>
              <Percent className="w-5 h-5" style={{ color: COLORS.usaBlue }} />
              <span style={{ color: COLORS.textPrimary, fontWeight: 600 }}>中美银行基准利率对比</span>
            </Space>
          }
          className="shadow-sm"
          style={{ border: `1px solid ${COLORS.gridLine}` }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bankRatesData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
              <XAxis dataKey="month" tick={{ fill: COLORS.textSecondary, fontSize: 12 }} />
              <YAxis
                domain={[3, 5]}
                tick={{ fill: COLORS.textSecondary, fontSize: 12 }}
                label={{
                  value: "利率 (%)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: COLORS.textSecondary },
                }}
              />
              <Tooltip
                formatter={(value: number) => [value.toFixed(2) + "%", "基准利率"]}
                labelFormatter={(label) => `周期: ${label}`}
                contentStyle={{ borderRadius: 4, border: `1px solid ${COLORS.gridLine}` }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="china"
                stroke={COLORS.chinaRed}
                strokeWidth={2}
                name="中国"
                dot={{ r: 4, fill: COLORS.chinaRed }}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="usa"
                stroke={COLORS.usaBlue}
                strokeWidth={2}
                name="美国"
                dot={{ r: 4, fill: COLORS.usaBlue }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div
              className="text-center p-3 rounded-lg"
              style={{ backgroundColor: COLORS.chinaRedLight, border: `1px solid ${COLORS.chinaRedBorder}` }}
            >
              <Text style={{ color: COLORS.textSecondary }}>中国当前利率 (2026-Q1)</Text>
              <Title level={3} className="mt-1! mb-0" style={{ color: COLORS.chinaRed }}>
                {latestBankRate.china}%
              </Title>
            </div>
            <div
              className="text-center p-3 rounded-lg"
              style={{ backgroundColor: COLORS.usaBlueLight, border: `1px solid ${COLORS.usaBlueBorder}` }}
            >
              <Text style={{ color: COLORS.textSecondary }}>美国当前利率 (2026-Q1)</Text>
              <Title level={3} className="mt-1! mb-0" style={{ color: COLORS.usaBlue }}>
                {latestBankRate.usa}%
              </Title>
            </div>
          </div>
        </Card>

        {/* ---------- 汇率 ---------- */}
        <Card
          title={
            <Space>
              <DollarSign className="w-5 h-5" style={{ color: COLORS.positive }} />
              <span style={{ color: COLORS.textPrimary, fontWeight: 600 }}>美元/人民币 汇率走势</span>
            </Space>
          }
          className="shadow-sm"
          style={{ border: `1px solid ${COLORS.gridLine}` }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={exchangeRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.gridLine} />
              <XAxis dataKey="quarter" tick={{ fill: COLORS.textSecondary, fontSize: 12 }} />
              <YAxis
                domain={[6.8, 7.4]}
                allowDecimals={true}
                tick={{ fill: COLORS.textSecondary, fontSize: 12 }}
                label={{
                  value: "汇率",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: COLORS.textSecondary },
                }}
              />
              <Tooltip
                formatter={(value: number) => [value.toFixed(4), "美元/人民币"]}
                labelFormatter={(label) => `季度: ${label}`}
                contentStyle={{ borderRadius: 4, border: `1px solid ${COLORS.gridLine}` }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="rate"
                stroke={COLORS.positive}
                fill={COLORS.positiveLight}
                name="收盘价"
                isAnimationActive={false}
              />

            </AreaChart>
          </ResponsiveContainer>
        </Card>

      </Space>
    </div>
  )
}

export default FinancialDashboard