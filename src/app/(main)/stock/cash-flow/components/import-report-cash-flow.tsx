// SPDX-License-Identifier: MIT
import { exportReportCashFlowTemplate } from '@/service/report-cash-flow';
import { CreateReportCashFlow, ImportReportCashFlowsResponse} from '@/types/report-cash-flow';
import { Inbox } from 'lucide-react';
import { Button, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { UploadRequestOption } from 'rc-upload/es/interface';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

interface ImportReportCashFlowProps {
  isImportReportCashFlowModalVisible: boolean;
  isImportReportCashFlowLoading: boolean;
  onImportReportCashFlowCancel: () => void;
  onImportReportCashFlowFinish: (fileList: RcFile[]) => Promise<ImportReportCashFlowsResponse>;
  handleImportReportCashFlow: () => void;
}

const ImportReportCashFlowComponent: React.FC<ImportReportCashFlowProps> = ({
  isImportReportCashFlowModalVisible,
  onImportReportCashFlowCancel,
  onImportReportCashFlowFinish,
  isImportReportCashFlowLoading,
  handleImportReportCashFlow,
}) => {
  const [reportCashFlowImportFileList, setImportReportCashFlowFileList] = useState<RcFile[]>([]);
  const [CreateReportCashFlowList, setCreateReportCashFlowList] = useState<CreateReportCashFlow[]>([]);
  const [isUploadShow, setIsUploadShow] = useState<boolean>(true);

  const footerButtons = () => [
    <Button key="back" onClick={handleImportReportCashFlowCancel}>
      取消
    </Button>,
    <Button key="submit" type="primary" loading={isImportReportCashFlowLoading} onClick={handleImportReportCashFlowConfirm}>
      确定
    </Button>,
  ];

  const handleImportReportCashFlowConfirm = async () => {
    if (isUploadShow) {
      if (reportCashFlowImportFileList.length === 0) {
        message.warning('请先选择文件');
        return;
      }
      try {
        const importReportCashFlowResponse = await onImportReportCashFlowFinish(reportCashFlowImportFileList);
        setIsUploadShow(false);
        setCreateReportCashFlowList(importReportCashFlowResponse.reportCashFlows);
      } finally {
        setImportReportCashFlowFileList([]);
      }
    } else {
      handleImportReportCashFlow();
      setIsUploadShow(true);
    }
  };
  // 表格列信息
  const ReportCashFlowColumns: ColumnsType<CreateReportCashFlow> = [
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: CreateReportCashFlow, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "股票代码",
      dataIndex: "stock_code",
      key: "stock_code",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股票简称",
      dataIndex: "stock_name",
      key: "stock_name",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "交易所",
      dataIndex: "exchange",
      key: "exchange",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净现金流-净现金流",
      dataIndex: "net_cash_flow",
      key: "net_cash_flow",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净现金流-同比增长",
      dataIndex: "net_cash_flow_yoy",
      key: "net_cash_flow_yoy",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "经营性现金流-现金流量净额",
      dataIndex: "operating_cash_flow",
      key: "operating_cash_flow",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "经营性现金流-净现金流占比",
      dataIndex: "operating_cash_flow_ratio",
      key: "operating_cash_flow_ratio",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "投资性现金流-现金流量净额",
      dataIndex: "investing_cash_flow",
      key: "investing_cash_flow",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "投资性现金流-净现金流占比",
      dataIndex: "investing_cash_flow_ratio",
      key: "investing_cash_flow_ratio",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "融资性现金流-现金流量净额",
      dataIndex: "financing_cash_flow",
      key: "financing_cash_flow",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "融资性现金流-净现金流占比",
      dataIndex: "financing_cash_flow_ratio",
      key: "financing_cash_flow_ratio",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "公告日期",
      dataIndex: "announcement_date",
      key: "announcement_date",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "年份",
      dataIndex: "year",
      key: "year",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "季度",
      dataIndex: "quarter",
      key: "quarter",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "错误信息",
      dataIndex: "errMsg",
      key: "errMsg",
      render: (text) => (text ? text : "-"),
    },
  ];

  const handleReportCashFlowExportTemplate = async () => {
    await exportReportCashFlowTemplate();
  };

  const customUploadRequest = async (options: UploadRequestOption): Promise<void | undefined> => {
    const { onSuccess, onError, file } = options;
    const rcFile = file as RcFile;
    if (!rcFile.name.endsWith('.xls') && !rcFile.name.endsWith('.xlsx')) {
      message.error('仅支持xls、xlsx格式文件');
      onError?.(new Error('仅支持xls、xlsx格式文件'));
      return;
    }
    setImportReportCashFlowFileList((prev) => [...prev, rcFile]);
    setTimeout(() => {
      onSuccess?.(rcFile);
    }, 200);
  };

  const handleRemove = (file: UploadFile) => {
    setImportReportCashFlowFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleImportReportCashFlowCancel = () => {
    onImportReportCashFlowCancel();
    setIsUploadShow(true);
  };

  return (
    <Modal
      title="现金流量导入"
      open={isImportReportCashFlowModalVisible}
      onCancel={handleImportReportCashFlowCancel}
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
              fileList={ reportCashFlowImportFileList}
              customRequest={customUploadRequest as any}
            >
              <p className="flex justify-center items-center text-primary">
                <Inbox />
              </p>
              <p>{'点击或拖拽到此上传'}</p>
              <p className="text-gray-500">仅支持上传xls、xlsx格式的文件</p>
            </Upload.Dragger>
          </div>
          <div onClick={handleReportCashFlowExportTemplate} className="cursor-pointer mt-4 text-blue-600">
            下载模板
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={ ReportCashFlowColumns}
            dataSource={ CreateReportCashFlowList}
            pagination={false}
            bordered={false}
            rowKey={'id'}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImportReportCashFlowComponent;