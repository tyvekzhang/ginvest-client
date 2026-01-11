// SPDX-License-Identifier: MIT

import { Form, Button, Select, Input } from 'antd';
import { FormInstance } from 'antd/es/form';
import { RotateCcw, Search } from 'lucide-react';
import React from 'react';

interface QueryRankingMultipleFactorProps {
  onQueryRankingMultipleFactorFinish: (values: any) => void;
  onQueryRankingMultipleFactorReset: () => void;
  onQueryRankingMultipleFactorForm: FormInstance;
  industryList: string[] | undefined;
}

const queryRankingMultipleFactorFormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};

const QueryRankingMultipleFactorComponent: React.FC<QueryRankingMultipleFactorProps> = ({
  onQueryRankingMultipleFactorFinish,
  onQueryRankingMultipleFactorReset,
  onQueryRankingMultipleFactorForm,
  industryList,
}) => {

  // 转换选项的辅助函数
  const industryOptions = industryList?.map(value => ({
    value,
    label: value,
  })) || [];

  const handleQueryRankingMultipleFactorSubmit = async () => {
    const values = await onQueryRankingMultipleFactorForm.validateFields();
    onQueryRankingMultipleFactorFinish(values);
  };

  return (
    <Form
      {...queryRankingMultipleFactorFormItemLayout}
      form={onQueryRankingMultipleFactorForm}
      name="queryRankingMultipleFactor"
      onFinish={onQueryRankingMultipleFactorFinish}
    >
      <div className='flex flex-wrap items-center gap-4 pt-6 justify-between'>
        <Form.Item name="stock_code" label="股票信息" >
          <Input placeholder="请输入股票代码或名称" allowClear  style={{ width: 180 }}/>
        </Form.Item>

        <Form.Item name="industry" label="所属行业" >
          <Select
            allowClear
            showSearch
            placeholder="请选择所属行业"
            options={industryOptions}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            style={{ width: 160 }}
          />
        </Form.Item>
        <Form.Item name="sorting_rule" label="排序规则" >
          <Select
            options={[
              { label: "综合", value: 1 },
              { label: "稳健型", value: 2 },
              { label: "进取型", value: 3 },
            ]}
            style={{ width: 150 }}
          />
        </Form.Item>

        <Form.Item name="query_period" label="查询周期" >
          <Select
            options={[
              { label: "近一年(TTM)", value: 1 },
              { label: "近三年", value: 3 },
              { label: "近五年", value: 5 },
              { label: "近十年", value: 10 },
              { label: "近十五年", value: 15 },
              { label: "近二十年", value: 20 },
            ]}
            style={{ width: 150 }}
          />
        </Form.Item>

        <Form.Item>
          <div className='flex items-center gap-2 justify-start pr-4'>
            <Button
              onClick={onQueryRankingMultipleFactorReset}
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