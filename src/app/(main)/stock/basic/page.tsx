// SPDX-License-Identifier: MIT
'use client';

import ActionButtonComponent from '@/components/base/action-button';
import { PaginatedTable } from '@/components/base/paginated-table';
import TransitionWrapper from '@/components/base/transition-wrapper';
import {
  batchCreateStocks,
  batchDeleteStock,
  batchUpdateStocks,
  createStock,
  deleteStock,
  exportStock,
  importStock,
  updateStock,
  useStock,
  useStocks,
} from '@/service/stock';
import { createPaginationRequest } from '@/types';
import {
  BatchUpdateStock,
  CreateStock,
  ListStocksRequest,
  Stock,
  UpdateStock,
} from '@/types/stock';
import { Form, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Eye, MoreHorizontal } from 'lucide-react';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';
import BatchUpdateStockComponent from './components/batch-update-stock';
import CreateStockComponent from './components/create-stock';
import ImportStockComponent from './components/import-stock';
import StockDetailComponent from './components/stock-detail';
import QueryStockComponent from './components/query-stock';
import UpdateStockComponent from './components/update-stock';
import { useIndustry } from '@/service/stock';

const StockPage: React.FC = () => {
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
  const [isQueryStockShow, setIsQueryStockShow] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryStockForm] = Form.useForm();
  const [stockQueryParams, setStockQueryParams] = useState<ListStocksRequest>();

  // 用 useStocks 获取菜单列表数据
  const {
    stocks: stockListDataSource,
    total,
    isLoading: isStockListLoading,
    mutateStocks,
  } = useStocks({
    ...stockQueryParams,
    ...createPaginationRequest(current, pageSize),
  });

  const onQueryStockShow = () => {
    setIsQueryStockShow((prevState) => !prevState);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  const resetPagination = () => {
    setCurrent(1);
    setPageSize(10);
  };

  const handleQueryStockReset = () => {
    resetPagination();
    queryStockForm.resetFields();
    setStockQueryParams(undefined)
    mutateStocks();
  };

  const onQueryStockFinish = async () => {
    const values = queryStockForm.getFieldsValue();
    const { create_time } = values;
    if (create_time) {
      const [startDate, endDate] = create_time;
      values.create_time = [
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
      ];
    }
    const queryStock = values as ListStocksRequest;
    const filteredQueryStock = Object.fromEntries(
      Object.entries(queryStock).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );
    resetPagination();
    setStockQueryParams(filteredQueryStock as ListStocksRequest);
  };

  // 详情模块
  const [isStockDetailDrawerVisible, setIsStockDetailDrawerVisible] =
    useState(false);
  const [selectedStockId, setSelectedStockId] = useState<string | null>(null);

  const { stock: stockDetail, isLoading: isStockDetailLoading } = useStock(
    selectedStockId || '',
  );

  const onStockDetail = (stock: Stock) => {
    setSelectedStockId(stock.id);
    setIsStockDetailDrawerVisible(true);
  };

  const onStockDetailClose = () => {
    setSelectedStockId(null);
    setIsStockDetailDrawerVisible(false);
  };

  // 表格列信息
  const stockColumns: ColumnsType<Stock> = [
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
      render: (_: number, _record: Stock, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "股票编号",
      dataIndex: "stock_code",
      key: "stock_code",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "股票名称",
      dataIndex: "stock_name",
      key: "stock_name",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "上市日期",
      dataIndex: "listing_date",
      key: "listing_date",
      render: (text: string) => (
        text ? <span>{dayjs(text).format('YYYY-MM-DD')}</span> : "-"
      ),
      width: "14%",
      ellipsis: true,
    },
    {
      title: "行业",
      dataIndex: "industry",
      key: "industry",
      render: (text) => (text ? text : "-"),
      width: "16%",
      ellipsis: true,
    },
    {
      title: "所属市场",
      dataIndex: "market_type",
      key: "market_type",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "注册资金(元)",
      dataIndex: "registered_capital",
      key: "registered_capital",
      render: (text) => {
        if (!text) return "-";
        const num = Number(text) * 10000;
        return num.toLocaleString('zh-CN');
      },
      width: "14%",
      ellipsis: true,
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
            onClick={() => onStockDetail(record)}
          >
            <Eye className="w-3 h-3" />
            详情
          </button>

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
    stockColumns.map((col) => col.key),
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
  const filteredStockColumns = stockColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 新增模块
  const [isCreateStockModalVisible, setIsCreateStockModalVisible] =
    useState(false);
  const [isCreateStockLoading, setIsCreateStockLoading] = useState(false);
  const [createStockForm] = Form.useForm();

  const onCreateStock = () => {
    setIsCreateStockModalVisible(true);
  };
  const handleCreateStockCancel = () => {
    createStockForm.resetFields();
    setIsCreateStockModalVisible(false);
  };
  const handleCreateStockFinish = async (data: CreateStock) => {
    setIsCreateStockLoading(true);
    try {
      await createStock({ stock: data });
      message.success('新增成功');
      createStockForm.resetFields();
      setIsCreateStockModalVisible(false);
      mutateStocks();
    } finally {
      setIsCreateStockLoading(false);
    }
  };

  // 单个删除模块
  const handleDeleteStock = async (stock: Stock) => {
    await deleteStock(stock.id);
    message.success('删除成功');
    mutateStocks();
  };

  // 批量删除模块
  const [isBatchRemoveLoading, setIsBatchRemoveLoading] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<Stock[]>([]);

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: Stock[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleStockBatchRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    try {
      setIsBatchRemoveLoading(true);
      await batchDeleteStock({ ids: selectedRows.map((row) => row.id) });
      message.success('删除成功');
      mutateStocks();
      resetSelectedRows();
    } finally {
      setIsBatchRemoveLoading(false);
    }
  };

  const handleStockBatchRemoveCancel = async () => {
    resetSelectedRows();
    message.info('操作已取消');
  };

  // 单个更新模块
  const [isUpdateStockModalVisible, setIsUpdateStockModalVisible] =
    useState<boolean>(false);
  const [isUpdateStockLoading, setIsUpdateStockLoading] =
    useState<boolean>(false);
  const [updateStockForm] = Form.useForm();

  const onUpdateStock = (stock: Stock) => {
    setIsUpdateStockModalVisible(true);
    setSelectedRowKeys([stock.id]);
    setSelectedRows([stock]);
    updateStockForm.setFieldsValue({ ...stock });
  };

  const handleUpdateStockCancel = () => {
    resetSelectedRows();
    updateStockForm.resetFields();
    setIsUpdateStockModalVisible(false);
  };

  const handleUpdateStockFinish = async () => {
    const updateStockData =
      (await updateStockForm.validateFields()) as UpdateStock;
    const req = { ...updateStockData, id: selectedRows[0].id };
    setIsUpdateStockLoading(true);
    try {
      await updateStock({ stock: req });
      updateStockForm.resetFields();
      message.success('更新成功');
      mutateStocks();
      resetSelectedRows();
    } finally {
      setIsUpdateStockLoading(false);
      setIsUpdateStockModalVisible(false);
    }
  };

  // 批量更新模块
  const onStockBatchModify = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateStockModalVisible(true);
      updateStockForm.setFieldsValue({ ...selectedRows[0] });
    } else {
      setIsBatchUpdateStocksModalVisible(true);
      batchUpdateStocksForm.resetFields();
    }
  };
  const [isBatchUpdateStocksModalVisible, setIsBatchUpdateStocksModalVisible] =
    useState<boolean>(false);
  const [isBatchUpdateStocksLoading, setIsBatchUpdateStocksLoading] =
    useState<boolean>(false);
  const [batchUpdateStocksForm] = Form.useForm();

  const handleBatchUpdateStocksCancel = async () => {
    batchUpdateStocksForm.resetFields();
    setIsBatchUpdateStocksModalVisible(false);
    resetSelectedRows();
    message.info('操作已取消');
  };

  const handleBatchUpdateStocksFinish = async () => {
    const stockBatchModify =
      (await batchUpdateStocksForm.validateFields()) as BatchUpdateStock;
    setIsBatchUpdateStocksLoading(true);
    if (selectedRows === null || selectedRows.length === 0) {
      message.warning('请选择要更新的项目');
      return;
    }
    try {
      const ids = selectedRows.map((row) => row.id);
      await batchUpdateStocks({ ids: ids, stock: stockBatchModify });
      batchUpdateStocksForm.resetFields();
      message.success('更新成功');
      mutateStocks();
      resetSelectedRows();
    } finally {
      setIsBatchUpdateStocksLoading(false);
      setIsBatchUpdateStocksModalVisible(false);
    }
  };

  // 导入模块
  const [isImportStockModalVisible, setIsImportStockModalVisible] =
    useState<boolean>(false);
  const [isImportStockLoading, setIsImportStockLoading] =
    useState<boolean>(false);
  const [createStockList, setCreateStockList] = useState<CreateStock[]>([]);

  const onImportStock = () => {
    setIsImportStockModalVisible(true);
  };

  const handleImportStockCancel = () => {
    setIsImportStockModalVisible(false);
  };

  const onImportStockFinish = async (fileList: RcFile[]) => {
    try {
      setIsImportStockLoading(true);
      const createStockList = await importStock({ file: fileList[0] });
      setCreateStockList(createStockList.stocks);
      return createStockList;
    } finally {
      setIsImportStockLoading(false);
    }
  };

  const handleImportStock = async () => {
    setIsImportStockLoading(true);
    try {
      await batchCreateStocks({ stocks: createStockList });
      message.success('导入成功');
      setIsImportStockModalVisible(false);
      mutateStocks();
    } finally {
      setIsImportStockLoading(false);
      setCreateStockList([]);
    }
  };

  // 导出模块
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const onStockExport = async () => {
    if (selectedRowKeys === null || selectedRowKeys.length === 0) {
      message.warning('请先选择导出的项目');
      return;
    }
    try {
      setIsExportLoading(true);
      await exportStock({ ids: selectedRows.map((row) => row.id) });
      resetSelectedRows();
    } finally {
      setIsExportLoading(false);
    }
  };
  const { industryList } = useIndustry();

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryStockShow}>
        <QueryStockComponent
          onQueryStockFinish={onQueryStockFinish}
          onQueryStockReset={handleQueryStockReset}
          onQueryStockForm={queryStockForm}
          industryList={industryList}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={onCreateStock}
          onImport={onImportStock}
          onExport={onStockExport}
          onBatchModify={onStockBatchModify}
          onConfirmBatchRemove={handleStockBatchRemove}
          onConfirmBatchRemoveCancel={handleStockBatchRemoveCancel}
          isQueryShow={isQueryStockShow}
          onQueryShow={onQueryStockShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={isBatchRemoveLoading}
          isExportLoading={isExportLoading}
          rawColumns={stockColumns as any[]}
          visibleColumns={visibleColumns as any[]}
          onToggleColumnVisibility={onToggleColumnVisibility}
          actionConfig={actionConfig}
          className="mb-2 mt-4"
        />
      </div>
      <div>
        <PaginatedTable<Stock>
          columns={filteredStockColumns}
          dataSource={stockListDataSource || []}
          total={total || 0}
          current={current}
          page_size={pageSize}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleSelectionChange}
          selectedRowKeys={selectedRowKeys}
          rowKey="id"
          loading={isStockListLoading}
        />
      </div>
      <div>
        <div>
          <CreateStockComponent
            isCreateStockModalVisible={isCreateStockModalVisible}
            onCreateStockCancel={handleCreateStockCancel}
            onCreateStockFinish={handleCreateStockFinish}
            isCreateStockLoading={isCreateStockLoading}
            createStockForm={createStockForm}
          />
        </div>
        <div>
          <StockDetailComponent
            isStockDetailDrawerVisible={isStockDetailDrawerVisible}
            onStockDetailClose={onStockDetailClose}
            stockDetail={stockDetail}
            loading={isStockDetailLoading}
          />
        </div>
        <div>
          <UpdateStockComponent
            isUpdateStockModalVisible={isUpdateStockModalVisible}
            onUpdateStockCancel={handleUpdateStockCancel}
            onUpdateStockFinish={handleUpdateStockFinish}
            isUpdateStockLoading={isUpdateStockLoading}
            updateStockForm={updateStockForm}
          />
        </div>
        <div>
          <BatchUpdateStockComponent
            isBatchUpdateStocksModalVisible={isBatchUpdateStocksModalVisible}
            onBatchUpdateStocksCancel={handleBatchUpdateStocksCancel}
            onBatchUpdateStocksFinish={handleBatchUpdateStocksFinish}
            isBatchUpdateStocksLoading={isBatchUpdateStocksLoading}
            batchUpdateStocksForm={batchUpdateStocksForm}
          />
        </div>

        <div>
          <ImportStockComponent
            isImportStockModalVisible={isImportStockModalVisible}
            isImportStockLoading={isImportStockLoading}
            onImportStockFinish={onImportStockFinish}
            onImportStockCancel={handleImportStockCancel}
            handleImportStock={handleImportStock}
          />
        </div>
      </div>
    </div>
  );
};

export default StockPage;