"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, Button, Select, Spin } from "antd"
import { ArrowLeft } from "lucide-react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { generateDetailData, getCompanyByCode, type TimePeriod } from "@/lib/mock-data"
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function DetailPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const code = params.code as string
  const initialPeriod = (searchParams.get("period") as TimePeriod) || "1year"

  const [timePeriod, setTimePeriod] = useState<TimePeriod>(initialPeriod)
  const [loading, setLoading] = useState(true)

  const company = useMemo(() => getCompanyByCode(code, timePeriod), [code, timePeriod])
  const detailData = useMemo(() => generateDetailData(code, timePeriod), [code, timePeriod])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [timePeriod])

  const periodOptions = [
    { label: "近一年", value: "1year" },
    { label: "近三年", value: "3years" },
    { label: "近五年", value: "5years" },
    { label: "近十年", value: "10years" },
  ]

  const periodLabels = {
    "1year": ["Q1", "Q2", "Q3", "Q4"],
    "3years": ["2022", "2023", "2024"],
    "5years": ["2020", "2021", "2022", "2023", "2024"],
    "10years": ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"],
  }

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
            返回列表
          </Button>
        </div>

        <Card className="mb-1">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center ">
            <div>
              <h1 className="text-xl md:text-3xl font-bold mb-2">{company.name}</h1>
              <p className="text-gray-600 text-base">
                股票代码: {company.code} | 行业: {company.industry}
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
            <h2 className="text-xl font-bold mb-2">营业收入与同比增长率趋势图</h2>
            <div className="w-full h-[480]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={detailData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="period" />
                  <YAxis
                    yAxisId="left"
                    label={{ value: "营业收入 (亿)", angle: -90, position: "insideLeft" }}
                    stroke="#4a5565"
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{ value: "同比增长率 (%)", angle: 90, position: "insideRight" }}
                    stroke="#4a5565"
                  />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="营业收入 (亿)" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="growth"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="同比增长率 (%)"
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