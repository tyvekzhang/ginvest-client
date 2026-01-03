// SPDX-License-Identifier: MIT
'use client';

import ActionButtonComponent from '@/components/base/action-button';
import { PaginatedTable } from '@/components/base/paginated-table';
import TransitionWrapper from '@/components/base/transition-wrapper';
import {
  batchCreateRankingMultipleFactors,
  batchDeleteRankingMultipleFactor,
  batchUpdateRankingMultipleFactors,
  createRankingMultipleFactor,
  deleteRankingMultipleFactor,
  exportRankingMultipleFactor,
  importRankingMultipleFactor,
  updateRankingMultipleFactor,
  useRankingMultipleFactor,
  useRankingMultipleFactors,
} from '@/service/ranking-multiple-factor';
import { createPaginationRequest } from '@/types';
import {
  BatchUpdateRankingMultipleFactor,
  CreateRankingMultipleFactor,
  ListRankingMultipleFactorsRequest,
  RankingMultipleFactor,
  UpdateRankingMultipleFactor,
} from '@/types/ranking-multiple-factor';
import { Form, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Award, Crown, Eye, Medal, MoreHorizontal, PenLine, Trash2 } from 'lucide-react';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';
import BatchUpdateRankingMultipleFactorComponent from './components/batch-update-ranking-multiple-factor';
import CreateRankingMultipleFactorComponent from './components/create-ranking-multiple-factor';
import ImportRankingMultipleFactorComponent from './components/import-ranking-multiple-factor';
import RankingMultipleFactorDetailComponent from './components/ranking-multiple-factor-detail';
import QueryRankingMultipleFactorComponent from './components/query-ranking-multiple-factor';
import UpdateRankingMultipleFactorComponent from './components/update-ranking-multiple-factor';

const RankingMultipleFactorPage: React.FC = () => {
  // 配置模块
  const actionConfig = {
    showCreate: true,
    showImport: true,
    showExport: true,
    showModify: true,
    showRemove: true,
  };
  const showMore = false;


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

  // 详情模块
  const [isRankingMultipleFactorDetailDrawerVisible, setIsRankingMultipleFactorDetailDrawerVisible] =
    useState(false);
  const [selectedRankingMultipleFactorId, setSelectedRankingMultipleFactorId] = useState<string | null>(null);

  const { rankingMultipleFactor: rankingMultipleFactorDetail, isLoading: isRankingMultipleFactorDetailLoading } = useRankingMultipleFactor(
    selectedRankingMultipleFactorId || '',
  );

  const onRankingMultipleFactorDetail = (rankingMultipleFactor: RankingMultipleFactor) => {
    setSelectedRankingMultipleFactorId(rankingMultipleFactor.id);
    setIsRankingMultipleFactorDetailDrawerVisible(true);
  };

  const onRankingMultipleFactorDetailClose = () => {
    setSelectedRankingMultipleFactorId(null);
    setIsRankingMultipleFactorDetailDrawerVisible(false);
  };

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
      width: 100,
    },
    {
      title: "公司名称",
      dataIndex: "stock_name",
      width: 100,
      ellipsis: true,
    },
    {
      title: "行业",
      dataIndex: "industry",
      width: 180,
      ellipsis: true,
    },
    {
      title: "净资产收益率加权平均",
      dataIndex: "roe_weighted_avg",
      key: "roe_weighted_avg",
      width: 200,
    },
    {
      title: "营收增长率复合增长率",
      dataIndex: "revenue_growth_cagr",
      key: "revenue_growth_cagr",
      width: 200,
    },
    {
      title: "净利润增长率复合增长率",
      dataIndex: "profit_growth_cagr",
      key: "profit_growth_cagr",
      width: 200,
    },
    {
      title: "现金流利润比加权平均",
      dataIndex: "cashflow_ratio_weighted_avg",
      key: "cashflow_ratio_weighted_avg",
      width: 200,
    },
    {
      title: "资产负债率加权平均",
      dataIndex: "debt_ratio_weighted_avg",
      key: "debt_ratio_weighted_avg",
      width: 200,
    },
    {
      title: "股息率加权平均",
      dataIndex: "dividend_rate_weighted_avg",
      key: "dividend_rate_weighted_avg",
      width: 200,
    },
    {
      title: "股息支付率加权平均",
      dataIndex: "payout_rate_weighted_avg",
      key: "payout_rate_weighted_avg",
      width: 200,
    },
    {
      title: "市盈率中位数",
      dataIndex: "pe_ratio_median",
      key: "pe_ratio_median",
      width: 200,
    },
    {
      title: "PEG指标中位数",
      dataIndex: "peg_ratio_median",
      key: "peg_ratio_median",
      width: 200,
    },
    {
      title: "市净率中位数",
      dataIndex: "pb_ratio_median",
      key: "pb_ratio_median",
      width: 200,
    },
    {
      title: "排名",
      dataIndex: "rank",
      key: "rank",
      width: 200,
    },
    {
      title: "行业排名",
      dataIndex: "industry_rank",
      key: "industry_rank",
      width: 200,
    },
    {
      title: "总分",
      dataIndex: "score",
      key: "score",
      width: 200,
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      fixed: 'right',
      width: 180,
      render: (_, record) => (
        <div className="flex gap-2 items-center justify-center">
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={() => { }}
          >
            <Eye className="w-3 h-3" />
            详情
          </button>
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={() => { }}
          >
            <PenLine className="w-3 h-3" />
            编辑
          </button>
          <Popconfirm
            title="确认删除"
            description="确定删除吗? 删除后将无法找回"
            onConfirm={() => { }}
            okText="确认"
            cancelText="取消"
          >
            <button
              type="button"
              className="flex items-center gap-0.5 text-xs btn-remove"
            >
              <Trash2 className="w-3 h-3" />
              删除
            </button>
          </Popconfirm>

          {showMore && (
            <button type="button" className="flex items-center gap-0.5 text-xs btn-operation">
              <span>更多</span>
              <MoreHorizontal className="w-3 h-3" />
            </button>
          )}
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

  // 新增模块
  const [isCreateRankingMultipleFactorModalVisible, setIsCreateRankingMultipleFactorModalVisible] =
    useState(false);
  const [isCreateRankingMultipleFactorLoading, setIsCreateRankingMultipleFactorLoading] = useState(false);
  const [createRankingMultipleFactorForm] = Form.useForm();

  const onCreateRankingMultipleFactor = () => {
    setIsCreateRankingMultipleFactorModalVisible(true);
  };
  const handleCreateRankingMultipleFactorCancel = () => {
    createRankingMultipleFactorForm.resetFields();
    setIsCreateRankingMultipleFactorModalVisible(false);
  };
  const handleCreateRankingMultipleFactorFinish = async (data: CreateRankingMultipleFactor) => {
    setIsCreateRankingMultipleFactorLoading(true);
    try {
      await createRankingMultipleFactor({ rankingMultipleFactor: data });
      message.success('新增成功');
      createRankingMultipleFactorForm.resetFields();
      setIsCreateRankingMultipleFactorModalVisible(false);
      mutateRankingMultipleFactors();
    } finally {
      setIsCreateRankingMultipleFactorLoading(false);
    }
  };

  // 单个删除模块
  const handleDeleteRankingMultipleFactor = async (rankingMultipleFactor: RankingMultipleFactor) => {
    await deleteRankingMultipleFactor(rankingMultipleFactor.id);
    message.success('删除成功');
    mutateRankingMultipleFactors();
  };

  // 批量删除模块
  const [isBatchRemoveLoading, setIsBatchRemoveLoading] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<RankingMultipleFactor[]>([]);

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: RankingMultipleFactor[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleRankingMultipleFactorBatchRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    try {
      setIsBatchRemoveLoading(true);
      await batchDeleteRankingMultipleFactor({ ids: selectedRows.map((row) => row.id) });
      message.success('删除成功');
      mutateRankingMultipleFactors();
      resetSelectedRows();
    } finally {
      setIsBatchRemoveLoading(false);
    }
  };

  const handleRankingMultipleFactorBatchRemoveCancel = async () => {
    resetSelectedRows();
    message.info('操作已取消');
  };

  // 单个更新模块
  const [isUpdateRankingMultipleFactorModalVisible, setIsUpdateRankingMultipleFactorModalVisible] =
    useState<boolean>(false);
  const [isUpdateRankingMultipleFactorLoading, setIsUpdateRankingMultipleFactorLoading] =
    useState<boolean>(false);
  const [updateRankingMultipleFactorForm] = Form.useForm();

  const onUpdateRankingMultipleFactor = (rankingMultipleFactor: RankingMultipleFactor) => {
    setIsUpdateRankingMultipleFactorModalVisible(true);
    setSelectedRowKeys([rankingMultipleFactor.id]);
    setSelectedRows([rankingMultipleFactor]);
    updateRankingMultipleFactorForm.setFieldsValue({ ...rankingMultipleFactor });
  };

  const handleUpdateRankingMultipleFactorCancel = () => {
    resetSelectedRows();
    updateRankingMultipleFactorForm.resetFields();
    setIsUpdateRankingMultipleFactorModalVisible(false);
  };

  const handleUpdateRankingMultipleFactorFinish = async () => {
    const updateRankingMultipleFactorData =
      (await updateRankingMultipleFactorForm.validateFields()) as UpdateRankingMultipleFactor;
    const req = { ...updateRankingMultipleFactorData, id: selectedRows[0].id };
    setIsUpdateRankingMultipleFactorLoading(true);
    try {
      await updateRankingMultipleFactor({ rankingMultipleFactor: req });
      updateRankingMultipleFactorForm.resetFields();
      message.success('更新成功');
      mutateRankingMultipleFactors();
      resetSelectedRows();
    } finally {
      setIsUpdateRankingMultipleFactorLoading(false);
      setIsUpdateRankingMultipleFactorModalVisible(false);
    }
  };

  // 批量更新模块
  const onRankingMultipleFactorBatchModify = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateRankingMultipleFactorModalVisible(true);
      updateRankingMultipleFactorForm.setFieldsValue({ ...selectedRows[0] });
    } else {
      setIsBatchUpdateRankingMultipleFactorsModalVisible(true);
      batchUpdateRankingMultipleFactorsForm.resetFields();
    }
  };
  const [isBatchUpdateRankingMultipleFactorsModalVisible, setIsBatchUpdateRankingMultipleFactorsModalVisible] =
    useState<boolean>(false);
  const [isBatchUpdateRankingMultipleFactorsLoading, setIsBatchUpdateRankingMultipleFactorsLoading] =
    useState<boolean>(false);
  const [batchUpdateRankingMultipleFactorsForm] = Form.useForm();

  const handleBatchUpdateRankingMultipleFactorsCancel = async () => {
    batchUpdateRankingMultipleFactorsForm.resetFields();
    setIsBatchUpdateRankingMultipleFactorsModalVisible(false);
    resetSelectedRows();
    message.info('操作已取消');
  };

  const handleBatchUpdateRankingMultipleFactorsFinish = async () => {
    const rankingMultipleFactorBatchModify =
      (await batchUpdateRankingMultipleFactorsForm.validateFields()) as BatchUpdateRankingMultipleFactor;
    setIsBatchUpdateRankingMultipleFactorsLoading(true);
    if (selectedRows === null || selectedRows.length === 0) {
      message.warning('请选择要更新的项目');
      return;
    }
    try {
      const ids = selectedRows.map((row) => row.id);
      await batchUpdateRankingMultipleFactors({ ids: ids, rankingMultipleFactor: rankingMultipleFactorBatchModify });
      batchUpdateRankingMultipleFactorsForm.resetFields();
      message.success('更新成功');
      mutateRankingMultipleFactors();
      resetSelectedRows();
    } finally {
      setIsBatchUpdateRankingMultipleFactorsLoading(false);
      setIsBatchUpdateRankingMultipleFactorsModalVisible(false);
    }
  };

  // 导入模块
  const [isImportRankingMultipleFactorModalVisible, setIsImportRankingMultipleFactorModalVisible] =
    useState<boolean>(false);
  const [isImportRankingMultipleFactorLoading, setIsImportRankingMultipleFactorLoading] =
    useState<boolean>(false);
  const [createRankingMultipleFactorList, setCreateRankingMultipleFactorList] = useState<CreateRankingMultipleFactor[]>([]);

  const onImportRankingMultipleFactor = () => {
    setIsImportRankingMultipleFactorModalVisible(true);
  };

  const handleImportRankingMultipleFactorCancel = () => {
    setIsImportRankingMultipleFactorModalVisible(false);
  };

  const onImportRankingMultipleFactorFinish = async (fileList: RcFile[]) => {
    try {
      setIsImportRankingMultipleFactorLoading(true);
      const createRankingMultipleFactorList = await importRankingMultipleFactor({ file: fileList[0] });
      setCreateRankingMultipleFactorList(createRankingMultipleFactorList.rankingMultipleFactors);
      return createRankingMultipleFactorList;
    } finally {
      setIsImportRankingMultipleFactorLoading(false);
    }
  };

  const handleImportRankingMultipleFactor = async () => {
    setIsImportRankingMultipleFactorLoading(true);
    try {
      await batchCreateRankingMultipleFactors({ rankingMultipleFactors: createRankingMultipleFactorList });
      message.success('导入成功');
      setIsImportRankingMultipleFactorModalVisible(false);
      mutateRankingMultipleFactors();
    } finally {
      setIsImportRankingMultipleFactorLoading(false);
      setCreateRankingMultipleFactorList([]);
    }
  };

  // 导出模块
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const onRankingMultipleFactorExport = async () => {
    if (selectedRowKeys === null || selectedRowKeys.length === 0) {
      message.warning('请先选择导出的项目');
      return;
    }
    try {
      setIsExportLoading(true);
      await exportRankingMultipleFactor({ ids: selectedRows.map((row) => row.id) });
      resetSelectedRows();
    } finally {
      setIsExportLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryRankingMultipleFactorShow}>
        <QueryRankingMultipleFactorComponent
          onQueryRankingMultipleFactorFinish={onQueryRankingMultipleFactorFinish}
          onQueryRankingMultipleFactorReset={handleQueryRankingMultipleFactorReset}
          onQueryRankingMultipleFactorForm={queryRankingMultipleFactorForm}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={onCreateRankingMultipleFactor}
          onImport={onImportRankingMultipleFactor}
          onExport={onRankingMultipleFactorExport}
          onBatchModify={onRankingMultipleFactorBatchModify}
          onConfirmBatchRemove={handleRankingMultipleFactorBatchRemove}
          onConfirmBatchRemoveCancel={handleRankingMultipleFactorBatchRemoveCancel}
          isQueryShow={isQueryRankingMultipleFactorShow}
          onQueryShow={onQueryRankingMultipleFactorShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={isBatchRemoveLoading}
          isExportLoading={isExportLoading}
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
      <div>
        <div>
          <CreateRankingMultipleFactorComponent
            isCreateRankingMultipleFactorModalVisible={isCreateRankingMultipleFactorModalVisible}
            onCreateRankingMultipleFactorCancel={handleCreateRankingMultipleFactorCancel}
            onCreateRankingMultipleFactorFinish={handleCreateRankingMultipleFactorFinish}
            isCreateRankingMultipleFactorLoading={isCreateRankingMultipleFactorLoading}
            createRankingMultipleFactorForm={createRankingMultipleFactorForm}
          />
        </div>
        <div>
          <RankingMultipleFactorDetailComponent
            isRankingMultipleFactorDetailDrawerVisible={isRankingMultipleFactorDetailDrawerVisible}
            onRankingMultipleFactorDetailClose={onRankingMultipleFactorDetailClose}
            rankingMultipleFactorDetail={rankingMultipleFactorDetail}
            loading={isRankingMultipleFactorDetailLoading}
          />
        </div>
        <div>
          <UpdateRankingMultipleFactorComponent
            isUpdateRankingMultipleFactorModalVisible={isUpdateRankingMultipleFactorModalVisible}
            onUpdateRankingMultipleFactorCancel={handleUpdateRankingMultipleFactorCancel}
            onUpdateRankingMultipleFactorFinish={handleUpdateRankingMultipleFactorFinish}
            isUpdateRankingMultipleFactorLoading={isUpdateRankingMultipleFactorLoading}
            updateRankingMultipleFactorForm={updateRankingMultipleFactorForm}
          />
        </div>
        <div>
          <BatchUpdateRankingMultipleFactorComponent
            isBatchUpdateRankingMultipleFactorsModalVisible={isBatchUpdateRankingMultipleFactorsModalVisible}
            onBatchUpdateRankingMultipleFactorsCancel={handleBatchUpdateRankingMultipleFactorsCancel}
            onBatchUpdateRankingMultipleFactorsFinish={handleBatchUpdateRankingMultipleFactorsFinish}
            isBatchUpdateRankingMultipleFactorsLoading={isBatchUpdateRankingMultipleFactorsLoading}
            batchUpdateRankingMultipleFactorsForm={batchUpdateRankingMultipleFactorsForm}
          />
        </div>

        <div>
          <ImportRankingMultipleFactorComponent
            isImportRankingMultipleFactorModalVisible={isImportRankingMultipleFactorModalVisible}
            isImportRankingMultipleFactorLoading={isImportRankingMultipleFactorLoading}
            onImportRankingMultipleFactorFinish={onImportRankingMultipleFactorFinish}
            onImportRankingMultipleFactorCancel={handleImportRankingMultipleFactorCancel}
            handleImportRankingMultipleFactor={handleImportRankingMultipleFactor}
          />
        </div>
      </div>
    </div>
  );
};

export default RankingMultipleFactorPage;