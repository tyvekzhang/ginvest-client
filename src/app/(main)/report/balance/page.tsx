// SPDX-License-Identifier: MIT
'use client';

import ActionButtonComponent from '@/components/base/action-button';
import { PaginatedTable } from '@/components/base/paginated-table';
import TransitionWrapper from '@/components/base/transition-wrapper';
import {
  batchCreateReportBalanceSheets,
  batchDeleteReportBalanceSheet,
  batchUpdateReportBalanceSheets,
  createReportBalanceSheet,
  deleteReportBalanceSheet,
  exportReportBalanceSheet,
  importReportBalanceSheet,
  updateReportBalanceSheet,
  useReportBalanceSheet,
  useReportBalanceSheets,
} from '@/service/report-balance-sheet';
import { createPaginationRequest } from '@/types';
import {
  BatchUpdateReportBalanceSheet,
  CreateReportBalanceSheet,
  ListReportBalanceSheetsRequest,
  ReportBalanceSheet,
  UpdateReportBalanceSheet,
} from '@/types/report-balance-sheet';
import { Form, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Eye, MoreHorizontal, PenLine, Trash2 } from 'lucide-react';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';
import BatchUpdateReportBalanceSheetComponent from './components/batch-update-report-balance-sheet';
import CreateReportBalanceSheetComponent from './components/create-report-balance-sheet';
import ImportReportBalanceSheetComponent from './components/import-report-balance-sheet';
import ReportBalanceSheetDetailComponent from './components/report-balance-sheet-detail';
import QueryReportBalanceSheetComponent from './components/query-report-balance-sheet';
import UpdateReportBalanceSheetComponent from './components/update-report-balance-sheet';
import { formatAccounting } from '@/utils/math-util';

const ReportBalanceSheetPage: React.FC = () => {
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
  const [isQueryReportBalanceSheetShow, setIsQueryReportBalanceSheetShow] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryReportBalanceSheetForm] = Form.useForm();
  const [reportBalanceSheetQueryParams, setReportBalanceSheetQueryParams] = useState<ListReportBalanceSheetsRequest>();

  // 用 useReportBalanceSheets 获取菜单列表数据
  const {
    reportBalanceSheets: reportBalanceSheetListDataSource,
    total,
    isLoading: isReportBalanceSheetListLoading,
    mutateReportBalanceSheets,
  } = useReportBalanceSheets({
    ...reportBalanceSheetQueryParams,
    ...createPaginationRequest(current, pageSize),
  });

  const onQueryReportBalanceSheetShow = () => {
    setIsQueryReportBalanceSheetShow((prevState) => !prevState);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  const resetPagination = () => {
    setCurrent(1);
    setPageSize(10);
  };

  const handleQueryReportBalanceSheetReset = () => {
    resetPagination();
    queryReportBalanceSheetForm.resetFields();
    setReportBalanceSheetQueryParams(undefined)
    mutateReportBalanceSheets();
  };

  const onQueryReportBalanceSheetFinish = async () => {
    const values = queryReportBalanceSheetForm.getFieldsValue();
    const { create_time } = values;
    if (create_time) {
      const [startDate, endDate] = create_time;
      values.create_time = [
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
      ];
    }
    const { year } = values
    if (year) {
      values.year = year.year()
    }
    const queryReportBalanceSheet = values as ListReportBalanceSheetsRequest;
    const filteredQueryReportBalanceSheet = Object.fromEntries(
      Object.entries(queryReportBalanceSheet).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );
    resetPagination();
    setReportBalanceSheetQueryParams(filteredQueryReportBalanceSheet as ListReportBalanceSheetsRequest);
  };

  // 详情模块
  const [isReportBalanceSheetDetailDrawerVisible, setIsReportBalanceSheetDetailDrawerVisible] =
    useState(false);
  const [selectedReportBalanceSheetId, setSelectedReportBalanceSheetId] = useState<string | null>(null);

  const { reportBalanceSheet: reportBalanceSheetDetail, isLoading: isReportBalanceSheetDetailLoading } = useReportBalanceSheet(
    selectedReportBalanceSheetId || '',
  );

  const onReportBalanceSheetDetail = (reportBalanceSheet: ReportBalanceSheet) => {
    setSelectedReportBalanceSheetId(reportBalanceSheet.id);
    setIsReportBalanceSheetDetailDrawerVisible(true);
  };

  const onReportBalanceSheetDetailClose = () => {
    setSelectedReportBalanceSheetId(null);
    setIsReportBalanceSheetDetailDrawerVisible(false);
  };

  // 表格列信息
  const reportBalanceSheetColumns: ColumnsType<ReportBalanceSheet> = [
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
      render: (_: number, _record: ReportBalanceSheet, rowIndex: number) => rowIndex + 1,
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
      title: "资产-货币资金(元)",
      dataIndex: "asset_cash",
      key: "asset_cash",
      render: (text) => formatAccounting(text),
      width: 150,
      ellipsis: true,
      align: 'right'
    },
    {
      title: "资产-应收账款(元)",
      dataIndex: "asset_receivables",
      key: "asset_receivables",
      render: (text) => formatAccounting(text),
      ellipsis: true,
      width: 150,
      align: 'right'
    },
    {
      title: "资产-存货(元)",
      dataIndex: "asset_inventory",
      key: "asset_inventory",
      render: (text) => formatAccounting(text),
      width: 140,
      align: 'right',
      ellipsis: true,
    },
    {
      title: "资产-总资产(元)",
      dataIndex: "asset_total",
      key: "asset_total",
      render: (text) => formatAccounting(text),
      width: 140,
      ellipsis: true,
      align: 'right'
    },
    {
      title: "总资产同比(%)",
      dataIndex: "asset_total_yoy",
      key: "asset_total_yoy",
      // 自动为百分比数值添加符号
      render: (text) => (text !== null && text !== undefined ? `${text}` : "-"),
      width: 150,
      ellipsis: true,
      align: 'right'
    },
    {
      title: "负债-应付账款(元)",
      dataIndex: "liability_payables",
      key: "liability_payables",
      render: (text) => formatAccounting(text),
      width: 150,
      ellipsis: true,
      align: 'right'
    },
    {
      title: "负债-总负债(元)",
      dataIndex: "liability_total",
      key: "liability_total",
      render: (text) => formatAccounting(text),
      width: 140,
      ellipsis: true,
      align: 'right'
    },
    {
      title: "负债-预收账款(元)",
      dataIndex: "liability_advance_receipts",
      key: "liability_advance_receipts",
      render: (text) => formatAccounting(text),
      width: 150,
      ellipsis: true,
      align: 'right'
    },
    {
      title: "总负债同比(%)",
      dataIndex: "liability_total_yoy",
      key: "liability_total_yoy",
      render: (text) => (text !== null && text !== undefined ? `${text}` : "-"),
      width: 150,
      ellipsis: true,
      align: 'right'
    },
    {
      title: "资产负债率(%)",
      dataIndex: "asset_liability_ratio",
      key: "asset_liability_ratio",
      render: (text) => (text !== null && text !== undefined ? `${text}` : "-"),
      width: 140,
      ellipsis: true,
      align: 'right'
    },
    {
      title: "股东权益合计(元)",
      dataIndex: "shareholder_equity",
      key: "shareholder_equity",
      render: (text) => formatAccounting(text),
      width: 150,
      ellipsis: true,
      align: 'right'
    },
    {
      title: "年份",
      dataIndex: "year",
      key: "year",
      fixed: 'right',
      width: 80,
    },
    {
      title: "季度",
      dataIndex: "quarter",
      key: "quarter",
      width: 60,
      fixed: 'right',
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      fixed: 'right',
      width: 80,
      render: (_, record) => (
        <div className="flex gap-2 items-center justify-center">
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={() => onReportBalanceSheetDetail(record)}
          >
            <Eye className="w-3 h-3" />
            详情
          </button>
        </div>
      ),
    },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    reportBalanceSheetColumns.map((col) => col.key),
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
  const filteredReportBalanceSheetColumns = reportBalanceSheetColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 新增模块
  const [isCreateReportBalanceSheetModalVisible, setIsCreateReportBalanceSheetModalVisible] =
    useState(false);
  const [isCreateReportBalanceSheetLoading, setIsCreateReportBalanceSheetLoading] = useState(false);
  const [createReportBalanceSheetForm] = Form.useForm();

  const onCreateReportBalanceSheet = () => {
    setIsCreateReportBalanceSheetModalVisible(true);
  };
  const handleCreateReportBalanceSheetCancel = () => {
    createReportBalanceSheetForm.resetFields();
    setIsCreateReportBalanceSheetModalVisible(false);
  };
  const handleCreateReportBalanceSheetFinish = async (data: CreateReportBalanceSheet) => {
    setIsCreateReportBalanceSheetLoading(true);
    try {
      await createReportBalanceSheet({ reportBalanceSheet: data });
      message.success('新增成功');
      createReportBalanceSheetForm.resetFields();
      setIsCreateReportBalanceSheetModalVisible(false);
      mutateReportBalanceSheets();
    } finally {
      setIsCreateReportBalanceSheetLoading(false);
    }
  };

  // 单个删除模块
  const handleDeleteReportBalanceSheet = async (reportBalanceSheet: ReportBalanceSheet) => {
    await deleteReportBalanceSheet(reportBalanceSheet.id);
    message.success('删除成功');
    mutateReportBalanceSheets();
  };

  // 批量删除模块
  const [isBatchRemoveLoading, setIsBatchRemoveLoading] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<ReportBalanceSheet[]>([]);

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: ReportBalanceSheet[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleReportBalanceSheetBatchRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    try {
      setIsBatchRemoveLoading(true);
      await batchDeleteReportBalanceSheet({ ids: selectedRows.map((row) => row.id) });
      message.success('删除成功');
      mutateReportBalanceSheets();
      resetSelectedRows();
    } finally {
      setIsBatchRemoveLoading(false);
    }
  };

  const handleReportBalanceSheetBatchRemoveCancel = async () => {
    resetSelectedRows();
    message.info('操作已取消');
  };

  // 单个更新模块
  const [isUpdateReportBalanceSheetModalVisible, setIsUpdateReportBalanceSheetModalVisible] =
    useState<boolean>(false);
  const [isUpdateReportBalanceSheetLoading, setIsUpdateReportBalanceSheetLoading] =
    useState<boolean>(false);
  const [updateReportBalanceSheetForm] = Form.useForm();

  const onUpdateReportBalanceSheet = (reportBalanceSheet: ReportBalanceSheet) => {
    setIsUpdateReportBalanceSheetModalVisible(true);
    setSelectedRowKeys([reportBalanceSheet.id]);
    setSelectedRows([reportBalanceSheet]);
    updateReportBalanceSheetForm.setFieldsValue({ ...reportBalanceSheet });
  };

  const handleUpdateReportBalanceSheetCancel = () => {
    resetSelectedRows();
    updateReportBalanceSheetForm.resetFields();
    setIsUpdateReportBalanceSheetModalVisible(false);
  };

  const handleUpdateReportBalanceSheetFinish = async () => {
    const updateReportBalanceSheetData =
      (await updateReportBalanceSheetForm.validateFields()) as UpdateReportBalanceSheet;
    const req = { ...updateReportBalanceSheetData, id: selectedRows[0].id };
    setIsUpdateReportBalanceSheetLoading(true);
    try {
      await updateReportBalanceSheet({ reportBalanceSheet: req });
      updateReportBalanceSheetForm.resetFields();
      message.success('更新成功');
      mutateReportBalanceSheets();
      resetSelectedRows();
    } finally {
      setIsUpdateReportBalanceSheetLoading(false);
      setIsUpdateReportBalanceSheetModalVisible(false);
    }
  };

  // 批量更新模块
  const onReportBalanceSheetBatchModify = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateReportBalanceSheetModalVisible(true);
      updateReportBalanceSheetForm.setFieldsValue({ ...selectedRows[0] });
    } else {
      setIsBatchUpdateReportBalanceSheetsModalVisible(true);
      batchUpdateReportBalanceSheetsForm.resetFields();
    }
  };
  const [isBatchUpdateReportBalanceSheetsModalVisible, setIsBatchUpdateReportBalanceSheetsModalVisible] =
    useState<boolean>(false);
  const [isBatchUpdateReportBalanceSheetsLoading, setIsBatchUpdateReportBalanceSheetsLoading] =
    useState<boolean>(false);
  const [batchUpdateReportBalanceSheetsForm] = Form.useForm();

  const handleBatchUpdateReportBalanceSheetsCancel = async () => {
    batchUpdateReportBalanceSheetsForm.resetFields();
    setIsBatchUpdateReportBalanceSheetsModalVisible(false);
    resetSelectedRows();
    message.info('操作已取消');
  };

  const handleBatchUpdateReportBalanceSheetsFinish = async () => {
    const reportBalanceSheetBatchModify =
      (await batchUpdateReportBalanceSheetsForm.validateFields()) as BatchUpdateReportBalanceSheet;
    setIsBatchUpdateReportBalanceSheetsLoading(true);
    if (selectedRows === null || selectedRows.length === 0) {
      message.warning('请选择要更新的项目');
      return;
    }
    try {
      const ids = selectedRows.map((row) => row.id);
      await batchUpdateReportBalanceSheets({ ids: ids, reportBalanceSheet: reportBalanceSheetBatchModify });
      batchUpdateReportBalanceSheetsForm.resetFields();
      message.success('更新成功');
      mutateReportBalanceSheets();
      resetSelectedRows();
    } finally {
      setIsBatchUpdateReportBalanceSheetsLoading(false);
      setIsBatchUpdateReportBalanceSheetsModalVisible(false);
    }
  };

  // 导入模块
  const [isImportReportBalanceSheetModalVisible, setIsImportReportBalanceSheetModalVisible] =
    useState<boolean>(false);
  const [isImportReportBalanceSheetLoading, setIsImportReportBalanceSheetLoading] =
    useState<boolean>(false);
  const [createReportBalanceSheetList, setCreateReportBalanceSheetList] = useState<CreateReportBalanceSheet[]>([]);

  const onImportReportBalanceSheet = () => {
    setIsImportReportBalanceSheetModalVisible(true);
  };

  const handleImportReportBalanceSheetCancel = () => {
    setIsImportReportBalanceSheetModalVisible(false);
  };

  const onImportReportBalanceSheetFinish = async (fileList: RcFile[]) => {
    try {
      setIsImportReportBalanceSheetLoading(true);
      const createReportBalanceSheetList = await importReportBalanceSheet({ file: fileList[0] });
      setCreateReportBalanceSheetList(createReportBalanceSheetList.reportBalanceSheets);
      return createReportBalanceSheetList;
    } finally {
      setIsImportReportBalanceSheetLoading(false);
    }
  };

  const handleImportReportBalanceSheet = async () => {
    setIsImportReportBalanceSheetLoading(true);
    try {
      await batchCreateReportBalanceSheets({ reportBalanceSheets: createReportBalanceSheetList });
      message.success('导入成功');
      setIsImportReportBalanceSheetModalVisible(false);
      mutateReportBalanceSheets();
    } finally {
      setIsImportReportBalanceSheetLoading(false);
      setCreateReportBalanceSheetList([]);
    }
  };

  // 导出模块
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const onReportBalanceSheetExport = async () => {
    if (selectedRowKeys === null || selectedRowKeys.length === 0) {
      message.warning('请先选择导出的项目');
      return;
    }
    try {
      setIsExportLoading(true);
      await exportReportBalanceSheet({ ids: selectedRows.map((row) => row.id) });
      resetSelectedRows();
    } finally {
      setIsExportLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryReportBalanceSheetShow}>
        <QueryReportBalanceSheetComponent
          onQueryReportBalanceSheetFinish={onQueryReportBalanceSheetFinish}
          onQueryReportBalanceSheetReset={handleQueryReportBalanceSheetReset}
          onQueryReportBalanceSheetForm={queryReportBalanceSheetForm}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={onCreateReportBalanceSheet}
          onImport={onImportReportBalanceSheet}
          onExport={onReportBalanceSheetExport}
          onBatchModify={onReportBalanceSheetBatchModify}
          onConfirmBatchRemove={handleReportBalanceSheetBatchRemove}
          onConfirmBatchRemoveCancel={handleReportBalanceSheetBatchRemoveCancel}
          isQueryShow={isQueryReportBalanceSheetShow}
          onQueryShow={onQueryReportBalanceSheetShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={isBatchRemoveLoading}
          isExportLoading={isExportLoading}
          rawColumns={reportBalanceSheetColumns as any[]}
          visibleColumns={visibleColumns as any[]}
          onToggleColumnVisibility={onToggleColumnVisibility}
          actionConfig={actionConfig}
          className="mb-2 mt-4"
        />
      </div>
      <div>
        <PaginatedTable<ReportBalanceSheet>
          columns={filteredReportBalanceSheetColumns}
          dataSource={reportBalanceSheetListDataSource || []}
          total={total || 0}
          current={current}
          page_size={pageSize}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleSelectionChange}
          selectedRowKeys={selectedRowKeys}
          rowKey="id"
          loading={isReportBalanceSheetListLoading}
          scroll={{ x: 1500 }}
        />
      </div>
      <div>
        <div>
          <CreateReportBalanceSheetComponent
            isCreateReportBalanceSheetModalVisible={isCreateReportBalanceSheetModalVisible}
            onCreateReportBalanceSheetCancel={handleCreateReportBalanceSheetCancel}
            onCreateReportBalanceSheetFinish={handleCreateReportBalanceSheetFinish}
            isCreateReportBalanceSheetLoading={isCreateReportBalanceSheetLoading}
            createReportBalanceSheetForm={createReportBalanceSheetForm}
          />
        </div>
        <div>
          <ReportBalanceSheetDetailComponent
            isReportBalanceSheetDetailDrawerVisible={isReportBalanceSheetDetailDrawerVisible}
            onReportBalanceSheetDetailClose={onReportBalanceSheetDetailClose}
            reportBalanceSheetDetail={reportBalanceSheetDetail}
            loading={isReportBalanceSheetDetailLoading}
          />
        </div>
        <div>
          <UpdateReportBalanceSheetComponent
            isUpdateReportBalanceSheetModalVisible={isUpdateReportBalanceSheetModalVisible}
            onUpdateReportBalanceSheetCancel={handleUpdateReportBalanceSheetCancel}
            onUpdateReportBalanceSheetFinish={handleUpdateReportBalanceSheetFinish}
            isUpdateReportBalanceSheetLoading={isUpdateReportBalanceSheetLoading}
            updateReportBalanceSheetForm={updateReportBalanceSheetForm}
          />
        </div>
        <div>
          <BatchUpdateReportBalanceSheetComponent
            isBatchUpdateReportBalanceSheetsModalVisible={isBatchUpdateReportBalanceSheetsModalVisible}
            onBatchUpdateReportBalanceSheetsCancel={handleBatchUpdateReportBalanceSheetsCancel}
            onBatchUpdateReportBalanceSheetsFinish={handleBatchUpdateReportBalanceSheetsFinish}
            isBatchUpdateReportBalanceSheetsLoading={isBatchUpdateReportBalanceSheetsLoading}
            batchUpdateReportBalanceSheetsForm={batchUpdateReportBalanceSheetsForm}
          />
        </div>

        <div>
          <ImportReportBalanceSheetComponent
            isImportReportBalanceSheetModalVisible={isImportReportBalanceSheetModalVisible}
            isImportReportBalanceSheetLoading={isImportReportBalanceSheetLoading}
            onImportReportBalanceSheetFinish={onImportReportBalanceSheetFinish}
            onImportReportBalanceSheetCancel={handleImportReportBalanceSheetCancel}
            handleImportReportBalanceSheet={handleImportReportBalanceSheet}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportBalanceSheetPage;