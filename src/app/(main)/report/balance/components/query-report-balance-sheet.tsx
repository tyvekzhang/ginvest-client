// SPDX-License-Identifier: MIT

import { Form, Button, Select, DatePicker } from 'antd';
import { Input } from 'antd';
import { FormInstance } from 'antd/es/form';
import dayjs from 'dayjs';
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
        <Form.Item name="stock_code" label="股票信息" >
          <Input placeholder="请输入股票代码或名称" allowClear />
        </Form.Item>
        <Form.Item
          name="year"
          label="年份"
          rules={[
            { required: false, message: "请选择年份" },
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.resolve()
                }

                const year = dayjs.isDayjs(value) ? value.year() : dayjs(value).year()
                const currentYear = new Date().getFullYear()

                if (year < 1990 || year > currentYear + 1) {
                  return Promise.reject(new Error(`年份范围：1990-${currentYear + 1}`))
                }

                return Promise.resolve()
              },
            },
          ]}
        >
          <DatePicker
            picker="year"
            format="YYYY"
            placeholder="请选择年份"
            allowClear
            style={{ width: 150 }}
            disabledDate={(current) => {
              if (!current) return false

              const currentYear = new Date().getFullYear()
              const year = current.year()

              return year < 1990 || year > currentYear
            }}
          />
        </Form.Item>

        <Form.Item
          name="quarter"
          label="季度"
          rules={[
            { required: false, message: "请选择季度" },
            {
              validator: (_, value) => {
                if (value && ![1, 2, 3, 4].includes(value)) {
                  return Promise.reject(new Error("请选择有效的季度"))
                }
                return Promise.resolve()
              },
            },
          ]}
        >
          <Select
            placeholder="请选择季度"
            allowClear
            style={{ width: 150 }}
            options={[
              { label: "一季报", value: 1 },
              { label: "中报", value: 2 },
              { label: "三季报", value: 3 },
              { label: "年报", value: 4 },
            ]}
          />
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