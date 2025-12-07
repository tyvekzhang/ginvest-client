// Copyright (c) 2025 FastWeb and/or its affiliates. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
'use client';

import ActionButtonComponent from '@/components/base/action-button';
import { PaginatedTable } from '@/components/base/paginated-table';
import TransitionWrapper from '@/components/base/transition-wrapper';
import {
  batchCreateTenantPlans,
  batchDeleteTenantPlan,
  batchUpdateTenantPlans,
  createTenantPlan,
  deleteTenantPlan,
  exportTenantPlan,
  importTenantPlan,
  updateTenantPlan,
  useTenantPlan,
  useTenantPlans,
} from '@/service/tenant-plan';
import { createPaginationRequest } from '@/types';
import {
  BatchUpdateTenantPlan,
  CreateTenantPlan,
  ListTenantPlansRequest,
  TenantPlan,
  UpdateTenantPlan,
} from '@/types/tenant-plan';
import { Form, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Eye, MoreHorizontal, PenLine, Trash2 } from 'lucide-react';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useMemo, useState } from 'react';
import BatchUpdateTenantPlanComponent from './components/batch-update-tenant-plan';
import CreateTenantPlanComponent from './components/create-tenant-plan';
import ImportTenantPlanComponent from './components/import-tenant-plan';
import TenantPlanDetailComponent from './components/tenant-plan-detail';
import QueryTenantPlanComponent from './components/query-tenant-plan';
import UpdateTenantPlanComponent from './components/update-tenant-plan';
import { convertToOptions } from '@/utils/select-util';
import { useTenants } from '@/service/tenant';

const TenantPlanPage: React.FC = () => {
  // 配置模块
  const actionConfig = {
    showCreate: true,
    showImport: true,
    showExport: true,
    showModify: true,
    showRemove: true,
  };
  const showMore = false;
  
  const { tenants: tenantData } = useTenants({page_size: 1000});
  const tenantOptions = useMemo(() => {
    return tenantData ? convertToOptions(tenantData, 'id', 'name') : [];
  }, [tenantData]);

  // 查询模块
  const [isQueryTenantPlanShow, setIsQueryTenantPlanShow] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryTenantPlanForm] = Form.useForm();
  const [tenantPlanQueryParams, setTenantPlanQueryParams] = useState<ListTenantPlansRequest>();

  // 用 useTenantPlans 获取菜单列表数据
  const {
    tenantPlans: tenantPlanListDataSource,
    total,
    isLoading: isTenantPlanListLoading,
    mutateTenantPlans,
  } = useTenantPlans({
    ...tenantPlanQueryParams,
    ...createPaginationRequest(current, pageSize),
  });

  const onQueryTenantPlanShow = () => {
    setIsQueryTenantPlanShow((prevState) => !prevState);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  const resetPagination = () => {
    setCurrent(1);
    setPageSize(10);
  };

  const handleQueryTenantPlanReset = () => {
    resetPagination();
    queryTenantPlanForm.resetFields();
    setTenantPlanQueryParams(undefined)
    mutateTenantPlans();
  };

  const onQueryTenantPlanFinish = async () => {
    const values = queryTenantPlanForm.getFieldsValue();
    const { create_time } = values;
    if (create_time) {
      const [startDate, endDate] = create_time;
      values.create_time = [
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
      ];
    }
    const queryTenantPlan = values as ListTenantPlansRequest;
    const filteredQueryTenantPlan = Object.fromEntries(
      Object.entries(queryTenantPlan).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );
    resetPagination();
    setTenantPlanQueryParams(filteredQueryTenantPlan as ListTenantPlansRequest);
  };

  // 详情模块
  const [isTenantPlanDetailDrawerVisible, setIsTenantPlanDetailDrawerVisible] =
    useState(false);
  const [selectedTenantPlanId, setSelectedTenantPlanId] = useState<string | null>(null);

  const { tenantPlan: tenantPlanDetail, isLoading: isTenantPlanDetailLoading } = useTenantPlan(
    selectedTenantPlanId || '',
  );

  const onTenantPlanDetail = (tenantPlan: TenantPlan) => {
    setSelectedTenantPlanId(tenantPlan.id);
    setIsTenantPlanDetailDrawerVisible(true);
  };

  const onTenantPlanDetailClose = () => {
    setSelectedTenantPlanId(null);
    setIsTenantPlanDetailDrawerVisible(false);
  };

  // 表格列信息
  const tenantPlanColumns: ColumnsType<TenantPlan> = [
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
      render: (_: number, _record: TenantPlan, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "团队人数",
      dataIndex: "team_size",
      key: "team_size",
      width: "6%",
    },
    {
      title: "文件使用",
      dataIndex: "file_usage",
      key: "file_usage",
      width: "6%",
    },
    {
      title: "Token数量",
      dataIndex: "token_count",
      key: "token_count",
      width: "6%",
    },
    {
      title: "其他配置",
      dataIndex: "options",
      key: "options",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "创建时间",
      dataIndex: "create_at",
      key: "create_at",
      render: (text) => (text ? text : "-"),
      width: "12%",
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
            onClick={ () => onTenantPlanDetail(record)}
          >
            <Eye className="w-3 h-3" />
            详情
          </button>
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={ () => onUpdateTenantPlan(record)}
          >
            <PenLine className="w-3 h-3" />
            编辑
          </button>
          <Popconfirm
            title="确认删除"
            description="确定删除吗? 删除后将无法找回"
            onConfirm={() => handleDeleteTenantPlan(record)}
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
    tenantPlanColumns.map((col) => col.key),
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
  const filteredTenantPlanColumns = tenantPlanColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 新增模块
  const [isCreateTenantPlanModalVisible, setIsCreateTenantPlanModalVisible] =
    useState(false);
  const [isCreateTenantPlanLoading, setIsCreateTenantPlanLoading] = useState(false);
  const [createTenantPlanForm] = Form.useForm();

  const onCreateTenantPlan = () => {
    setIsCreateTenantPlanModalVisible(true);
  };
  const handleCreateTenantPlanCancel = () => {
    createTenantPlanForm.resetFields();
    setIsCreateTenantPlanModalVisible(false);
  };
  const handleCreateTenantPlanFinish = async (data: CreateTenantPlan) => {
    setIsCreateTenantPlanLoading(true);
    try {
      await createTenantPlan({ tenantPlan: data });
      message.success('新增成功');
      createTenantPlanForm.resetFields();
      setIsCreateTenantPlanModalVisible(false);
      mutateTenantPlans();
    } finally {
      setIsCreateTenantPlanLoading(false);
    }
  };

  // 单个删除模块
  const handleDeleteTenantPlan = async (tenantPlan: TenantPlan) => {
    await deleteTenantPlan(tenantPlan.id);
    message.success('删除成功');
    mutateTenantPlans();
  };

  // 批量删除模块
  const [isBatchRemoveLoading, setIsBatchRemoveLoading] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<TenantPlan[]>([]);

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: TenantPlan[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleTenantPlanBatchRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    try {
      setIsBatchRemoveLoading(true);
      await batchDeleteTenantPlan({ ids: selectedRows.map((row) => row.id) });
      message.success('删除成功');
      mutateTenantPlans();
      resetSelectedRows();
    } finally {
      setIsBatchRemoveLoading(false);
    }
  };

  const handleTenantPlanBatchRemoveCancel = async () => {
    resetSelectedRows();
    message.info('操作已取消');
  };

  // 单个更新模块
  const [isUpdateTenantPlanModalVisible, setIsUpdateTenantPlanModalVisible] =
    useState<boolean>(false);
  const [isUpdateTenantPlanLoading, setIsUpdateTenantPlanLoading] =
    useState<boolean>(false);
  const [updateTenantPlanForm] = Form.useForm();

  const onUpdateTenantPlan = (tenantPlan: TenantPlan) => {
    setIsUpdateTenantPlanModalVisible(true);
    setSelectedRowKeys([tenantPlan.id]);
    setSelectedRows([tenantPlan]);
    updateTenantPlanForm.setFieldsValue({ ...tenantPlan });
  };

  const handleUpdateTenantPlanCancel = () => {
    resetSelectedRows();
    updateTenantPlanForm.resetFields();
    setIsUpdateTenantPlanModalVisible(false);
  };

  const handleUpdateTenantPlanFinish = async () => {
    const updateTenantPlanData =
      (await updateTenantPlanForm.validateFields()) as UpdateTenantPlan;
    const req = { ...updateTenantPlanData, id: selectedRows[0].id };
    setIsUpdateTenantPlanLoading(true);
    try {
      await updateTenantPlan({ tenantPlan: req });
      updateTenantPlanForm.resetFields();
      message.success('更新成功');
      mutateTenantPlans();
      resetSelectedRows();
    } finally {
      setIsUpdateTenantPlanLoading(false);
      setIsUpdateTenantPlanModalVisible(false);
    }
  };

  // 批量更新模块
  const onTenantPlanBatchModify = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateTenantPlanModalVisible(true);
      updateTenantPlanForm.setFieldsValue({ ...selectedRows[0] });
    } else {
      setIsBatchUpdateTenantPlansModalVisible(true);
      batchUpdateTenantPlansForm.resetFields();
    }
  };
  const [isBatchUpdateTenantPlansModalVisible, setIsBatchUpdateTenantPlansModalVisible] =
    useState<boolean>(false);
  const [isBatchUpdateTenantPlansLoading, setIsBatchUpdateTenantPlansLoading] =
    useState<boolean>(false);
  const [batchUpdateTenantPlansForm] = Form.useForm();

  const handleBatchUpdateTenantPlansCancel = async () => {
    batchUpdateTenantPlansForm.resetFields();
    setIsBatchUpdateTenantPlansModalVisible(false);
    resetSelectedRows();
    message.info('操作已取消');
  };

  const handleBatchUpdateTenantPlansFinish = async () => {
    const tenantPlanBatchModify =
      (await batchUpdateTenantPlansForm.validateFields()) as BatchUpdateTenantPlan;
    setIsBatchUpdateTenantPlansLoading(true);
    if (selectedRows === null || selectedRows.length === 0) {
      message.warning('请选择要更新的项目');
      return;
    }
    try {
      const ids = selectedRows.map((row) => row.id);
      await batchUpdateTenantPlans({ ids: ids, tenantPlan: tenantPlanBatchModify });
      batchUpdateTenantPlansForm.resetFields();
      message.success('更新成功');
      mutateTenantPlans();
      resetSelectedRows();
    } finally {
      setIsBatchUpdateTenantPlansLoading(false);
      setIsBatchUpdateTenantPlansModalVisible(false);
    }
  };

  // 导入模块
  const [isImportTenantPlanModalVisible, setIsImportTenantPlanModalVisible] =
    useState<boolean>(false);
  const [isImportTenantPlanLoading, setIsImportTenantPlanLoading] =
    useState<boolean>(false);
  const [createTenantPlanList, setCreateTenantPlanList] = useState<CreateTenantPlan[]>([]);

  const onImportTenantPlan = () => {
    setIsImportTenantPlanModalVisible(true);
  };

  const handleImportTenantPlanCancel = () => {
    setIsImportTenantPlanModalVisible(false);
  };

  const onImportTenantPlanFinish = async (fileList: RcFile[]) => {
    try {
      setIsImportTenantPlanLoading(true);
      const createTenantPlanList = await importTenantPlan({ file: fileList[0] });
      setCreateTenantPlanList(createTenantPlanList.tenantPlans);
      return createTenantPlanList;
    } finally {
      setIsImportTenantPlanLoading(false);
    }
  };

  const handleImportTenantPlan = async () => {
    setIsImportTenantPlanLoading(true);
    try {
      await batchCreateTenantPlans({ tenantPlans: createTenantPlanList });
      message.success('导入成功');
      setIsImportTenantPlanModalVisible(false);
      mutateTenantPlans();
    } finally {
      setIsImportTenantPlanLoading(false);
      setCreateTenantPlanList([]);
    }
  };

  // 导出模块
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const onTenantPlanExport = async () => {
    if (selectedRowKeys === null || selectedRowKeys.length === 0) {
      message.warning('请先选择导出的项目');
      return;
    }
    try {
      setIsExportLoading(true);
      await exportTenantPlan({ ids: selectedRows.map((row) => row.id) });
      resetSelectedRows();
    } finally {
      setIsExportLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryTenantPlanShow}>
        <QueryTenantPlanComponent
          onQueryTenantPlanFinish={onQueryTenantPlanFinish}
          onQueryTenantPlanReset={handleQueryTenantPlanReset}
          onQueryTenantPlanForm={queryTenantPlanForm}
          tenantOptions={ tenantOptions}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={onCreateTenantPlan }
          onImport={onImportTenantPlan }
          onExport={onTenantPlanExport}
          onBatchModify={onTenantPlanBatchModify}
          onConfirmBatchRemove={handleTenantPlanBatchRemove}
          onConfirmBatchRemoveCancel={handleTenantPlanBatchRemoveCancel}
          isQueryShow={isQueryTenantPlanShow}
          onQueryShow={onQueryTenantPlanShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={isBatchRemoveLoading}
          isExportLoading={isExportLoading}
          rawColumns={ tenantPlanColumns as any[]}
          visibleColumns={visibleColumns as any[]}
          onToggleColumnVisibility={onToggleColumnVisibility}
          actionConfig={actionConfig}
          className="mb-2 mt-4"
        />
      </div>
      <div>
        <PaginatedTable<TenantPlan>
          columns={filteredTenantPlanColumns}
          dataSource={ tenantPlanListDataSource || []}
          total={total || 0}
          current={current}
          page_size={pageSize}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleSelectionChange}
          selectedRowKeys={selectedRowKeys}
          rowKey="id"
          loading={isTenantPlanListLoading}
        />
      </div>
      <div>
        <div>
          <CreateTenantPlanComponent
            isCreateTenantPlanModalVisible={isCreateTenantPlanModalVisible}
            onCreateTenantPlanCancel={handleCreateTenantPlanCancel}
            onCreateTenantPlanFinish={handleCreateTenantPlanFinish}
            isCreateTenantPlanLoading={isCreateTenantPlanLoading}
            createTenantPlanForm={createTenantPlanForm}
            tenantOptions={ tenantOptions}
          />
        </div>
        <div>
          <TenantPlanDetailComponent
            isTenantPlanDetailDrawerVisible={isTenantPlanDetailDrawerVisible}
            onTenantPlanDetailClose={onTenantPlanDetailClose}
            tenantPlanDetail={ tenantPlanDetail}
            loading={isTenantPlanDetailLoading}
            tenantOptions={ tenantOptions}
          />
        </div>
        <div>
          <UpdateTenantPlanComponent
            isUpdateTenantPlanModalVisible={isUpdateTenantPlanModalVisible}
            onUpdateTenantPlanCancel={handleUpdateTenantPlanCancel}
            onUpdateTenantPlanFinish={handleUpdateTenantPlanFinish}
            isUpdateTenantPlanLoading={isUpdateTenantPlanLoading}
            updateTenantPlanForm={updateTenantPlanForm}
            tenantOptions={ tenantOptions}
          />
        </div>
        <div>
          <BatchUpdateTenantPlanComponent
            isBatchUpdateTenantPlansModalVisible={isBatchUpdateTenantPlansModalVisible}
            onBatchUpdateTenantPlansCancel={handleBatchUpdateTenantPlansCancel}
            onBatchUpdateTenantPlansFinish={handleBatchUpdateTenantPlansFinish}
            isBatchUpdateTenantPlansLoading={isBatchUpdateTenantPlansLoading}
            batchUpdateTenantPlansForm={ batchUpdateTenantPlansForm}
            tenantOptions={ tenantOptions}
          />
        </div>

        <div>
          <ImportTenantPlanComponent
            isImportTenantPlanModalVisible={isImportTenantPlanModalVisible}
            isImportTenantPlanLoading={isImportTenantPlanLoading}
            onImportTenantPlanFinish={onImportTenantPlanFinish}
            onImportTenantPlanCancel={handleImportTenantPlanCancel}
            handleImportTenantPlan={handleImportTenantPlan }
          />
        </div>
      </div>
    </div>
  );
};

export default TenantPlanPage;