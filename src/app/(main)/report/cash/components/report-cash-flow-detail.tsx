// SPDX-License-Identifier: MIT

import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
} from 'antd';
import { ReportCashFlowDetail } from '@/types/report-cash-flow';
import React from 'react';
// 导入会计格式化工具
import { formatAccounting } from '@/utils/math-util';

interface ReportCashFlowDetailDrawerProps {
  isReportCashFlowDetailDrawerVisible: boolean;
  onReportCashFlowDetailClose: () => void;
  reportCashFlowDetail: ReportCashFlowDetail | undefined;
  loading: boolean
}

const ReportCashFlowDetailComponent: React.FC<ReportCashFlowDetailDrawerProps> = ({
  isReportCashFlowDetailDrawerVisible,
  onReportCashFlowDetailClose,
  reportCashFlowDetail,
  loading
}) => {

  return (
    <Drawer
      title="现金流量详情"
      open={isReportCashFlowDetailDrawerVisible}
      onClose={onReportCashFlowDetailClose}
      destroyOnHidden
      loading={loading}
      width={600}
    >
      {reportCashFlowDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="股票代码">
            {reportCashFlowDetail.stock_code}
          </Descriptions.Item>
          <Descriptions.Item label="股票简称">
            {reportCashFlowDetail.stock_name}
          </Descriptions.Item>
          <Descriptions.Item label="交易所">
            {reportCashFlowDetail.exchange}
          </Descriptions.Item>

          {/* 现金流金额字段 - 使用 formatAccounting 并添加单位 */}
          <Descriptions.Item label="净现金流-净现金流">
            {formatAccounting(reportCashFlowDetail.net_cash_flow)} 元
          </Descriptions.Item>
          
          {/* 同比/占比字段 - 添加百分比单位 */}
          <Descriptions.Item label="净现金流-同比增长">
            {reportCashFlowDetail.net_cash_flow_yoy} %
          </Descriptions.Item>

          <Descriptions.Item label="经营性现金流-现金流量净额">
            {formatAccounting(reportCashFlowDetail.operating_cash_flow)} 元
          </Descriptions.Item>
          <Descriptions.Item label="经营性现金流-净现金流占比">
            {reportCashFlowDetail.operating_cash_flow_ratio} %
          </Descriptions.Item>

          <Descriptions.Item label="投资性现金流-现金流量净额">
            {formatAccounting(reportCashFlowDetail.investing_cash_flow)} 元
          </Descriptions.Item>
          <Descriptions.Item label="投资性现金流-净现金流占比">
            {reportCashFlowDetail.investing_cash_flow_ratio} %
          </Descriptions.Item>

          <Descriptions.Item label="融资性现金流-现金流量净额">
            {formatAccounting(reportCashFlowDetail.financing_cash_flow)} 元
          </Descriptions.Item>
          <Descriptions.Item label="融资性现金流-净现金流占比">
            {reportCashFlowDetail.financing_cash_flow_ratio} %
          </Descriptions.Item>

          <Descriptions.Item label="年份">
            {reportCashFlowDetail.year} 年
          </Descriptions.Item>
          <Descriptions.Item label="季度">
            {reportCashFlowDetail.quarter}
          </Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {dayjs(reportCashFlowDetail.updated_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default ReportCashFlowDetailComponent;