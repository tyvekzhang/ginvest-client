// SPDX-License-Identifier: MIT


import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
  Button,
  Space,
} from 'antd';
import { ReportBalanceSheetDetail } from '@/types/report-balance-sheet';
import React, { useMemo } from 'react';

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
      onClose={onReportBalanceSheetDetailClose}
      destroyOnHidden
      loading={loading}
      width={600}
    >
      { reportBalanceSheetDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="股票代码">
              { reportBalanceSheetDetail.stock_code}
          </Descriptions.Item>
          <Descriptions.Item label="股票简称">
              { reportBalanceSheetDetail.stock_name}
          </Descriptions.Item>
          <Descriptions.Item label="交易所">
              { reportBalanceSheetDetail.exchange}
          </Descriptions.Item>
          <Descriptions.Item label="资产-货币资金">
              { reportBalanceSheetDetail.asset_cash}
          </Descriptions.Item>
          <Descriptions.Item label="资产-应收账款">
              { reportBalanceSheetDetail.asset_receivables}
          </Descriptions.Item>
          <Descriptions.Item label="资产-存货">
              { reportBalanceSheetDetail.asset_inventory}
          </Descriptions.Item>
          <Descriptions.Item label="资产-总资产">
              { reportBalanceSheetDetail.asset_total}
          </Descriptions.Item>
          <Descriptions.Item label="资产-总资产同比">
              { reportBalanceSheetDetail.asset_total_yoy}
          </Descriptions.Item>
          <Descriptions.Item label="负债-应付账款">
              { reportBalanceSheetDetail.liability_payables}
          </Descriptions.Item>
          <Descriptions.Item label="负债-总负债">
              { reportBalanceSheetDetail.liability_total}
          </Descriptions.Item>
          <Descriptions.Item label="负债-预收账款">
              { reportBalanceSheetDetail.liability_advance_receipts}
          </Descriptions.Item>
          <Descriptions.Item label="负债-总负债同比">
              { reportBalanceSheetDetail.liability_total_yoy}
          </Descriptions.Item>
          <Descriptions.Item label="资产负债率">
              { reportBalanceSheetDetail.asset_liability_ratio}
          </Descriptions.Item>
          <Descriptions.Item label="股东权益合计">
              { reportBalanceSheetDetail.shareholder_equity}
          </Descriptions.Item>
          <Descriptions.Item label="公告日期">
              { reportBalanceSheetDetail.announcement_date}
          </Descriptions.Item>
          <Descriptions.Item label="年份">
              { reportBalanceSheetDetail.year}
          </Descriptions.Item>
          <Descriptions.Item label="季度">
              { reportBalanceSheetDetail.quarter}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
              {dayjs(reportBalanceSheetDetail.created_at).format('YYYY-MM-DD')}
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