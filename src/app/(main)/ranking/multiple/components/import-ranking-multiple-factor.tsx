// SPDX-License-Identifier: MIT
import { exportRankingMultipleFactorTemplate } from '@/service/ranking-multiple-factor';
import { CreateRankingMultipleFactor, ImportRankingMultipleFactorsResponse} from '@/types/ranking-multiple-factor';
import { Inbox } from 'lucide-react';
import { Button, Modal, Table, Upload, UploadFile, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { UploadRequestOption } from 'rc-upload/es/interface';
import type { RcFile } from 'rc-upload/lib/interface';
import React, { useState } from 'react';

interface ImportRankingMultipleFactorProps {
  isImportRankingMultipleFactorModalVisible: boolean;
  isImportRankingMultipleFactorLoading: boolean;
  onImportRankingMultipleFactorCancel: () => void;
  onImportRankingMultipleFactorFinish: (fileList: RcFile[]) => Promise<ImportRankingMultipleFactorsResponse>;
  handleImportRankingMultipleFactor: () => void;
}

const ImportRankingMultipleFactorComponent: React.FC<ImportRankingMultipleFactorProps> = ({
  isImportRankingMultipleFactorModalVisible,
  onImportRankingMultipleFactorCancel,
  onImportRankingMultipleFactorFinish,
  isImportRankingMultipleFactorLoading,
  handleImportRankingMultipleFactor,
}) => {
  const [rankingMultipleFactorImportFileList, setImportRankingMultipleFactorFileList] = useState<RcFile[]>([]);
  const [CreateRankingMultipleFactorList, setCreateRankingMultipleFactorList] = useState<CreateRankingMultipleFactor[]>([]);
  const [isUploadShow, setIsUploadShow] = useState<boolean>(true);

  const footerButtons = () => [
    <Button key="back" onClick={handleImportRankingMultipleFactorCancel}>
      取消
    </Button>,
    <Button key="submit" type="primary" loading={isImportRankingMultipleFactorLoading} onClick={handleImportRankingMultipleFactorConfirm}>
      确定
    </Button>,
  ];

  const handleImportRankingMultipleFactorConfirm = async () => {
    if (isUploadShow) {
      if (rankingMultipleFactorImportFileList.length === 0) {
        message.warning('请先选择文件');
        return;
      }
      try {
        const importRankingMultipleFactorResponse = await onImportRankingMultipleFactorFinish(rankingMultipleFactorImportFileList);
        setIsUploadShow(false);
        setCreateRankingMultipleFactorList(importRankingMultipleFactorResponse.rankingMultipleFactors);
      } finally {
        setImportRankingMultipleFactorFileList([]);
      }
    } else {
      handleImportRankingMultipleFactor();
      setIsUploadShow(true);
    }
  };
  // 表格列信息
  const RankingMultipleFactorColumns: ColumnsType<CreateRankingMultipleFactor> = [
    {
      title: "序号",
      dataIndex: "No",
      key: "No",
      render: (_: number, _record: CreateRankingMultipleFactor, rowIndex: number) => rowIndex + 1,
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
      title: "所属行业",
      dataIndex: "industry",
      key: "industry",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "查询周期",
      dataIndex: "query_period",
      key: "query_period",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净资产收益率加权平均",
      dataIndex: "roe_weighted_avg",
      key: "roe_weighted_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净资产收益率算术平均",
      dataIndex: "roe_arithmetic_avg",
      key: "roe_arithmetic_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净资产收益率中位数",
      dataIndex: "roe_median",
      key: "roe_median",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净资产收益率复合增长率",
      dataIndex: "roe_cagr",
      key: "roe_cagr",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净资产收益率波动率",
      dataIndex: "roe_volatility",
      key: "roe_volatility",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营收增长率加权平均",
      dataIndex: "revenue_growth_weighted_avg",
      key: "revenue_growth_weighted_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营收增长率算术平均",
      dataIndex: "revenue_growth_arithmetic_avg",
      key: "revenue_growth_arithmetic_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营收增长率中位数",
      dataIndex: "revenue_growth_median",
      key: "revenue_growth_median",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营收增长率复合增长率",
      dataIndex: "revenue_growth_cagr",
      key: "revenue_growth_cagr",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "营收增长率波动率",
      dataIndex: "revenue_growth_volatility",
      key: "revenue_growth_volatility",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净利润增长率加权平均",
      dataIndex: "profit_growth_weighted_avg",
      key: "profit_growth_weighted_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净利润增长率算术平均",
      dataIndex: "profit_growth_arithmetic_avg",
      key: "profit_growth_arithmetic_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净利润增长率中位数",
      dataIndex: "profit_growth_median",
      key: "profit_growth_median",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净利润增长率复合增长率",
      dataIndex: "profit_growth_cagr",
      key: "profit_growth_cagr",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "净利润增长率波动率",
      dataIndex: "profit_growth_volatility",
      key: "profit_growth_volatility",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "现金流利润比加权平均",
      dataIndex: "cashflow_ratio_weighted_avg",
      key: "cashflow_ratio_weighted_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "现金流利润比算术平均",
      dataIndex: "cashflow_ratio_arithmetic_avg",
      key: "cashflow_ratio_arithmetic_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "现金流利润比中位数",
      dataIndex: "cashflow_ratio_median",
      key: "cashflow_ratio_median",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "现金流利润比复合增长率",
      dataIndex: "cashflow_ratio_cagr",
      key: "cashflow_ratio_cagr",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "现金流利润比波动率",
      dataIndex: "cashflow_ratio_volatility",
      key: "cashflow_ratio_volatility",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "资产负债率加权平均",
      dataIndex: "debt_ratio_weighted_avg",
      key: "debt_ratio_weighted_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "资产负债率算术平均",
      dataIndex: "debt_ratio_arithmetic_avg",
      key: "debt_ratio_arithmetic_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "资产负债率中位数",
      dataIndex: "debt_ratio_median",
      key: "debt_ratio_median",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "资产负债率复合增长率",
      dataIndex: "debt_ratio_cagr",
      key: "debt_ratio_cagr",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "资产负债率波动率",
      dataIndex: "debt_ratio_volatility",
      key: "debt_ratio_volatility",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股息率加权平均",
      dataIndex: "dividend_rate_weighted_avg",
      key: "dividend_rate_weighted_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股息率算术平均",
      dataIndex: "dividend_rate_arithmetic_avg",
      key: "dividend_rate_arithmetic_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股息率中位数",
      dataIndex: "dividend_rate_median",
      key: "dividend_rate_median",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股息率复合增长率",
      dataIndex: "dividend_rate_cagr",
      key: "dividend_rate_cagr",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股息率波动率",
      dataIndex: "dividend_rate_volatility",
      key: "dividend_rate_volatility",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股息支付率加权平均",
      dataIndex: "payout_rate_weighted_avg",
      key: "payout_rate_weighted_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股息支付率算术平均",
      dataIndex: "payout_rate_arithmetic_avg",
      key: "payout_rate_arithmetic_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股息支付率中位数",
      dataIndex: "payout_rate_median",
      key: "payout_rate_median",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股息支付率复合增长率",
      dataIndex: "payout_rate_cagr",
      key: "payout_rate_cagr",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "股息支付率波动率",
      dataIndex: "payout_rate_volatility",
      key: "payout_rate_volatility",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "市盈率加权平均",
      dataIndex: "pe_ratio_weighted_avg",
      key: "pe_ratio_weighted_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "市盈率算术平均",
      dataIndex: "pe_ratio_arithmetic_avg",
      key: "pe_ratio_arithmetic_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "市盈率中位数",
      dataIndex: "pe_ratio_median",
      key: "pe_ratio_median",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "市盈率复合增长率",
      dataIndex: "pe_ratio_cagr",
      key: "pe_ratio_cagr",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "市盈率波动率",
      dataIndex: "pe_ratio_volatility",
      key: "pe_ratio_volatility",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "PEG指标加权平均",
      dataIndex: "peg_ratio_weighted_avg",
      key: "peg_ratio_weighted_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "PEG指标算术平均",
      dataIndex: "peg_ratio_arithmetic_avg",
      key: "peg_ratio_arithmetic_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "PEG指标中位数",
      dataIndex: "peg_ratio_median",
      key: "peg_ratio_median",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "PEG指标复合增长率",
      dataIndex: "peg_ratio_cagr",
      key: "peg_ratio_cagr",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "PEG指标波动率",
      dataIndex: "peg_ratio_volatility",
      key: "peg_ratio_volatility",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "市净率加权平均",
      dataIndex: "pb_ratio_weighted_avg",
      key: "pb_ratio_weighted_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "市净率算术平均",
      dataIndex: "pb_ratio_arithmetic_avg",
      key: "pb_ratio_arithmetic_avg",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "市净率中位数",
      dataIndex: "pb_ratio_median",
      key: "pb_ratio_median",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "市净率复合增长率",
      dataIndex: "pb_ratio_cagr",
      key: "pb_ratio_cagr",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "市净率波动率",
      dataIndex: "pb_ratio_volatility",
      key: "pb_ratio_volatility",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "排名",
      dataIndex: "rank",
      key: "rank",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "行业排名",
      dataIndex: "industry_rank",
      key: "industry_rank",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "总分",
      dataIndex: "score",
      key: "score",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "稳健分",
      dataIndex: "c2_score",
      key: "c2_score",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "进取分",
      dataIndex: "c5_score",
      key: "c5_score",
      render: (text) => (text ? text : "-"),
    },
    {
      title: "错误信息",
      dataIndex: "errMsg",
      key: "errMsg",
      render: (text) => (text ? text : "-"),
    },
  ];

  const handleRankingMultipleFactorExportTemplate = async () => {
    await exportRankingMultipleFactorTemplate();
  };

  const customUploadRequest = async (options: UploadRequestOption): Promise<void | undefined> => {
    const { onSuccess, onError, file } = options;
    const rcFile = file as RcFile;
    if (!rcFile.name.endsWith('.xls') && !rcFile.name.endsWith('.xlsx')) {
      message.error('仅支持xls、xlsx格式文件');
      onError?.(new Error('仅支持xls、xlsx格式文件'));
      return;
    }
    setImportRankingMultipleFactorFileList((prev) => [...prev, rcFile]);
    setTimeout(() => {
      onSuccess?.(rcFile);
    }, 200);
  };

  const handleRemove = (file: UploadFile) => {
    setImportRankingMultipleFactorFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const handleImportRankingMultipleFactorCancel = () => {
    onImportRankingMultipleFactorCancel();
    setIsUploadShow(true);
  };

  return (
    <Modal
      title="多因子排名导入"
      open={isImportRankingMultipleFactorModalVisible}
      onCancel={handleImportRankingMultipleFactorCancel}
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
              fileList={ rankingMultipleFactorImportFileList}
              customRequest={customUploadRequest as any}
            >
              <p className="flex justify-center items-center text-primary">
                <Inbox />
              </p>
              <p>{'点击或拖拽到此上传'}</p>
              <p className="text-gray-500">仅支持上传xls、xlsx格式的文件</p>
            </Upload.Dragger>
          </div>
          <div onClick={handleRankingMultipleFactorExportTemplate} className="cursor-pointer mt-4 text-blue-600">
            下载模板
          </div>
        </div>
      ) : (
        <div>
          <Table
            columns={ RankingMultipleFactorColumns}
            dataSource={ CreateRankingMultipleFactorList}
            pagination={false}
            bordered={false}
            rowKey={'id'}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImportRankingMultipleFactorComponent;