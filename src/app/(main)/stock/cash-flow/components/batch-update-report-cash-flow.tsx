// SPDX-License-Identifier: MIT

import { Form, Modal, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { BatchUpdateReportCashFlow } from '@/types/report-cash-flow';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';


interface BatchUpdateReportCashFlowsProps {
  isBatchUpdateReportCashFlowsModalVisible: boolean;
  onBatchUpdateReportCashFlowsCancel: () => void;
  onBatchUpdateReportCashFlowsFinish: () => void;
  isBatchUpdateReportCashFlowsLoading: boolean;
  batchUpdateReportCashFlowsForm: FormInstance<BatchUpdateReportCashFlow>;
}

const batchUpdateReportCashFlowsFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const BatchUpdateReportCashFlowsComponent: React.FC<BatchUpdateReportCashFlowsProps> = ({
  isBatchUpdateReportCashFlowsModalVisible,
  onBatchUpdateReportCashFlowsCancel,
  onBatchUpdateReportCashFlowsFinish,
  isBatchUpdateReportCashFlowsLoading,
  batchUpdateReportCashFlowsForm,
}) => {
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onBatchUpdateReportCashFlowsCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isBatchUpdateReportCashFlowsLoading} onClick={onBatchUpdateReportCashFlowsFinish}>
        确定
      </Button>,
    ],
    [isBatchUpdateReportCashFlowsLoading, onBatchUpdateReportCashFlowsCancel],
  );

  return (
    <Modal
      title="现金流量批量编辑"
      open={isBatchUpdateReportCashFlowsModalVisible}
      onCancel={onBatchUpdateReportCashFlowsCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...batchUpdateReportCashFlowsFormItemLayout}
          form={ batchUpdateReportCashFlowsForm}
          name="batchUpdateReportCashFlows"
          onFinish={onBatchUpdateReportCashFlowsFinish}
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
          <Form.Item name="net_cash_flow" label="净现金流-净现金流" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入净现金流-净现金流" />
          </Form.Item>
          <Form.Item name="net_cash_flow_yoy" label="净现金流-同比增长" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入净现金流-同比增长" />
          </Form.Item>
          <Form.Item name="operating_cash_flow" label="经营性现金流-现金流量净额" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入经营性现金流-现金流量净额" />
          </Form.Item>
          <Form.Item name="operating_cash_flow_ratio" label="经营性现金流-净现金流占比" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入经营性现金流-净现金流占比" />
          </Form.Item>
          <Form.Item name="investing_cash_flow" label="投资性现金流-现金流量净额" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入投资性现金流-现金流量净额" />
          </Form.Item>
          <Form.Item name="investing_cash_flow_ratio" label="投资性现金流-净现金流占比" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入投资性现金流-净现金流占比" />
          </Form.Item>
          <Form.Item name="financing_cash_flow" label="融资性现金流-现金流量净额" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入融资性现金流-现金流量净额" />
          </Form.Item>
          <Form.Item name="financing_cash_flow_ratio" label="融资性现金流-净现金流占比" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入融资性现金流-净现金流占比" />
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

export default BatchUpdateReportCashFlowsComponent;