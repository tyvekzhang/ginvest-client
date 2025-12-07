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
import { exportTenantPlanTemplate } from '@/service/tenant-plan';
import { CreateTenantPlan, ImportTenantPlansResponse} from '@/types/tenant-plan';
import { Inbox } from 'lucide-react';
import { Button, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { UploadRequestOption } from 'rc-upload/es/interface';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

interface ImportTenantPlanProps {
  isImportTenantPlanModalVisible: boolean;
  isImportTenantPlanLoading: boolean;
  onImportTenantPlanCancel: () => void;
  onImportTenantPlanFinish: (fileList: RcFile[]) => Promise<ImportTenantPlansResponse>;
  handleImportTenantPlan: () => void;
}

const ImportTenantPlanComponent: React.FC<ImportTenantPlanProps> = ({
  isImportTenantPlanModalVisible,
  onImportTenantPlanCancel,
  onImportTenantPlanFinish,
  isImportTenantPlanLoading,
  handleImportTenantPlan,
}) => {
  const [tenantPlanImportFileList, setImportTenantPlanFileList] = useState<RcFile[]>([]);
  const [CreateTenantPlanList, setCreateTenantPlanList] = useState<CreateTenantPlan[]>([]);
  const [isUploadShow, setIsUploadShow] = useState<boolean>(true);

  const footerButtons = () => [
    <Button key="back" onClick={handleImportTenantPlanCancel}>
      取消
    </Button>,
    <Button key="submit" type="primary" loading={isImportTenantPlanLoading} onClick={handleImportTenantPlanConfirm}>
      确定
    </Button>,
  ];

  const handleImportTenantPlanConfirm = async () => {
    if (isUploadShow) {
      if (tenantPlanImportFileList.length === 0) {
        message.warning('请先选择文件');
        return;
      }
      try {
        const importTenantPlanResponse = await onImportTenantPlanFinish(tenantPlanImportFileList);
        setIsUploadShow(false);
        setCreateTenantPlanList(importTenantPlanResponse.tenantPlans);
      } finally {
        setImportTenantPlanFileList([]);
      }
    } else {
      handleImportTenantPlan();
      setIsUploadShow(true);
    }
  };
  // 表格列信息
  const TenantPlanColumns: ColumnsType<CreateTenantPlan> = [
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: CreateTenantPlan, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "团队人数",
      dataIndex: "team_size",
      key: "team_size",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "文件使用",
      dataIndex: "file_usage",
      key: "file_usage",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "Token数量",
      dataIndex: "token_count",
      key: "token_count",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "其他配置",
      dataIndex: "options",
      key: "options",
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

  const handleTenantPlanExportTemplate = async () => {
    await exportTenantPlanTemplate();
  };

  const customUploadRequest = async (options: UploadRequestOption): Promise<void | undefined> => {
    const { onSuccess, onError, file } = options;
    const rcFile = file as RcFile;
    if (!rcFile.name.endsWith('.xls') && !rcFile.name.endsWith('.xlsx')) {
      message.error('仅支持xls、xlsx格式文件');
      onError?.(new Error('仅支持xls、xlsx格式文件'));
      return;
    }
    setImportTenantPlanFileList((prev) => [...prev, rcFile]);
    setTimeout(() => {
      onSuccess?.(rcFile);
    }, 200);
  };

  const handleRemove = (file: UploadFile) => {
    setImportTenantPlanFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleImportTenantPlanCancel = () => {
    onImportTenantPlanCancel();
    setIsUploadShow(true);
  };

  return (
    <Modal
      title="套餐信息导入"
      open={isImportTenantPlanModalVisible}
      onCancel={handleImportTenantPlanCancel}
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
              fileList={ tenantPlanImportFileList}
              customRequest={customUploadRequest as any}
            >
              <p className="flex justify-center items-center text-primary">
                <Inbox />
              </p>
              <p>{'点击或拖拽到此上传'}</p>
              <p className="text-gray-500">仅支持上传xls、xlsx格式的文件</p>
            </Upload.Dragger>
          </div>
          <div onClick={handleTenantPlanExportTemplate} className="cursor-pointer mt-4 text-blue-600">
            下载模板
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={ TenantPlanColumns}
            dataSource={ CreateTenantPlanList}
            pagination={false}
            bordered={false}
            rowKey={'id'}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImportTenantPlanComponent;