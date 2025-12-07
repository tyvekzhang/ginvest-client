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

import { Form, Modal, Button, Input } from 'antd';
import { DatePicker } from 'antd';
import { ChevronDown } from 'lucide-react';
import { TreeSelect } from 'antd';
import { TreeSelectUtil } from '@/utils/select-util';
import { Tenant } from '@/types/tenant';
import { UpdateTenant } from '@/types/tenant';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

interface UpdateTenantProps {
  isUpdateTenantModalVisible: boolean;
  onUpdateTenantCancel: () => void;
  onUpdateTenantFinish: () => void;
  isUpdateTenantLoading: boolean;
  updateTenantForm: FormInstance<UpdateTenant>;
  treeSelectDataSource?: Tenant[];
}

const updateTenantFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const UpdateTenantComponent: React.FC<UpdateTenantProps> = ({
  isUpdateTenantModalVisible,
  onUpdateTenantCancel,
  onUpdateTenantFinish,
  isUpdateTenantLoading,
  updateTenantForm,
  treeSelectDataSource,
}) => {
  const treeSelectDataTransform = [{ name: '根目录', id: 0, children: treeSelectDataSource }];
  const treeSelectData = TreeSelectUtil.convert(treeSelectDataTransform as any);
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onUpdateTenantCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isUpdateTenantLoading} onClick={onUpdateTenantFinish}>
        确定
      </Button>,
    ],
    [isUpdateTenantLoading, onUpdateTenantCancel],
  );

  return (
    <Modal
      title="租户信息编辑"
      open={isUpdateTenantModalVisible}
      onCancel={onUpdateTenantCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...updateTenantFormItemLayout}
          form={ updateTenantForm}
          name="updateTenant"
          onFinish={onUpdateTenantFinish}
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

export default UpdateTenantComponent;