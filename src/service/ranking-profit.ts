// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateRankingProfitsRequest,
  BatchDeleteRankingProfitsRequest,
  BatchUpdateRankingProfitsRequest,
  BatchUpdateRankingProfitsResponse,
  CreateRankingProfitRequest,
  ExportRankingProfitsRequest,
  ImportRankingProfitsRequest,
  ImportRankingProfitsResponse,
  ListRankingProfitsRequest,
  RankingProfit,
  RankingProfitDetail,
  UpdateRankingProfitRequest,
} from '@/types/ranking-profit';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve rankingProfit details.
 *
 * @param ID of the rankingProfit resource.
 * @returns The rankingProfit object containing all its details.
 */
export function useRankingProfit(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<RankingProfitDetail>(
    id ? `/rankingProfits/${id}` : null,
    fetcher,
  );

  return {
    rankingProfit: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List rankingProfits with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of rankingProfits and total count.
 */
export function useRankingProfits(req: Partial<ListRankingProfitsRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<RankingProfit>
  >(['/rankingProfits', req], ([url, params]) => fetcher(url, params));

  return {
    rankingProfits: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateRankingProfits: mutate,
  };
}


/**
 * Create a new rankingProfit.
 *
 * @param req Request object containing rankingProfit creation data.
 * @returns The rankingProfit object.
 */
export function createRankingProfit(req: CreateRankingProfitRequest) {
  return httpClient.post<RankingProfit>('/rankingProfits', req);
}


/**
 * Update an existing rankingProfit.
 *
 * @param req Request object containing rankingProfit update data.
 */
export function updateRankingProfit(req: UpdateRankingProfitRequest) {
  return httpClient.put<RankingProfit>('/rankingProfits', req);
}


/**
 * Delete rankingProfit by ID
 *
 * @param id The ID of the rankingProfit to delete.
 */
export function deleteRankingProfit(id: string) {
  return httpClient.delete<void>(`/rankingProfits/${id}`);
}


/**
 *  Batch create rankingProfits.
 *
 * @param req Request body containing a list of rankingProfit creation items.
 * @returns Response containing the list of created rankingProfits.
 */
export function batchCreateRankingProfits(req: BatchCreateRankingProfitsRequest) {
  return httpClient.post<number[]>('/rankingProfits:batchCreate', req);
}


/**
 * Batch updates multiple rankingProfits in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateRankingProfits(req: BatchUpdateRankingProfitsRequest) {
  return httpClient.put<BatchUpdateRankingProfitsResponse>('/rankingProfit:batchUpdate', req);
}


/**
 * Batch delete rankingProfits.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteRankingProfit(req: BatchDeleteRankingProfitsRequest) {
  return httpClient.delete<void>('/rankingProfits:batchDelete', { data: req });
}


/**
 *  Export the Excel template for rankingProfit import.
 *
 */
export async function exportRankingProfitTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/rankingProfits:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'rankingProfit_import_tpl.xlsx');
}


/**
 * Export rankingProfit data based on the provided rankingProfit IDs.
 *
 * @param req Query parameters specifying the rankingProfits to export.
 */
export async function exportRankingProfit(req: ExportRankingProfitsRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/rankingProfits:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'rankingProfit_data_export.xlsx');
}


/**
 * Import rankingProfits from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed rankingProfit data.
 */
export function importRankingProfit(req: ImportRankingProfitsRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportRankingProfitsResponse>('/rankingProfits:import', formData);
}