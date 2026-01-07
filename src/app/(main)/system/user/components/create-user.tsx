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

import { useDictDataOptions } from '@/service/dict-datum';
import { CreateUser } from '@/types/user';
import { Button, CheckboxOptionType, Form, Input, Modal, Radio } from 'antd';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

const createUserFormItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

interface CreateUserProps {
  isCreateUserModalVisible: boolean;
  onCreateUserCancel: () => void;
  onCreateUserFinish: (createUser: CreateUser) => void;
  isCreateUserLoading: boolean;
  createUserForm: FormInstance;
}

// 密码复杂度校验函数
const validatePasswordComplexity = (password: string): boolean => {
  if (!password) return false;
  
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password);
  
  // 计算满足的条件数量
  const conditionsMet = [hasNumber, hasLetter, hasSpecialChar].filter(Boolean).length;
  
  return conditionsMet >= 2;
};

const CreateUserComponent: React.FC<CreateUserProps> = ({
  isCreateUserModalVisible,
  onCreateUserCancel,
  onCreateUserFinish,
  isCreateUserLoading,
  createUserForm,
}) => {
  const { dictData } = useDictDataOptions('user_status'.split(','));

  const footerButtons = useMemo(
    () => [
      <Button key="back" onClick={onCreateUserCancel}>
        取消
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={isCreateUserLoading}
        onClick={() => createUserForm.submit()}
      >
        确定
      </Button>,
    ],
    [isCreateUserLoading, createUserForm, onCreateUserCancel],
  );

  return (
    <div>
      <Modal
        title="用户信息新增"
        open={isCreateUserModalVisible}
        onCancel={onCreateUserCancel}
        footer={footerButtons}
        width={'60%'}
        destroyOnHidden
      >
        <Form
          {...createUserFormItemLayout}
          initialValues={{ status: '1' }}
          form={createUserForm}
          name="createUser"
          onFinish={onCreateUserFinish}
          className="grid grid-cols-1 lg:grid-cols-1 gap-y-0 gap-x-2 pt-4"
        >
          {/* 用户名 */}
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          {/* 密码 */}
          <Form.Item
            name="password"
            label="密码"
            validateTrigger="onBlur" // 失去焦点时触发校验
            rules={[
              { required: true, message: '请输入密码' },
              { min: 8, message: '密码长度不能少于 8 位' },
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.resolve();
                  }
                  if (validatePasswordComplexity(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('密码需包含数字、字母、特殊符号中的至少两种')
                  );
                },
              },
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          {/* 确认密码 */}
          <Form.Item
            name="confirmPassword"
            label="确认密码"
            dependencies={['password']}
            validateTrigger="onBlur" // 失去焦点时触发校验
            rules={[
              { required: true, message: '请再次输入密码以确认' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请再次输入密码" />
          </Form.Item>

          {/* 昵称 */}
          <Form.Item
            name="nickname"
            label="昵称"
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input placeholder="请输入昵称" />
          </Form.Item>

          {/* 状态 */}
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: false, message: '请选择状态' }]}
          >
            <Radio.Group
              options={dictData['user_status'] as CheckboxOptionType[]}
            />
          </Form.Item>

          {/* 备注 */}
          <Form.Item
            name="remark"
            label="备注"
            rules={[{ required: false, message: '请输入备注' }]}
          >
            <Input.TextArea placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateUserComponent;