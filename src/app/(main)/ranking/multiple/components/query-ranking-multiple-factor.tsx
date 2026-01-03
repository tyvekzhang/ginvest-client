// SPDX-License-Identifier: MIT

import { Form, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/es/form';
import { RotateCcw, Search } from 'lucide-react';
import React from 'react';

interface QueryRankingMultipleFactorProps {
  onQueryRankingMultipleFactorFinish: (values: any) => void;
  onQueryRankingMultipleFactorReset: () => void;
  onQueryRankingMultipleFactorForm: FormInstance;
}

const queryRankingMultipleFactorFormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};

const QueryRankingMultipleFactorComponent: React.FC<QueryRankingMultipleFactorProps> = ({
  onQueryRankingMultipleFactorFinish,
  onQueryRankingMultipleFactorReset,
  onQueryRankingMultipleFactorForm,
}) => {
  const handleQueryRankingMultipleFactorReset = () => {
    onQueryRankingMultipleFactorReset();
  };

  const handleQueryRankingMultipleFactorSubmit = async () => {
    const values = await onQueryRankingMultipleFactorForm.validateFields();
    onQueryRankingMultipleFactorFinish(values);
  };

  

  return (
    <Form
      {...queryRankingMultipleFactorFormItemLayout}
      form={ onQueryRankingMultipleFactorForm}
      name="queryRankingMultipleFactor"
      onFinish={onQueryRankingMultipleFactorFinish}
    >
      <div className='flex flex-wrap items-center gap-4 pt-6 justify-between'>
        <Form.Item name="stock_code" label="股票代码" >
          <Input placeholder="请输入股票代码" allowClear />
        </Form.Item>
        <Form.Item name="stock_name" label="股票简称" >
          <Input placeholder="请输入股票简称" allowClear />
        </Form.Item>
        <Form.Item name="industry" label="所属行业" >
          <Input placeholder="请输入所属行业" allowClear />
        </Form.Item>
        <Form.Item name="query_period" label="查询周期" >
          <Input placeholder="请输入查询周期" allowClear />
        </Form.Item>
        <Form.Item name="rank" label="排名" >
          <Input placeholder="请输入排名" allowClear />
        </Form.Item>
        <Form.Item>
          <div className='flex items-center gap-2 justify-start pr-4'>
            <Button
              onClick={handleQueryRankingMultipleFactorReset}
              className="bg-gray-50"
              icon={<RotateCcw size={14} />}
            >
              重置
            </Button>
            <Button
              type="primary"
              icon={<Search size={14} />}
              onClick={handleQueryRankingMultipleFactorSubmit}
            >
              查询
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default QueryRankingMultipleFactorComponent;