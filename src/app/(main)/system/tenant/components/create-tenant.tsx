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

import { Form, Modal, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { CreateTenant } from '@/types/tenant';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

const createTenantFormItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

interface CreateTenantProps {
  isCreateTenantModalVisible: boolean;
  onCreateTenantCancel: () => void;
  onCreateTenantFinish: (createTenant: CreateTenant) => void;
  isCreateTenantLoading: boolean;
  createTenantForm: FormInstance;
}

const CreateTenantComponent: React.FC<CreateTenantProps> = ({
  isCreateTenantModalVisible,
  onCreateTenantCancel,
  onCreateTenantFinish,
  isCreateTenantLoading,
  createTenantForm,
}) => {
  
  const footerButtons = useMemo(
    () => [
      <Button key="back" onClick={onCreateTenantCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isCreateTenantLoading} onClick={() => createTenantForm.submit()}>
        确定
      </Button>,
    ],
    [isCreateTenantLoading, createTenantForm, onCreateTenantCancel],
  );

  return (
    <div>
      <Modal
        title="租户信息新增"
        open={isCreateTenantModalVisible}
        onCancel={onCreateTenantCancel}
        footer={footerButtons}
        width={'60%'}
      >
        <Form
          {...createTenantFormItemLayout}
          form={ createTenantForm}
          initialValues={undefined}
          name="createTenant"
          onFinish={onCreateTenantFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="name" label="租户名称" rules={[{ required: false, message: '请输入租户名称' }]}>
            <Input placeholder="请输入租户名称" />
          </Form.Item>
          <Form.Item name="logo_url" label="logo地址" rules={[{ required: false, message: '请输入logo地址' }]}>
            <Input placeholder="请输入logo地址" />
          </Form.Item>
          <Form.Item name="contact_name" label="联系人姓名" rules={[{ required: false, message: '请输入联系人姓名' }]}>
            <Input placeholder="请输入联系人姓名" />
          </Form.Item>
          <Form.Item name="phone" label="联系电话" rules={[{ required: false, message: '请输入联系电话' }]}>
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          <Form.Item name="email" label="联系邮箱" rules={[{ required: false, message: '请输入联系邮箱' }]}>
            <Input placeholder="请输入联系邮箱" />
          </Form.Item>
          <Form.Item name="create_at" label="创建时间" rules={[{ required: false, message: '请输入创建时间' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择创建时间" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateTenantComponent;