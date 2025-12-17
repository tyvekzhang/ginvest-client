// SPDX-License-Identifier: MIT

import { Form, Modal, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { BatchUpdateReportIncomeStatement } from '@/types/report-income-statement';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';


interface BatchUpdateReportIncomeStatementsProps {
  isBatchUpdateReportIncomeStatementsModalVisible: boolean;
  onBatchUpdateReportIncomeStatementsCancel: () => void;
  onBatchUpdateReportIncomeStatementsFinish: () => void;
  isBatchUpdateReportIncomeStatementsLoading: boolean;
  batchUpdateReportIncomeStatementsForm: FormInstance<BatchUpdateReportIncomeStatement>;
}

const batchUpdateReportIncomeStatementsFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const BatchUpdateReportIncomeStatementsComponent: React.FC<BatchUpdateReportIncomeStatementsProps> = ({
  isBatchUpdateReportIncomeStatementsModalVisible,
  onBatchUpdateReportIncomeStatementsCancel,
  onBatchUpdateReportIncomeStatementsFinish,
  isBatchUpdateReportIncomeStatementsLoading,
  batchUpdateReportIncomeStatementsForm,
}) => {
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onBatchUpdateReportIncomeStatementsCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isBatchUpdateReportIncomeStatementsLoading} onClick={onBatchUpdateReportIncomeStatementsFinish}>
        确定
      </Button>,
    ],
    [isBatchUpdateReportIncomeStatementsLoading, onBatchUpdateReportIncomeStatementsCancel],
  );

  return (
    <Modal
      title="利润批量编辑"
      open={isBatchUpdateReportIncomeStatementsModalVisible}
      onCancel={onBatchUpdateReportIncomeStatementsCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...batchUpdateReportIncomeStatementsFormItemLayout}
          form={ batchUpdateReportIncomeStatementsForm}
          name="batchUpdateReportIncomeStatements"
          onFinish={onBatchUpdateReportIncomeStatementsFinish}
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
          <Form.Item name="net_profit" label="净利润" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入净利润" />
          </Form.Item>
          <Form.Item name="net_profit_yoy" label="净利润同比" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入净利润同比" />
          </Form.Item>
          <Form.Item name="total_operating_income" label="营业总收入" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入营业总收入" />
          </Form.Item>
          <Form.Item name="total_operating_income_yoy" label="营业总收入同比" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入营业总收入同比" />
          </Form.Item>
          <Form.Item name="operating_expenses" label="营业总支出-营业支出" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入营业总支出-营业支出" />
          </Form.Item>
          <Form.Item name="sales_expenses" label="营业总支出-销售费用" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入营业总支出-销售费用" />
          </Form.Item>
          <Form.Item name="management_expenses" label="营业总支出-管理费用" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入营业总支出-管理费用" />
          </Form.Item>
          <Form.Item name="financial_expenses" label="营业总支出-财务费用" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入营业总支出-财务费用" />
          </Form.Item>
          <Form.Item name="total_operating_expenses" label="营业总支出-营业总支出" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入营业总支出-营业总支出" />
          </Form.Item>
          <Form.Item name="operating_profit" label="营业利润" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入营业利润" />
          </Form.Item>
          <Form.Item name="total_profit" label="利润总额" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入利润总额" />
          </Form.Item>
          <Form.Item name="announcement_date" label="公告日期" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择公告日期" />
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

export default BatchUpdateReportIncomeStatementsComponent;