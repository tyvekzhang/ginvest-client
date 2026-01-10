"use client"

import { useState, useMemo } from "react"
import { Card, Button, Spin, Space, Row, Col, Typography, Select } from "antd"
import { ArrowLeft, TrendingUp, ShieldAlert, Zap, Activity, PieChart, BarChart3, DollarSign, Coins } from "lucide-react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import {
  ComposedChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useStockAbstract } from "@/service/stock"
import { Dividend, FinancialRisk, GrowthAbility, IndicatorAnnual, OperatingCapability, PerIndicator, Profitability, RevenueQuality } from "@/types/stock"
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent'

const { Title, Text } = Typography

interface FieldConfig {
  key: string
  label: string
  unit: string
  color: string
  strokeWidth?: number
  strokeDasharray?: string
  chartType: "line" | "bar" | "area"
  yAxisId?: "left" | "right"
  important?: boolean
}

interface IndicatorConfig {
  key: string
  label: string
  dualAxis?: boolean
  leftAxisLabel?: string
  rightAxisLabel?: string
  fields: FieldConfig[]
  useQuarterlyData?: boolean
}

const INDICATOR_CONFIGS: Record<string, IndicatorConfig> = {
  profitability: {
    key: "profitability",
    label: "盈利能力",
    dualAxis: false,
    rightAxisLabel: "百分比(%)",
    fields: [
      { key: "roe", label: "ROE", unit: "%", color: "#3b82f6", strokeWidth: 3, chartType: "line", important: true },
      { key: "gross_margin", label: "毛利率", unit: "%", color: "#10b981", strokeWidth: 2, chartType: "area", important: true },
      { key: "net_profit_margin", label: "净利率", unit: "%", color: "#f59e0b", strokeWidth: 2, chartType: "area", important: true },
      { key: "return_on_invested_capital", label: "ROIC", unit: "%", color: "#8b5cf6", strokeWidth: 2, chartType: "line", strokeDasharray: "5 5" },
      { key: "average_roa", label: "ROA", unit: "%", color: "#ec4899", strokeWidth: 2, chartType: "line", strokeDasharray: "3 3" },
      { key: "operating_margin", label: "营业利润率", unit: "%", color: "#06b6d4", strokeWidth: 2, chartType: "line" },
      { key: "ebit_margin", label: "EBIT利润率", unit: "%", color: "#ef4444", strokeWidth: 2, chartType: "line" },
    ],
  },
  growth: {
    key: "growth",
    label: "成长能力",
    dualAxis: true,
    leftAxisLabel: "金额(亿元)",
    rightAxisLabel: "增长率(%)",
    fields: [
      { key: "net_profit", label: "净利润", unit: "亿", color: "#3b82f6", strokeWidth: 2, chartType: "bar", yAxisId: "left", important: true },
      { key: "revenue_growth", label: "营收增长率", unit: "%", color: "#10b981", strokeWidth: 3, chartType: "line", yAxisId: "right", important: true },
      { key: "profit_growth", label: "利润增长率", unit: "%", color: "#f59e0b", strokeWidth: 3, chartType: "line", yAxisId: "right", important: true },
      { key: "total_operating_revenue", label: "营业总收入", unit: "亿", color: "#8b5cf6", strokeWidth: 2, chartType: "bar", yAxisId: "left", strokeDasharray: "5 5" },
      { key: "net_profit_attributable_to_parent_company", label: "归母净利润", unit: "亿", color: "#ec4899", strokeWidth: 2, chartType: "bar", yAxisId: "left", strokeDasharray: "3 3" },
    ],
  },
  risk: {
    key: "risk",
    label: "偿债风险",
    dualAxis: true,
    leftAxisLabel: "比率",
    rightAxisLabel: "百分比(%)",
    fields: [
      { key: "debt_ratio", label: "资产负债率", unit: "%", color: "#3b82f6", strokeWidth: 3, chartType: "area", yAxisId: "right", important: true },
      { key: "current_ratio", label: "流动比率", unit: "", color: "#10b981", strokeWidth: 3, chartType: "bar", yAxisId: "left", important: true },
      { key: "quick_ratio", label: "速动比率", unit: "", color: "#f59e0b", strokeWidth: 2, chartType: "bar", yAxisId: "left", important: true },
      { key: "cash_ratio", label: "现金比率", unit: "", color: "#8b5cf6", strokeWidth: 2, chartType: "line", yAxisId: "left", strokeDasharray: "5 5" },
      { key: "equity_multiplier", label: "权益乘数", unit: "", color: "#ec4899", strokeWidth: 2, chartType: "line", yAxisId: "left", strokeDasharray: "3 3" },
      { key: "equity_ratio", label: "产权比率", unit: "%", color: "#06b6d4", strokeWidth: 2, chartType: "line", yAxisId: "right" },
    ],
  },
  operating: {
    key: "operating",
    label: "营运效率",
    dualAxis: true,
    leftAxisLabel: "周转天数(天)",
    rightAxisLabel: "周转率(次)",
    fields: [
      { key: "total_asset_turnover", label: "总资产周转率", unit: "次", color: "#3b82f6", strokeWidth: 3, chartType: "line", yAxisId: "right", important: true },
      { key: "inventory_turnover_days", label: "存货周转天数", unit: "天", color: "#10b981", strokeWidth: 2, chartType: "bar", yAxisId: "left", important: true },
      { key: "accounts_receivable_turnover_days", label: "应收周转天数", unit: "天", color: "#f59e0b", strokeWidth: 2, chartType: "bar", yAxisId: "left", important: true },
      { key: "current_asset_turnover", label: "流动资产周转率", unit: "次", color: "#8b5cf6", strokeWidth: 2, chartType: "line", yAxisId: "right", strokeDasharray: "5 5" },
      { key: "inventory_turnover", label: "存货周转率", unit: "次", color: "#ec4899", strokeWidth: 2, chartType: "line", yAxisId: "right" },
      { key: "accounts_receivable_turnover", label: "应收账款周转率", unit: "次", color: "#06b6d4", strokeWidth: 2, chartType: "line", yAxisId: "right", strokeDasharray: "3 3" },
    ],
  },
  cash: {
    key: "cash",
    label: "现金质量",
    dualAxis: true,
    leftAxisLabel: "比率",
    rightAxisLabel: "百分比(%)",
    fields: [
      { key: "cashflow_ratio", label: "净现比", unit: "", color: "#3b82f6", strokeWidth: 3, chartType: "bar", yAxisId: "left", important: true },
      { key: "operating_cash_to_sales", label: "销售回款率", unit: "", color: "#10b981", strokeWidth: 2, chartType: "line", yAxisId: "left", important: true },
      { key: "operating_cash_to_total_revenue", label: "经营现金流/营收", unit: "", color: "#f59e0b", strokeWidth: 2, chartType: "line", yAxisId: "left", important: true },
      { key: "cost_expense_ratio", label: "成本费用率", unit: "%", color: "#8b5cf6", strokeWidth: 2, chartType: "area", yAxisId: "right", strokeDasharray: "5 5" },
      { key: "period_expense_ratio", label: "期间费用率", unit: "%", color: "#ec4899", strokeWidth: 2, chartType: "area", yAxisId: "right" },
    ],
  },
  valuation: {
    key: "valuation",
    label: "估值指标",
    dualAxis: true,
    leftAxisLabel: "价格(元)/市值(亿)",
    rightAxisLabel: "倍数",
    fields: [
      { key: "pe_ratio", label: "PE市盈率", unit: "倍", color: "#3b82f6", strokeWidth: 3, chartType: "line", yAxisId: "right", important: true },
      { key: "pb_ratio", label: "PB市净率", unit: "倍", color: "#10b981", strokeWidth: 3, chartType: "line", yAxisId: "right", important: true },
      { key: "close_price", label: "收盘价", unit: "元", color: "#f59e0b", strokeWidth: 2, chartType: "area", yAxisId: "left", important: true },
      { key: "total_market_cap", label: "总市值", unit: "亿", color: "#8b5cf6", strokeWidth: 2, chartType: "bar", yAxisId: "left", strokeDasharray: "5 5" },
      { key: "net_asset", label: "净资产", unit: "亿", color: "#ec4899", strokeWidth: 2, chartType: "bar", yAxisId: "left", strokeDasharray: "3 3" },
    ],
  },
  perIndicator: {
    key: "perIndicator",
    label: "每股指标",
    dualAxis: true,
    leftAxisLabel: "金额(元)",
    rightAxisLabel: "金额(元)",
    fields: [
      { key: "basic_earnings_per_share", label: "基本每股收益", unit: "元", color: "#3b82f6", strokeWidth: 3, chartType: "line", yAxisId: "left", important: true },
      { key: "book_value_latest_shares", label: "每股净资产", unit: "元", color: "#10b981", strokeWidth: 3, chartType: "bar", yAxisId: "left", important: true },
      { key: "operating_cash_flow_per_share", label: "每股经营现金流", unit: "元", color: "#f59e0b", strokeWidth: 2, chartType: "line", yAxisId: "left", important: true },
      { key: "diluted_earnings_per_share", label: "稀释每股收益", unit: "元", color: "#8b5cf6", strokeWidth: 2, chartType: "line", yAxisId: "left", strokeDasharray: "5 5" },
      { key: "undistributed_profit_per_share", label: "每股未分配利润", unit: "元", color: "#ec4899", strokeWidth: 2, chartType: "bar", yAxisId: "left" },
      { key: "capital_reserve_per_share", label: "每股资本公积", unit: "元", color: "#06b6d4", strokeWidth: 2, chartType: "line", yAxisId: "left", strokeDasharray: "3 3" },
      { key: "retained_earnings_per_share", label: "每股留存收益", unit: "元", color: "#ef4444", strokeWidth: 2, chartType: "bar", yAxisId: "left" },
    ],
  },
  dividend: {
    key: "dividend",
    label: "分红情况",
    dualAxis: true,
    leftAxisLabel: "每股分红(元)",
    rightAxisLabel: "比率(%)",
    useQuarterlyData: true,
    fields: [
      { key: "dividend_income", label: "每股分红", unit: "元", color: "#3b82f6", strokeWidth: 3, chartType: "bar", yAxisId: "left", important: true },
      { key: "dividend_rate", label: "股息率", unit: "%", color: "#10b981", strokeWidth: 3, chartType: "line", yAxisId: "right", important: true },
      { key: "payout_rate", label: "分红率", unit: "%", color: "#f59e0b", strokeWidth: 2, chartType: "line", yAxisId: "right", important: true },
    ],
  },
}

// 需要转换为亿的字段
const BILLION_FIELDS = [
  "net_profit",
  "total_operating_revenue",
  "net_profit_attributable_to_parent_company",
  "net_profit_excluding_non_recurring_items",
  "total_market_cap",
  "net_asset",
]

// 季度名称映射
const QUARTER_NAMES: Record<number, string> = {
  1: "Q1",
  2: "Q2",
  3: "Q3",
  4: "Q4",
}

// 获取默认选中的字段（优先选择 important 标记的字段，确保至少3个）
const getDefaultVisibleFields = (): Record<string, string[]> => {
  const initial: Record<string, string[]> = {}
  Object.entries(INDICATOR_CONFIGS).forEach(([configKey, config]) => {
    // 优先获取标记为 important 的字段
    const importantFields = config.fields
      .filter((f) => f.important)
      .map((f) => f.key)

    if (importantFields.length >= 3) {
      // 如果 important 字段够3个，取前3个
      initial[configKey] = importantFields.slice(0, 3)
    } else {
      // 如果 important 字段不够3个，用其他字段补充
      const otherFields = config.fields
        .filter((f) => !f.important)
        .map((f) => f.key)
      const needed = 3 - importantFields.length
      initial[configKey] = [...importantFields, ...otherFields.slice(0, needed)]
    }
  })
  return initial
}

export default function StockDetail() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const stock_code = params.stock_code as string
  const initialPeriod = searchParams.get("period") ? Number(searchParams.get("period")) : 3
  const [timePeriod, setTimePeriod] = useState<number>(initialPeriod)
  const { abstract, isLoading } = useStockAbstract(stock_code, timePeriod)

  // 使用函数初始化，确保每个指标都有3个默认选中项
  const [visibleFields, setVisibleFields] = useState<Record<string, string[]>>(getDefaultVisibleFields)

  const handleFieldChange = (indicatorKey: string, selectedKeys: string[]) => {
    setVisibleFields((prev) => ({
      ...prev,
      [indicatorKey]: selectedKeys,
    }))
  }

  const stockName = useMemo(() => {
    if (!abstract) return ""
    const arrays = [
      abstract.profitability,
      abstract.growth_ability,
      abstract.financial_risk,
      abstract.operating_capability,
      abstract.revenue_quality,
      abstract.indicator_annual,
      abstract.per_indicator,
      abstract.dividend,
    ]
    for (const arr of arrays) {
      if (arr && arr.length > 0 && arr[0].stock_name) {
        return arr[0].stock_name
      }
    }
    return ""
  }, [abstract])

  // 年度数据处理
  const chartData = useMemo(() => {
    if (!abstract) return []

    const yearDataMap: Record<number, any> = {}

    const processArray = (dataArray: Dividend[] | IndicatorAnnual[] | Profitability[] | GrowthAbility[] | RevenueQuality[] | FinancialRisk[] | OperatingCapability[] | PerIndicator[]) => {
      if (!dataArray || !Array.isArray(dataArray)) return

      const yearGroups: Record<number, any[]> = {}
      dataArray.forEach((item) => {
        const year = item.year
        if (!yearGroups[year]) {
          yearGroups[year] = []
        }
        yearGroups[year].push(item)
      })

      Object.entries(yearGroups).forEach(([yearStr, items]) => {
        const year = Number(yearStr)
        const sortedItems = items.sort((a, b) => b.quarter - a.quarter)
        const selectedItem = sortedItems.find((item) => item.quarter === 4) || sortedItems[0]

        if (!yearDataMap[year]) {
          yearDataMap[year] = { year: year.toString() }
        }

        Object.keys(selectedItem).forEach((key) => {
          if (
            ["year", "quarter", "id", "stock_code", "stock_name", "created_at", "updated_at", "listing_date", "industry"].includes(key)
          ) {
            return
          }

          let value = selectedItem[key]
          if (typeof value === "string" && !isNaN(Number(value))) {
            value = Number.parseFloat(value)
            if (BILLION_FIELDS.includes(key)) {
              value = value / 100000000
            }
          }

          yearDataMap[year][key] = value
        })
      })
    }

    processArray(abstract.profitability)
    processArray(abstract.growth_ability)
    processArray(abstract.financial_risk)
    processArray(abstract.operating_capability)
    processArray(abstract.revenue_quality)
    processArray(abstract.indicator_annual)
    processArray(abstract.per_indicator)

    const sortedYears = Object.keys(yearDataMap)
      .map(Number)
      .sort((a, b) => a - b)

    return sortedYears.map((year) => yearDataMap[year])
  }, [abstract])

  // 分红季度数据处理
  const dividendChartData = useMemo(() => {
    if (!abstract || !abstract.dividend || !Array.isArray(abstract.dividend)) return []

    const dataList = abstract.dividend.map((item: any) => {
      const result: any = {
        period: `${item.year}-${QUARTER_NAMES[item.quarter] || `Q${item.quarter}`}`,
        year: item.year,
        quarter: item.quarter,
      }

      Object.keys(item).forEach((key) => {
        if (
          ["year", "quarter", "id", "stock_code", "stock_name", "created_at", "updated_at", "listing_date", "industry"].includes(key)
        ) {
          return
        }

        let value = item[key]
        if (typeof value === "string" && !isNaN(Number(value))) {
          value = Number.parseFloat(value)
        }

        result[key] = value
      })

      return result
    })

    // 按年份和季度排序
    return dataList.sort((a: any, b: any) => {
      if (a.year !== b.year) return a.year - b.year
      return a.quarter - b.quarter
    })
  }, [abstract])

  const getFieldOptions = (config: IndicatorConfig) => {
    return config.fields.map((field) => ({
      label: (
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: field.color }} />
          <span className="flex items-center gap-1">
            {field.chartType === "bar" && <span className="text-xs text-gray-400">[柱]</span>}
            {field.chartType === "area" && <span className="text-xs text-gray-400">[面]</span>}
            {field.chartType === "line" && <span className="text-xs text-gray-400">[线]</span>}
            {field.label}
          </span>
          {field.unit && <span className="text-gray-400 text-xs">({field.unit})</span>}
          {field.important && <span className="text-orange-500 text-xs">★</span>}
        </span>
      ),
      value: field.key,
    }))
  }

  const SectionHeader = ({ title, configKey }: { title: string; icon: any; configKey: string }) => {
    const config = INDICATOR_CONFIGS[configKey]
    return (

      <div className="mb-6 p-4 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-100">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div>
              <Title level={4} className="!mb-0">
                {title}
              </Title>
              {config.dualAxis && (
                <Text type="secondary" className="text-xs">
                  左轴: {config.leftAxisLabel} | 右轴: {config.rightAxisLabel}
                </Text>
              )}
            </div>
          </div>
          <Select
            mode="multiple"
            placeholder="选择展示指标"
            value={visibleFields[configKey]}
            onChange={(values) => handleFieldChange(configKey, values)}
            options={getFieldOptions(config)}
            style={{ minWidth: 480, maxWidth: 720 }}
            maxTagCount={3}
            maxTagPlaceholder={(omittedValues) => `+${omittedValues.length}项`}
            allowClear
            optionFilterProp="label"
          />
        </div>
      </div>
    )
  }

  const renderChart = (configKey: string, data?: any[]) => {
    const config = INDICATOR_CONFIGS[configKey]
    const activeFields = config.fields.filter((f) => visibleFields[configKey]?.includes(f.key))
    const chartDataToUse = data || chartData

    if (activeFields.length === 0) {
      return (
        <div className="h-[380px] flex items-center justify-center text-gray-400 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
          <div className="text-center">
            <PieChart size={48} className="mx-auto mb-2 text-slate-300" />
            <p>请选择至少一个指标进行展示</p>
          </div>
        </div>
      )
    }

    // 判断是否需要双轴
    const hasLeftAxis = activeFields.some((f) => f.yAxisId === "left" || !f.yAxisId)
    const hasRightAxis = activeFields.some((f) => f.yAxisId === "right")

    // 根据是否是季度数据决定X轴dataKey
    const xAxisDataKey = config.useQuarterlyData ? "period" : "year"
    const xAxisLabel = config.useQuarterlyData ? "年份-季度" : "年份"

    return (
      <div className="h-[400px] p-4 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 shadow-inner">

        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartDataToUse} margin={{ top: 20, right: hasRightAxis ? 60 : 20, left: 20, bottom: 20 }}>
            <defs>
              {activeFields.map((field) => (
                <linearGradient key={`gradient-${field.key}`} id={`gradient-${field.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={field.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={field.color} stopOpacity={0.05} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey={xAxisDataKey}
              tick={{ fontSize: 12, fill: "#64748b" }}
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={{ stroke: "#cbd5e1" }}
              label={{ value: xAxisLabel, position: "insideBottomRight", offset: -10, fill: "#94a3b8", fontSize: 12 }}
              angle={config.useQuarterlyData ? -45 : 0}
              textAnchor={config.useQuarterlyData ? "end" : "middle"}
              height={config.useQuarterlyData ? 60 : 30}
            />

            {/* 左侧Y轴 */}
            {hasLeftAxis && (
              <YAxis
                yAxisId="left"
                orientation="left"
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={{ stroke: "#cbd5e1" }}
                tick={{ fontSize: 11, fill: "#64748b" }}
                label={{
                  value: config.leftAxisLabel || "数值",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#64748b",
                  fontSize: 12,
                  offset: 10,
                }}
              />
            )}

            {/* 右侧Y轴 */}
            {hasRightAxis && (
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={{ stroke: "#cbd5e1" }}
                tick={{ fontSize: 11, fill: "#64748b" }}
                label={{
                  value: config.rightAxisLabel || "%",
                  angle: 90,
                  position: "insideRight",
                  fill: "#64748b",
                  fontSize: 12,
                  offset: 10,
                }}
              />
            )}

            <Tooltip
              cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(8px)",
              }}
              formatter={(value: ValueType, name: NameType) => {
                const field = config.fields.find((f) => f.label === name)
                const formattedValue = typeof value === "number" ? value.toFixed(2) : value
                return [`${formattedValue} ${field?.unit || ""}`, name]
              }}
              labelFormatter={(label: string) => config.useQuarterlyData ? label : `${label}年`}
              labelStyle={{ fontWeight: 600, marginBottom: 8 }}
            />
            <Legend
              verticalAlign="top"
              align="center"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 15 }}
              formatter={(value) => <span className="text-sm text-slate-600">{value}</span>}
            />

            {activeFields.map((field) => {
              const yAxisId = field.yAxisId || (hasRightAxis && !hasLeftAxis ? "right" : "left")

              if (field.chartType === "bar") {
                return (
                  <Bar
                    key={field.key}
                    dataKey={field.key}
                    name={field.label}
                    fill={field.color}
                    yAxisId={yAxisId}
                    radius={[4, 4, 0, 0]}
                    opacity={0.85}
                    maxBarSize={40}
                  />
                )
              }

              if (field.chartType === "area") {
                return (
                  <Area
                    key={field.key}
                    type="monotone"
                    dataKey={field.key}
                    name={field.label}
                    stroke={field.color}
                    strokeWidth={field.strokeWidth || 2}
                    fill={`url(#gradient-${field.key})`}
                    yAxisId={yAxisId}
                    dot={{ r: 3, fill: field.color }}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
                    connectNulls
                  />
                )
              }

              return (
                <Line
                  key={field.key}
                  type="monotone"
                  dataKey={field.key}
                  name={field.label}
                  stroke={field.color}
                  strokeWidth={field.strokeWidth || 2}
                  strokeDasharray={field.strokeDasharray}
                  yAxisId={yAxisId}
                  dot={{ r: 4, fill: field.color, strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                  connectNulls
                />
              )
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="max-h-[800px] px-5 bg-white overflow-auto">
      <div className="mt-4 mb-2">
        <Button
          icon={<ArrowLeft size={16} />}
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          返回
        </Button>
      </div>
      {/* 顶部标题栏 */}
      <div className="bg-white top-0 z-20">
        <div className="max-w-[1400px] p-6 mx-auto flex justify-between items-center flex-wrap gap-4 bg-white border border-gray-200">
          <div >
            <h1 className="text-xl md:text-2xl font-bold mb-2">{stockName}</h1>
            <p className="text-gray-600 text-base">
              股票代码: {stock_code} | 所属行业: {abstract?.profitability[0]?.industry}
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg borde">
            <Select
              value={timePeriod}
              onChange={setTimePeriod}
              options={[
                { label: "近一年", value: 1 },
                { label: "近三年", value: 3 },
                { label: "近五年", value: 5 },
                { label: "近十年", value: 10 },
                { label: "近十五年", value: 15 },
                { label: "近二十年", value: 20 },
              ]}
              style={{ width: 120 }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto -mt-0.5">
        <Spin spinning={isLoading} tip="正在装载财务数据...">
          {abstract && chartData.length > 0 && (
            <Row gutter={[0, 24]}>
              {/* 1. 盈利能力 */}
              <Col span={24}>
                <Card className="!rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <SectionHeader title="盈利能力" icon={TrendingUp} configKey="profitability" />
                  {renderChart("profitability")}
                </Card>
              </Col>

              {/* 2. 成长能力 */}
              <Col span={24}>
                <Card className="!rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <SectionHeader title="成长能力" icon={Zap} configKey="growth" />
                  {renderChart("growth")}
                </Card>
              </Col>
              {/* 8. 分红情况 */}
              <Col span={24}>
                <Card className="!rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <SectionHeader title="分红情况" icon={Coins} configKey="dividend" />
                  {renderChart("dividend", dividendChartData)}
                </Card>
              </Col>
              {/* 3. 偿债风险 */}
              <Col span={24}>
                <Card className="!rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <SectionHeader title="偿债风险" icon={ShieldAlert} configKey="risk" />
                  {renderChart("risk")}
                </Card>
              </Col>

              {/* 4. 营运效率 */}
              <Col span={24}>
                <Card className="!rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <SectionHeader title="营运效率" icon={Activity} configKey="operating" />
                  {renderChart("operating")}
                </Card>
              </Col>

              {/* 5. 现金质量 */}
              <Col span={24}>
                <Card className="!rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <SectionHeader title="现金质量" icon={PieChart} configKey="cash" />
                  {renderChart("cash")}
                </Card>
              </Col>

              {/* 6. 估值指标 */}
              <Col span={24}>
                <Card className="!rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <SectionHeader title="估值指标" icon={BarChart3} configKey="valuation" />
                  {renderChart("valuation")}
                </Card>
              </Col>

              {/* 7. 每股指标 */}
              <Col span={24}>
                <Card className="!rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                  <SectionHeader title="每股指标" icon={DollarSign} configKey="perIndicator" />
                  {renderChart("perIndicator")}
                </Card>
              </Col>


            </Row>
          )}
        </Spin>
      </div>
    </div>
  )
}