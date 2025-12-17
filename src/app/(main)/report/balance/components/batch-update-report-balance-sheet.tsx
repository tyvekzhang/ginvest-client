// SPDX-License-Identifier: MIT

import { Form, Modal, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { BatchUpdateReportBalanceSheet } from '@/types/report-balance-sheet';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';


interface BatchUpdateReportBalanceSheetsProps {
  isBatchUpdateReportBalanceSheetsModalVisible: boolean;
  onBatchUpdateReportBalanceSheetsCancel: () => void;
  onBatchUpdateReportBalanceSheetsFinish: () => void;
  isBatchUpdateReportBalanceSheetsLoading: boolean;
  batchUpdateReportBalanceSheetsForm: FormInstance<BatchUpdateReportBalanceSheet>;
}

const batchUpdateReportBalanceSheetsFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const BatchUpdateReportBalanceSheetsComponent: React.FC<BatchUpdateReportBalanceSheetsProps> = ({
  isBatchUpdateReportBalanceSheetsModalVisible,
  onBatchUpdateReportBalanceSheetsCancel,
  onBatchUpdateReportBalanceSheetsFinish,
  isBatchUpdateReportBalanceSheetsLoading,
  batchUpdateReportBalanceSheetsForm,
}) => {
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onBatchUpdateReportBalanceSheetsCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isBatchUpdateReportBalanceSheetsLoading} onClick={onBatchUpdateReportBalanceSheetsFinish}>
        确定
      </Button>,
    ],
    [isBatchUpdateReportBalanceSheetsLoading, onBatchUpdateReportBalanceSheetsCancel],
  );

  return (
    <Modal
      title="资产负债批量编辑"
      open={isBatchUpdateReportBalanceSheetsModalVisible}
      onCancel={onBatchUpdateReportBalanceSheetsCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...batchUpdateReportBalanceSheetsFormItemLayout}
          form={ batchUpdateReportBalanceSheetsForm}
          name="batchUpdateReportBalanceSheets"
          onFinish={onBatchUpdateReportBalanceSheetsFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="stock_code" label="股票代码" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股票代码" />
          </Form.Item>
          <Form.Item name="stock_name" label="股票简称" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股票简称" />
          </Form.Item>
          <Form.Item name="exchange" label="交易所" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入交易所" />
          </Form.Item>
          <Form.Item name="asset_cash" label="资产-货币资金" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入资产-货币资金" />
          </Form.Item>
          <Form.Item name="asset_receivables" label="资产-应收账款" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入资产-应收账款" />
          </Form.Item>
          <Form.Item name="asset_inventory" label="资产-存货" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入资产-存货" />
          </Form.Item>
          <Form.Item name="asset_total" label="资产-总资产" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入资产-总资产" />
          </Form.Item>
          <Form.Item name="asset_total_yoy" label="资产-总资产同比" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入资产-总资产同比" />
          </Form.Item>
          <Form.Item name="liability_payables" label="负债-应付账款" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入负债-应付账款" />
          </Form.Item>
          <Form.Item name="liability_total" label="负债-总负债" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入负债-总负债" />
          </Form.Item>
          <Form.Item name="liability_advance_receipts" label="负债-预收账款" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入负债-预收账款" />
          </Form.Item>
          <Form.Item name="liability_total_yoy" label="负债-总负债同比" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入负债-总负债同比" />
          </Form.Item>
          <Form.Item name="asset_liability_ratio" label="资产负债率" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入资产负债率" />
          </Form.Item>
          <Form.Item name="shareholder_equity" label="股东权益合计" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股东权益合计" />
          </Form.Item>
          <Form.Item name="announcement_date" label="公告日期" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入公告日期" />
          </Form.Item>
          <Form.Item name="year" label="年份" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入年份" />
          </Form.Item>
          <Form.Item name="quarter" label="季度" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入季度" />
          </Form.Item>
          <Form.Item name="updated_at" label="更新时间" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择更新时间" />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default BatchUpdateReportBalanceSheetsComponent;