// SPDX-License-Identifier: MIT
import {PaginationRequest} from '.';

export interface ListRankingRevenuesRequest extends PaginationRequest {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    current_year: number;
    
    query_period: number;
    
    total_revenue: number;
    
    avg_revenue: number;
    
    cagr: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface RankingRevenue {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    total_revenue: number;
    
    avg_revenue: number;
    
    cagr: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
}

export interface RankingRevenueDetail extends RankingRevenue {

}

export interface CreateRankingRevenue {
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    current_year: number;
    
    query_period: number;
    
    total_revenue: number;
    
    avg_revenue: number;
    
    cagr: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    updated_at: string;
    
}

export interface CreateRankingRevenueRequest {
rankingRevenue: CreateRankingRevenue;
}

export interface UpdateRankingRevenue {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    current_year: number;
    
    query_period: number;
    
    total_revenue: number;
    
    avg_revenue: number;
    
    cagr: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    updated_at: string;
    
}

export interface UpdateRankingRevenueRequest {
rankingRevenue: UpdateRankingRevenue;
}

export interface BatchGetRankingRevenuesResponse {
    rankingRevenues: RankingRevenueDetail[];
}

export interface BatchCreateRankingRevenuesRequest {
    rankingRevenues: CreateRankingRevenue[];
}

export interface BatchCreateRankingRevenueResponse {
    rankingRevenues: RankingRevenue[];
}

export interface BatchUpdateRankingRevenue {
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    current_year: number;
    
    query_period: number;
    
    total_revenue: number;
    
    avg_revenue: number;
    
    cagr: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    updated_at: string;
    
}

export interface BatchUpdateRankingRevenuesRequest {
    ids: string[];
    rankingRevenue: BatchUpdateRankingRevenue;
}

export interface BatchPatchRankingRevenuesRequest {
    rankingRevenues: UpdateRankingRevenue[];
}

export interface BatchUpdateRankingRevenuesResponse {
    rankingRevenues: RankingRevenue[];
}

export interface BatchDeleteRankingRevenuesRequest {
    ids: string[];
}

export interface ExportRankingRevenue extends RankingRevenue {
}

export interface ExportRankingRevenuesRequest {
    ids: string[];
}

export interface ImportRankingRevenuesRequest {
    file: File;
}

export interface ImportRankingRevenue extends CreateRankingRevenue {
    errMsg: string;
}

export interface ImportRankingRevenuesResponse {
    rankingRevenues: ImportRankingRevenue[];
}