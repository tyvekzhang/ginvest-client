// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateRankingCashRequest,
  BatchDeleteRankingCashRequest,
  BatchUpdateRankingCashRequest,
  BatchUpdateRankingCashResponse,
  CreateRankingCashRequest,
  ExportRankingCashRequest,
  ImportRankingCashRequest,
  ImportRankingCashResponse,
  ListRankingCashRequest,
  RankingCash,
  RankingCashDetail,
  UpdateRankingCashRequest,
} from '@/types/ranking-cash';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve rankingCash details.
 *
 * @param ID of the rankingCash resource.
 * @returns The rankingCash object containing all its details.
 */
export function useRankingCash(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<RankingCashDetail>(
    id ? `/rankingCash/${id}` : null,
    fetcher,
  );

  return {
    rankingCash: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List rankingCash with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of rankingCash and total count.
 */
export function useRankingCashes(req: Partial<ListRankingCashRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<RankingCash>
  >(['/rankingCashes', req], ([url, params]) => fetcher(url, params));

  return {
    rankingCashList: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateRankingCash: mutate,
  };
}


/**
 * Create a new rankingCash.
 *
 * @param req Request object containing rankingCash creation data.
 * @returns The rankingCash object.
 */
export function createRankingCash(req: CreateRankingCashRequest) {
  return httpClient.post<RankingCash>('/rankingCash', req);
}


/**
 * Update an existing rankingCash.
 *
 * @param req Request object containing rankingCash update data.
 */
export function updateRankingCash(req: UpdateRankingCashRequest) {
  return httpClient.put<RankingCash>('/rankingCash', req);
}


/**
 * Delete rankingCash by ID
 *
 * @param id The ID of the rankingCash to delete.
 */
export function deleteRankingCash(id: string) {
  return httpClient.delete<void>(`/rankingCash/${id}`);
}


/**
 *  Batch create rankingCash.
 *
 * @param req Request body containing a list of rankingCash creation items.
 * @returns Response containing the list of created rankingCash.
 */
export function batchCreateRankingCash(req: BatchCreateRankingCashRequest) {
  return httpClient.post<number[]>('/rankingCash:batchCreate', req);
}


/**
 * Batch updates multiple rankingCash in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateRankingCash(req: BatchUpdateRankingCashRequest) {
  return httpClient.put<BatchUpdateRankingCashResponse>('/rankingCash:batchUpdate', req);
}


/**
 * Batch delete rankingCash.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteRankingCash(req: BatchDeleteRankingCashRequest) {
  return httpClient.delete<void>('/rankingCash:batchDelete', { data: req });
}


/**
 *  Export the Excel template for rankingCash import.
 *
 */
export async function exportRankingCashTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/rankingCash:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'rankingCash_import_tpl.xlsx');
}


/**
 * Export rankingCash data based on the provided rankingCash IDs.
 *
 * @param req Query parameters specifying the rankingCash to export.
 */
export async function exportRankingCash(req: ExportRankingCashRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/rankingCash:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'rankingCash_data_export.xlsx');
}


/**
 * Import rankingCash from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed rankingCash data.
 */
export function importRankingCash(req: ImportRankingCashRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportRankingCashResponse>('/rankingCash:import', formData);
}