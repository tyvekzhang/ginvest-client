// SPDX-License-Identifier: MIT


import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
  Button,
  Space,
} from 'antd';
import { ReportIncomeStatementDetail } from '@/types/report-income-statement';
import React, { useMemo } from 'react';

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
      { reportIncomeStatementDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="股票代码">
              { reportIncomeStatementDetail.stock_code}
          </Descriptions.Item>
          <Descriptions.Item label="股票简称">
              { reportIncomeStatementDetail.stock_name}
          </Descriptions.Item>
          <Descriptions.Item label="交易所">
              { reportIncomeStatementDetail.exchange}
          </Descriptions.Item>
          <Descriptions.Item label="净利润">
              { reportIncomeStatementDetail.net_profit}
          </Descriptions.Item>
          <Descriptions.Item label="净利润同比">
              { reportIncomeStatementDetail.net_profit_yoy}
          </Descriptions.Item>
          <Descriptions.Item label="营业总收入">
              { reportIncomeStatementDetail.total_operating_income}
          </Descriptions.Item>
          <Descriptions.Item label="营业总收入同比">
              { reportIncomeStatementDetail.total_operating_income_yoy}
          </Descriptions.Item>
          <Descriptions.Item label="营业总支出-营业支出">
              { reportIncomeStatementDetail.operating_expenses}
          </Descriptions.Item>
          <Descriptions.Item label="营业总支出-销售费用">
              { reportIncomeStatementDetail.sales_expenses}
          </Descriptions.Item>
          <Descriptions.Item label="营业总支出-管理费用">
              { reportIncomeStatementDetail.management_expenses}
          </Descriptions.Item>
          <Descriptions.Item label="营业总支出-财务费用">
              { reportIncomeStatementDetail.financial_expenses}
          </Descriptions.Item>
          <Descriptions.Item label="营业总支出-营业总支出">
              { reportIncomeStatementDetail.total_operating_expenses}
          </Descriptions.Item>
          <Descriptions.Item label="营业利润">
              { reportIncomeStatementDetail.operating_profit}
          </Descriptions.Item>
          <Descriptions.Item label="利润总额">
              { reportIncomeStatementDetail.total_profit}
          </Descriptions.Item>
          <Descriptions.Item label="公告日期">
              {dayjs(reportIncomeStatementDetail.announcement_date).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="年份">
              { reportIncomeStatementDetail.year}
          </Descriptions.Item>
          <Descriptions.Item label="季度">
              { reportIncomeStatementDetail.quarter}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
              {dayjs(reportIncomeStatementDetail.created_at).format('YYYY-MM-DD')}
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