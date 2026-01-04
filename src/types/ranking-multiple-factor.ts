// SPDX-License-Identifier: MIT
import {PaginationRequest} from '.';

export interface ListRankingMultipleFactorsRequest extends PaginationRequest {
    
    id?: string;
    
    stock_code?: string;
    
    stock_name?: string;
    
    industry?: string;
    
    query_period?: number;
    
    
}

export interface RankingMultipleFactor {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    roe_weighted_avg: number;
    
    revenue_growth_cagr: number;
    
    profit_growth_cagr: number;
    
    cashflow_ratio_weighted_avg: number;
    
    debt_ratio_weighted_avg: number;
    
    dividend_rate_weighted_avg: string;
    
    payout_rate_weighted_avg: number;
    
    pe_ratio_median: number;
    
    peg_ratio_median: number;
    
    pb_ratio_median: number;
    
    rank: number;
    
    industry_rank: number;
    
    score: number;
    
    c2_score: number;
    
    c5_score: number;
    
}

export interface RankingMultipleFactorDetail extends RankingMultipleFactor {

}

export interface CreateRankingMultipleFactor {
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    roe_weighted_avg: number;
    
    roe_arithmetic_avg: number;
    
    roe_median: number;
    
    roe_cagr: number;
    
    roe_volatility: number;
    
    revenue_growth_weighted_avg: number;
    
    revenue_growth_arithmetic_avg: number;
    
    revenue_growth_median: number;
    
    revenue_growth_cagr: number;
    
    revenue_growth_volatility: number;
    
    profit_growth_weighted_avg: number;
    
    profit_growth_arithmetic_avg: number;
    
    profit_growth_median: number;
    
    profit_growth_cagr: number;
    
    profit_growth_volatility: number;
    
    cashflow_ratio_weighted_avg: number;
    
    cashflow_ratio_arithmetic_avg: number;
    
    cashflow_ratio_median: number;
    
    cashflow_ratio_cagr: number;
    
    cashflow_ratio_volatility: number;
    
    debt_ratio_weighted_avg: number;
    
    debt_ratio_arithmetic_avg: number;
    
    debt_ratio_median: number;
    
    debt_ratio_cagr: number;
    
    debt_ratio_volatility: number;
    
    dividend_rate_weighted_avg: string;
    
    dividend_rate_arithmetic_avg: string;
    
    dividend_rate_median: string;
    
    dividend_rate_cagr: string;
    
    dividend_rate_volatility: string;
    
    payout_rate_weighted_avg: number;
    
    payout_rate_arithmetic_avg: number;
    
    payout_rate_median: number;
    
    payout_rate_cagr: number;
    
    payout_rate_volatility: number;
    
    pe_ratio_weighted_avg: number;
    
    pe_ratio_arithmetic_avg: number;
    
    pe_ratio_median: number;
    
    pe_ratio_cagr: number;
    
    pe_ratio_volatility: number;
    
    peg_ratio_weighted_avg: number;
    
    peg_ratio_arithmetic_avg: number;
    
    peg_ratio_median: number;
    
    peg_ratio_cagr: number;
    
    peg_ratio_volatility: number;
    
    pb_ratio_weighted_avg: number;
    
    pb_ratio_arithmetic_avg: number;
    
    pb_ratio_median: number;
    
    pb_ratio_cagr: number;
    
    pb_ratio_volatility: number;
    
    rank: number;
    
    industry_rank: number;
    
    score: number;
    
    c2_score: number;
    
    c5_score: number;
    
}

export interface CreateRankingMultipleFactorRequest {
rankingMultipleFactor: CreateRankingMultipleFactor;
}

export interface UpdateRankingMultipleFactor {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    roe_weighted_avg: number;
    
    roe_arithmetic_avg: number;
    
    roe_median: number;
    
    roe_cagr: number;
    
    roe_volatility: number;
    
    revenue_growth_weighted_avg: number;
    
    revenue_growth_arithmetic_avg: number;
    
    revenue_growth_median: number;
    
    revenue_growth_cagr: number;
    
    revenue_growth_volatility: number;
    
    profit_growth_weighted_avg: number;
    
    profit_growth_arithmetic_avg: number;
    
    profit_growth_median: number;
    
    profit_growth_cagr: number;
    
    profit_growth_volatility: number;
    
    cashflow_ratio_weighted_avg: number;
    
    cashflow_ratio_arithmetic_avg: number;
    
    cashflow_ratio_median: number;
    
    cashflow_ratio_cagr: number;
    
    cashflow_ratio_volatility: number;
    
    debt_ratio_weighted_avg: number;
    
    debt_ratio_arithmetic_avg: number;
    
    debt_ratio_median: number;
    
    debt_ratio_cagr: number;
    
    debt_ratio_volatility: number;
    
    dividend_rate_weighted_avg: string;
    
    dividend_rate_arithmetic_avg: string;
    
    dividend_rate_median: string;
    
    dividend_rate_cagr: string;
    
    dividend_rate_volatility: string;
    
    payout_rate_weighted_avg: number;
    
    payout_rate_arithmetic_avg: number;
    
    payout_rate_median: number;
    
    payout_rate_cagr: number;
    
    payout_rate_volatility: number;
    
    pe_ratio_weighted_avg: number;
    
    pe_ratio_arithmetic_avg: number;
    
    pe_ratio_median: number;
    
    pe_ratio_cagr: number;
    
    pe_ratio_volatility: number;
    
    peg_ratio_weighted_avg: number;
    
    peg_ratio_arithmetic_avg: number;
    
    peg_ratio_median: number;
    
    peg_ratio_cagr: number;
    
    peg_ratio_volatility: number;
    
    pb_ratio_weighted_avg: number;
    
    pb_ratio_arithmetic_avg: number;
    
    pb_ratio_median: number;
    
    pb_ratio_cagr: number;
    
    pb_ratio_volatility: number;
    
    rank: number;
    
    industry_rank: number;
    
    score: number;
    
    c2_score: number;
    
    c5_score: number;
    
}

export interface UpdateRankingMultipleFactorRequest {
rankingMultipleFactor: UpdateRankingMultipleFactor;
}

export interface BatchGetRankingMultipleFactorsResponse {
    rankingMultipleFactors: RankingMultipleFactorDetail[];
}

export interface BatchCreateRankingMultipleFactorsRequest {
    rankingMultipleFactors: CreateRankingMultipleFactor[];
}

export interface BatchCreateRankingMultipleFactorResponse {
    rankingMultipleFactors: RankingMultipleFactor[];
}

export interface BatchUpdateRankingMultipleFactor {
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    roe_weighted_avg: number;
    
    roe_arithmetic_avg: number;
    
    roe_median: number;
    
    roe_cagr: number;
    
    roe_volatility: number;
    
    revenue_growth_weighted_avg: number;
    
    revenue_growth_arithmetic_avg: number;
    
    revenue_growth_median: number;
    
    revenue_growth_cagr: number;
    
    revenue_growth_volatility: number;
    
    profit_growth_weighted_avg: number;
    
    profit_growth_arithmetic_avg: number;
    
    profit_growth_median: number;
    
    profit_growth_cagr: number;
    
    profit_growth_volatility: number;
    
    cashflow_ratio_weighted_avg: number;
    
    cashflow_ratio_arithmetic_avg: number;
    
    cashflow_ratio_median: number;
    
    cashflow_ratio_cagr: number;
    
    cashflow_ratio_volatility: number;
    
    debt_ratio_weighted_avg: number;
    
    debt_ratio_arithmetic_avg: number;
    
    debt_ratio_median: number;
    
    debt_ratio_cagr: number;
    
    debt_ratio_volatility: number;
    
    dividend_rate_weighted_avg: string;
    
    dividend_rate_arithmetic_avg: string;
    
    dividend_rate_median: string;
    
    dividend_rate_cagr: string;
    
    dividend_rate_volatility: string;
    
    payout_rate_weighted_avg: number;
    
    payout_rate_arithmetic_avg: number;
    
    payout_rate_median: number;
    
    payout_rate_cagr: number;
    
    payout_rate_volatility: number;
    
    pe_ratio_weighted_avg: number;
    
    pe_ratio_arithmetic_avg: number;
    
    pe_ratio_median: number;
    
    pe_ratio_cagr: number;
    
    pe_ratio_volatility: number;
    
    peg_ratio_weighted_avg: number;
    
    peg_ratio_arithmetic_avg: number;
    
    peg_ratio_median: number;
    
    peg_ratio_cagr: number;
    
    peg_ratio_volatility: number;
    
    pb_ratio_weighted_avg: number;
    
    pb_ratio_arithmetic_avg: number;
    
    pb_ratio_median: number;
    
    pb_ratio_cagr: number;
    
    pb_ratio_volatility: number;
    
    rank: number;
    
    industry_rank: number;
    
    score: number;
    
    c2_score: number;
    
    c5_score: number;
    
}

export interface BatchUpdateRankingMultipleFactorsRequest {
    ids: string[];
    rankingMultipleFactor: BatchUpdateRankingMultipleFactor;
}

export interface BatchPatchRankingMultipleFactorsRequest {
    rankingMultipleFactors: UpdateRankingMultipleFactor[];
}

export interface BatchUpdateRankingMultipleFactorsResponse {
    rankingMultipleFactors: RankingMultipleFactor[];
}

export interface BatchDeleteRankingMultipleFactorsRequest {
    ids: string[];
}

export interface ExportRankingMultipleFactor extends RankingMultipleFactor {
}

export interface ExportRankingMultipleFactorsRequest {
    ids: string[];
}

export interface ImportRankingMultipleFactorsRequest {
    file: File;
}

export interface ImportRankingMultipleFactor extends CreateRankingMultipleFactor {
    errMsg: string;
}

export interface ImportRankingMultipleFactorsResponse {
    rankingMultipleFactors: ImportRankingMultipleFactor[];
}