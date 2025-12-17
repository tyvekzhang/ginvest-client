// SPDX-License-Identifier: MIT
'use client';

import ActionButtonComponent from '@/components/base/action-button';
import { PaginatedTable } from '@/components/base/paginated-table';
import TransitionWrapper from '@/components/base/transition-wrapper';
import {
  batchCreateReportCashFlows,
  batchDeleteReportCashFlow,
  batchUpdateReportCashFlows,
  createReportCashFlow,
  deleteReportCashFlow,
  exportReportCashFlow,
  importReportCashFlow,
  updateReportCashFlow,
  useReportCashFlow,
  useReportCashFlows,
} from '@/service/report-cash-flow';
import { createPaginationRequest } from '@/types';
import {
  BatchUpdateReportCashFlow,
  CreateReportCashFlow,
  ListReportCashFlowsRequest,
  ReportCashFlow,
  UpdateReportCashFlow,
} from '@/types/report-cash-flow';
import { Form, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Eye, MoreHorizontal, PenLine, Trash2 } from 'lucide-react';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';
import BatchUpdateReportCashFlowComponent from './components/batch-update-report-cash-flow';
import CreateReportCashFlowComponent from './components/create-report-cash-flow';
import ImportReportCashFlowComponent from './components/import-report-cash-flow';
import ReportCashFlowDetailComponent from './components/report-cash-flow-detail';
import QueryReportCashFlowComponent from './components/query-report-cash-flow';
import UpdateReportCashFlowComponent from './components/update-report-cash-flow';

const ReportCashFlowPage: React.FC = () => {
  // 配置模块
  const actionConfig = {
    showCreate: false,
    showImport: false,
    showExport: true,
    showModify: false,
    showRemove: false,
  };
  const showMore = false;


  // 查询模块
  const [isQueryReportCashFlowShow, setIsQueryReportCashFlowShow] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryReportCashFlowForm] = Form.useForm();
  const [reportCashFlowQueryParams, setReportCashFlowQueryParams] = useState<ListReportCashFlowsRequest>();

  // 用 useReportCashFlows 获取菜单列表数据
  const {
    reportCashFlows: reportCashFlowListDataSource,
    total,
    isLoading: isReportCashFlowListLoading,
    mutateReportCashFlows,
  } = useReportCashFlows({
    ...reportCashFlowQueryParams,
    ...createPaginationRequest(current, pageSize),
  });

  const onQueryReportCashFlowShow = () => {
    setIsQueryReportCashFlowShow((prevState) => !prevState);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  const resetPagination = () => {
    setCurrent(1);
    setPageSize(10);
  };

  const handleQueryReportCashFlowReset = () => {
    resetPagination();
    queryReportCashFlowForm.resetFields();
    setReportCashFlowQueryParams(undefined)
    mutateReportCashFlows();
  };

  const onQueryReportCashFlowFinish = async () => {
    const values = queryReportCashFlowForm.getFieldsValue();
    const { create_time } = values;
    if (create_time) {
      const [startDate, endDate] = create_time;
      values.create_time = [
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
      ];
    }
    const queryReportCashFlow = values as ListReportCashFlowsRequest;
    const filteredQueryReportCashFlow = Object.fromEntries(
      Object.entries(queryReportCashFlow).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );
    resetPagination();
    setReportCashFlowQueryParams(filteredQueryReportCashFlow as ListReportCashFlowsRequest);
  };

  // 详情模块
  const [isReportCashFlowDetailDrawerVisible, setIsReportCashFlowDetailDrawerVisible] =
    useState(false);
  const [selectedReportCashFlowId, setSelectedReportCashFlowId] = useState<string | null>(null);

  const { reportCashFlow: reportCashFlowDetail, isLoading: isReportCashFlowDetailLoading } = useReportCashFlow(
    selectedReportCashFlowId || '',
  );

  const onReportCashFlowDetail = (reportCashFlow: ReportCashFlow) => {
    setSelectedReportCashFlowId(reportCashFlow.id);
    setIsReportCashFlowDetailDrawerVisible(true);
  };

  const onReportCashFlowDetailClose = () => {
    setSelectedReportCashFlowId(null);
    setIsReportCashFlowDetailDrawerVisible(false);
  };

  // 表格列信息
  const reportCashFlowColumns: ColumnsType<ReportCashFlow> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: ReportCashFlow, rowIndex: number) => rowIndex + 1,
      width: 60,
      fixed: 'left',
    },

    {
      title: "股票简称",
      dataIndex: "stock_name",
      key: "stock_name",
      render: (text) => (text ? text : "-"),
      width: 120,
      fixed: 'left',
      ellipsis: true,
    },
    {
      title: "股票代码",
      dataIndex: "stock_code",
      key: "stock_code",
      render: (text) => (text ? text : "-"),
      width: 120,
      ellipsis: true,
    },
    {
      title: "净现金流-净现金流",
      dataIndex: "net_cash_flow",
      key: "net_cash_flow",
      render: (text) => (text ? text : "-"),
      width: 140,
      ellipsis: true,
    },
    {
      title: "净现金流-同比增长",
      dataIndex: "net_cash_flow_yoy",
      key: "net_cash_flow_yoy",
      render: (text) => (text ? text : "-"),
      width: 140,
      ellipsis: true,
    },
    {
      title: "经营性现金流-现金流量净额",
      dataIndex: "operating_cash_flow",
      key: "operating_cash_flow",
      render: (text) => (text ? text : "-"),
      width: 140,
      ellipsis: true,
    },
    {
      title: "经营性现金流-净现金流占比",
      dataIndex: "operating_cash_flow_ratio",
      key: "operating_cash_flow_ratio",
      render: (text) => (text ? text : "-"),
      width: 140,
      ellipsis: true,
    },
    {
      title: "投资性现金流-现金流量净额",
      dataIndex: "investing_cash_flow",
      key: "investing_cash_flow",
      render: (text) => (text ? text : "-"),
      width: 140,
      ellipsis: true,
    },
    {
      title: "投资性现金流-净现金流占比",
      dataIndex: "investing_cash_flow_ratio",
      key: "investing_cash_flow_ratio",
      render: (text) => (text ? text : "-"),
      width: 140,
      ellipsis: true,
    },
    {
      title: "融资性现金流-现金流量净额",
      dataIndex: "financing_cash_flow",
      key: "financing_cash_flow",
      render: (text) => (text ? text : "-"),
      width: 140,
      ellipsis: true,
    },
    {
      title: "融资性现金流-净现金流占比",
      dataIndex: "financing_cash_flow_ratio",
      key: "financing_cash_flow_ratio",
      render: (text) => (text ? text : "-"),
      width: 140,
      ellipsis: true,
    },

    {
      title: "季度",
      dataIndex: "quarter",
      key: "quarter",
      width: 60,
    },
    {
      title: "年份",
      dataIndex: "year",
      key: "year",
      fixed: 'right',
      width: 80,
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
            onClick={() => onReportCashFlowDetail(record)}
          >
            <Eye className="w-3 h-3" />
            详情
          </button>
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={() => onUpdateReportCashFlow(record)}
          >
            <PenLine className="w-3 h-3" />
            编辑
          </button>
          <Popconfirm
            title="确认删除"
            description="确定删除吗? 删除后将无法找回"
            onConfirm={() => handleDeleteReportCashFlow(record)}
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
    reportCashFlowColumns.map((col) => col.key),
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
  const filteredReportCashFlowColumns = reportCashFlowColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 新增模块
  const [isCreateReportCashFlowModalVisible, setIsCreateReportCashFlowModalVisible] =
    useState(false);
  const [isCreateReportCashFlowLoading, setIsCreateReportCashFlowLoading] = useState(false);
  const [createReportCashFlowForm] = Form.useForm();

  const onCreateReportCashFlow = () => {
    setIsCreateReportCashFlowModalVisible(true);
  };
  const handleCreateReportCashFlowCancel = () => {
    createReportCashFlowForm.resetFields();
    setIsCreateReportCashFlowModalVisible(false);
  };
  const handleCreateReportCashFlowFinish = async (data: CreateReportCashFlow) => {
    setIsCreateReportCashFlowLoading(true);
    try {
      await createReportCashFlow({ reportCashFlow: data });
      message.success('新增成功');
      createReportCashFlowForm.resetFields();
      setIsCreateReportCashFlowModalVisible(false);
      mutateReportCashFlows();
    } finally {
      setIsCreateReportCashFlowLoading(false);
    }
  };

  // 单个删除模块
  const handleDeleteReportCashFlow = async (reportCashFlow: ReportCashFlow) => {
    await deleteReportCashFlow(reportCashFlow.id);
    message.success('删除成功');
    mutateReportCashFlows();
  };

  // 批量删除模块
  const [isBatchRemoveLoading, setIsBatchRemoveLoading] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<ReportCashFlow[]>([]);

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: ReportCashFlow[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleReportCashFlowBatchRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    try {
      setIsBatchRemoveLoading(true);
      await batchDeleteReportCashFlow({ ids: selectedRows.map((row) => row.id) });
      message.success('删除成功');
      mutateReportCashFlows();
      resetSelectedRows();
    } finally {
      setIsBatchRemoveLoading(false);
    }
  };

  const handleReportCashFlowBatchRemoveCancel = async () => {
    resetSelectedRows();
    message.info('操作已取消');
  };

  // 单个更新模块
  const [isUpdateReportCashFlowModalVisible, setIsUpdateReportCashFlowModalVisible] =
    useState<boolean>(false);
  const [isUpdateReportCashFlowLoading, setIsUpdateReportCashFlowLoading] =
    useState<boolean>(false);
  const [updateReportCashFlowForm] = Form.useForm();

  const onUpdateReportCashFlow = (reportCashFlow: ReportCashFlow) => {
    setIsUpdateReportCashFlowModalVisible(true);
    setSelectedRowKeys([reportCashFlow.id]);
    setSelectedRows([reportCashFlow]);
    updateReportCashFlowForm.setFieldsValue({ ...reportCashFlow });
  };

  const handleUpdateReportCashFlowCancel = () => {
    resetSelectedRows();
    updateReportCashFlowForm.resetFields();
    setIsUpdateReportCashFlowModalVisible(false);
  };

  const handleUpdateReportCashFlowFinish = async () => {
    const updateReportCashFlowData =
      (await updateReportCashFlowForm.validateFields()) as UpdateReportCashFlow;
    const req = { ...updateReportCashFlowData, id: selectedRows[0].id };
    setIsUpdateReportCashFlowLoading(true);
    try {
      await updateReportCashFlow({ reportCashFlow: req });
      updateReportCashFlowForm.resetFields();
      message.success('更新成功');
      mutateReportCashFlows();
      resetSelectedRows();
    } finally {
      setIsUpdateReportCashFlowLoading(false);
      setIsUpdateReportCashFlowModalVisible(false);
    }
  };

  // 批量更新模块
  const onReportCashFlowBatchModify = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateReportCashFlowModalVisible(true);
      updateReportCashFlowForm.setFieldsValue({ ...selectedRows[0] });
    } else {
      setIsBatchUpdateReportCashFlowsModalVisible(true);
      batchUpdateReportCashFlowsForm.resetFields();
    }
  };
  const [isBatchUpdateReportCashFlowsModalVisible, setIsBatchUpdateReportCashFlowsModalVisible] =
    useState<boolean>(false);
  const [isBatchUpdateReportCashFlowsLoading, setIsBatchUpdateReportCashFlowsLoading] =
    useState<boolean>(false);
  const [batchUpdateReportCashFlowsForm] = Form.useForm();

  const handleBatchUpdateReportCashFlowsCancel = async () => {
    batchUpdateReportCashFlowsForm.resetFields();
    setIsBatchUpdateReportCashFlowsModalVisible(false);
    resetSelectedRows();
    message.info('操作已取消');
  };

  const handleBatchUpdateReportCashFlowsFinish = async () => {
    const reportCashFlowBatchModify =
      (await batchUpdateReportCashFlowsForm.validateFields()) as BatchUpdateReportCashFlow;
    setIsBatchUpdateReportCashFlowsLoading(true);
    if (selectedRows === null || selectedRows.length === 0) {
      message.warning('请选择要更新的项目');
      return;
    }
    try {
      const ids = selectedRows.map((row) => row.id);
      await batchUpdateReportCashFlows({ ids: ids, reportCashFlow: reportCashFlowBatchModify });
      batchUpdateReportCashFlowsForm.resetFields();
      message.success('更新成功');
      mutateReportCashFlows();
      resetSelectedRows();
    } finally {
      setIsBatchUpdateReportCashFlowsLoading(false);
      setIsBatchUpdateReportCashFlowsModalVisible(false);
    }
  };

  // 导入模块
  const [isImportReportCashFlowModalVisible, setIsImportReportCashFlowModalVisible] =
    useState<boolean>(false);
  const [isImportReportCashFlowLoading, setIsImportReportCashFlowLoading] =
    useState<boolean>(false);
  const [createReportCashFlowList, setCreateReportCashFlowList] = useState<CreateReportCashFlow[]>([]);

  const onImportReportCashFlow = () => {
    setIsImportReportCashFlowModalVisible(true);
  };

  const handleImportReportCashFlowCancel = () => {
    setIsImportReportCashFlowModalVisible(false);
  };

  const onImportReportCashFlowFinish = async (fileList: RcFile[]) => {
    try {
      setIsImportReportCashFlowLoading(true);
      const createReportCashFlowList = await importReportCashFlow({ file: fileList[0] });
      setCreateReportCashFlowList(createReportCashFlowList.reportCashFlows);
      return createReportCashFlowList;
    } finally {
      setIsImportReportCashFlowLoading(false);
    }
  };

  const handleImportReportCashFlow = async () => {
    setIsImportReportCashFlowLoading(true);
    try {
      await batchCreateReportCashFlows({ reportCashFlows: createReportCashFlowList });
      message.success('导入成功');
      setIsImportReportCashFlowModalVisible(false);
      mutateReportCashFlows();
    } finally {
      setIsImportReportCashFlowLoading(false);
      setCreateReportCashFlowList([]);
    }
  };

  // 导出模块
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const onReportCashFlowExport = async () => {
    if (selectedRowKeys === null || selectedRowKeys.length === 0) {
      message.warning('请先选择导出的项目');
      return;
    }
    try {
      setIsExportLoading(true);
      await exportReportCashFlow({ ids: selectedRows.map((row) => row.id) });
      resetSelectedRows();
    } finally {
      setIsExportLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryReportCashFlowShow}>
        <QueryReportCashFlowComponent
          onQueryReportCashFlowFinish={onQueryReportCashFlowFinish}
          onQueryReportCashFlowReset={handleQueryReportCashFlowReset}
          onQueryReportCashFlowForm={queryReportCashFlowForm}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={onCreateReportCashFlow}
          onImport={onImportReportCashFlow}
          onExport={onReportCashFlowExport}
          onBatchModify={onReportCashFlowBatchModify}
          onConfirmBatchRemove={handleReportCashFlowBatchRemove}
          onConfirmBatchRemoveCancel={handleReportCashFlowBatchRemoveCancel}
          isQueryShow={isQueryReportCashFlowShow}
          onQueryShow={onQueryReportCashFlowShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={isBatchRemoveLoading}
          isExportLoading={isExportLoading}
          rawColumns={reportCashFlowColumns as any[]}
          visibleColumns={visibleColumns as any[]}
          onToggleColumnVisibility={onToggleColumnVisibility}
          actionConfig={actionConfig}
          className="mb-2 mt-4"
        />
      </div>
      <div>
        <PaginatedTable<ReportCashFlow>
          columns={filteredReportCashFlowColumns}
          dataSource={reportCashFlowListDataSource || []}
          total={total || 0}
          current={current}
          page_size={pageSize}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleSelectionChange}
          selectedRowKeys={selectedRowKeys}
          rowKey="id"
          loading={isReportCashFlowListLoading}
          scroll={{ x: 1500 }}
        />
      </div>
      <div>
        <div>
          <CreateReportCashFlowComponent
            isCreateReportCashFlowModalVisible={isCreateReportCashFlowModalVisible}
            onCreateReportCashFlowCancel={handleCreateReportCashFlowCancel}
            onCreateReportCashFlowFinish={handleCreateReportCashFlowFinish}
            isCreateReportCashFlowLoading={isCreateReportCashFlowLoading}
            createReportCashFlowForm={createReportCashFlowForm}
          />
        </div>
        <div>
          <ReportCashFlowDetailComponent
            isReportCashFlowDetailDrawerVisible={isReportCashFlowDetailDrawerVisible}
            onReportCashFlowDetailClose={onReportCashFlowDetailClose}
            reportCashFlowDetail={reportCashFlowDetail}
            loading={isReportCashFlowDetailLoading}
          />
        </div>
        <div>
          <UpdateReportCashFlowComponent
            isUpdateReportCashFlowModalVisible={isUpdateReportCashFlowModalVisible}
            onUpdateReportCashFlowCancel={handleUpdateReportCashFlowCancel}
            onUpdateReportCashFlowFinish={handleUpdateReportCashFlowFinish}
            isUpdateReportCashFlowLoading={isUpdateReportCashFlowLoading}
            updateReportCashFlowForm={updateReportCashFlowForm}
          />
        </div>
        <div>
          <BatchUpdateReportCashFlowComponent
            isBatchUpdateReportCashFlowsModalVisible={isBatchUpdateReportCashFlowsModalVisible}
            onBatchUpdateReportCashFlowsCancel={handleBatchUpdateReportCashFlowsCancel}
            onBatchUpdateReportCashFlowsFinish={handleBatchUpdateReportCashFlowsFinish}
            isBatchUpdateReportCashFlowsLoading={isBatchUpdateReportCashFlowsLoading}
            batchUpdateReportCashFlowsForm={batchUpdateReportCashFlowsForm}
          />
        </div>

        <div>
          <ImportReportCashFlowComponent
            isImportReportCashFlowModalVisible={isImportReportCashFlowModalVisible}
            isImportReportCashFlowLoading={isImportReportCashFlowLoading}
            onImportReportCashFlowFinish={onImportReportCashFlowFinish}
            onImportReportCashFlowCancel={handleImportReportCashFlowCancel}
            handleImportReportCashFlow={handleImportReportCashFlow}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportCashFlowPage;