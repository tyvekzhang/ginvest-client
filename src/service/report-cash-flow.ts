// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateReportCashFlowsRequest,
  BatchDeleteReportCashFlowsRequest,
  BatchUpdateReportCashFlowsRequest,
  BatchUpdateReportCashFlowsResponse,
  CreateReportCashFlowRequest,
  ExportReportCashFlowsRequest,
  ImportReportCashFlowsRequest,
  ImportReportCashFlowsResponse,
  ListReportCashFlowsRequest,
  ReportCashFlow,
  ReportCashFlowDetail,
  UpdateReportCashFlowRequest,
} from '@/types/report-cash-flow';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve reportCashFlow details.
 *
 * @param ID of the reportCashFlow resource.
 * @returns The reportCashFlow object containing all its details.
 */
export function useReportCashFlow(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<ReportCashFlowDetail>(
    id ? `/reportCashFlows/${id}` : null,
    fetcher,
  );

  return {
    reportCashFlow: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List reportCashFlows with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of reportCashFlows and total count.
 */
export function useReportCashFlows(req: Partial<ListReportCashFlowsRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<ReportCashFlow>
  >(['/reportCashFlows', req], ([url, params]) => fetcher(url, params));

  return {
    reportCashFlows: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateReportCashFlows: mutate,
  };
}


/**
 * Create a new reportCashFlow.
 *
 * @param req Request object containing reportCashFlow creation data.
 * @returns The reportCashFlow object.
 */
export function createReportCashFlow(req: CreateReportCashFlowRequest) {
  return httpClient.post<ReportCashFlow>('/reportCashFlows', req);
}


/**
 * Update an existing reportCashFlow.
 *
 * @param req Request object containing reportCashFlow update data.
 */
export function updateReportCashFlow(req: UpdateReportCashFlowRequest) {
  return httpClient.put<ReportCashFlow>('/reportCashFlows', req);
}


/**
 * Delete reportCashFlow by ID
 *
 * @param id The ID of the reportCashFlow to delete.
 */
export function deleteReportCashFlow(id: string) {
  return httpClient.delete<void>(`/reportCashFlows/${id}`);
}


/**
 *  Batch create reportCashFlows.
 *
 * @param req Request body containing a list of reportCashFlow creation items.
 * @returns Response containing the list of created reportCashFlows.
 */
export function batchCreateReportCashFlows(req: BatchCreateReportCashFlowsRequest) {
  return httpClient.post<number[]>('/reportCashFlows:batchCreate', req);
}


/**
 * Batch updates multiple reportCashFlows in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateReportCashFlows(req: BatchUpdateReportCashFlowsRequest) {
  return httpClient.put<BatchUpdateReportCashFlowsResponse>('/reportCashFlow:batchUpdate', req);
}


/**
 * Batch delete reportCashFlows.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteReportCashFlow(req: BatchDeleteReportCashFlowsRequest) {
  return httpClient.delete<void>('/reportCashFlows:batchDelete', { data: req });
}


/**
 *  Export the Excel template for reportCashFlow import.
 *
 */
export async function exportReportCashFlowTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/reportCashFlows:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'reportCashFlow_import_tpl.xlsx');
}


/**
 * Export reportCashFlow data based on the provided reportCashFlow IDs.
 *
 * @param req Query parameters specifying the reportCashFlows to export.
 */
export async function exportReportCashFlow(req: ExportReportCashFlowsRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/reportCashFlows:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'reportCashFlow_data_export.xlsx');
}


/**
 * Import reportCashFlows from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed reportCashFlow data.
 */
export function importReportCashFlow(req: ImportReportCashFlowsRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportReportCashFlowsResponse>('/reportCashFlows:import', formData);
}