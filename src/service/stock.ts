// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateStocksRequest,
  BatchDeleteStocksRequest,
  BatchUpdateStocksRequest,
  BatchUpdateStocksResponse,
  CreateStockRequest,
  ExportStocksRequest,
  ImportStocksRequest,
  ImportStocksResponse,
  ListStocksRequest,
  Stock,
  StockDetail,
  UpdateStockRequest,
} from '@/types/stock';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve stock details.
 *
 * @param ID of the stock resource.
 * @returns The stock object containing all its details.
 */
export function useStock(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<StockDetail>(
    id ? `/stocks/${id}` : null,
    fetcher,
  );

  return {
    stock: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List stocks with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of stocks and total count.
 */
export function useStocks(req: Partial<ListStocksRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<Stock>
  >(['/stocks', req], ([url, params]) => fetcher(url, params));

  return {
    stocks: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateStocks: mutate,
  };
}


/**
 * Create a new stock.
 *
 * @param req Request object containing stock creation data.
 * @returns The stock object.
 */
export function createStock(req: CreateStockRequest) {
  return httpClient.post<Stock>('/stocks', req);
}


/**
 * Update an existing stock.
 *
 * @param req Request object containing stock update data.
 */
export function updateStock(req: UpdateStockRequest) {
  return httpClient.put<Stock>('/stocks', req);
}


/**
 * Delete stock by ID
 *
 * @param id The ID of the stock to delete.
 */
export function deleteStock(id: string) {
  return httpClient.delete<void>(`/stocks/${id}`);
}


/**
 *  Batch create stocks.
 *
 * @param req Request body containing a list of stock creation items.
 * @returns Response containing the list of created stocks.
 */
export function batchCreateStocks(req: BatchCreateStocksRequest) {
  return httpClient.post<number[]>('/stocks:batchCreate', req);
}


/**
 * Batch updates multiple stocks in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateStocks(req: BatchUpdateStocksRequest) {
  return httpClient.put<BatchUpdateStocksResponse>('/stock:batchUpdate', req);
}


/**
 * Batch delete stocks.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteStock(req: BatchDeleteStocksRequest) {
  return httpClient.delete<void>('/stocks:batchDelete', { data: req });
}


/**
 *  Export the Excel template for stock import.
 *
 */
export async function exportStockTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/stocks:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'stock_import_tpl.xlsx');
}


/**
 * Export stock data based on the provided stock IDs.
 *
 * @param req Query parameters specifying the stocks to export.
 */
export async function exportStock(req: ExportStocksRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/stocks:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'stock_data_export.xlsx');
}


/**
 * Import stocks from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed stock data.
 */
export function importStock(req: ImportStocksRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportStocksResponse>('/stocks:import', formData);
}