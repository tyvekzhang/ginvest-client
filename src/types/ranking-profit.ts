// SPDX-License-Identifier: MIT
import {PaginationRequest} from '.';

export interface ListRankingProfitsRequest extends PaginationRequest {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    total_profit: number;
    
    avg_revenue: number;
    
    cagr: number;
    
    roe: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    rank_roe: number;
    
    cash_flow_ratio: number;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface RankingProfit {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    total_profit: number;
    
    avg_profit: number;
    
    cagr: number;
    
    roe: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    rank_roe: number;
    
    cash_flow_ratio: number;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface RankingProfitDetail extends RankingProfit {

}

export interface CreateRankingProfit {
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    total_profit: number;
    
    avg_revenue: number;
    
    cagr: number;
    
    roe: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    rank_roe: number;
    
    cash_flow_ratio: number;
    
    updated_at: string;
    
}

export interface CreateRankingProfitRequest {
rankingProfit: CreateRankingProfit;
}

export interface UpdateRankingProfit {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    total_profit: number;
    
    avg_revenue: number;
    
    cagr: number;
    
    roe: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    rank_roe: number;
    
    cash_flow_ratio: number;
    
    updated_at: string;
    
}

export interface UpdateRankingProfitRequest {
rankingProfit: UpdateRankingProfit;
}

export interface BatchGetRankingProfitsResponse {
    rankingProfits: RankingProfitDetail[];
}

export interface BatchCreateRankingProfitsRequest {
    rankingProfits: CreateRankingProfit[];
}

export interface BatchCreateRankingProfitResponse {
    rankingProfits: RankingProfit[];
}

export interface BatchUpdateRankingProfit {
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    total_profit: number;
    
    avg_revenue: number;
    
    cagr: number;
    
    roe: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    rank_roe: number;
    
    cash_flow_ratio: number;
    
    updated_at: string;
    
}

export interface BatchUpdateRankingProfitsRequest {
    ids: string[];
    rankingProfit: BatchUpdateRankingProfit;
}

export interface BatchPatchRankingProfitsRequest {
    rankingProfits: UpdateRankingProfit[];
}

export interface BatchUpdateRankingProfitsResponse {
    rankingProfits: RankingProfit[];
}

export interface BatchDeleteRankingProfitsRequest {
    ids: string[];
}

export interface ExportRankingProfit extends RankingProfit {
}

export interface ExportRankingProfitsRequest {
    ids: string[];
}

export interface ImportRankingProfitsRequest {
    file: File;
}

export interface ImportRankingProfit extends CreateRankingProfit {
    errMsg: string;
}

export interface ImportRankingProfitsResponse {
    rankingProfits: ImportRankingProfit[];
}