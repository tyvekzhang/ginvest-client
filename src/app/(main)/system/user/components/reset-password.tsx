import { Button, Form, Input, Modal } from 'antd';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

export interface ResetPasswordValues {
  newPassword?: string;
  confirmPassword?: string;
}

interface ResetPasswordProps {
  isModalVisible: boolean;
  onCancel: () => void;
  onFinish: (values: ResetPasswordValues) => void;
  isLoading: boolean;
  resetPasswordForm: FormInstance<ResetPasswordValues>;
  userName?: string;
}

const resetPasswordFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const ResetPasswordComponent: React.FC<ResetPasswordProps> = ({
  isModalVisible,
  onCancel,
  onFinish,
  isLoading,
  resetPasswordForm,
  userName,
}) => {
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onCancel}>
        取消
      </Button>,
      <Button
        key="submit"
        type="primary"
        loading={isLoading}
        onClick={() => resetPasswordForm.submit()}
      >
        确定
      </Button>,
    ],
    [isLoading, onCancel, resetPasswordForm],
  );

  return (
    <Modal
      title={userName ? `重置 ${userName} 密码` : '重置密码'}
      open={isModalVisible}
      onCancel={onCancel}
      footer={footerButtons}
      destroyOnHidden
      width={400}
    >
      <Form
        {...resetPasswordFormItemLayout}
        form={resetPasswordForm}
        name="resetPassword"
        onFinish={onFinish}
        className="pt-4"
      >
        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[
            { required: true, message: '请输入新密码' },
            { min: 6, message: '密码长度不能少于 6 位' }
          ]}
        >
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="确认密码"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: '请再次输入新密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="请再次输入新密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResetPasswordComponent;