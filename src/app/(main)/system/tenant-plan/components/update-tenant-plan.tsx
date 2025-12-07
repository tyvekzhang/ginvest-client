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
import AdvancedSelect, { AdvancedSelectOption } from '@/components/advanced-select';


import { Form, Modal, Button, Input } from 'antd';
import { DatePicker } from 'antd';
import { ChevronDown } from 'lucide-react';
import { TreeSelect } from 'antd';
import { TreeSelectUtil } from '@/utils/select-util';
import { TenantPlan } from '@/types/tenant-plan';
import { UpdateTenantPlan } from '@/types/tenant-plan';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

interface UpdateTenantPlanProps {
  isUpdateTenantPlanModalVisible: boolean;
  onUpdateTenantPlanCancel: () => void;
  onUpdateTenantPlanFinish: () => void;
  isUpdateTenantPlanLoading: boolean;
  updateTenantPlanForm: FormInstance<UpdateTenantPlan>;
  treeSelectDataSource?: TenantPlan[];
  tenantOptions: AdvancedSelectOption[];
}

const updateTenantPlanFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const UpdateTenantPlanComponent: React.FC<UpdateTenantPlanProps> = ({
  isUpdateTenantPlanModalVisible,
  onUpdateTenantPlanCancel,
  onUpdateTenantPlanFinish,
  isUpdateTenantPlanLoading,
  updateTenantPlanForm,
  treeSelectDataSource,
  tenantOptions,
}) => {
  const treeSelectDataTransform = [{ name: '根目录', id: 0, children: treeSelectDataSource }];
  const treeSelectData = TreeSelectUtil.convert(treeSelectDataTransform as any);
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onUpdateTenantPlanCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isUpdateTenantPlanLoading} onClick={onUpdateTenantPlanFinish}>
        确定
      </Button>,
    ],
    [isUpdateTenantPlanLoading, onUpdateTenantPlanCancel],
  );

  return (
    <Modal
      title="套餐信息编辑"
      open={isUpdateTenantPlanModalVisible}
      onCancel={onUpdateTenantPlanCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...updateTenantPlanFormItemLayout}
          form={ updateTenantPlanForm}
          name="updateTenantPlan"
          onFinish={onUpdateTenantPlanFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="tenant_id" label="租户信息">
            <AdvancedSelect
              allowClear
              placeholder="请选择租户信息"
              options={ tenantOptions}
              className="min-w-48"
              enableSearch={true}
              mode='multiple'
            />
          </Form.Item>
          <Form.Item name="team_size" label="团队人数" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入团队人数" />
          </Form.Item>
          <Form.Item name="file_usage" label="文件使用" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入文件使用" />
          </Form.Item>
          <Form.Item name="token_count" label="Token数量" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入Token数量" />
          </Form.Item>
          <Form.Item name="options" label="其他配置" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入其他配置" />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default UpdateTenantPlanComponent;