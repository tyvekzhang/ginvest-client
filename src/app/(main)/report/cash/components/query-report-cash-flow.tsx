// SPDX-License-Identifier: MIT

import { Form, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/es/form';
import { RotateCcw, Search } from 'lucide-react';
import React from 'react';

interface QueryReportCashFlowProps {
  onQueryReportCashFlowFinish: (values: any) => void;
  onQueryReportCashFlowReset: () => void;
  onQueryReportCashFlowForm: FormInstance;
}

const queryReportCashFlowFormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};

const QueryReportCashFlowComponent: React.FC<QueryReportCashFlowProps> = ({
  onQueryReportCashFlowFinish,
  onQueryReportCashFlowReset,
  onQueryReportCashFlowForm,
}) => {
  const handleQueryReportCashFlowReset = () => {
    onQueryReportCashFlowReset();
  };

  const handleQueryReportCashFlowSubmit = async () => {
    const values = await onQueryReportCashFlowForm.validateFields();
    onQueryReportCashFlowFinish(values);
  };

  

  return (
    <Form
      {...queryReportCashFlowFormItemLayout}
      form={ onQueryReportCashFlowForm}
      name="queryReportCashFlow"
      onFinish={onQueryReportCashFlowFinish}
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
              onClick={handleQueryReportCashFlowReset}
              className="bg-gray-50"
              icon={<RotateCcw size={14} />}
            >
              重置
            </Button>
            <Button
              type="primary"
              icon={<Search size={14} />}
              onClick={handleQueryReportCashFlowSubmit}
            >
              查询
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default QueryReportCashFlowComponent;