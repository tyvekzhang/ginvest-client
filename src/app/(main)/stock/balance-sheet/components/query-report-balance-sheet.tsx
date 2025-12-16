// SPDX-License-Identifier: MIT

import { Form, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/es/form';
import { RotateCcw, Search } from 'lucide-react';
import React from 'react';

interface QueryReportBalanceSheetProps {
  onQueryReportBalanceSheetFinish: (values: any) => void;
  onQueryReportBalanceSheetReset: () => void;
  onQueryReportBalanceSheetForm: FormInstance;
}

const queryReportBalanceSheetFormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};

const QueryReportBalanceSheetComponent: React.FC<QueryReportBalanceSheetProps> = ({
  onQueryReportBalanceSheetFinish,
  onQueryReportBalanceSheetReset,
  onQueryReportBalanceSheetForm,
}) => {
  const handleQueryReportBalanceSheetReset = () => {
    onQueryReportBalanceSheetReset();
  };

  const handleQueryReportBalanceSheetSubmit = async () => {
    const values = await onQueryReportBalanceSheetForm.validateFields();
    onQueryReportBalanceSheetFinish(values);
  };

  

  return (
    <Form
      {...queryReportBalanceSheetFormItemLayout}
      form={ onQueryReportBalanceSheetForm}
      name="queryReportBalanceSheet"
      onFinish={onQueryReportBalanceSheetFinish}
    >
      <div className='flex flex-wrap items-center gap-4 pt-6 justify-between'>
        <Form.Item name="stock_code" label="股票代码" >
          <Input placeholder="请输入股票代码" allowClear />
        </Form.Item>
        <Form.Item name="stock_name" label="股票简称" >
          <Input placeholder="请输入股票简称" allowClear />
        </Form.Item>
        <Form.Item name="year" label="年份" >
          <Input placeholder="请输入年份" allowClear />
        </Form.Item>
        <Form.Item name="quarter" label="季度" >
          <Input placeholder="请输入季度" allowClear />
        </Form.Item>
        <Form.Item>
          <div className='flex items-center gap-2 justify-start pr-4'>
            <Button
              onClick={handleQueryReportBalanceSheetReset}
              className="bg-gray-50"
              icon={<RotateCcw size={14} />}
            >
              重置
            </Button>
            <Button
              type="primary"
              icon={<Search size={14} />}
              onClick={handleQueryReportBalanceSheetSubmit}
            >
              查询
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default QueryReportBalanceSheetComponent;