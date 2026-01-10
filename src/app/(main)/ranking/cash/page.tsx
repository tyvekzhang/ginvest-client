"use client";

import { useState, useMemo } from "react";
import { Table, Tabs, Select, Pagination, Card, Space } from "antd";
import type { TabsProps, TableColumnsType } from "antd";
import { BarChart3, TableIcon, Eye, Medal, Award, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useRankingCashes,
} from "@/service/ranking-cash";
import { createPaginationRequest, SortItem } from "@/types";
import { RankingCash } from "@/types/ranking-cash";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useIndustry } from '@/service/stock'

export default function CashRankingPage() {
  const router = useRouter();

  /** 查询条件 */
  const [queryPeriod, setQueryPeriod] = useState<number>(3);
  const [industry, setIndustry] = useState<string>();
  const [current, setCurrent] = useState(1);
  const [pageSize] = useState(20);
  const [activeTab, setActiveTab] = useState("table");

  const { industryList } = useIndustry()

  interface OptionType {
    value: string;
    label: string;
  }

  const transformIndustryOptions = (values: string[] | undefined): OptionType[] => {
    if (values === undefined) {
      return []
    }
    return values.map(value => ({
      value,
      label: value,
    }));
  };

  const sortList: SortItem[] = [
    {
      field: 'rank',
      order: 'asc'
    }
  ]
  const { rankingCashList, total, isLoading } = useRankingCashes({
    query_period: queryPeriod,
    industry,
    ...createPaginationRequest(current, pageSize, JSON.stringify(sortList)),
  });

  /** 表格列 */
  const columns: TableColumnsType<RankingCash> = [
    {
      title: '主键',
      dataIndex: 'id',
      key: 'id',
      hidden: true,
    },
    {
      title: '排名',
      dataIndex: 'rank',
      width: 80,
      align: 'center',
      render: (rank: number, _record, index: number) => {
        const displayRank =
          industry && current === 1 ? index + 1 : rank;

        if (displayRank === 1) {
          return (
            <span className="flex items-center justify-center gap-1">
              <Crown size={16} className="text-yellow-500" />
              {displayRank}
            </span>
          );
        }
        if (displayRank === 2) {
          return (
            <span className="flex items-center justify-center gap-1">
              <Medal size={16} className="text-gray-400" />
              {displayRank}
            </span>
          );
        }
        if (displayRank === 3) {
          return (
            <span className="flex items-center justify-center gap-1">
              <Award size={16} className="text-amber-600" />
              {displayRank}
            </span>
          );
        }

        return displayRank;
      },
    },
    {
      title: "股票代码",
      dataIndex: "stock_code",
      width: "8%",
    },
    {
      title: "公司名称",
      dataIndex: "stock_name",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "所属行业",
      dataIndex: "industry",
      width: '16%',
      ellipsis: true,
    },
    {
      title: "总经营现金(元)",
      dataIndex: "total_cash",
      align: "right",
      render: (v: number) => v.toLocaleString(),
    },
    {
      title: "平均经营现金(元)",
      dataIndex: "avg_cash",
      key: "avg_cash",
      align: "right",
      render: (v: number) => v.toLocaleString(),
    },
    {
      title: "复合增长率(%)",
      dataIndex: "cagr",
      key: "cagr",
      align: "right",
      width: "12%",
      render: (text) => (text ? `${text}` : "-"),
    },
    {
      title: "操作",
      render: (_, record) => (
        <button
          className="flex items-center justify-center gap-1 text-sm btn-operation cursor-pointer"
          onClick={() =>
            router.push(
              `/ranking/cash/detail/${record.stock_code}?period=${queryPeriod}`,
            )
          }
        >
          <Eye className="w-3.5 h-3.5" />
          详情
        </button>
      ),
    },
  ];

  /** 图表数据 */
  const chartData = useMemo(
    () =>
      (rankingCashList || []).map((item) => ({
        name:
          item.stock_name.length > 6
            ? item.stock_name.slice(0, 6) + "..."
            : item.stock_name,
        经营现金: Math.round(item.avg_cash / 1e8),
      })),
    [rankingCashList],
  );

  const tabItems: TabsProps["items"] = [
    {
      key: "table",
      label: (
        <span className="flex items-center gap-2">
          <TableIcon size={16} /> 表格视图
        </span>
      ),
      children: (
        <>
          <Table
            columns={columns}
            dataSource={rankingCashList || []}
            rowKey="id"
            loading={isLoading}
            pagination={false}
          />
          <Pagination
            className="mt-4 text-right float-right"
            current={current}
            total={total || 0}
            pageSize={pageSize}
            onChange={setCurrent}
            showTotal={(total) => `共 ${total} 条`}
          />
        </>
      ),
    },
    {
      key: "chart",
      label: (
        <span className="flex items-center gap-2">
          <BarChart3 size={16} /> 图表视图
        </span>
      ),
      children: (
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} tick={{ fontSize: 12 }} />
              <YAxis stroke="#3b82f6" label={{ value: "平均经营现金 (亿)", angle: -90, position: "insideLeft" }} />
              <Tooltip formatter={(value: number) => [`${value}亿`, "平均经营现金"]} />
              <Legend wrapperStyle={{ paddingTop: 20 }} />
              <Bar dataKey="经营现金" fill="#3b82f6" name="平均经营现金" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-background">
      <Card>
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">经营现金排行榜</h2>
          </div>
          <Space>
            <Select
              value={industry}
              allowClear
              showSearch
              placeholder="请选择所属行业"
              onChange={(v) => {
                setIndustry(v);
                setCurrent(1);
              }}
              options={transformIndustryOptions(industryList)}
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              style={{ width: 160 }}
            />
            <Select
              value={queryPeriod}
              onChange={(v) => {
                setQueryPeriod(v);
                setCurrent(1);
              }}
              options={[
                { label: "近一年", value: 1 },
                { label: "近三年", value: 3 },
                { label: "近五年", value: 5 },
                { label: "近十年", value: 10 },
                { label: "近十五年", value: 15 },
              ]}
              style={{ width: 120 }}
            />
          </Space>
        </div>

        <Tabs items={tabItems} activeKey={activeTab} onChange={setActiveTab} />
      </Card>
    </div>
  );
}
