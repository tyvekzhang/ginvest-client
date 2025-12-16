// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import { ProfitCycleReponse, RevenueCycleReponse } from '@/types/report-income-statement';
import {
  BatchCreateReportIncomeStatementsRequest,
  BatchDeleteReportIncomeStatementsRequest,
  BatchUpdateReportIncomeStatementsRequest,
  BatchUpdateReportIncomeStatementsResponse,
  CreateReportIncomeStatementRequest,
  ExportReportIncomeStatementsRequest,
  ImportReportIncomeStatementsRequest,
  ImportReportIncomeStatementsResponse,
  ListReportIncomeStatementsRequest,
  ReportIncomeStatement,
  ReportIncomeStatementDetail,
  UpdateReportIncomeStatementRequest,
} from '@/types/report-income-statement';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';

export function useReportProfitCycle(stock_code: string, period: number) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<ProfitCycleReponse>(
    `/reportIncomeStatements:periodProfit?stock_code=${stock_code}&period=${period}`,
    fetcher,
  );

  return {
    profitCycleList: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

export function useReportRevenueCycle(stock_code: string, period: number) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<RevenueCycleReponse>(
    `/reportIncomeStatements:periodRevenue?stock_code=${stock_code}&period=${period}`,
    fetcher,
  );

  return {
    revenueCycleList: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * Retrieve reportIncomeStatement details.
 *
 * @param ID of the reportIncomeStatement resource.
 * @returns The reportIncomeStatement object containing all its details.
 */
export function useReportIncomeStatement(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<ReportIncomeStatementDetail>(
    id ? `/reportIncomeStatements/${id}` : null,
    fetcher,
  );

  return {
    reportIncomeStatement: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List reportIncomeStatements with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of reportIncomeStatements and total count.
 */
export function useReportIncomeStatements(req: Partial<ListReportIncomeStatementsRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<ReportIncomeStatement>
  >(['/reportIncomeStatements', req], ([url, params]) => fetcher(url, params));

  return {
    reportIncomeStatements: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateReportIncomeStatements: mutate,
  };
}


/**
 * Create a new reportIncomeStatement.
 *
 * @param req Request object containing reportIncomeStatement creation data.
 * @returns The reportIncomeStatement object.
 */
export function createReportIncomeStatement(req: CreateReportIncomeStatementRequest) {
  return httpClient.post<ReportIncomeStatement>('/reportIncomeStatements', req);
}


/**
 * Update an existing reportIncomeStatement.
 *
 * @param req Request object containing reportIncomeStatement update data.
 */
export function updateReportIncomeStatement(req: UpdateReportIncomeStatementRequest) {
  return httpClient.put<ReportIncomeStatement>('/reportIncomeStatements', req);
}


/**
 * Delete reportIncomeStatement by ID
 *
 * @param id The ID of the reportIncomeStatement to delete.
 */
export function deleteReportIncomeStatement(id: string) {
  return httpClient.delete<void>(`/reportIncomeStatements/${id}`);
}


/**
 *  Batch create reportIncomeStatements.
 *
 * @param req Request body containing a list of reportIncomeStatement creation items.
 * @returns Response containing the list of created reportIncomeStatements.
 */
export function batchCreateReportIncomeStatements(req: BatchCreateReportIncomeStatementsRequest) {
  return httpClient.post<number[]>('/reportIncomeStatements:batchCreate', req);
}


/**
 * Batch updates multiple reportIncomeStatements in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateReportIncomeStatements(req: BatchUpdateReportIncomeStatementsRequest) {
  return httpClient.put<BatchUpdateReportIncomeStatementsResponse>('/reportIncomeStatement:batchUpdate', req);
}


/**
 * Batch delete reportIncomeStatements.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteReportIncomeStatement(req: BatchDeleteReportIncomeStatementsRequest) {
  return httpClient.delete<void>('/reportIncomeStatements:batchDelete', { data: req });
}


/**
 *  Export the Excel template for reportIncomeStatement import.
 *
 */
export async function exportReportIncomeStatementTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/reportIncomeStatements:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'reportIncomeStatement_import_tpl.xlsx');
}


/**
 * Export reportIncomeStatement data based on the provided reportIncomeStatement IDs.
 *
 * @param req Query parameters specifying the reportIncomeStatements to export.
 */
export async function exportReportIncomeStatement(req: ExportReportIncomeStatementsRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/reportIncomeStatements:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'reportIncomeStatement_data_export.xlsx');
}


/**
 * Import reportIncomeStatements from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed reportIncomeStatement data.
 */
export function importReportIncomeStatement(req: ImportReportIncomeStatementsRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportReportIncomeStatementsResponse>('/reportIncomeStatements:import', formData);
}