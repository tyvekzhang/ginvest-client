// SPDX-License-Identifier: MIT


import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
  Button,
  Space,
} from 'antd';
import { RankingMultipleFactorDetail } from '@/types/ranking-multiple-factor';
import React, { useMemo } from 'react';

interface RankingMultipleFactorDetailDrawerProps {
  isRankingMultipleFactorDetailDrawerVisible: boolean;
  onRankingMultipleFactorDetailClose: () => void;
  rankingMultipleFactorDetail: RankingMultipleFactorDetail | undefined;
  loading: boolean
}

const RankingMultipleFactorDetailComponent: React.FC<RankingMultipleFactorDetailDrawerProps> = ({
  isRankingMultipleFactorDetailDrawerVisible,
  onRankingMultipleFactorDetailClose,
  rankingMultipleFactorDetail,
  loading
}) => {

  
  return (
    <Drawer
      title="多因子排名详情"
      open={isRankingMultipleFactorDetailDrawerVisible}
      onClose={onRankingMultipleFactorDetailClose}
      destroyOnHidden
      loading={loading}
      width={600}
    >
      { rankingMultipleFactorDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="股票代码">
              { rankingMultipleFactorDetail.stock_code}
          </Descriptions.Item>
          <Descriptions.Item label="股票简称">
              { rankingMultipleFactorDetail.stock_name}
          </Descriptions.Item>
          <Descriptions.Item label="所属行业">
              { rankingMultipleFactorDetail.industry}
          </Descriptions.Item>
          <Descriptions.Item label="查询周期">
              { rankingMultipleFactorDetail.query_period}
          </Descriptions.Item>
          <Descriptions.Item label="净资产收益率加权平均">
              { rankingMultipleFactorDetail.roe_weighted_avg}
          </Descriptions.Item>
          <Descriptions.Item label="净资产收益率算术平均">
              { rankingMultipleFactorDetail.roe_arithmetic_avg}
          </Descriptions.Item>
          <Descriptions.Item label="净资产收益率中位数">
              { rankingMultipleFactorDetail.roe_median}
          </Descriptions.Item>
          <Descriptions.Item label="净资产收益率复合增长率">
              { rankingMultipleFactorDetail.roe_cagr}
          </Descriptions.Item>
          <Descriptions.Item label="净资产收益率波动率">
              { rankingMultipleFactorDetail.roe_volatility}
          </Descriptions.Item>
          <Descriptions.Item label="营收增长率加权平均">
              { rankingMultipleFactorDetail.revenue_growth_weighted_avg}
          </Descriptions.Item>
          <Descriptions.Item label="营收增长率算术平均">
              { rankingMultipleFactorDetail.revenue_growth_arithmetic_avg}
          </Descriptions.Item>
          <Descriptions.Item label="营收增长率中位数">
              { rankingMultipleFactorDetail.revenue_growth_median}
          </Descriptions.Item>
          <Descriptions.Item label="营收增长率复合增长率">
              { rankingMultipleFactorDetail.revenue_growth_cagr}
          </Descriptions.Item>
          <Descriptions.Item label="营收增长率波动率">
              { rankingMultipleFactorDetail.revenue_growth_volatility}
          </Descriptions.Item>
          <Descriptions.Item label="净利润增长率加权平均">
              { rankingMultipleFactorDetail.profit_growth_weighted_avg}
          </Descriptions.Item>
          <Descriptions.Item label="净利润增长率算术平均">
              { rankingMultipleFactorDetail.profit_growth_arithmetic_avg}
          </Descriptions.Item>
          <Descriptions.Item label="净利润增长率中位数">
              { rankingMultipleFactorDetail.profit_growth_median}
          </Descriptions.Item>
          <Descriptions.Item label="净利润增长率复合增长率">
              { rankingMultipleFactorDetail.profit_growth_cagr}
          </Descriptions.Item>
          <Descriptions.Item label="净利润增长率波动率">
              { rankingMultipleFactorDetail.profit_growth_volatility}
          </Descriptions.Item>
          <Descriptions.Item label="现金流利润比加权平均">
              { rankingMultipleFactorDetail.cashflow_ratio_weighted_avg}
          </Descriptions.Item>
          <Descriptions.Item label="现金流利润比算术平均">
              { rankingMultipleFactorDetail.cashflow_ratio_arithmetic_avg}
          </Descriptions.Item>
          <Descriptions.Item label="现金流利润比中位数">
              { rankingMultipleFactorDetail.cashflow_ratio_median}
          </Descriptions.Item>
          <Descriptions.Item label="现金流利润比复合增长率">
              { rankingMultipleFactorDetail.cashflow_ratio_cagr}
          </Descriptions.Item>
          <Descriptions.Item label="现金流利润比波动率">
              { rankingMultipleFactorDetail.cashflow_ratio_volatility}
          </Descriptions.Item>
          <Descriptions.Item label="资产负债率加权平均">
              { rankingMultipleFactorDetail.debt_ratio_weighted_avg}
          </Descriptions.Item>
          <Descriptions.Item label="资产负债率算术平均">
              { rankingMultipleFactorDetail.debt_ratio_arithmetic_avg}
          </Descriptions.Item>
          <Descriptions.Item label="资产负债率中位数">
              { rankingMultipleFactorDetail.debt_ratio_median}
          </Descriptions.Item>
          <Descriptions.Item label="资产负债率复合增长率">
              { rankingMultipleFactorDetail.debt_ratio_cagr}
          </Descriptions.Item>
          <Descriptions.Item label="资产负债率波动率">
              { rankingMultipleFactorDetail.debt_ratio_volatility}
          </Descriptions.Item>
          <Descriptions.Item label="股息率加权平均">
              { rankingMultipleFactorDetail.dividend_rate_weighted_avg}
          </Descriptions.Item>
          <Descriptions.Item label="股息率算术平均">
              { rankingMultipleFactorDetail.dividend_rate_arithmetic_avg}
          </Descriptions.Item>
          <Descriptions.Item label="股息率中位数">
              { rankingMultipleFactorDetail.dividend_rate_median}
          </Descriptions.Item>
          <Descriptions.Item label="股息率复合增长率">
              { rankingMultipleFactorDetail.dividend_rate_cagr}
          </Descriptions.Item>
          <Descriptions.Item label="股息率波动率">
              { rankingMultipleFactorDetail.dividend_rate_volatility}
          </Descriptions.Item>
          <Descriptions.Item label="股息支付率加权平均">
              { rankingMultipleFactorDetail.payout_rate_weighted_avg}
          </Descriptions.Item>
          <Descriptions.Item label="股息支付率算术平均">
              { rankingMultipleFactorDetail.payout_rate_arithmetic_avg}
          </Descriptions.Item>
          <Descriptions.Item label="股息支付率中位数">
              { rankingMultipleFactorDetail.payout_rate_median}
          </Descriptions.Item>
          <Descriptions.Item label="股息支付率复合增长率">
              { rankingMultipleFactorDetail.payout_rate_cagr}
          </Descriptions.Item>
          <Descriptions.Item label="股息支付率波动率">
              { rankingMultipleFactorDetail.payout_rate_volatility}
          </Descriptions.Item>
          <Descriptions.Item label="市盈率加权平均">
              { rankingMultipleFactorDetail.pe_ratio_weighted_avg}
          </Descriptions.Item>
          <Descriptions.Item label="市盈率算术平均">
              { rankingMultipleFactorDetail.pe_ratio_arithmetic_avg}
          </Descriptions.Item>
          <Descriptions.Item label="市盈率中位数">
              { rankingMultipleFactorDetail.pe_ratio_median}
          </Descriptions.Item>
          <Descriptions.Item label="市盈率复合增长率">
              { rankingMultipleFactorDetail.pe_ratio_cagr}
          </Descriptions.Item>
          <Descriptions.Item label="市盈率波动率">
              { rankingMultipleFactorDetail.pe_ratio_volatility}
          </Descriptions.Item>
          <Descriptions.Item label="PEG指标加权平均">
              { rankingMultipleFactorDetail.peg_ratio_weighted_avg}
          </Descriptions.Item>
          <Descriptions.Item label="PEG指标算术平均">
              { rankingMultipleFactorDetail.peg_ratio_arithmetic_avg}
          </Descriptions.Item>
          <Descriptions.Item label="PEG指标中位数">
              { rankingMultipleFactorDetail.peg_ratio_median}
          </Descriptions.Item>
          <Descriptions.Item label="PEG指标复合增长率">
              { rankingMultipleFactorDetail.peg_ratio_cagr}
          </Descriptions.Item>
          <Descriptions.Item label="PEG指标波动率">
              { rankingMultipleFactorDetail.peg_ratio_volatility}
          </Descriptions.Item>
          <Descriptions.Item label="市净率加权平均">
              { rankingMultipleFactorDetail.pb_ratio_weighted_avg}
          </Descriptions.Item>
          <Descriptions.Item label="市净率算术平均">
              { rankingMultipleFactorDetail.pb_ratio_arithmetic_avg}
          </Descriptions.Item>
          <Descriptions.Item label="市净率中位数">
              { rankingMultipleFactorDetail.pb_ratio_median}
          </Descriptions.Item>
          <Descriptions.Item label="市净率复合增长率">
              { rankingMultipleFactorDetail.pb_ratio_cagr}
          </Descriptions.Item>
          <Descriptions.Item label="市净率波动率">
              { rankingMultipleFactorDetail.pb_ratio_volatility}
          </Descriptions.Item>
          <Descriptions.Item label="排名">
              { rankingMultipleFactorDetail.rank}
          </Descriptions.Item>
          <Descriptions.Item label="行业排名">
              { rankingMultipleFactorDetail.industry_rank}
          </Descriptions.Item>
          <Descriptions.Item label="总分">
              { rankingMultipleFactorDetail.score}
          </Descriptions.Item>
          <Descriptions.Item label="稳健分">
              { rankingMultipleFactorDetail.c2_score}
          </Descriptions.Item>
          <Descriptions.Item label="进取分">
              { rankingMultipleFactorDetail.c5_score}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
              {dayjs(rankingMultipleFactorDetail.created_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
          <Descriptions.Item label="updated_at">
              {dayjs(rankingMultipleFactorDetail.updated_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default RankingMultipleFactorDetailComponent;