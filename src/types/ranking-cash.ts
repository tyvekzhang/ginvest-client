// SPDX-License-Identifier: MIT
import {PaginationRequest} from '.';

export interface ListRankingCashRequest extends PaginationRequest {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    total_cash: number;
    
    avg_cash: number;
    
    cagr: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface RankingCash {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    total_cash: number;
    
    avg_cash: number;
    
    cagr: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    created_at: string;
    
    updated_at: string;
    
}

export interface RankingCashDetail extends RankingCash {

}

export interface CreateRankingCash {
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    total_cash: number;
    
    avg_cash: number;
    
    cagr: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    updated_at: string;
    
}

export interface CreateRankingCashRequest {
rankingCash: CreateRankingCash;
}

export interface UpdateRankingCash {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    total_cash: number;
    
    avg_cash: number;
    
    cagr: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    updated_at: string;
    
}

export interface UpdateRankingCashRequest {
rankingCash: UpdateRankingCash;
}

export interface BatchGetRankingCashResponse {
    rankingCash: RankingCashDetail[];
}

export interface BatchCreateRankingCashRequest {
    rankingCash: CreateRankingCash[];
}

export interface BatchCreateRankingCashResponse {
    rankingCash: RankingCash[];
}

export interface BatchUpdateRankingCash {
    
    stock_code: string;
    
    stock_name: string;
    
    industry: string;
    
    query_period: number;
    
    total_cash: number;
    
    avg_cash: number;
    
    cagr: number;
    
    rank: number;
    
    rank_total: number;
    
    rank_avg: number;
    
    rank_cagr: number;
    
    updated_at: string;
    
}

export interface BatchUpdateRankingCashRequest {
    ids: string[];
    rankingCash: BatchUpdateRankingCash;
}

export interface BatchPatchRankingCashRequest {
    rankingCash: UpdateRankingCash[];
}

export interface BatchUpdateRankingCashResponse {
    rankingCash: RankingCash[];
}

export interface BatchDeleteRankingCashRequest {
    ids: string[];
}

export interface ExportRankingCash extends RankingCash {
}

export interface ExportRankingCashRequest {
    ids: string[];
}

export interface ImportRankingCashRequest {
    file: File;
}

export interface ImportRankingCash extends CreateRankingCash {
    errMsg: string;
}

export interface ImportRankingCashResponse {
    rankingCash: ImportRankingCash[];
}