// SPDX-License-Identifier: MIT

import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
} from 'antd';
import { ReportIncomeStatementDetail } from '@/types/report-income-statement';
import React from 'react';
// 导入会计格式化工具
import { formatAccounting } from '@/utils/math-util';

interface ReportIncomeStatementDetailDrawerProps {
  isReportIncomeStatementDetailDrawerVisible: boolean;
  onReportIncomeStatementDetailClose: () => void;
  reportIncomeStatementDetail: ReportIncomeStatementDetail | undefined;
  loading: boolean
}

const ReportIncomeStatementDetailComponent: React.FC<ReportIncomeStatementDetailDrawerProps> = ({
  isReportIncomeStatementDetailDrawerVisible,
  onReportIncomeStatementDetailClose,
  reportIncomeStatementDetail,
  loading
}) => {

  return (
    <Drawer
      title="利润详情"
      open={isReportIncomeStatementDetailDrawerVisible}
      onClose={onReportIncomeStatementDetailClose}
      destroyOnHidden
      loading={loading}
      width={600}
    >
      {reportIncomeStatementDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="股票代码">
            {reportIncomeStatementDetail.stock_code}
          </Descriptions.Item>
          <Descriptions.Item label="股票简称">
            {reportIncomeStatementDetail.stock_name}
          </Descriptions.Item>
          <Descriptions.Item label="交易所">
            {reportIncomeStatementDetail.exchange}
          </Descriptions.Item>

          {/* 利润与收入字段 - 使用 formatAccounting 并添加单位 */}
          <Descriptions.Item label="净利润">
            {formatAccounting(reportIncomeStatementDetail.net_profit)} 元
          </Descriptions.Item>
          <Descriptions.Item label="净利润同比">
            {reportIncomeStatementDetail.net_profit_yoy} %
          </Descriptions.Item>
          <Descriptions.Item label="营业总收入">
            {formatAccounting(reportIncomeStatementDetail.total_operating_income)} 元
          </Descriptions.Item>
          <Descriptions.Item label="营业总收入同比">
            {reportIncomeStatementDetail.total_operating_income_yoy} %
          </Descriptions.Item>

          {/* 支出明细字段 */}
          <Descriptions.Item label="营业总支出-营业支出">
            {formatAccounting(reportIncomeStatementDetail.operating_expenses)} 元
          </Descriptions.Item>
          <Descriptions.Item label="营业总支出-销售费用">
            {formatAccounting(reportIncomeStatementDetail.sales_expenses)} 元
          </Descriptions.Item>
          <Descriptions.Item label="营业总支出-管理费用">
            {formatAccounting(reportIncomeStatementDetail.management_expenses)} 元
          </Descriptions.Item>
          <Descriptions.Item label="营业总支出-财务费用">
            {formatAccounting(reportIncomeStatementDetail.financial_expenses)} 元
          </Descriptions.Item>
          <Descriptions.Item label="营业总支出-营业总支出">
            {formatAccounting(reportIncomeStatementDetail.total_operating_expenses)} 元
          </Descriptions.Item>

          <Descriptions.Item label="营业利润">
            {formatAccounting(reportIncomeStatementDetail.operating_profit)} 元
          </Descriptions.Item>
          <Descriptions.Item label="利润总额">
            {formatAccounting(reportIncomeStatementDetail.total_profit)} 元
          </Descriptions.Item>

          <Descriptions.Item label="年份">
            {reportIncomeStatementDetail.year} 年
          </Descriptions.Item>
          <Descriptions.Item label="季度">
            {reportIncomeStatementDetail.quarter}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {dayjs(reportIncomeStatementDetail.updated_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default ReportIncomeStatementDetailComponent;