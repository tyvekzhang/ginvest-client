// SPDX-License-Identifier: MIT
import { exportReportIncomeStatementTemplate } from '@/service/report-income-statement';
import { CreateReportIncomeStatement, ImportReportIncomeStatementsResponse} from '@/types/report-income-statement';
import { Inbox } from 'lucide-react';
import { Button, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { UploadRequestOption } from 'rc-upload/es/interface';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

interface ImportReportIncomeStatementProps {
  isImportReportIncomeStatementModalVisible: boolean;
  isImportReportIncomeStatementLoading: boolean;
  onImportReportIncomeStatementCancel: () => void;
  onImportReportIncomeStatementFinish: (fileList: RcFile[]) => Promise<ImportReportIncomeStatementsResponse>;
  handleImportReportIncomeStatement: () => void;
}

const ImportReportIncomeStatementComponent: React.FC<ImportReportIncomeStatementProps> = ({
  isImportReportIncomeStatementModalVisible,
  onImportReportIncomeStatementCancel,
  onImportReportIncomeStatementFinish,
  isImportReportIncomeStatementLoading,
  handleImportReportIncomeStatement,
}) => {
  const [reportIncomeStatementImportFileList, setImportReportIncomeStatementFileList] = useState<RcFile[]>([]);
  const [CreateReportIncomeStatementList, setCreateReportIncomeStatementList] = useState<CreateReportIncomeStatement[]>([]);
  const [isUploadShow, setIsUploadShow] = useState<boolean>(true);

  const footerButtons = () => [
    <Button key="back" onClick={handleImportReportIncomeStatementCancel}>
      取消
    </Button>,
    <Button key="submit" type="primary" loading={isImportReportIncomeStatementLoading} onClick={handleImportReportIncomeStatementConfirm}>
      确定
    </Button>,
  ];

  const handleImportReportIncomeStatementConfirm = async () => {
    if (isUploadShow) {
      if (reportIncomeStatementImportFileList.length === 0) {
        message.warning('请先选择文件');
        return;
      }
      try {
        const importReportIncomeStatementResponse = await onImportReportIncomeStatementFinish(reportIncomeStatementImportFileList);
        setIsUploadShow(false);
        setCreateReportIncomeStatementList(importReportIncomeStatementResponse.reportIncomeStatements);
      } finally {
        setImportReportIncomeStatementFileList([]);
      }
    } else {
      handleImportReportIncomeStatement();
      setIsUploadShow(true);
    }
  };
  // 表格列信息
  const ReportIncomeStatementColumns: ColumnsType<CreateReportIncomeStatement> = [
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: CreateReportIncomeStatement, rowIndex: number) => rowIndex + 1,
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
      title: "净利润",
      dataIndex: "net_profit",
      key: "net_profit",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净利润同比",
      dataIndex: "net_profit_yoy",
      key: "net_profit_yoy",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营业总收入",
      dataIndex: "total_operating_income",
      key: "total_operating_income",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营业总收入同比",
      dataIndex: "total_operating_income_yoy",
      key: "total_operating_income_yoy",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营业总支出-营业支出",
      dataIndex: "operating_expenses",
      key: "operating_expenses",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营业总支出-销售费用",
      dataIndex: "sales_expenses",
      key: "sales_expenses",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营业总支出-管理费用",
      dataIndex: "management_expenses",
      key: "management_expenses",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营业总支出-财务费用",
      dataIndex: "financial_expenses",
      key: "financial_expenses",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营业总支出-营业总支出",
      dataIndex: "total_operating_expenses",
      key: "total_operating_expenses",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营业利润",
      dataIndex: "operating_profit",
      key: "operating_profit",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "利润总额",
      dataIndex: "total_profit",
      key: "total_profit",
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

  const handleReportIncomeStatementExportTemplate = async () => {
    await exportReportIncomeStatementTemplate();
  };

  const customUploadRequest = async (options: UploadRequestOption): Promise<void | undefined> => {
    const { onSuccess, onError, file } = options;
    const rcFile = file as RcFile;
    if (!rcFile.name.endsWith('.xls') && !rcFile.name.endsWith('.xlsx')) {
      message.error('仅支持xls、xlsx格式文件');
      onError?.(new Error('仅支持xls、xlsx格式文件'));
      return;
    }
    setImportReportIncomeStatementFileList((prev) => [...prev, rcFile]);
    setTimeout(() => {
      onSuccess?.(rcFile);
    }, 200);
  };

  const handleRemove = (file: UploadFile) => {
    setImportReportIncomeStatementFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleImportReportIncomeStatementCancel = () => {
    onImportReportIncomeStatementCancel();
    setIsUploadShow(true);
  };

  return (
    <Modal
      title="利润导入"
      open={isImportReportIncomeStatementModalVisible}
      onCancel={handleImportReportIncomeStatementCancel}
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
              fileList={ reportIncomeStatementImportFileList}
              customRequest={customUploadRequest as any}
            >
              <p className="flex justify-center items-center text-primary">
                <Inbox />
              </p>
              <p>{'点击或拖拽到此上传'}</p>
              <p className="text-gray-500">仅支持上传xls、xlsx格式的文件</p>
            </Upload.Dragger>
          </div>
          <div onClick={handleReportIncomeStatementExportTemplate} className="cursor-pointer mt-4 text-blue-600">
            下载模板
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={ ReportIncomeStatementColumns}
            dataSource={ CreateReportIncomeStatementList}
            pagination={false}
            bordered={false}
            rowKey={'id'}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImportReportIncomeStatementComponent;