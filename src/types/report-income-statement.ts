// SPDX-License-Identifier: MIT
import { PaginationRequest } from '.';

export interface RevenueCycleReponse {
    cycle: string
    total_operating_income: number
    total_operating_income_yoy: number
}

export interface ListReportIncomeStatementsRequest extends PaginationRequest {

    id: string;

    stock_code: string;

    stock_name: string;

    year: number;

    quarter: number;

}

export interface ReportIncomeStatement {

    id: string;

    stock_code: string;

    stock_name: string;

    net_profit: number;

    net_profit_yoy: number;

    total_operating_income: number;

    total_operating_income_yoy: number;

    year: number;

    quarter: number;

}

export interface ReportIncomeStatementDetail extends ReportIncomeStatement {

}

export interface CreateReportIncomeStatement {

    stock_code: string;

    stock_name: string;

    exchange: string;

    net_profit: number;

    net_profit_yoy: number;

    total_operating_income: number;

    total_operating_income_yoy: number;

    operating_expenses: number;

    sales_expenses: number;

    management_expenses: number;

    financial_expenses: number;

    total_operating_expenses: number;

    operating_profit: number;

    total_profit: number;

    announcement_date: string;

    year: number;

    quarter: number;

    updated_at: string;

}

export interface CreateReportIncomeStatementRequest {
    reportIncomeStatement: CreateReportIncomeStatement;
}

export interface UpdateReportIncomeStatement {

    id: string;

    stock_code: string;

    stock_name: string;

    exchange: string;

    net_profit: number;

    net_profit_yoy: number;

    total_operating_income: number;

    total_operating_income_yoy: number;

    operating_expenses: number;

    sales_expenses: number;

    management_expenses: number;

    financial_expenses: number;

    total_operating_expenses: number;

    operating_profit: number;

    total_profit: number;

    announcement_date: string;

    year: number;

    quarter: number;

    updated_at: string;

}

export interface UpdateReportIncomeStatementRequest {
    reportIncomeStatement: UpdateReportIncomeStatement;
}

export interface BatchGetReportIncomeStatementsResponse {
    reportIncomeStatements: ReportIncomeStatementDetail[];
}

export interface BatchCreateReportIncomeStatementsRequest {
    reportIncomeStatements: CreateReportIncomeStatement[];
}

export interface BatchCreateReportIncomeStatementResponse {
    reportIncomeStatements: ReportIncomeStatement[];
}

export interface BatchUpdateReportIncomeStatement {

    stock_code: string;

    stock_name: string;

    exchange: string;

    net_profit: number;

    net_profit_yoy: number;

    total_operating_income: number;

    total_operating_income_yoy: number;

    operating_expenses: number;

    sales_expenses: number;

    management_expenses: number;

    financial_expenses: number;

    total_operating_expenses: number;

    operating_profit: number;

    total_profit: number;

    announcement_date: string;

    year: number;

    quarter: number;

    updated_at: string;

}

export interface BatchUpdateReportIncomeStatementsRequest {
    ids: string[];
    reportIncomeStatement: BatchUpdateReportIncomeStatement;
}

export interface BatchPatchReportIncomeStatementsRequest {
    reportIncomeStatements: UpdateReportIncomeStatement[];
}

export interface BatchUpdateReportIncomeStatementsResponse {
    reportIncomeStatements: ReportIncomeStatement[];
}

export interface BatchDeleteReportIncomeStatementsRequest {
    ids: string[];
}

export interface ExportReportIncomeStatement extends ReportIncomeStatement {
}

export interface ExportReportIncomeStatementsRequest {
    ids: string[];
}

export interface ImportReportIncomeStatementsRequest {
    file: File;
}

export interface ImportReportIncomeStatement extends CreateReportIncomeStatement {
    errMsg: string;
}

export interface ImportReportIncomeStatementsResponse {
    reportIncomeStatements: ImportReportIncomeStatement[];
}