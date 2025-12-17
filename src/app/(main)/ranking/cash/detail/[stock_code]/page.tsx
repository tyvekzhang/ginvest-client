"use client"

import { useState, useEffect } from "react"
import { Card, Button, Select, Spin } from "antd"

import { ArrowLeft } from "lucide-react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { useStockCompany } from '@/service/stock'
import { useReportCashCycle } from '@/service/report-income-statement'
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function DetailPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const stock_code = params.stock_code as string
  const initialPeriod = searchParams.get('period') ? Number(searchParams.get('period')) : 3

  const [timePeriod, setTimePeriod] = useState<number>(initialPeriod)
  const [loading, setLoading] = useState(true)

  const { company } = useStockCompany(stock_code)
  const { cashCycleList } = useReportCashCycle(stock_code, timePeriod)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [timePeriod])

  const periodOptions = [
    { label: "近一年", value: 1 },
    { label: "近三年", value: 3 },
    { label: "近五年", value: 5 },
    { label: "近十年", value: 10 },
    { label: "近十五年", value: 15 },
    { label: "近二十年", value: 20 },
  ]


  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto">
          <Card>
            <p>公司信息未找到</p>
            <Button onClick={() => router.back()}>返回</Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-white p-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-2">
          <Button
            icon={<ArrowLeft size={16} />}
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            返回
          </Button>
        </div>

        <Card >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center ">
            <div>
              <h1 className="text-xl md:text-2xl font-bold mb-2">{company.stock_name}</h1>
              <p className="text-gray-600 text-base">
                股票代码: {company.stock_code} | 行业: {company.industry}
              </p>
            </div>
            <Select
              value={timePeriod}
              onChange={setTimePeriod}
              options={periodOptions}
              className="w-full lg:w-[120px]"
            />
          </div>
        </Card>

        {loading ? (
          <Card>
            <div className="flex justify-center items-center min-h-[400px]">
              <Spin size="large" />
            </div>
          </Card>
        ) : (
          <Card>
            <h2 className="text-xl font-bold mb-2">经营现金与净现金流占比趋势图</h2>
            <div className="w-full h-[480]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={cashCycleList} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="cycle" />
                  <YAxis
                    yAxisId="left"
                    label={{ value: "经营现金 (亿)", angle: -90, position: "insideLeft" }}
                    stroke="#4a5565"
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{ value: "净现金流占比 (%)", angle: 90, position: "insideRight" }}
                    stroke="#4a5565"
                  />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="total_cash" fill="#3b82f6" name="经营现金 (亿)" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="total_cash_yoy"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="净现金流占比 (%)"
                    dot={{ fill: "#10b981", r: 4 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}