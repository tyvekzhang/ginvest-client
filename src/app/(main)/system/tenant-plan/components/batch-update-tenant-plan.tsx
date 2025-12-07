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
import AdvancedSelect, { AdvancedSelectOption } from '@/components/advanced-select';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { BatchUpdateTenantPlan } from '@/types/tenant-plan';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';


interface BatchUpdateTenantPlansProps {
  isBatchUpdateTenantPlansModalVisible: boolean;
  onBatchUpdateTenantPlansCancel: () => void;
  onBatchUpdateTenantPlansFinish: () => void;
  isBatchUpdateTenantPlansLoading: boolean;
  batchUpdateTenantPlansForm: FormInstance<BatchUpdateTenantPlan>;
  tenantOptions: AdvancedSelectOption[];
}

const batchUpdateTenantPlansFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const BatchUpdateTenantPlansComponent: React.FC<BatchUpdateTenantPlansProps> = ({
  isBatchUpdateTenantPlansModalVisible,
  onBatchUpdateTenantPlansCancel,
  onBatchUpdateTenantPlansFinish,
  isBatchUpdateTenantPlansLoading,
  batchUpdateTenantPlansForm,
  tenantOptions,
}) => {
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onBatchUpdateTenantPlansCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isBatchUpdateTenantPlansLoading} onClick={onBatchUpdateTenantPlansFinish}>
        确定
      </Button>,
    ],
    [isBatchUpdateTenantPlansLoading, onBatchUpdateTenantPlansCancel],
  );

  return (
    <Modal
      title="套餐信息批量编辑"
      open={isBatchUpdateTenantPlansModalVisible}
      onCancel={onBatchUpdateTenantPlansCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...batchUpdateTenantPlansFormItemLayout}
          form={ batchUpdateTenantPlansForm}
          name="batchUpdateTenantPlans"
          onFinish={onBatchUpdateTenantPlansFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="tenant_id" label="租户信息">
            <AdvancedSelect
              allowClear
              placeholder="请选择租户信息"
              options={ tenantOptions}
              className="min-w-48"
              enableSearch={true}
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

export default BatchUpdateTenantPlansComponent;