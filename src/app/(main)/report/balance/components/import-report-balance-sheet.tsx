// SPDX-License-Identifier: MIT
import { exportReportBalanceSheetTemplate } from '@/service/report-balance-sheet';
import { CreateReportBalanceSheet, ImportReportBalanceSheetsResponse} from '@/types/report-balance-sheet';
import { Inbox } from 'lucide-react';
import { Button, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { UploadRequestOption } from 'rc-upload/es/interface';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

interface ImportReportBalanceSheetProps {
  isImportReportBalanceSheetModalVisible: boolean;
  isImportReportBalanceSheetLoading: boolean;
  onImportReportBalanceSheetCancel: () => void;
  onImportReportBalanceSheetFinish: (fileList: RcFile[]) => Promise<ImportReportBalanceSheetsResponse>;
  handleImportReportBalanceSheet: () => void;
}

const ImportReportBalanceSheetComponent: React.FC<ImportReportBalanceSheetProps> = ({
  isImportReportBalanceSheetModalVisible,
  onImportReportBalanceSheetCancel,
  onImportReportBalanceSheetFinish,
  isImportReportBalanceSheetLoading,
  handleImportReportBalanceSheet,
}) => {
  const [reportBalanceSheetImportFileList, setImportReportBalanceSheetFileList] = useState<RcFile[]>([]);
  const [CreateReportBalanceSheetList, setCreateReportBalanceSheetList] = useState<CreateReportBalanceSheet[]>([]);
  const [isUploadShow, setIsUploadShow] = useState<boolean>(true);

  const footerButtons = () => [
    <Button key="back" onClick={handleImportReportBalanceSheetCancel}>
      取消
    </Button>,
    <Button key="submit" type="primary" loading={isImportReportBalanceSheetLoading} onClick={handleImportReportBalanceSheetConfirm}>
      确定
    </Button>,
  ];

  const handleImportReportBalanceSheetConfirm = async () => {
    if (isUploadShow) {
      if (reportBalanceSheetImportFileList.length === 0) {
        message.warning('请先选择文件');
        return;
      }
      try {
        const importReportBalanceSheetResponse = await onImportReportBalanceSheetFinish(reportBalanceSheetImportFileList);
        setIsUploadShow(false);
        setCreateReportBalanceSheetList(importReportBalanceSheetResponse.reportBalanceSheets);
      } finally {
        setImportReportBalanceSheetFileList([]);
      }
    } else {
      handleImportReportBalanceSheet();
      setIsUploadShow(true);
    }
  };
  // 表格列信息
  const ReportBalanceSheetColumns: ColumnsType<CreateReportBalanceSheet> = [
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: CreateReportBalanceSheet, rowIndex: number) => rowIndex + 1,
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
      title: "资产-货币资金",
      dataIndex: "asset_cash",
      key: "asset_cash",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "资产-应收账款",
      dataIndex: "asset_receivables",
      key: "asset_receivables",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "资产-存货",
      dataIndex: "asset_inventory",
      key: "asset_inventory",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "资产-总资产",
      dataIndex: "asset_total",
      key: "asset_total",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "资产-总资产同比",
      dataIndex: "asset_total_yoy",
      key: "asset_total_yoy",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "负债-应付账款",
      dataIndex: "liability_payables",
      key: "liability_payables",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "负债-总负债",
      dataIndex: "liability_total",
      key: "liability_total",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "负债-预收账款",
      dataIndex: "liability_advance_receipts",
      key: "liability_advance_receipts",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "负债-总负债同比",
      dataIndex: "liability_total_yoy",
      key: "liability_total_yoy",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "资产负债率",
      dataIndex: "asset_liability_ratio",
      key: "asset_liability_ratio",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股东权益合计",
      dataIndex: "shareholder_equity",
      key: "shareholder_equity",
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

  const handleReportBalanceSheetExportTemplate = async () => {
    await exportReportBalanceSheetTemplate();
  };

  const customUploadRequest = async (options: UploadRequestOption): Promise<void | undefined> => {
    const { onSuccess, onError, file } = options;
    const rcFile = file as RcFile;
    if (!rcFile.name.endsWith('.xls') && !rcFile.name.endsWith('.xlsx')) {
      message.error('仅支持xls、xlsx格式文件');
      onError?.(new Error('仅支持xls、xlsx格式文件'));
      return;
    }
    setImportReportBalanceSheetFileList((prev) => [...prev, rcFile]);
    setTimeout(() => {
      onSuccess?.(rcFile);
    }, 200);
  };

  const handleRemove = (file: UploadFile) => {
    setImportReportBalanceSheetFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleImportReportBalanceSheetCancel = () => {
    onImportReportBalanceSheetCancel();
    setIsUploadShow(true);
  };

  return (
    <Modal
      title="资产负债导入"
      open={isImportReportBalanceSheetModalVisible}
      onCancel={handleImportReportBalanceSheetCancel}
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
              fileList={ reportBalanceSheetImportFileList}
              customRequest={customUploadRequest as any}
            >
              <p className="flex justify-center items-center text-primary">
                <Inbox />
              </p>
              <p>{'点击或拖拽到此上传'}</p>
              <p className="text-gray-500">仅支持上传xls、xlsx格式的文件</p>
            </Upload.Dragger>
          </div>
          <div onClick={handleReportBalanceSheetExportTemplate} className="cursor-pointer mt-4 text-blue-600">
            下载模板
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={ ReportBalanceSheetColumns}
            dataSource={ CreateReportBalanceSheetList}
            pagination={false}
            bordered={false}
            rowKey={'id'}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImportReportBalanceSheetComponent;