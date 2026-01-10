// SPDX-License-Identifier: MIT

import { Form, Modal, Button, Input } from 'antd';
import { Select } from 'antd';
import { DatePicker } from 'antd';
import { ChevronDown } from 'lucide-react';
import { TreeSelect } from 'antd';
import { TreeSelectUtil } from '@/utils/select-util';
import { Stock } from '@/types/stock';
import { UpdateStock } from '@/types/stock';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

interface UpdateStockProps {
  isUpdateStockModalVisible: boolean;
  onUpdateStockCancel: () => void;
  onUpdateStockFinish: () => void;
  isUpdateStockLoading: boolean;
  updateStockForm: FormInstance<UpdateStock>;
  treeSelectDataSource?: Stock[];
}

const updateStockFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const UpdateStockComponent: React.FC<UpdateStockProps> = ({
  isUpdateStockModalVisible,
  onUpdateStockCancel,
  onUpdateStockFinish,
  isUpdateStockLoading,
  updateStockForm,
  treeSelectDataSource,
}) => {
  const treeSelectDataTransform = [{ name: '根目录', id: 0, children: treeSelectDataSource }];
  const treeSelectData = TreeSelectUtil.convert(treeSelectDataTransform as any);
  
  const footerButtons = useMemo(
    () => [
      <Button key="cancel" onClick={onUpdateStockCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isUpdateStockLoading} onClick={onUpdateStockFinish}>
        确定
      </Button>,
    ],
    [isUpdateStockLoading, onUpdateStockCancel],
  );

  return (
    <Modal
      title="股票基础信息编辑"
      open={isUpdateStockModalVisible}
      onCancel={onUpdateStockCancel}
      footer={footerButtons}
      destroyOnHidden
      width={"60%"}
    >
        <Form
          {...updateStockFormItemLayout}
          form={ updateStockForm}
          name="updateStock"
          onFinish={onUpdateStockFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="stock_code" label="股票编号" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股票编号" />
          </Form.Item>
          <Form.Item name="stock_name" label="股票名称" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入股票名称" />
          </Form.Item>
          <Form.Item name="exchange" label="交易所" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入交易所" />
          </Form.Item>
          <Form.Item name="listing_date" label="上市日期" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择上市日期" />
          </Form.Item>
          <Form.Item name="industry" label="所属行业" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入所属行业" />
          </Form.Item>
          <Form.Item name="province" label="省份" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入省份" />
          </Form.Item>
          <Form.Item name="city" label="城市" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入城市" />
          </Form.Item>
          <Form.Item name="company_name" label="公司全称" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入公司全称" />
          </Form.Item>
          <Form.Item name="english_name" label="英文名称" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入英文名称" />
          </Form.Item>
          <Form.Item name="former_name" label="曾用简称" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入曾用简称" />
          </Form.Item>
          <Form.Item name="market_type" label="所属市场" rules={[{ required: false, message: '请输入' }]}>
            <Select placeholder="请选择所属市场" />
          </Form.Item>
          <Form.Item name="legal_representative" label="法人代表" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入法人代表" />
          </Form.Item>
          <Form.Item name="registered_capital" label="注册资金" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入注册资金" />
          </Form.Item>
          <Form.Item name="establish_date" label="成立日期" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择成立日期" />
          </Form.Item>
          <Form.Item name="website" label="官网" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入官网" />
          </Form.Item>
          <Form.Item name="email" label="电子邮箱" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入电子邮箱" />
          </Form.Item>
          <Form.Item name="telephone" label="联系电话" rules={[{ required: false, message: '请输入' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="fax" label="传真" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入传真" />
          </Form.Item>
          <Form.Item name="registered_address" label="注册地址" rules={[{ required: false, message: '请输入' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="business_address" label="办公地址" rules={[{ required: false, message: '请输入' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="postal_code" label="邮政编码" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入邮政编码" />
          </Form.Item>
          <Form.Item name="main_business" label="主营业务" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入主营业务" />
          </Form.Item>
          <Form.Item name="business_scope" label="经营范围" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入经营范围" />
          </Form.Item>
          <Form.Item name="company_profile" label="机构简介" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入机构简介" />
          </Form.Item>
          <Form.Item name="data_source" label="数据来源" rules={[{ required: false, message: '请输入' }]}>
            <Input placeholder="请输入数据来源" />
          </Form.Item>
          <Form.Item name="updated_at" label="更新时间" rules={[{ required: false, message: '请输入' }]}>
            <DatePicker format="YYYY-MM-DD" placeholder="请选择更新时间" />
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default UpdateStockComponent;