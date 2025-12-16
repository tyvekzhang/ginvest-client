// SPDX-License-Identifier: MIT
import {PaginationRequest} from '.';

export interface ListReportCashFlowsRequest extends PaginationRequest {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    year: number;
    
    quarter: number;
    
}

export interface ReportCashFlow {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    exchange: string;
    
    net_cash_flow: string;
    
    net_cash_flow_yoy: string;
    
    operating_cash_flow: string;
    
    operating_cash_flow_ratio: string;
    
    investing_cash_flow: string;
    
    investing_cash_flow_ratio: string;
    
    financing_cash_flow: string;
    
    financing_cash_flow_ratio: string;
    
    year: number;
    
    quarter: number;
    
}

export interface ReportCashFlowDetail extends ReportCashFlow {

}

export interface CreateReportCashFlow {
    
    stock_code: string;
    
    stock_name: string;
    
    exchange: string;
    
    net_cash_flow: string;
    
    net_cash_flow_yoy: string;
    
    operating_cash_flow: string;
    
    operating_cash_flow_ratio: string;
    
    investing_cash_flow: string;
    
    investing_cash_flow_ratio: string;
    
    financing_cash_flow: string;
    
    financing_cash_flow_ratio: string;
    
    announcement_date: string;
    
    year: number;
    
    quarter: number;
    
    updated_at: string;
    
}

export interface CreateReportCashFlowRequest {
reportCashFlow: CreateReportCashFlow;
}

export interface UpdateReportCashFlow {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    exchange: string;
    
    net_cash_flow: string;
    
    net_cash_flow_yoy: string;
    
    operating_cash_flow: string;
    
    operating_cash_flow_ratio: string;
    
    investing_cash_flow: string;
    
    investing_cash_flow_ratio: string;
    
    financing_cash_flow: string;
    
    financing_cash_flow_ratio: string;
    
    announcement_date: string;
    
    year: number;
    
    quarter: number;
    
    updated_at: string;
    
}

export interface UpdateReportCashFlowRequest {
reportCashFlow: UpdateReportCashFlow;
}

export interface BatchGetReportCashFlowsResponse {
    reportCashFlows: ReportCashFlowDetail[];
}

export interface BatchCreateReportCashFlowsRequest {
    reportCashFlows: CreateReportCashFlow[];
}

export interface BatchCreateReportCashFlowResponse {
    reportCashFlows: ReportCashFlow[];
}

export interface BatchUpdateReportCashFlow {
    
    stock_code: string;
    
    stock_name: string;
    
    exchange: string;
    
    net_cash_flow: string;
    
    net_cash_flow_yoy: string;
    
    operating_cash_flow: string;
    
    operating_cash_flow_ratio: string;
    
    investing_cash_flow: string;
    
    investing_cash_flow_ratio: string;
    
    financing_cash_flow: string;
    
    financing_cash_flow_ratio: string;
    
    announcement_date: string;
    
    year: number;
    
    quarter: number;
    
    updated_at: string;
    
}

export interface BatchUpdateReportCashFlowsRequest {
    ids: string[];
    reportCashFlow: BatchUpdateReportCashFlow;
}

export interface BatchPatchReportCashFlowsRequest {
    reportCashFlows: UpdateReportCashFlow[];
}

export interface BatchUpdateReportCashFlowsResponse {
    reportCashFlows: ReportCashFlow[];
}

export interface BatchDeleteReportCashFlowsRequest {
    ids: string[];
}

export interface ExportReportCashFlow extends ReportCashFlow {
}

export interface ExportReportCashFlowsRequest {
    ids: string[];
}

export interface ImportReportCashFlowsRequest {
    file: File;
}

export interface ImportReportCashFlow extends CreateReportCashFlow {
    errMsg: string;
}

export interface ImportReportCashFlowsResponse {
    reportCashFlows: ImportReportCashFlow[];
}