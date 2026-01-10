// SPDX-License-Identifier: MIT

import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
} from 'antd';
import { ReportBalanceSheetDetail } from '@/types/report-balance-sheet';
import React from 'react';
// 导入会计格式化工具
import { formatAccounting } from '@/utils/math-util';

interface ReportBalanceSheetDetailDrawerProps {
  isReportBalanceSheetDetailDrawerVisible: boolean;
  onReportBalanceSheetDetailClose: () => void;
  reportBalanceSheetDetail: ReportBalanceSheetDetail | undefined;
  loading: boolean
}

const ReportBalanceSheetDetailComponent: React.FC<ReportBalanceSheetDetailDrawerProps> = ({
  isReportBalanceSheetDetailDrawerVisible,
  onReportBalanceSheetDetailClose,
  reportBalanceSheetDetail,
  loading
}) => {

  return (
    <Drawer
      title="资产负债详情"
      open={isReportBalanceSheetDetailDrawerVisible}
      onReportBalanceSheetDetailClose={onReportBalanceSheetDetailClose}
      destroyOnHidden
      loading={loading}
      width={600}
    >
      {reportBalanceSheetDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="股票代码">
            {reportBalanceSheetDetail.stock_code}
          </Descriptions.Item>
          <Descriptions.Item label="股票简称">
            {reportBalanceSheetDetail.stock_name}
          </Descriptions.Item>
          <Descriptions.Item label="交易所">
            {reportBalanceSheetDetail.exchange}
          </Descriptions.Item>

          {/* 财务金额字段 - 使用 formatAccounting 并添加单位 */}
          <Descriptions.Item label="资产-货币资金">
            {formatAccounting(reportBalanceSheetDetail.asset_cash)} 元
          </Descriptions.Item>
          <Descriptions.Item label="资产-应收账款">
            {formatAccounting(reportBalanceSheetDetail.asset_receivables)} 元
          </Descriptions.Item>
          <Descriptions.Item label="资产-存货">
            {formatAccounting(reportBalanceSheetDetail.asset_inventory)} 元
          </Descriptions.Item>
          <Descriptions.Item label="资产-总资产">
            {formatAccounting(reportBalanceSheetDetail.asset_total)} 元
          </Descriptions.Item>
          
          {/* 比率类字段 - 添加百分比单位 */}
          <Descriptions.Item label="资产-总资产同比">
            {reportBalanceSheetDetail.asset_total_yoy} %
          </Descriptions.Item>
          
          <Descriptions.Item label="负债-应付账款">
            {formatAccounting(reportBalanceSheetDetail.liability_payables)} 元
          </Descriptions.Item>
          <Descriptions.Item label="负债-总负债">
            {formatAccounting(reportBalanceSheetDetail.liability_total)} 元
          </Descriptions.Item>
          <Descriptions.Item label="负债-预收账款">
            {formatAccounting(reportBalanceSheetDetail.liability_advance_receipts)} 元
          </Descriptions.Item>
          
          <Descriptions.Item label="负债-总负债同比">
            {reportBalanceSheetDetail.liability_total_yoy} %
          </Descriptions.Item>
          <Descriptions.Item label="资产负债率">
            {reportBalanceSheetDetail.asset_liability_ratio} %
          </Descriptions.Item>
          
          <Descriptions.Item label="股东权益合计">
            {formatAccounting(reportBalanceSheetDetail.shareholder_equity)} 元
          </Descriptions.Item>

          <Descriptions.Item label="年份">
            {reportBalanceSheetDetail.year} 年
          </Descriptions.Item>
          <Descriptions.Item label="季度">
            {reportBalanceSheetDetail.quarter}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {dayjs(reportBalanceSheetDetail.updated_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default ReportBalanceSheetDetailComponent;