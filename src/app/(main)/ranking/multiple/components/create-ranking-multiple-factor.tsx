// SPDX-License-Identifier: MIT

import { Form, Modal, Button } from 'antd';
import { Input } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { CreateRankingMultipleFactor } from '@/types/ranking-multiple-factor';
import { FormInstance } from 'antd/es/form';
import React, { useMemo } from 'react';

const createRankingMultipleFactorFormItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};

interface CreateRankingMultipleFactorProps {
  isCreateRankingMultipleFactorModalVisible: boolean;
  onCreateRankingMultipleFactorCancel: () => void;
  onCreateRankingMultipleFactorFinish: (createRankingMultipleFactor: CreateRankingMultipleFactor) => void;
  isCreateRankingMultipleFactorLoading: boolean;
  createRankingMultipleFactorForm: FormInstance;
}

const CreateRankingMultipleFactorComponent: React.FC<CreateRankingMultipleFactorProps> = ({
  isCreateRankingMultipleFactorModalVisible,
  onCreateRankingMultipleFactorCancel,
  onCreateRankingMultipleFactorFinish,
  isCreateRankingMultipleFactorLoading,
  createRankingMultipleFactorForm,
}) => {
  
  const footerButtons = useMemo(
    () => [
      <Button key="back" onClick={onCreateRankingMultipleFactorCancel}>
        取消
      </Button>,
      <Button key="submit" type="primary" loading={isCreateRankingMultipleFactorLoading} onClick={() => createRankingMultipleFactorForm.submit()}>
        确定
      </Button>,
    ],
    [isCreateRankingMultipleFactorLoading, createRankingMultipleFactorForm, onCreateRankingMultipleFactorCancel],
  );

  return (
    <div>
      <Modal
        title="多因子排名新增"
        open={isCreateRankingMultipleFactorModalVisible}
        onCancel={onCreateRankingMultipleFactorCancel}
        footer={footerButtons}
        width={'60%'}
      >
        <Form
          {...createRankingMultipleFactorFormItemLayout}
          form={ createRankingMultipleFactorForm}
          initialValues={undefined}
          name="createRankingMultipleFactor"
          onFinish={onCreateRankingMultipleFactorFinish}
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-0 gap-x-2 pt-4"
        >
          <Form.Item name="stock_code" label="股票代码" rules={[{ required: false, message: '请输入股票代码' }]}>
            <Input placeholder="请输入股票代码" />
          </Form.Item>
          <Form.Item name="stock_name" label="股票简称" rules={[{ required: false, message: '请输入股票简称' }]}>
            <Input placeholder="请输入股票简称" />
          </Form.Item>
          <Form.Item name="industry" label="所属行业" rules={[{ required: false, message: '请输入所属行业' }]}>
            <Input placeholder="请输入所属行业" />
          </Form.Item>
          <Form.Item name="query_period" label="查询周期" rules={[{ required: false, message: '请输入查询周期' }]}>
            <Input placeholder="请输入查询周期" />
          </Form.Item>
          <Form.Item name="roe_weighted_avg" label="净资产收益率加权平均" rules={[{ required: false, message: '请输入净资产收益率加权平均' }]}>
            <Input placeholder="请输入净资产收益率加权平均" />
          </Form.Item>
          <Form.Item name="roe_arithmetic_avg" label="净资产收益率算术平均" rules={[{ required: false, message: '请输入净资产收益率算术平均' }]}>
            <Input placeholder="请输入净资产收益率算术平均" />
          </Form.Item>
          <Form.Item name="roe_median" label="净资产收益率中位数" rules={[{ required: false, message: '请输入净资产收益率中位数' }]}>
            <Input placeholder="请输入净资产收益率中位数" />
          </Form.Item>
          <Form.Item name="roe_cagr" label="净资产收益率复合增长率" rules={[{ required: false, message: '请输入净资产收益率复合增长率' }]}>
            <Input placeholder="请输入净资产收益率复合增长率" />
          </Form.Item>
          <Form.Item name="roe_volatility" label="净资产收益率波动率" rules={[{ required: false, message: '请输入净资产收益率波动率' }]}>
            <Input placeholder="请输入净资产收益率波动率" />
          </Form.Item>
          <Form.Item name="revenue_growth_weighted_avg" label="营收增长率加权平均" rules={[{ required: false, message: '请输入营收增长率加权平均' }]}>
            <Input placeholder="请输入营收增长率加权平均" />
          </Form.Item>
          <Form.Item name="revenue_growth_arithmetic_avg" label="营收增长率算术平均" rules={[{ required: false, message: '请输入营收增长率算术平均' }]}>
            <Input placeholder="请输入营收增长率算术平均" />
          </Form.Item>
          <Form.Item name="revenue_growth_median" label="营收增长率中位数" rules={[{ required: false, message: '请输入营收增长率中位数' }]}>
            <Input placeholder="请输入营收增长率中位数" />
          </Form.Item>
          <Form.Item name="revenue_growth_cagr" label="营收增长率复合增长率" rules={[{ required: false, message: '请输入营收增长率复合增长率' }]}>
            <Input placeholder="请输入营收增长率复合增长率" />
          </Form.Item>
          <Form.Item name="revenue_growth_volatility" label="营收增长率波动率" rules={[{ required: false, message: '请输入营收增长率波动率' }]}>
            <Input placeholder="请输入营收增长率波动率" />
          </Form.Item>
          <Form.Item name="profit_growth_weighted_avg" label="净利润增长率加权平均" rules={[{ required: false, message: '请输入净利润增长率加权平均' }]}>
            <Input placeholder="请输入净利润增长率加权平均" />
          </Form.Item>
          <Form.Item name="profit_growth_arithmetic_avg" label="净利润增长率算术平均" rules={[{ required: false, message: '请输入净利润增长率算术平均' }]}>
            <Input placeholder="请输入净利润增长率算术平均" />
          </Form.Item>
          <Form.Item name="profit_growth_median" label="净利润增长率中位数" rules={[{ required: false, message: '请输入净利润增长率中位数' }]}>
            <Input placeholder="请输入净利润增长率中位数" />
          </Form.Item>
          <Form.Item name="profit_growth_cagr" label="净利润增长率复合增长率" rules={[{ required: false, message: '请输入净利润增长率复合增长率' }]}>
            <Input placeholder="请输入净利润增长率复合增长率" />
          </Form.Item>
          <Form.Item name="profit_growth_volatility" label="净利润增长率波动率" rules={[{ required: false, message: '请输入净利润增长率波动率' }]}>
            <Input placeholder="请输入净利润增长率波动率" />
          </Form.Item>
          <Form.Item name="cashflow_ratio_weighted_avg" label="现金流利润比加权平均" rules={[{ required: false, message: '请输入现金流利润比加权平均' }]}>
            <Input placeholder="请输入现金流利润比加权平均" />
          </Form.Item>
          <Form.Item name="cashflow_ratio_arithmetic_avg" label="现金流利润比算术平均" rules={[{ required: false, message: '请输入现金流利润比算术平均' }]}>
            <Input placeholder="请输入现金流利润比算术平均" />
          </Form.Item>
          <Form.Item name="cashflow_ratio_median" label="现金流利润比中位数" rules={[{ required: false, message: '请输入现金流利润比中位数' }]}>
            <Input placeholder="请输入现金流利润比中位数" />
          </Form.Item>
          <Form.Item name="cashflow_ratio_cagr" label="现金流利润比复合增长率" rules={[{ required: false, message: '请输入现金流利润比复合增长率' }]}>
            <Input placeholder="请输入现金流利润比复合增长率" />
          </Form.Item>
          <Form.Item name="cashflow_ratio_volatility" label="现金流利润比波动率" rules={[{ required: false, message: '请输入现金流利润比波动率' }]}>
            <Input placeholder="请输入现金流利润比波动率" />
          </Form.Item>
          <Form.Item name="debt_ratio_weighted_avg" label="资产负债率加权平均" rules={[{ required: false, message: '请输入资产负债率加权平均' }]}>
            <Input placeholder="请输入资产负债率加权平均" />
          </Form.Item>
          <Form.Item name="debt_ratio_arithmetic_avg" label="资产负债率算术平均" rules={[{ required: false, message: '请输入资产负债率算术平均' }]}>
            <Input placeholder="请输入资产负债率算术平均" />
          </Form.Item>
          <Form.Item name="debt_ratio_median" label="资产负债率中位数" rules={[{ required: false, message: '请输入资产负债率中位数' }]}>
            <Input placeholder="请输入资产负债率中位数" />
          </Form.Item>
          <Form.Item name="debt_ratio_cagr" label="资产负债率复合增长率" rules={[{ required: false, message: '请输入资产负债率复合增长率' }]}>
            <Input placeholder="请输入资产负债率复合增长率" />
          </Form.Item>
          <Form.Item name="debt_ratio_volatility" label="资产负债率波动率" rules={[{ required: false, message: '请输入资产负债率波动率' }]}>
            <Input placeholder="请输入资产负债率波动率" />
          </Form.Item>
          <Form.Item name="dividend_rate_weighted_avg" label="股息率加权平均" rules={[{ required: false, message: '请输入股息率加权平均' }]}>
            <Input placeholder="请输入股息率加权平均" />
          </Form.Item>
          <Form.Item name="dividend_rate_arithmetic_avg" label="股息率算术平均" rules={[{ required: false, message: '请输入股息率算术平均' }]}>
            <Input placeholder="请输入股息率算术平均" />
          </Form.Item>
          <Form.Item name="dividend_rate_median" label="股息率中位数" rules={[{ required: false, message: '请输入股息率中位数' }]}>
            <Input placeholder="请输入股息率中位数" />
          </Form.Item>
          <Form.Item name="dividend_rate_cagr" label="股息率复合增长率" rules={[{ required: false, message: '请输入股息率复合增长率' }]}>
            <Input placeholder="请输入股息率复合增长率" />
          </Form.Item>
          <Form.Item name="dividend_rate_volatility" label="股息率波动率" rules={[{ required: false, message: '请输入股息率波动率' }]}>
            <Input placeholder="请输入股息率波动率" />
          </Form.Item>
          <Form.Item name="payout_rate_weighted_avg" label="股息支付率加权平均" rules={[{ required: false, message: '请输入股息支付率加权平均' }]}>
            <Input placeholder="请输入股息支付率加权平均" />
          </Form.Item>
          <Form.Item name="payout_rate_arithmetic_avg" label="股息支付率算术平均" rules={[{ required: false, message: '请输入股息支付率算术平均' }]}>
            <Input placeholder="请输入股息支付率算术平均" />
          </Form.Item>
          <Form.Item name="payout_rate_median" label="股息支付率中位数" rules={[{ required: false, message: '请输入股息支付率中位数' }]}>
            <Input placeholder="请输入股息支付率中位数" />
          </Form.Item>
          <Form.Item name="payout_rate_cagr" label="股息支付率复合增长率" rules={[{ required: false, message: '请输入股息支付率复合增长率' }]}>
            <Input placeholder="请输入股息支付率复合增长率" />
          </Form.Item>
          <Form.Item name="payout_rate_volatility" label="股息支付率波动率" rules={[{ required: false, message: '请输入股息支付率波动率' }]}>
            <Input placeholder="请输入股息支付率波动率" />
          </Form.Item>
          <Form.Item name="pe_ratio_weighted_avg" label="市盈率加权平均" rules={[{ required: false, message: '请输入市盈率加权平均' }]}>
            <Input placeholder="请输入市盈率加权平均" />
          </Form.Item>
          <Form.Item name="pe_ratio_arithmetic_avg" label="市盈率算术平均" rules={[{ required: false, message: '请输入市盈率算术平均' }]}>
            <Input placeholder="请输入市盈率算术平均" />
          </Form.Item>
          <Form.Item name="pe_ratio_median" label="市盈率中位数" rules={[{ required: false, message: '请输入市盈率中位数' }]}>
            <Input placeholder="请输入市盈率中位数" />
          </Form.Item>
          <Form.Item name="pe_ratio_cagr" label="市盈率复合增长率" rules={[{ required: false, message: '请输入市盈率复合增长率' }]}>
            <Input placeholder="请输入市盈率复合增长率" />
          </Form.Item>
          <Form.Item name="pe_ratio_volatility" label="市盈率波动率" rules={[{ required: false, message: '请输入市盈率波动率' }]}>
            <Input placeholder="请输入市盈率波动率" />
          </Form.Item>
          <Form.Item name="peg_ratio_weighted_avg" label="PEG指标加权平均" rules={[{ required: false, message: '请输入PEG指标加权平均' }]}>
            <Input placeholder="请输入PEG指标加权平均" />
          </Form.Item>
          <Form.Item name="peg_ratio_arithmetic_avg" label="PEG指标算术平均" rules={[{ required: false, message: '请输入PEG指标算术平均' }]}>
            <Input placeholder="请输入PEG指标算术平均" />
          </Form.Item>
          <Form.Item name="peg_ratio_median" label="PEG指标中位数" rules={[{ required: false, message: '请输入PEG指标中位数' }]}>
            <Input placeholder="请输入PEG指标中位数" />
          </Form.Item>
          <Form.Item name="peg_ratio_cagr" label="PEG指标复合增长率" rules={[{ required: false, message: '请输入PEG指标复合增长率' }]}>
            <Input placeholder="请输入PEG指标复合增长率" />
          </Form.Item>
          <Form.Item name="peg_ratio_volatility" label="PEG指标波动率" rules={[{ required: false, message: '请输入PEG指标波动率' }]}>
            <Input placeholder="请输入PEG指标波动率" />
          </Form.Item>
          <Form.Item name="pb_ratio_weighted_avg" label="市净率加权平均" rules={[{ required: false, message: '请输入市净率加权平均' }]}>
            <Input placeholder="请输入市净率加权平均" />
          </Form.Item>
          <Form.Item name="pb_ratio_arithmetic_avg" label="市净率算术平均" rules={[{ required: false, message: '请输入市净率算术平均' }]}>
            <Input placeholder="请输入市净率算术平均" />
          </Form.Item>
          <Form.Item name="pb_ratio_median" label="市净率中位数" rules={[{ required: false, message: '请输入市净率中位数' }]}>
            <Input placeholder="请输入市净率中位数" />
          </Form.Item>
          <Form.Item name="pb_ratio_cagr" label="市净率复合增长率" rules={[{ required: false, message: '请输入市净率复合增长率' }]}>
            <Input placeholder="请输入市净率复合增长率" />
          </Form.Item>
          <Form.Item name="pb_ratio_volatility" label="市净率波动率" rules={[{ required: false, message: '请输入市净率波动率' }]}>
            <Input placeholder="请输入市净率波动率" />
          </Form.Item>
          <Form.Item name="rank" label="排名" rules={[{ required: false, message: '请输入排名' }]}>
            <Input placeholder="请输入排名" />
          </Form.Item>
          <Form.Item name="industry_rank" label="行业排名" rules={[{ required: false, message: '请输入行业排名' }]}>
            <Input placeholder="请输入行业排名" />
          </Form.Item>
          <Form.Item name="score" label="总分" rules={[{ required: false, message: '请输入总分' }]}>
            <Input placeholder="请输入总分" />
          </Form.Item>
          <Form.Item name="c2_score" label="稳健分" rules={[{ required: false, message: '请输入稳健分' }]}>
            <Input placeholder="请输入稳健分" />
          </Form.Item>
          <Form.Item name="c5_score" label="进取分" rules={[{ required: false, message: '请输入进取分' }]}>
            <Input placeholder="请输入进取分" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateRankingMultipleFactorComponent;