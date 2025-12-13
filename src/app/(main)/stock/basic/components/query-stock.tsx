// SPDX-License-Identifier: MIT

import { Form, Button } from 'antd';
import { Input } from 'antd';
import { Select, Radio } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/es/form';
import { RotateCcw, Search } from 'lucide-react';
import React from 'react';

interface QueryStockProps {
  onQueryStockFinish: (values: any) => void;
  onQueryStockReset: () => void;
  onQueryStockForm: FormInstance;
}

const queryStockFormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};

const QueryStockComponent: React.FC<QueryStockProps> = ({
  onQueryStockFinish,
  onQueryStockReset,
  onQueryStockForm,
}) => {
  const handleQueryStockReset = () => {
    onQueryStockReset();
  };

  const handleQueryStockSubmit = async () => {
    const values = await onQueryStockForm.validateFields();
    onQueryStockFinish(values);
  };


  return (
    <Form
      {...queryStockFormItemLayout}
      form={ onQueryStockForm}
      name="queryStock"
      onFinish={onQueryStockFinish}
    >
      <div className='flex flex-wrap items-center gap-x-2 pt-4 justify-between'>
        <Form.Item name="stock_code" label="股票编号" >
          <Input placeholder="请输入股票编号" allowClear />
        </Form.Item>
        <Form.Item name="stock_name" label="股票名称" >
          <Input placeholder="请输入股票名称" allowClear />
        </Form.Item>
        <Form.Item name="listing_date" label="上市日期" >
          <DatePicker.RangePicker
            allowClear
            format="YYYY-MM-DD"
            placeholder={["请选择开始时间", "请选择结束时间"]}
            presets={[
                { label: '最近7天', value: [dayjs().add(-7, 'd'), dayjs()] },
                { label: '最近14天', value: [dayjs().add(-14, 'd'), dayjs()] },
                { label: '最近30天', value: [dayjs().add(-30, 'd'), dayjs()] },
                { label: '最近90天', value: [dayjs().add(-90, 'd'), dayjs()] },
            ]}
          />
        </Form.Item>
        <Form.Item name="industry" label="行业" >
          <Input placeholder="请输入行业" allowClear />
        </Form.Item>
        <Form.Item>
          <div className='flex items-center gap-2 justify-start pr-4'>
            <Button
              onClick={handleQueryStockReset}
              className="bg-gray-50"
              icon={<RotateCcw size={14} />}
            >
              重置
            </Button>
            <Button
              type="primary"
              icon={<Search size={14} />}
              onClick={handleQueryStockSubmit}
            >
              查询
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default QueryStockComponent;