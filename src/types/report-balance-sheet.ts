// SPDX-License-Identifier: MIT
import {PaginationRequest} from '.';

export interface ListReportBalanceSheetsRequest extends PaginationRequest {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    year: number;
    
    quarter: number;
    
}

export interface ReportBalanceSheet {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    exchange: string;
    
    asset_cash: string;
    
    asset_receivables: string;
    
    asset_inventory: string;
    
    asset_total: string;
    
    asset_total_yoy: string;
    
    liability_payables: string;
    
    liability_total: string;
    
    liability_advance_receipts: string;
    
    liability_total_yoy: string;
    
    asset_liability_ratio: string;
    
    shareholder_equity: string;
    
    year: number;
    
    quarter: number;
    
}

export interface ReportBalanceSheetDetail extends ReportBalanceSheet {

}

export interface CreateReportBalanceSheet {
    
    stock_code: string;
    
    stock_name: string;
    
    exchange: string;
    
    asset_cash: string;
    
    asset_receivables: string;
    
    asset_inventory: string;
    
    asset_total: string;
    
    asset_total_yoy: string;
    
    liability_payables: string;
    
    liability_total: string;
    
    liability_advance_receipts: string;
    
    liability_total_yoy: string;
    
    asset_liability_ratio: string;
    
    shareholder_equity: string;
    
    announcement_date: string;
    
    year: number;
    
    quarter: number;
    
    updated_at: string;
    
}

export interface CreateReportBalanceSheetRequest {
reportBalanceSheet: CreateReportBalanceSheet;
}

export interface UpdateReportBalanceSheet {
    
    id: string;
    
    stock_code: string;
    
    stock_name: string;
    
    exchange: string;
    
    asset_cash: string;
    
    asset_receivables: string;
    
    asset_inventory: string;
    
    asset_total: string;
    
    asset_total_yoy: string;
    
    liability_payables: string;
    
    liability_total: string;
    
    liability_advance_receipts: string;
    
    liability_total_yoy: string;
    
    asset_liability_ratio: string;
    
    shareholder_equity: string;
    
    announcement_date: string;
    
    year: number;
    
    quarter: number;
    
    updated_at: string;
    
}

export interface UpdateReportBalanceSheetRequest {
reportBalanceSheet: UpdateReportBalanceSheet;
}

export interface BatchGetReportBalanceSheetsResponse {
    reportBalanceSheets: ReportBalanceSheetDetail[];
}

export interface BatchCreateReportBalanceSheetsRequest {
    reportBalanceSheets: CreateReportBalanceSheet[];
}

export interface BatchCreateReportBalanceSheetResponse {
    reportBalanceSheets: ReportBalanceSheet[];
}

export interface BatchUpdateReportBalanceSheet {
    
    stock_code: string;
    
    stock_name: string;
    
    exchange: string;
    
    asset_cash: string;
    
    asset_receivables: string;
    
    asset_inventory: string;
    
    asset_total: string;
    
    asset_total_yoy: string;
    
    liability_payables: string;
    
    liability_total: string;
    
    liability_advance_receipts: string;
    
    liability_total_yoy: string;
    
    asset_liability_ratio: string;
    
    shareholder_equity: string;
    
    announcement_date: string;
    
    year: number;
    
    quarter: number;
    
    updated_at: string;
    
}

export interface BatchUpdateReportBalanceSheetsRequest {
    ids: string[];
    reportBalanceSheet: BatchUpdateReportBalanceSheet;
}

export interface BatchPatchReportBalanceSheetsRequest {
    reportBalanceSheets: UpdateReportBalanceSheet[];
}

export interface BatchUpdateReportBalanceSheetsResponse {
    reportBalanceSheets: ReportBalanceSheet[];
}

export interface BatchDeleteReportBalanceSheetsRequest {
    ids: string[];
}

export interface ExportReportBalanceSheet extends ReportBalanceSheet {
}

export interface ExportReportBalanceSheetsRequest {
    ids: string[];
}

export interface ImportReportBalanceSheetsRequest {
    file: File;
}

export interface ImportReportBalanceSheet extends CreateReportBalanceSheet {
    errMsg: string;
}

export interface ImportReportBalanceSheetsResponse {
    reportBalanceSheets: ImportReportBalanceSheet[];
}