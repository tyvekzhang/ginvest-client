// SPDX-License-Identifier: MIT
'use client';

import ActionButtonComponent from '@/components/base/action-button';
import { PaginatedTable } from '@/components/base/paginated-table';
import TransitionWrapper from '@/components/base/transition-wrapper';
import {
  useRankingMultipleFactors,
} from '@/service/ranking-multiple-factor';
import { createPaginationRequest } from '@/types';
import {
  ListRankingMultipleFactorsRequest,
  RankingMultipleFactor,
} from '@/types/ranking-multiple-factor';
import { Form } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Award, Crown, Eye, Medal } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import QueryRankingMultipleFactorComponent from './components/query-ranking-multiple-factor';
import { useIndustry } from '@/service/stock';
import { useRouter } from "next/navigation";

const RankingMultipleFactorPage: React.FC = () => {
  const router = useRouter();
  const actionConfig = {
    showCreate: false,
    showImport: false,
    showExport: true,
    showModify: false,
    showRemove: false,
  };
  // 查询模块
  const [isQueryRankingMultipleFactorShow, setIsQueryRankingMultipleFactorShow] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryRankingMultipleFactorForm] = Form.useForm();
  const [rankingMultipleFactorQueryParams, setRankingMultipleFactorQueryParams] = useState<ListRankingMultipleFactorsRequest>();

  // 用 useRankingMultipleFactors 获取菜单列表数据
  const {
    rankingMultipleFactors: rankingMultipleFactorListDataSource,
    total,
    isLoading: isRankingMultipleFactorListLoading,
    mutateRankingMultipleFactors,
  } = useRankingMultipleFactors({
    ...rankingMultipleFactorQueryParams,
    ...createPaginationRequest(current, pageSize),
  });

  const onQueryRankingMultipleFactorShow = () => {
    setIsQueryRankingMultipleFactorShow((prevState) => !prevState);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  const resetPagination = () => {
    setCurrent(1);
    setPageSize(10);
  };

  const handleQueryRankingMultipleFactorReset = () => {
    resetPagination();
    queryRankingMultipleFactorForm.resetFields();
    setRankingMultipleFactorQueryParams(undefined)
    mutateRankingMultipleFactors();
  };

  const onQueryRankingMultipleFactorFinish = async () => {
    const values = queryRankingMultipleFactorForm.getFieldsValue();
    const { create_time } = values;
    if (create_time) {
      const [startDate, endDate] = create_time;
      values.create_time = [
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
      ];
    }
    const queryRankingMultipleFactor = values as ListRankingMultipleFactorsRequest;
    const filteredQueryRankingMultipleFactor = Object.fromEntries(
      Object.entries(queryRankingMultipleFactor).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );
    resetPagination();
    setRankingMultipleFactorQueryParams(filteredQueryRankingMultipleFactor as ListRankingMultipleFactorsRequest);
  };


  const { industryList } = useIndustry();
  const [queryPeriod, setQueryPeriod] = useState<number>(3);
  useEffect(() => {
    queryRankingMultipleFactorForm.setFieldsValue({
      query_period: queryPeriod,
    });
  }, [queryRankingMultipleFactorForm, queryPeriod]);

  // 表格列信息
  const rankingMultipleFactorColumns: ColumnsType<RankingMultipleFactor> = [
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
      fixed: 'left',
      align: 'center',
      render: (rank: number, _record, index: number) => {
        const displayRank =
          current === 1 ? index + 1 : rank;

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
      fixed: 'left',
      width: 100,
    },
    {
      title: "公司名称",
      dataIndex: "stock_name",
      fixed: 'left',
      width: 100,
      ellipsis: true,
    },
    {
      title: "所属行业",
      dataIndex: "industry",
      fixed: 'left',
      width: 180,
      ellipsis: true,
    },
    {
      title: "Roe加权平均",
      dataIndex: "roe_weighted_avg",
      key: "roe_weighted_avg",
      align: 'right',
      render: (text) => (text ? `${text}` : "-"),
      width: 120,
    },
    {
      title: "营收增长率cagr",
      dataIndex: "revenue_growth_cagr",
      key: "revenue_growth_cagr",
      align: 'right',
      render: (text) => (text ? `${text}` : "-"),
      width: 140,
    },
    {
      title: "净利润增长率cagr",
      dataIndex: "profit_growth_cagr",
      key: "profit_growth_cagr",
      align: 'right',
      render: (text) => (text ? `${text}` : "-"),
      width: 150,
    },
    {
      title: "现金净利比加权平均",
      dataIndex: "cashflow_ratio_weighted_avg",
      key: "cashflow_ratio_weighted_avg",
      align: 'right',
      render: (text) => (text ? `${text}` : "-"),
      width: 160,
    },
    {
      title: "资产负债率加权平均",
      dataIndex: "debt_ratio_weighted_avg",
      key: "debt_ratio_weighted_avg",
      align: 'right',
      render: (text) => (text ? `${text}` : "-"),
      width: 160,
    },
    {
      title: "股息率加权平均",
      dataIndex: "dividend_rate_weighted_avg",
      key: "dividend_rate_weighted_avg",
      align: 'right',
      render: (text) => (text ? `${text}` : "-"),
      width: 160,
    },
    {
      title: "股息支付率加权平均",
      dataIndex: "payout_rate_weighted_avg",
      key: "payout_rate_weighted_avg",
      align: 'right',
      render: (text) => (text ? `${text}` : "-"),
      width: 160,
    },
    {
      title: "市盈率中位数",
      dataIndex: "pe_ratio_median",
      key: "pe_ratio_median",
      align: 'right',
      render: (text) => (text ? `${text}` : "-"),
      width: 140,
    },
    {
      title: "市净率中位数",
      dataIndex: "pb_ratio_median",
      key: "pb_ratio_median",
      align: 'right',
      render: (text) => (text ? `${text}` : "-"),
      width: 140,
    },
    {
      title: "PEG指标中位数",
      dataIndex: "peg_ratio_median",
      key: "peg_ratio_median",
      align: 'right',
      render: (text) => (text ? `${text}` : "-"),
      width: 140,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <div className="flex gap-2 items-center justify-center">
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={
              () =>
                router.push(
                  `/ranking/multiple/detail/${record.stock_code}?period=${queryPeriod}`,
                )
            }
          >
            <Eye className="w-3 h-3" />
            详情
          </button>
        </div>
      ),
    },
  ]

  const [visibleColumns, setVisibleColumns] = useState(
    rankingMultipleFactorColumns.map((col) => col.key),
  );
  const onToggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((prevVisibleColumns) => {
      if (prevVisibleColumns.includes(columnKey)) {
        return prevVisibleColumns.filter((key) => key !== columnKey);
      } else {
        return [...prevVisibleColumns, columnKey];
      }
    });
  };
  const filteredRankingMultipleFactorColumns = rankingMultipleFactorColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 选择行相关状态
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<RankingMultipleFactor[]>([]);

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: RankingMultipleFactor[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryRankingMultipleFactorShow}>
        <QueryRankingMultipleFactorComponent
          onQueryRankingMultipleFactorFinish={onQueryRankingMultipleFactorFinish}
          onQueryRankingMultipleFactorReset={handleQueryRankingMultipleFactorReset}
          onQueryRankingMultipleFactorForm={queryRankingMultipleFactorForm}
          industryList={industryList}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={() => { }}
          onImport={() => { }}
          onExport={() => { }}
          onBatchModify={() => { }}
          onConfirmBatchRemove={() => { }}
          onConfirmBatchRemoveCancel={() => { }}
          isQueryShow={isQueryRankingMultipleFactorShow}
          onQueryShow={onQueryRankingMultipleFactorShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={false}
          isExportLoading={false}
          rawColumns={rankingMultipleFactorColumns as any[]}
          visibleColumns={visibleColumns as any[]}
          onToggleColumnVisibility={onToggleColumnVisibility}
          actionConfig={actionConfig}
          className="mb-2 mt-4"
        />
      </div>
      <div>
        <PaginatedTable<RankingMultipleFactor>
          columns={filteredRankingMultipleFactorColumns}
          dataSource={rankingMultipleFactorListDataSource || []}
          total={total || 0}
          current={current}
          page_size={pageSize}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleSelectionChange}
          selectedRowKeys={selectedRowKeys}
          rowKey="stock_code"
          loading={isRankingMultipleFactorListLoading}
          scroll={{ x: 1500 }}
        />
      </div>
    </div>
  );
};

export default RankingMultipleFactorPage;