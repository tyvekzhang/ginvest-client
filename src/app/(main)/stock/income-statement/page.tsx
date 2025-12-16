// SPDX-License-Identifier: MIT
'use client';

import ActionButtonComponent from '@/components/base/action-button';
import { PaginatedTable } from '@/components/base/paginated-table';
import TransitionWrapper from '@/components/base/transition-wrapper';
import {
  batchCreateReportIncomeStatements,
  batchDeleteReportIncomeStatement,
  batchUpdateReportIncomeStatements,
  createReportIncomeStatement,
  deleteReportIncomeStatement,
  exportReportIncomeStatement,
  importReportIncomeStatement,
  updateReportIncomeStatement,
  useReportIncomeStatement,
  useReportIncomeStatements,
} from '@/service/report-income-statement';
import { createPaginationRequest } from '@/types';
import {
  BatchUpdateReportIncomeStatement,
  CreateReportIncomeStatement,
  ListReportIncomeStatementsRequest,
  ReportIncomeStatement,
  UpdateReportIncomeStatement,
} from '@/types/report-income-statement';
import { Form, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Eye, MoreHorizontal, PenLine, Trash2 } from 'lucide-react';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';
import BatchUpdateReportIncomeStatementComponent from './components/batch-update-report-income-statement';
import CreateReportIncomeStatementComponent from './components/create-report-income-statement';
import ImportReportIncomeStatementComponent from './components/import-report-income-statement';
import ReportIncomeStatementDetailComponent from './components/report-income-statement-detail';
import QueryReportIncomeStatementComponent from './components/query-report-income-statement';
import UpdateReportIncomeStatementComponent from './components/update-report-income-statement';

const ReportIncomeStatementPage: React.FC = () => {
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
  const [isQueryReportIncomeStatementShow, setIsQueryReportIncomeStatementShow] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryReportIncomeStatementForm] = Form.useForm();
  const [reportIncomeStatementQueryParams, setReportIncomeStatementQueryParams] = useState<ListReportIncomeStatementsRequest>();

  // 用 useReportIncomeStatements 获取菜单列表数据
  const {
    reportIncomeStatements: reportIncomeStatementListDataSource,
    total,
    isLoading: isReportIncomeStatementListLoading,
    mutateReportIncomeStatements,
  } = useReportIncomeStatements({
    ...reportIncomeStatementQueryParams,
    ...createPaginationRequest(current, pageSize),
  });

  const onQueryReportIncomeStatementShow = () => {
    setIsQueryReportIncomeStatementShow((prevState) => !prevState);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  const resetPagination = () => {
    setCurrent(1);
    setPageSize(10);
  };

  const handleQueryReportIncomeStatementReset = () => {
    resetPagination();
    queryReportIncomeStatementForm.resetFields();
    setReportIncomeStatementQueryParams(undefined)
    mutateReportIncomeStatements();
  };

  const onQueryReportIncomeStatementFinish = async () => {
    const values = queryReportIncomeStatementForm.getFieldsValue();
    const { create_time } = values;
    if (create_time) {
      const [startDate, endDate] = create_time;
      values.create_time = [
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
      ];
    }
    const queryReportIncomeStatement = values as ListReportIncomeStatementsRequest;
    const filteredQueryReportIncomeStatement = Object.fromEntries(
      Object.entries(queryReportIncomeStatement).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );
    resetPagination();
    setReportIncomeStatementQueryParams(filteredQueryReportIncomeStatement as ListReportIncomeStatementsRequest);
  };

  // 详情模块
  const [isReportIncomeStatementDetailDrawerVisible, setIsReportIncomeStatementDetailDrawerVisible] =
    useState(false);
  const [selectedReportIncomeStatementId, setSelectedReportIncomeStatementId] = useState<string | null>(null);

  const { reportIncomeStatement: reportIncomeStatementDetail, isLoading: isReportIncomeStatementDetailLoading } = useReportIncomeStatement(
    selectedReportIncomeStatementId || '',
  );

  const onReportIncomeStatementDetail = (reportIncomeStatement: ReportIncomeStatement) => {
    setSelectedReportIncomeStatementId(reportIncomeStatement.id);
    setIsReportIncomeStatementDetailDrawerVisible(true);
  };

  const onReportIncomeStatementDetailClose = () => {
    setSelectedReportIncomeStatementId(null);
    setIsReportIncomeStatementDetailDrawerVisible(false);
  };

  // 表格列信息
  const reportIncomeStatementColumns: ColumnsType<ReportIncomeStatement> = [
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
      render: (_: number, _record: ReportIncomeStatement, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "股票代码",
      dataIndex: "stock_code",
      key: "stock_code",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "股票简称",
      dataIndex: "stock_name",
      key: "stock_name",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "净利润",
      dataIndex: "net_profit",
      key: "net_profit",
      width: "6%",
    },
    {
      title: "净利润同比",
      dataIndex: "net_profit_yoy",
      key: "net_profit_yoy",
      width: "6%",
    },
    {
      title: "营业总收入",
      dataIndex: "total_operating_income",
      key: "total_operating_income",
      width: "6%",
    },
    {
      title: "营业总收入同比",
      dataIndex: "total_operating_income_yoy",
      key: "total_operating_income_yoy",
      width: "6%",
    },
    {
      title: "年份",
      dataIndex: "year",
      key: "year",
      width: "6%",
    },
    {
      title: "季度",
      dataIndex: "quarter",
      key: "quarter",
      width: "6%",
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex gap-2 items-center justify-center">
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={ () => onReportIncomeStatementDetail(record)}
          >
            <Eye className="w-3 h-3" />
            详情
          </button>
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={ () => onUpdateReportIncomeStatement(record)}
          >
            <PenLine className="w-3 h-3" />
            编辑
          </button>
          <Popconfirm
            title="确认删除"
            description="确定删除吗? 删除后将无法找回"
            onConfirm={() => handleDeleteReportIncomeStatement(record)}
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
    reportIncomeStatementColumns.map((col) => col.key),
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
  const filteredReportIncomeStatementColumns = reportIncomeStatementColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 新增模块
  const [isCreateReportIncomeStatementModalVisible, setIsCreateReportIncomeStatementModalVisible] =
    useState(false);
  const [isCreateReportIncomeStatementLoading, setIsCreateReportIncomeStatementLoading] = useState(false);
  const [createReportIncomeStatementForm] = Form.useForm();

  const onCreateReportIncomeStatement = () => {
    setIsCreateReportIncomeStatementModalVisible(true);
  };
  const handleCreateReportIncomeStatementCancel = () => {
    createReportIncomeStatementForm.resetFields();
    setIsCreateReportIncomeStatementModalVisible(false);
  };
  const handleCreateReportIncomeStatementFinish = async (data: CreateReportIncomeStatement) => {
    setIsCreateReportIncomeStatementLoading(true);
    try {
      await createReportIncomeStatement({ reportIncomeStatement: data });
      message.success('新增成功');
      createReportIncomeStatementForm.resetFields();
      setIsCreateReportIncomeStatementModalVisible(false);
      mutateReportIncomeStatements();
    } finally {
      setIsCreateReportIncomeStatementLoading(false);
    }
  };

  // 单个删除模块
  const handleDeleteReportIncomeStatement = async (reportIncomeStatement: ReportIncomeStatement) => {
    await deleteReportIncomeStatement(reportIncomeStatement.id);
    message.success('删除成功');
    mutateReportIncomeStatements();
  };

  // 批量删除模块
  const [isBatchRemoveLoading, setIsBatchRemoveLoading] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<ReportIncomeStatement[]>([]);

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: ReportIncomeStatement[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleReportIncomeStatementBatchRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    try {
      setIsBatchRemoveLoading(true);
      await batchDeleteReportIncomeStatement({ ids: selectedRows.map((row) => row.id) });
      message.success('删除成功');
      mutateReportIncomeStatements();
      resetSelectedRows();
    } finally {
      setIsBatchRemoveLoading(false);
    }
  };

  const handleReportIncomeStatementBatchRemoveCancel = async () => {
    resetSelectedRows();
    message.info('操作已取消');
  };

  // 单个更新模块
  const [isUpdateReportIncomeStatementModalVisible, setIsUpdateReportIncomeStatementModalVisible] =
    useState<boolean>(false);
  const [isUpdateReportIncomeStatementLoading, setIsUpdateReportIncomeStatementLoading] =
    useState<boolean>(false);
  const [updateReportIncomeStatementForm] = Form.useForm();

  const onUpdateReportIncomeStatement = (reportIncomeStatement: ReportIncomeStatement) => {
    setIsUpdateReportIncomeStatementModalVisible(true);
    setSelectedRowKeys([reportIncomeStatement.id]);
    setSelectedRows([reportIncomeStatement]);
    updateReportIncomeStatementForm.setFieldsValue({ ...reportIncomeStatement });
  };

  const handleUpdateReportIncomeStatementCancel = () => {
    resetSelectedRows();
    updateReportIncomeStatementForm.resetFields();
    setIsUpdateReportIncomeStatementModalVisible(false);
  };

  const handleUpdateReportIncomeStatementFinish = async () => {
    const updateReportIncomeStatementData =
      (await updateReportIncomeStatementForm.validateFields()) as UpdateReportIncomeStatement;
    const req = { ...updateReportIncomeStatementData, id: selectedRows[0].id };
    setIsUpdateReportIncomeStatementLoading(true);
    try {
      await updateReportIncomeStatement({ reportIncomeStatement: req });
      updateReportIncomeStatementForm.resetFields();
      message.success('更新成功');
      mutateReportIncomeStatements();
      resetSelectedRows();
    } finally {
      setIsUpdateReportIncomeStatementLoading(false);
      setIsUpdateReportIncomeStatementModalVisible(false);
    }
  };

  // 批量更新模块
  const onReportIncomeStatementBatchModify = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateReportIncomeStatementModalVisible(true);
      updateReportIncomeStatementForm.setFieldsValue({ ...selectedRows[0] });
    } else {
      setIsBatchUpdateReportIncomeStatementsModalVisible(true);
      batchUpdateReportIncomeStatementsForm.resetFields();
    }
  };
  const [isBatchUpdateReportIncomeStatementsModalVisible, setIsBatchUpdateReportIncomeStatementsModalVisible] =
    useState<boolean>(false);
  const [isBatchUpdateReportIncomeStatementsLoading, setIsBatchUpdateReportIncomeStatementsLoading] =
    useState<boolean>(false);
  const [batchUpdateReportIncomeStatementsForm] = Form.useForm();

  const handleBatchUpdateReportIncomeStatementsCancel = async () => {
    batchUpdateReportIncomeStatementsForm.resetFields();
    setIsBatchUpdateReportIncomeStatementsModalVisible(false);
    resetSelectedRows();
    message.info('操作已取消');
  };

  const handleBatchUpdateReportIncomeStatementsFinish = async () => {
    const reportIncomeStatementBatchModify =
      (await batchUpdateReportIncomeStatementsForm.validateFields()) as BatchUpdateReportIncomeStatement;
    setIsBatchUpdateReportIncomeStatementsLoading(true);
    if (selectedRows === null || selectedRows.length === 0) {
      message.warning('请选择要更新的项目');
      return;
    }
    try {
      const ids = selectedRows.map((row) => row.id);
      await batchUpdateReportIncomeStatements({ ids: ids, reportIncomeStatement: reportIncomeStatementBatchModify });
      batchUpdateReportIncomeStatementsForm.resetFields();
      message.success('更新成功');
      mutateReportIncomeStatements();
      resetSelectedRows();
    } finally {
      setIsBatchUpdateReportIncomeStatementsLoading(false);
      setIsBatchUpdateReportIncomeStatementsModalVisible(false);
    }
  };

  // 导入模块
  const [isImportReportIncomeStatementModalVisible, setIsImportReportIncomeStatementModalVisible] =
    useState<boolean>(false);
  const [isImportReportIncomeStatementLoading, setIsImportReportIncomeStatementLoading] =
    useState<boolean>(false);
  const [createReportIncomeStatementList, setCreateReportIncomeStatementList] = useState<CreateReportIncomeStatement[]>([]);

  const onImportReportIncomeStatement = () => {
    setIsImportReportIncomeStatementModalVisible(true);
  };

  const handleImportReportIncomeStatementCancel = () => {
    setIsImportReportIncomeStatementModalVisible(false);
  };

  const onImportReportIncomeStatementFinish = async (fileList: RcFile[]) => {
    try {
      setIsImportReportIncomeStatementLoading(true);
      const createReportIncomeStatementList = await importReportIncomeStatement({ file: fileList[0] });
      setCreateReportIncomeStatementList(createReportIncomeStatementList.reportIncomeStatements);
      return createReportIncomeStatementList;
    } finally {
      setIsImportReportIncomeStatementLoading(false);
    }
  };

  const handleImportReportIncomeStatement = async () => {
    setIsImportReportIncomeStatementLoading(true);
    try {
      await batchCreateReportIncomeStatements({ reportIncomeStatements: createReportIncomeStatementList });
      message.success('导入成功');
      setIsImportReportIncomeStatementModalVisible(false);
      mutateReportIncomeStatements();
    } finally {
      setIsImportReportIncomeStatementLoading(false);
      setCreateReportIncomeStatementList([]);
    }
  };

  // 导出模块
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const onReportIncomeStatementExport = async () => {
    if (selectedRowKeys === null || selectedRowKeys.length === 0) {
      message.warning('请先选择导出的项目');
      return;
    }
    try {
      setIsExportLoading(true);
      await exportReportIncomeStatement({ ids: selectedRows.map((row) => row.id) });
      resetSelectedRows();
    } finally {
      setIsExportLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryReportIncomeStatementShow}>
        <QueryReportIncomeStatementComponent
          onQueryReportIncomeStatementFinish={onQueryReportIncomeStatementFinish}
          onQueryReportIncomeStatementReset={handleQueryReportIncomeStatementReset}
          onQueryReportIncomeStatementForm={queryReportIncomeStatementForm}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={onCreateReportIncomeStatement }
          onImport={onImportReportIncomeStatement }
          onExport={onReportIncomeStatementExport}
          onBatchModify={onReportIncomeStatementBatchModify}
          onConfirmBatchRemove={handleReportIncomeStatementBatchRemove}
          onConfirmBatchRemoveCancel={handleReportIncomeStatementBatchRemoveCancel}
          isQueryShow={isQueryReportIncomeStatementShow}
          onQueryShow={onQueryReportIncomeStatementShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={isBatchRemoveLoading}
          isExportLoading={isExportLoading}
          rawColumns={ reportIncomeStatementColumns as any[]}
          visibleColumns={visibleColumns as any[]}
          onToggleColumnVisibility={onToggleColumnVisibility}
          actionConfig={actionConfig}
          className="mb-2 mt-4"
        />
      </div>
      <div>
        <PaginatedTable<ReportIncomeStatement>
          columns={filteredReportIncomeStatementColumns}
          dataSource={ reportIncomeStatementListDataSource || []}
          total={total || 0}
          current={current}
          page_size={pageSize}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleSelectionChange}
          selectedRowKeys={selectedRowKeys}
          rowKey="id"
          loading={isReportIncomeStatementListLoading}
        />
      </div>
      <div>
        <div>
          <CreateReportIncomeStatementComponent
            isCreateReportIncomeStatementModalVisible={isCreateReportIncomeStatementModalVisible}
            onCreateReportIncomeStatementCancel={handleCreateReportIncomeStatementCancel}
            onCreateReportIncomeStatementFinish={handleCreateReportIncomeStatementFinish}
            isCreateReportIncomeStatementLoading={isCreateReportIncomeStatementLoading}
            createReportIncomeStatementForm={createReportIncomeStatementForm}
          />
        </div>
        <div>
          <ReportIncomeStatementDetailComponent
            isReportIncomeStatementDetailDrawerVisible={isReportIncomeStatementDetailDrawerVisible}
            onReportIncomeStatementDetailClose={onReportIncomeStatementDetailClose}
            reportIncomeStatementDetail={ reportIncomeStatementDetail}
            loading={isReportIncomeStatementDetailLoading}
          />
        </div>
        <div>
          <UpdateReportIncomeStatementComponent
            isUpdateReportIncomeStatementModalVisible={isUpdateReportIncomeStatementModalVisible}
            onUpdateReportIncomeStatementCancel={handleUpdateReportIncomeStatementCancel}
            onUpdateReportIncomeStatementFinish={handleUpdateReportIncomeStatementFinish}
            isUpdateReportIncomeStatementLoading={isUpdateReportIncomeStatementLoading}
            updateReportIncomeStatementForm={updateReportIncomeStatementForm}
          />
        </div>
        <div>
          <BatchUpdateReportIncomeStatementComponent
            isBatchUpdateReportIncomeStatementsModalVisible={isBatchUpdateReportIncomeStatementsModalVisible}
            onBatchUpdateReportIncomeStatementsCancel={handleBatchUpdateReportIncomeStatementsCancel}
            onBatchUpdateReportIncomeStatementsFinish={handleBatchUpdateReportIncomeStatementsFinish}
            isBatchUpdateReportIncomeStatementsLoading={isBatchUpdateReportIncomeStatementsLoading}
            batchUpdateReportIncomeStatementsForm={ batchUpdateReportIncomeStatementsForm}
          />
        </div>

        <div>
          <ImportReportIncomeStatementComponent
            isImportReportIncomeStatementModalVisible={isImportReportIncomeStatementModalVisible}
            isImportReportIncomeStatementLoading={isImportReportIncomeStatementLoading}
            onImportReportIncomeStatementFinish={onImportReportIncomeStatementFinish}
            onImportReportIncomeStatementCancel={handleImportReportIncomeStatementCancel}
            handleImportReportIncomeStatement={handleImportReportIncomeStatement }
          />
        </div>
      </div>
    </div>
  );
};

export default ReportIncomeStatementPage;