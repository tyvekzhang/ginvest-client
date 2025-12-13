// SPDX-License-Identifier: MIT
import { PaginationRequest } from '.';

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