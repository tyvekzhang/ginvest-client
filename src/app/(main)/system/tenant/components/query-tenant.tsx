// Copyright (c) 2025 FastWeb and/or its affiliates. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Form, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { FormInstance } from 'antd/es/form';
import { RotateCcw, Search } from 'lucide-react';
import React from 'react';

interface QueryTenantProps {
  onQueryTenantFinish: (values: any) => void;
  onQueryTenantReset: () => void;
  onQueryTenantForm: FormInstance;
}

const queryTenantFormItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 18 },
};

const QueryTenantComponent: React.FC<QueryTenantProps> = ({
  onQueryTenantFinish,
  onQueryTenantReset,
  onQueryTenantForm,
}) => {
  const handleQueryTenantReset = () => {
    onQueryTenantReset();
  };

  const handleQueryTenantSubmit = async () => {
    const values = await onQueryTenantForm.validateFields();
    onQueryTenantFinish(values);
  };

  return (
    <Form
      {...queryTenantFormItemLayout}
      form={ onQueryTenantForm}
      name="queryTenant"
      onFinish={onQueryTenantFinish}
    >
      <div className='flex flex-wrap items-center gap-4 pt-6 justify-between'>
        <Form.Item name="name" label="租户名称" >
          <Input placeholder="请输入租户名称" allowClear />
        </Form.Item>
        <Form.Item name="contact_name" label="联系人姓名" >
          <Input placeholder="请输入联系人姓名" allowClear />
        </Form.Item>
        <Form.Item name="create_at" label="创建时间" >
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
        <Form.Item>
          <div className='flex items-center gap-2 justify-start pr-4'>
            <Button
              onClick={handleQueryTenantReset}
              className="bg-gray-50"
              icon={<RotateCcw size={14} />}
            >
              重置
            </Button>
            <Button
              type="primary"
              icon={<Search size={14} />}
              onClick={handleQueryTenantSubmit}
            >
              查询
            </Button>
          </div>
        </Form.Item>
      </div>
    </Form>
  );
};

export default QueryTenantComponent;