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
import { exportTenantTemplate } from '@/service/tenant';
import { CreateTenant, ImportTenantsResponse} from '@/types/tenant';
import { Inbox } from 'lucide-react';
import { Button, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { UploadRequestOption } from 'rc-upload/es/interface';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

interface ImportTenantProps {
  isImportTenantModalVisible: boolean;
  isImportTenantLoading: boolean;
  onImportTenantCancel: () => void;
  onImportTenantFinish: (fileList: RcFile[]) => Promise<ImportTenantsResponse>;
  handleImportTenant: () => void;
}

const ImportTenantComponent: React.FC<ImportTenantProps> = ({
  isImportTenantModalVisible,
  onImportTenantCancel,
  onImportTenantFinish,
  isImportTenantLoading,
  handleImportTenant,
}) => {
  const [tenantImportFileList, setImportTenantFileList] = useState<RcFile[]>([]);
  const [CreateTenantList, setCreateTenantList] = useState<CreateTenant[]>([]);
  const [isUploadShow, setIsUploadShow] = useState<boolean>(true);

  const footerButtons = () => [
    <Button key="back" onClick={handleImportTenantCancel}>
      取消
    </Button>,
    <Button key="submit" type="primary" loading={isImportTenantLoading} onClick={handleImportTenantConfirm}>
      确定
    </Button>,
  ];

  const handleImportTenantConfirm = async () => {
    if (isUploadShow) {
      if (tenantImportFileList.length === 0) {
        message.warning('请先选择文件');
        return;
      }
      try {
        const importTenantResponse = await onImportTenantFinish(tenantImportFileList);
        setIsUploadShow(false);
        setCreateTenantList(importTenantResponse.tenants);
      } finally {
        setImportTenantFileList([]);
      }
    } else {
      handleImportTenant();
      setIsUploadShow(true);
    }
  };
  // 表格列信息
  const TenantColumns: ColumnsType<CreateTenant> = [
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: CreateTenant, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "租户名称",
      dataIndex: "name",
      key: "name",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "logo地址",
      dataIndex: "logo_url",
      key: "logo_url",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "联系人姓名",
      dataIndex: "contact_name",
      key: "contact_name",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "联系邮箱",
      dataIndex: "email",
      key: "email",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "创建时间",
      dataIndex: "create_at",
      key: "create_at",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "错误信息",
      dataIndex: "errMsg",
      key: "errMsg",
      render: (text) => (text ? text : "-"),
    },
  ];

  const handleTenantExportTemplate = async () => {
    await exportTenantTemplate();
  };

  const customUploadRequest = async (options: UploadRequestOption): Promise<void | undefined> => {
    const { onSuccess, onError, file } = options;
    const rcFile = file as RcFile;
    if (!rcFile.name.endsWith('.xls') && !rcFile.name.endsWith('.xlsx')) {
      message.error('仅支持xls、xlsx格式文件');
      onError?.(new Error('仅支持xls、xlsx格式文件'));
      return;
    }
    setImportTenantFileList((prev) => [...prev, rcFile]);
    setTimeout(() => {
      onSuccess?.(rcFile);
    }, 200);
  };

  const handleRemove = (file: UploadFile) => {
    setImportTenantFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleImportTenantCancel = () => {
    onImportTenantCancel();
    setIsUploadShow(true);
  };

  return (
    <Modal
      title="租户信息导入"
      open={isImportTenantModalVisible}
      onCancel={handleImportTenantCancel}
      footer={footerButtons}
      width={'70%'}
    >
      {isUploadShow ? (
        <div>
          <div>
            <Upload.Dragger
              name="file"
              multiple
              accept=".xlsx,.xls"
              onRemove={handleRemove}
              fileList={ tenantImportFileList}
              customRequest={customUploadRequest as any}
            >
              <p className="flex justify-center items-center text-primary">
                <Inbox />
              </p>
              <p>{'点击或拖拽到此上传'}</p>
              <p className="text-gray-500">仅支持上传xls、xlsx格式的文件</p>
            </Upload.Dragger>
          </div>
          <div onClick={handleTenantExportTemplate} className="cursor-pointer mt-4 text-blue-600">
            下载模板
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={ TenantColumns}
            dataSource={ CreateTenantList}
            pagination={false}
            bordered={false}
            rowKey={'id'}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImportTenantComponent;