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
  batchCreateTenants,
  batchDeleteTenant,
  batchUpdateTenants,
  createTenant,
  deleteTenant,
  exportTenant,
  importTenant,
  updateTenant,
  useTenant,
  useTenants,
} from '@/service/tenant';
import { createPaginationRequest } from '@/types';
import {
  BatchUpdateTenant,
  CreateTenant,
  ListTenantsRequest,
  Tenant,
  UpdateTenant,
} from '@/types/tenant';
import { Form, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Eye, MoreHorizontal, PenLine, Trash2 } from 'lucide-react';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';
import BatchUpdateTenantComponent from './components/batch-update-tenant';
import CreateTenantComponent from './components/create-tenant';
import ImportTenantComponent from './components/import-tenant';
import TenantDetailComponent from './components/tenant-detail';
import QueryTenantComponent from './components/query-tenant';
import UpdateTenantComponent from './components/update-tenant';

const TenantPage: React.FC = () => {
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
  const [isQueryTenantShow, setIsQueryTenantShow] = useState<boolean>(true);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [queryTenantForm] = Form.useForm();
  const [tenantQueryParams, setTenantQueryParams] = useState<ListTenantsRequest>();

  // 用 useTenants 获取菜单列表数据
  const {
    tenants: tenantListDataSource,
    total,
    isLoading: isTenantListLoading,
    mutateTenants,
  } = useTenants({
    ...tenantQueryParams,
    ...createPaginationRequest(current, pageSize),
  });

  const onQueryTenantShow = () => {
    setIsQueryTenantShow((prevState) => !prevState);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setCurrent(newPage);
    setPageSize(newPageSize);
  };

  const resetPagination = () => {
    setCurrent(1);
    setPageSize(10);
  };

  const handleQueryTenantReset = () => {
    resetPagination();
    queryTenantForm.resetFields();
    setTenantQueryParams(undefined)
    mutateTenants();
  };

  const onQueryTenantFinish = async () => {
    const values = queryTenantForm.getFieldsValue();
    const { create_time } = values;
    if (create_time) {
      const [startDate, endDate] = create_time;
      values.create_time = [
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD'),
      ];
    }
    const queryTenant = values as ListTenantsRequest;
    const filteredQueryTenant = Object.fromEntries(
      Object.entries(queryTenant).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );
    resetPagination();
    setTenantQueryParams(filteredQueryTenant as ListTenantsRequest);
  };

  // 详情模块
  const [isTenantDetailDrawerVisible, setIsTenantDetailDrawerVisible] =
    useState(false);
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null);

  const { tenant: tenantDetail, isLoading: isTenantDetailLoading } = useTenant(
    selectedTenantId || '',
  );

  const onTenantDetail = (tenant: Tenant) => {
    setSelectedTenantId(tenant.id);
    setIsTenantDetailDrawerVisible(true);
  };

  const onTenantDetailClose = () => {
    setSelectedTenantId(null);
    setIsTenantDetailDrawerVisible(false);
  };

  // 表格列信息
  const tenantColumns: ColumnsType<Tenant> = [
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
      render: (_: number, _record: Tenant, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "租户名称",
      dataIndex: "name",
      key: "name",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "联系人姓名",
      dataIndex: "contact_name",
      key: "contact_name",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (text ? text : "-"),
      width: "12%",
      ellipsis: true,
    },
    {
      title: "联系邮箱",
      dataIndex: "email",
      key: "email",
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
            onClick={ () => onTenantDetail(record)}
          >
            <Eye className="w-3 h-3" />
            详情
          </button>
          <button
            type="button"
            className="flex items-center gap-0.5 text-xs btn-operation"
            onClick={ () => onUpdateTenant(record)}
          >
            <PenLine className="w-3 h-3" />
            编辑
          </button>
          <Popconfirm
            title="确认删除"
            description="确定删除吗? 删除后将无法找回"
            onConfirm={() => handleDeleteTenant(record)}
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
    tenantColumns.map((col) => col.key),
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
  const filteredTenantColumns = tenantColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 新增模块
  const [isCreateTenantModalVisible, setIsCreateTenantModalVisible] =
    useState(false);
  const [isCreateTenantLoading, setIsCreateTenantLoading] = useState(false);
  const [createTenantForm] = Form.useForm();

  const onCreateTenant = () => {
    setIsCreateTenantModalVisible(true);
  };
  const handleCreateTenantCancel = () => {
    createTenantForm.resetFields();
    setIsCreateTenantModalVisible(false);
  };
  const handleCreateTenantFinish = async (data: CreateTenant) => {
    setIsCreateTenantLoading(true);
    try {
      await createTenant({ tenant: data });
      message.success('新增成功');
      createTenantForm.resetFields();
      setIsCreateTenantModalVisible(false);
      mutateTenants();
    } finally {
      setIsCreateTenantLoading(false);
    }
  };

  // 单个删除模块
  const handleDeleteTenant = async (tenant: Tenant) => {
    await deleteTenant(tenant.id);
    message.success('删除成功');
    mutateTenants();
  };

  // 批量删除模块
  const [isBatchRemoveLoading, setIsBatchRemoveLoading] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<Tenant[]>([]);

  const resetSelectedRows = () => {
    setSelectedRowKeys([]);
    setSelectedRows([]);
  };

  const handleSelectionChange = (
    selectedRowKeys: React.Key[],
    selectedRows: Tenant[],
  ) => {
    setSelectedRows(selectedRows);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleTenantBatchRemove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的项目');
      return;
    }
    try {
      setIsBatchRemoveLoading(true);
      await batchDeleteTenant({ ids: selectedRows.map((row) => row.id) });
      message.success('删除成功');
      mutateTenants();
      resetSelectedRows();
    } finally {
      setIsBatchRemoveLoading(false);
    }
  };

  const handleTenantBatchRemoveCancel = async () => {
    resetSelectedRows();
    message.info('操作已取消');
  };

  // 单个更新模块
  const [isUpdateTenantModalVisible, setIsUpdateTenantModalVisible] =
    useState<boolean>(false);
  const [isUpdateTenantLoading, setIsUpdateTenantLoading] =
    useState<boolean>(false);
  const [updateTenantForm] = Form.useForm();

  const onUpdateTenant = (tenant: Tenant) => {
    setIsUpdateTenantModalVisible(true);
    setSelectedRowKeys([tenant.id]);
    setSelectedRows([tenant]);
    updateTenantForm.setFieldsValue({ ...tenant });
  };

  const handleUpdateTenantCancel = () => {
    resetSelectedRows();
    updateTenantForm.resetFields();
    setIsUpdateTenantModalVisible(false);
  };

  const handleUpdateTenantFinish = async () => {
    const updateTenantData =
      (await updateTenantForm.validateFields()) as UpdateTenant;
    const req = { ...updateTenantData, id: selectedRows[0].id };
    setIsUpdateTenantLoading(true);
    try {
      await updateTenant({ tenant: req });
      updateTenantForm.resetFields();
      message.success('更新成功');
      mutateTenants();
      resetSelectedRows();
    } finally {
      setIsUpdateTenantLoading(false);
      setIsUpdateTenantModalVisible(false);
    }
  };

  // 批量更新模块
  const onTenantBatchModify = () => {
    if (selectedRowKeys.length === 1) {
      setIsUpdateTenantModalVisible(true);
      updateTenantForm.setFieldsValue({ ...selectedRows[0] });
    } else {
      setIsBatchUpdateTenantsModalVisible(true);
      batchUpdateTenantsForm.resetFields();
    }
  };
  const [isBatchUpdateTenantsModalVisible, setIsBatchUpdateTenantsModalVisible] =
    useState<boolean>(false);
  const [isBatchUpdateTenantsLoading, setIsBatchUpdateTenantsLoading] =
    useState<boolean>(false);
  const [batchUpdateTenantsForm] = Form.useForm();

  const handleBatchUpdateTenantsCancel = async () => {
    batchUpdateTenantsForm.resetFields();
    setIsBatchUpdateTenantsModalVisible(false);
    resetSelectedRows();
    message.info('操作已取消');
  };

  const handleBatchUpdateTenantsFinish = async () => {
    const tenantBatchModify =
      (await batchUpdateTenantsForm.validateFields()) as BatchUpdateTenant;
    setIsBatchUpdateTenantsLoading(true);
    if (selectedRows === null || selectedRows.length === 0) {
      message.warning('请选择要更新的项目');
      return;
    }
    try {
      const ids = selectedRows.map((row) => row.id);
      await batchUpdateTenants({ ids: ids, tenant: tenantBatchModify });
      batchUpdateTenantsForm.resetFields();
      message.success('更新成功');
      mutateTenants();
      resetSelectedRows();
    } finally {
      setIsBatchUpdateTenantsLoading(false);
      setIsBatchUpdateTenantsModalVisible(false);
    }
  };

  // 导入模块
  const [isImportTenantModalVisible, setIsImportTenantModalVisible] =
    useState<boolean>(false);
  const [isImportTenantLoading, setIsImportTenantLoading] =
    useState<boolean>(false);
  const [createTenantList, setCreateTenantList] = useState<CreateTenant[]>([]);

  const onImportTenant = () => {
    setIsImportTenantModalVisible(true);
  };

  const handleImportTenantCancel = () => {
    setIsImportTenantModalVisible(false);
  };

  const onImportTenantFinish = async (fileList: RcFile[]) => {
    try {
      setIsImportTenantLoading(true);
      const createTenantList = await importTenant({ file: fileList[0] });
      setCreateTenantList(createTenantList.tenants);
      return createTenantList;
    } finally {
      setIsImportTenantLoading(false);
    }
  };

  const handleImportTenant = async () => {
    setIsImportTenantLoading(true);
    try {
      await batchCreateTenants({ tenants: createTenantList });
      message.success('导入成功');
      setIsImportTenantModalVisible(false);
      mutateTenants();
    } finally {
      setIsImportTenantLoading(false);
      setCreateTenantList([]);
    }
  };

  // 导出模块
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const onTenantExport = async () => {
    if (selectedRowKeys === null || selectedRowKeys.length === 0) {
      message.warning('请先选择导出的项目');
      return;
    }
    try {
      setIsExportLoading(true);
      await exportTenant({ ids: selectedRows.map((row) => row.id) });
      resetSelectedRows();
    } finally {
      setIsExportLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto px-4 bg-white">
      <TransitionWrapper show={isQueryTenantShow}>
        <QueryTenantComponent
          onQueryTenantFinish={onQueryTenantFinish}
          onQueryTenantReset={handleQueryTenantReset}
          onQueryTenantForm={queryTenantForm}
        />
      </TransitionWrapper>
      <div>
        <ActionButtonComponent
          onCreate={onCreateTenant }
          onImport={onImportTenant }
          onExport={onTenantExport}
          onBatchModify={onTenantBatchModify}
          onConfirmBatchRemove={handleTenantBatchRemove}
          onConfirmBatchRemoveCancel={handleTenantBatchRemoveCancel}
          isQueryShow={isQueryTenantShow}
          onQueryShow={onQueryTenantShow}
          isExportDisabled={selectedRowKeys.length === 0}
          isBatchModifyDisabled={selectedRowKeys.length === 0}
          isBatchRemoveDisabled={selectedRowKeys.length === 0}
          isBatchRemoveLoading={isBatchRemoveLoading}
          isExportLoading={isExportLoading}
          rawColumns={ tenantColumns as any[]}
          visibleColumns={visibleColumns as any[]}
          onToggleColumnVisibility={onToggleColumnVisibility}
          actionConfig={actionConfig}
          className="mb-2 mt-4"
        />
      </div>
      <div>
        <PaginatedTable<Tenant>
          columns={filteredTenantColumns}
          dataSource={ tenantListDataSource || []}
          total={total || 0}
          current={current}
          page_size={pageSize}
          onPaginationChange={handlePaginationChange}
          onSelectionChange={handleSelectionChange}
          selectedRowKeys={selectedRowKeys}
          rowKey="id"
          loading={isTenantListLoading}
        />
      </div>
      <div>
        <div>
          <CreateTenantComponent
            isCreateTenantModalVisible={isCreateTenantModalVisible}
            onCreateTenantCancel={handleCreateTenantCancel}
            onCreateTenantFinish={handleCreateTenantFinish}
            isCreateTenantLoading={isCreateTenantLoading}
            createTenantForm={createTenantForm}
          />
        </div>
        <div>
          <TenantDetailComponent
            isTenantDetailDrawerVisible={isTenantDetailDrawerVisible}
            onTenantDetailClose={onTenantDetailClose}
            tenantDetail={ tenantDetail}
            loading={isTenantDetailLoading}
          />
        </div>
        <div>
          <UpdateTenantComponent
            isUpdateTenantModalVisible={isUpdateTenantModalVisible}
            onUpdateTenantCancel={handleUpdateTenantCancel}
            onUpdateTenantFinish={handleUpdateTenantFinish}
            isUpdateTenantLoading={isUpdateTenantLoading}
            updateTenantForm={updateTenantForm}
          />
        </div>
        <div>
          <BatchUpdateTenantComponent
            isBatchUpdateTenantsModalVisible={isBatchUpdateTenantsModalVisible}
            onBatchUpdateTenantsCancel={handleBatchUpdateTenantsCancel}
            onBatchUpdateTenantsFinish={handleBatchUpdateTenantsFinish}
            isBatchUpdateTenantsLoading={isBatchUpdateTenantsLoading}
            batchUpdateTenantsForm={ batchUpdateTenantsForm}
          />
        </div>

        <div>
          <ImportTenantComponent
            isImportTenantModalVisible={isImportTenantModalVisible}
            isImportTenantLoading={isImportTenantLoading}
            onImportTenantFinish={onImportTenantFinish}
            onImportTenantCancel={handleImportTenantCancel}
            handleImportTenant={handleImportTenant }
          />
        </div>
      </div>
    </div>
  );
};

export default TenantPage;