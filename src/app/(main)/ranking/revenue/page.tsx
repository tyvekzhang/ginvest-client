"use client"

import { useState, useMemo } from "react"
import { Table, Tabs, Select, Pagination, Card, Tag, Space, Button } from "antd"
import type { TabsProps, TableColumnsType } from "antd"
import { BarChart3, TableIcon, Download, Eye } from "lucide-react"
import { generateMockData, type CompanyData, type TimePeriod, industries } from "@/lib/mock-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useRouter } from "next/navigation"

export default function RevenueRankingPage() {
  const router = useRouter()
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1year")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState<string>("table")
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all")
  const itemsPerPage = 20

  const allData = generateMockData(timePeriod)

  const filteredData = useMemo(() => {
    if (selectedIndustry === "all") {
      return allData
    }
    return allData.filter((item) => item.industry === selectedIndustry)
  }, [allData, selectedIndustry])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const periodOptions = [
    { label: "近一年", value: "1year" },
    { label: "近三年", value: "3years" },
    { label: "近五年", value: "5years" },
    { label: "近十年", value: "10years" },
  ]

  const industryOptions = [
    { label: "全部行业", value: "all" },
    ...industries.map((industry) => ({ label: industry, value: industry })),
  ]

  const handleTimePeriodChange = (value: TimePeriod) => {
    setTimePeriod(value)
    setCurrentPage(1)
  }

  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value)
    setCurrentPage(1)
  }

  const handleRowClick = (record: CompanyData) => {
    router.push(`/ranking/revenue/detail/${record.code}?period=${timePeriod}`)
  }

  const formatRevenue = (revenue: number) => {
    if (revenue >= 100000000) {
      return `${(revenue / 100000000).toFixed(2)}亿`
    }
    return `${(revenue / 10000).toFixed(2)}万`
  }

  const columns: TableColumnsType<CompanyData> = [
    {
      title: "排名",
      dataIndex: "rank",
      key: "rank",
      width: 80,
      align: "center",
      render: (rank: number) => {
        if (rank <= 3) {
          const colors = ["#ffd700", "#c0c0c0", "#cd7f32"] // gold, silver, bronze
          return (
            <Tag
              color={colors[rank - 1]}
              className="font-bold text-sm"
            >
              {rank}
            </Tag>
          )
        }
        return <span className="text-gray-500">{rank}</span>
      },
    },
    {
      title: "股票代码",
      dataIndex: "code",
      key: "code",
      width: 120,
      render: (code: string) => <span className="font-mono">{code}</span>,
    },
    {
      title: "公司名称",
      dataIndex: "name",
      key: "name",
      width: 200,
      ellipsis: true,
    },
    {
      title: "营业收入",
      dataIndex: "revenue",
      key: "revenue",
      width: 150,
      align: "right",
      render: (revenue: number) => (
        <span className="font-semibold tabular-nums">{formatRevenue(revenue)}</span>
      ),
    },
    {
      title: "行业",
      dataIndex: "industry",
      key: "industry",
      width: 120,
      render: (industry: string) => <Tag>{industry}</Tag>,
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      align: "center",
      render: (_, record) => (
        <button
          type="button"
          className="flex items-center gap-0.5 text-sm btn-operation"
          onClick={(e) => {
            e.stopPropagation()
            handleRowClick(record)
          }}
        >
          <Eye className="w-4 h-4" />
          详情
        </button>
      ),
    },
  ]

  const chartData = currentData.map((item) => ({
    name: item.name.length > 6 ? item.name.slice(0, 6) + "..." : item.name,
    营业收入: Math.round(item.revenue / 100000000),
  }))

  const tabItems: TabsProps["items"] = [
    {
      key: "table",
      label: (
        <span className="flex items-center gap-2">
          <TableIcon size={16} />
          表格视图
        </span>
      ),
      children: (
        <>
          <Table<CompanyData>
            columns={columns}
            dataSource={currentData}
            pagination={false}
            rowKey="code"
            scroll={{ x: 800 }}
            className="mb-6"
          />
          <div className="flex justify-end">
            <Pagination
              current={currentPage}
              total={filteredData.length}
              pageSize={itemsPerPage}
              onChange={setCurrentPage}
              showSizeChanger={false}
              showTotal={(total) => `共 ${total} 条`}
            />
          </div>
        </>
      ),
    },
    {
      key: "chart",
      label: (
        <span className="flex items-center gap-2">
          <BarChart3 size={16} />
          图表视图
        </span>
      ),
      children: (
        <div className="w-full h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
              <YAxis stroke="#3b82f6" label={{ value: "营业收入 (亿)", angle: -90, position: "insideLeft" }} />
              <Tooltip formatter={(value: number) => [`${value}亿`, "营业收入"]} />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Bar dataKey="营业收入" fill="#3b82f6" name="营业收入" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center mt-6">
            <Pagination
              current={currentPage}
              total={filteredData.length}
              pageSize={itemsPerPage}
              onChange={setCurrentPage}
              showSizeChanger={false}
              showTotal={(total) => `共 ${total} 条`}
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 -mt-1">
      <div className="max-w-[1400px] mx-auto">
        <Card>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">营业收入排行榜</h2>
              <p className="text-gray-500 text-sm">
                当前显示：{periodOptions.find((p) => p.value === timePeriod)?.label}数据
                {selectedIndustry !== "all" && ` · ${selectedIndustry}`}
              </p>
            </div>
            <Space size="small" className="w-full lg:w-auto">

              <Select
                value={selectedIndustry}
                onChange={handleIndustryChange}
                options={industryOptions}
                className="w-full lg:w-[140px]"
                size="middle"
                placeholder="选择行业"
              />
              <Select
                value={timePeriod}
                onChange={handleTimePeriodChange}
                options={periodOptions}
                className="w-full lg:w-[120px]"
                size="middle"
              />

            </Space>

          </div>

          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        </Card>
      </div>
    </div>
  )
}