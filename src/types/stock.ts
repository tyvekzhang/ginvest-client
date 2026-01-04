// SPDX-License-Identifier: MIT
import { PaginationRequest } from '.';

export type TimePeriod = 1 | 3 | 5 | 10 | 15 | 20

// Stock types based on API response structure
export interface StockAbstract {
    dividend: Dividend
    indicator_annual: IndicatorAnnual
    profitability: Profitability
    growth_ability: GrowthAbility
    revenue_quality: RevenueQuality
    financial_risk: FinancialRisk
    operating_capability: OperatingCapability
    per_indicator: PerIndicator
}

export interface Dividend {
    industry: string
    id: number
    listing_date: string
    dividend_rate: string
    year: number
    created_at: string
    stock_code: string
    stock_name: string
    dividend_income: string
    payout_rate: string
    quarter: number
    updated_at: string
}

export interface IndicatorAnnual {
    stock_code: string
    stock_name: string
    total_shares: number
    close_price: string
    net_profit: string
    net_asset: string
    year: number
    created_at: string
    industry: string
    id: number
    listing_date: string
    restricted_shares: number
    total_market_cap: string
    pe_ratio: string
    pb_ratio: string
    quarter: number
    updated_at: string
}

export interface Profitability {
    diluted_roe: string
    ebit_after_tax_roa_avg: string
    updated_at: string
    average_roe: string
    cost_expense_margin: string
    id: number
    average_roe_excluding_non_recurring_items: string
    operating_margin: string
    stock_code: string
    diluted_roe_excluding_non_recurring_items: string
    average_roa: string
    roe: string
    ebit_margin: string
    average_roa_including_minority_interest: string
    stock_name: string
    return_on_total_assets: string
    year: number
    gross_margin: string
    return_on_total_capital: string
    quarter: number
    net_profit_margin: string
    return_on_invested_capital: string
    created_at: string
}

export interface GrowthAbility {
    total_operating_revenue: string
    id: number
    net_profit_attributable_to_parent_company: string
    net_profit_excluding_non_recurring_items: string
    profit_growth: string
    quarter: number
    updated_at: string
    stock_code: string
    stock_name: string
    net_profit: string
    revenue_growth: string
    year: number
    created_at: string
}

export interface RevenueQuality {
    id: number
    stock_code: string
    stock_name: string
    operating_cash_to_total_revenue: string
    sales_cost_ratio: string
    tax_to_total_profit: string
    quarter: number
    updated_at: string
    operating_cash_to_sales: string
    period_expense_ratio: string
    cost_expense_ratio: string
    cashflow_ratio: string
    year: number
    created_at: string
}

export interface FinancialRisk {
    stock_code: string
    stock_name: string
    quick_ratio: string
    equity_multiplier: string
    equity_ratio: string
    year: number
    created_at: string
    current_ratio: string
    id: number
    debt_ratio: string
    conservative_quick_ratio: string
    equity_multiplier_including_minority_equity: string
    cash_ratio: string
    quarter: number
    updated_at: string
}

export interface OperatingCapability {
    accounts_receivable_turnover: string
    id: number
    accounts_receivable_turnover_days: string
    inventory_turnover_days: string
    total_asset_turnover_days: string
    current_asset_turnover_days: string
    year: number
    created_at: string
    stock_code: string
    stock_name: string
    inventory_turnover: string
    total_asset_turnover: string
    current_asset_turnover: string
    accounts_payable_turnover: string
    quarter: number
    updated_at: string
}

export interface PerIndicator {
    id: number
    book_value_latest_shares: string
    retained_earnings_per_share: string
    updated_at: string
    stock_code: string
    operating_cash_flow_per_share: string
    operating_revenue_per_share: string
    basic_earnings_per_share: string
    net_cash_flow_per_share: string
    total_operating_revenue_per_share: string
    stock_name: string
    enterprise_fcf_per_share: string
    ebit_per_share: string
    diluted_earnings_per_share: string
    shareholder_fcf_per_share: string
    year: number
    diluted_eps_latest_shares: string
    undistributed_profit_per_share: string
    quarter: number
    diluted_book_value_end_shares: string
    capital_reserve_per_share: string
    created_at: string
    adjusted_book_value_end_shares: string
    surplus_reserve_per_share: string
}

export interface IndicatorConfig {
    key: string
    label: string
    fields: FieldConfig[]
}

export interface FieldConfig {
    key: string
    label: string
    unit?: string
    color: string
    strokeWidth?: number
    strokeDasharray?: string
}


export interface ListStocksRequest extends PaginationRequest {

    id: string;

    stock_code: string;

    stock_name: string;

    listing_date: string;

    industry: string;

    market_type: string;

    registered_capital: string;

}

export interface Stock {

    id: string;

    stock_code: string;

    stock_name: string;

    listing_date: string;

    industry: string;

    market_type: string;

    registered_capital: string;

}

export interface StockDetail {
    stock_code: string;

    stock_name: string;

    exchange: string;

    listing_date: string;

    industry: string;

    province: string;

    city: string;

    company_name: string;

    english_name: string;

    former_name: string;

    market_type: string;

    legal_representative: string;

    registered_capital: string;

    establish_date: string;

    website: string;

    email: string;

    telephone: string;

    fax: string;

    registered_address: string;

    business_address: string;

    postal_code: string;

    main_business: string;

    business_scope: string;

    company_profile: string;

    data_source: string;

    updated_at: string;
}

export interface CreateStock {

    stock_code: string;

    stock_name: string;

    exchange: string;

    listing_date: string;

    industry: string;

    province: string;

    city: string;

    company_name: string;

    english_name: string;

    former_name: string;

    market_type: string;

    legal_representative: string;

    registered_capital: string;

    establish_date: string;

    website: string;

    email: string;

    telephone: string;

    fax: string;

    registered_address: string;

    business_address: string;

    postal_code: string;

    main_business: string;

    business_scope: string;

    company_profile: string;

    data_source: string;

    updated_at: string;

}

export interface CreateStockRequest {
    stock: CreateStock;
}

export interface UpdateStock {

    id: string;

    stock_code: string;

    stock_name: string;

    exchange: string;

    listing_date: string;

    industry: string;

    province: string;

    city: string;

    company_name: string;

    english_name: string;

    former_name: string;

    market_type: string;

    legal_representative: string;

    registered_capital: string;

    establish_date: string;

    website: string;

    email: string;

    telephone: string;

    fax: string;

    registered_address: string;

    business_address: string;

    postal_code: string;

    main_business: string;

    business_scope: string;

    company_profile: string;

    data_source: string;

    updated_at: string;

}

export interface UpdateStockRequest {
    stock: UpdateStock;
}

export interface BatchGetStocksResponse {
    stocks: StockDetail[];
}

export interface BatchCreateStocksRequest {
    stocks: CreateStock[];
}

export interface BatchCreateStockResponse {
    stocks: Stock[];
}

export interface BatchUpdateStock {

    stock_code: string;

    stock_name: string;

    exchange: string;

    listing_date: string;

    industry: string;

    province: string;

    city: string;

    company_name: string;

    english_name: string;

    former_name: string;

    market_type: string;

    legal_representative: string;

    registered_capital: string;

    establish_date: string;

    website: string;

    email: string;

    telephone: string;

    fax: string;

    registered_address: string;

    business_address: string;

    postal_code: string;

    main_business: string;

    business_scope: string;

    company_profile: string;

    data_source: string;

    updated_at: string;

}

export interface BatchUpdateStocksRequest {
    ids: string[];
    stock: BatchUpdateStock;
}

export interface BatchPatchStocksRequest {
    stocks: UpdateStock[];
}

export interface BatchUpdateStocksResponse {
    stocks: Stock[];
}

export interface BatchDeleteStocksRequest {
    ids: string[];
}

export interface ExportStock extends Stock {
}

export interface ExportStocksRequest {
    ids: string[];
}

export interface ImportStocksRequest {
    file: File;
}

export interface ImportStock extends CreateStock {
    errMsg: string;
}

export interface ImportStocksResponse {
    stocks: ImportStock[];
}