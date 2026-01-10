// SPDX-License-Identifier: MIT
import { exportStockTemplate } from '@/service/stock';
import { CreateStock, ImportStocksResponse} from '@/types/stock';
import { Inbox } from 'lucide-react';
import { Button, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { UploadRequestOption } from 'rc-upload/es/interface';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

interface ImportStockProps {
  isImportStockModalVisible: boolean;
  isImportStockLoading: boolean;
  onImportStockCancel: () => void;
  onImportStockFinish: (fileList: RcFile[]) => Promise<ImportStocksResponse>;
  handleImportStock: () => void;
}

const ImportStockComponent: React.FC<ImportStockProps> = ({
  isImportStockModalVisible,
  onImportStockCancel,
  onImportStockFinish,
  isImportStockLoading,
  handleImportStock,
}) => {
  const [stockImportFileList, setImportStockFileList] = useState<RcFile[]>([]);
  const [CreateStockList, setCreateStockList] = useState<CreateStock[]>([]);
  const [isUploadShow, setIsUploadShow] = useState<boolean>(true);

  const footerButtons = () => [
    <Button key="back" onClick={handleImportStockCancel}>
      取消
    </Button>,
    <Button key="submit" type="primary" loading={isImportStockLoading} onClick={handleImportStockConfirm}>
      确定
    </Button>,
  ];

  const handleImportStockConfirm = async () => {
    if (isUploadShow) {
      if (stockImportFileList.length === 0) {
        message.warning('请先选择文件');
        return;
      }
      try {
        const importStockResponse = await onImportStockFinish(stockImportFileList);
        setIsUploadShow(false);
        setCreateStockList(importStockResponse.stocks);
      } finally {
        setImportStockFileList([]);
      }
    } else {
      handleImportStock();
      setIsUploadShow(true);
    }
  };
  // 表格列信息
  const StockColumns: ColumnsType<CreateStock> = [
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: CreateStock, rowIndex: number) => rowIndex + 1,
      width: "8%",
    },
    {
      title: "股票编号",
      dataIndex: "stock_code",
      key: "stock_code",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股票名称",
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
      title: "上市日期",
      dataIndex: "listing_date",
      key: "listing_date",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "所属行业",
      dataIndex: "industry",
      key: "industry",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "省份",
      dataIndex: "province",
      key: "province",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "城市",
      dataIndex: "city",
      key: "city",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "公司全称",
      dataIndex: "company_name",
      key: "company_name",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "英文名称",
      dataIndex: "english_name",
      key: "english_name",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "曾用简称",
      dataIndex: "former_name",
      key: "former_name",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "所属市场",
      dataIndex: "market_type",
      key: "market_type",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "法人代表",
      dataIndex: "legal_representative",
      key: "legal_representative",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "注册资金",
      dataIndex: "registered_capital",
      key: "registered_capital",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "成立日期",
      dataIndex: "establish_date",
      key: "establish_date",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "官网",
      dataIndex: "website",
      key: "website",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "电子邮箱",
      dataIndex: "email",
      key: "email",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "联系电话",
      dataIndex: "telephone",
      key: "telephone",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "传真",
      dataIndex: "fax",
      key: "fax",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "注册地址",
      dataIndex: "registered_address",
      key: "registered_address",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "办公地址",
      dataIndex: "business_address",
      key: "business_address",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "邮政编码",
      dataIndex: "postal_code",
      key: "postal_code",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "主营业务",
      dataIndex: "main_business",
      key: "main_business",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "经营范围",
      dataIndex: "business_scope",
      key: "business_scope",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "机构简介",
      dataIndex: "company_profile",
      key: "company_profile",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "数据来源",
      dataIndex: "data_source",
      key: "data_source",
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

  const handleStockExportTemplate = async () => {
    await exportStockTemplate();
  };

  const customUploadRequest = async (options: UploadRequestOption): Promise<void | undefined> => {
    const { onSuccess, onError, file } = options;
    const rcFile = file as RcFile;
    if (!rcFile.name.endsWith('.xls') && !rcFile.name.endsWith('.xlsx')) {
      message.error('仅支持xls、xlsx格式文件');
      onError?.(new Error('仅支持xls、xlsx格式文件'));
      return;
    }
    setImportStockFileList((prev) => [...prev, rcFile]);
    setTimeout(() => {
      onSuccess?.(rcFile);
    }, 200);
  };

  const handleRemove = (file: UploadFile) => {
    setImportStockFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleImportStockCancel = () => {
    onImportStockCancel();
    setIsUploadShow(true);
  };

  return (
    <Modal
      title="股票基础信息导入"
      open={isImportStockModalVisible}
      onCancel={handleImportStockCancel}
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
              fileList={ stockImportFileList}
              customRequest={customUploadRequest as any}
            >
              <p className="flex justify-center items-center text-primary">
                <Inbox />
              </p>
              <p>{'点击或拖拽到此上传'}</p>
              <p className="text-gray-500">仅支持上传xls、xlsx格式的文件</p>
            </Upload.Dragger>
          </div>
          <div onClick={handleStockExportTemplate} className="cursor-pointer mt-4 text-blue-600">
            下载模板
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={ StockColumns}
            dataSource={ CreateStockList}
            pagination={false}
            bordered={false}
            rowKey={'id'}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImportStockComponent;