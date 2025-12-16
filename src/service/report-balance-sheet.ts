// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateReportBalanceSheetsRequest,
  BatchDeleteReportBalanceSheetsRequest,
  BatchUpdateReportBalanceSheetsRequest,
  BatchUpdateReportBalanceSheetsResponse,
  CreateReportBalanceSheetRequest,
  ExportReportBalanceSheetsRequest,
  ImportReportBalanceSheetsRequest,
  ImportReportBalanceSheetsResponse,
  ListReportBalanceSheetsRequest,
  ReportBalanceSheet,
  ReportBalanceSheetDetail,
  UpdateReportBalanceSheetRequest,
} from '@/types/report-balance-sheet';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve reportBalanceSheet details.
 *
 * @param ID of the reportBalanceSheet resource.
 * @returns The reportBalanceSheet object containing all its details.
 */
export function useReportBalanceSheet(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<ReportBalanceSheetDetail>(
    id ? `/reportBalanceSheets/${id}` : null,
    fetcher,
  );

  return {
    reportBalanceSheet: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List reportBalanceSheets with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of reportBalanceSheets and total count.
 */
export function useReportBalanceSheets(req: Partial<ListReportBalanceSheetsRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<ReportBalanceSheet>
  >(['/reportBalanceSheets', req], ([url, params]) => fetcher(url, params));

  return {
    reportBalanceSheets: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateReportBalanceSheets: mutate,
  };
}


/**
 * Create a new reportBalanceSheet.
 *
 * @param req Request object containing reportBalanceSheet creation data.
 * @returns The reportBalanceSheet object.
 */
export function createReportBalanceSheet(req: CreateReportBalanceSheetRequest) {
  return httpClient.post<ReportBalanceSheet>('/reportBalanceSheets', req);
}


/**
 * Update an existing reportBalanceSheet.
 *
 * @param req Request object containing reportBalanceSheet update data.
 */
export function updateReportBalanceSheet(req: UpdateReportBalanceSheetRequest) {
  return httpClient.put<ReportBalanceSheet>('/reportBalanceSheets', req);
}


/**
 * Delete reportBalanceSheet by ID
 *
 * @param id The ID of the reportBalanceSheet to delete.
 */
export function deleteReportBalanceSheet(id: string) {
  return httpClient.delete<void>(`/reportBalanceSheets/${id}`);
}


/**
 *  Batch create reportBalanceSheets.
 *
 * @param req Request body containing a list of reportBalanceSheet creation items.
 * @returns Response containing the list of created reportBalanceSheets.
 */
export function batchCreateReportBalanceSheets(req: BatchCreateReportBalanceSheetsRequest) {
  return httpClient.post<number[]>('/reportBalanceSheets:batchCreate', req);
}


/**
 * Batch updates multiple reportBalanceSheets in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateReportBalanceSheets(req: BatchUpdateReportBalanceSheetsRequest) {
  return httpClient.put<BatchUpdateReportBalanceSheetsResponse>('/reportBalanceSheet:batchUpdate', req);
}


/**
 * Batch delete reportBalanceSheets.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteReportBalanceSheet(req: BatchDeleteReportBalanceSheetsRequest) {
  return httpClient.delete<void>('/reportBalanceSheets:batchDelete', { data: req });
}


/**
 *  Export the Excel template for reportBalanceSheet import.
 *
 */
export async function exportReportBalanceSheetTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/reportBalanceSheets:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'reportBalanceSheet_import_tpl.xlsx');
}


/**
 * Export reportBalanceSheet data based on the provided reportBalanceSheet IDs.
 *
 * @param req Query parameters specifying the reportBalanceSheets to export.
 */
export async function exportReportBalanceSheet(req: ExportReportBalanceSheetsRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/reportBalanceSheets:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'reportBalanceSheet_data_export.xlsx');
}


/**
 * Import reportBalanceSheets from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed reportBalanceSheet data.
 */
export function importReportBalanceSheet(req: ImportReportBalanceSheetsRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportReportBalanceSheetsResponse>('/reportBalanceSheets:import', formData);
}