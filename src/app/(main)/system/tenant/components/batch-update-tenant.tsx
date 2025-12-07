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
import { BatchUpdateTenant } from '@/types/tenant';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';


interface BatchUpdateTenantsProps {
  isBatchUpdateTenantsModalVisible: boolean;
  onBatchUpdateTenantsCancel: () => void;
  onBatchUpdateTenantsFinish: () => void;
  isBatchUpdateTenantsLoading: boolean;
  batchUpdateTenantsForm: FormInstance<BatchUpdateTenant>;
}

const batchUpdateTenantsFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const BatchUpdateTenantsComponent: React.FC<BatchUpdateTenantsProps> = ({
  isBatchUpdateTenantsModalVisible,
  onBatchUpdateTenantsCancel,
  onBatchUpdateTenantsFinish,
  isBatchUpdateTenantsLoading,
  batchUpdateTenantsForm,
}) => {
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onBatchUpdateTenantsCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isBatchUpdateTenantsLoading} onClick={onBatchUpdateTenantsFinish}>
        确定
      </Button>,
    ],
    [isBatchUpdateTenantsLoading, onBatchUpdateTenantsCancel],
  );

  return (
    <Modal
      title="租户信息批量编辑"
      open={isBatchUpdateTenantsModalVisible}
      onCancel={onBatchUpdateTenantsCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...batchUpdateTenantsFormItemLayout}
          form={ batchUpdateTenantsForm}
          name="batchUpdateTenants"
          onFinish={onBatchUpdateTenantsFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="name" label="租户名称" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入租户名称" />
          </Form.Item>
          <Form.Item name="logo_url" label="logo地址" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入logo地址" />
          </Form.Item>
          <Form.Item name="contact_name" label="联系人姓名" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入联系人姓名" />
          </Form.Item>
          <Form.Item name="phone" label="联系电话" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入联系电话" />
          </Form.Item>
          <Form.Item name="email" label="联系邮箱" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入联系邮箱" />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default BatchUpdateTenantsComponent;