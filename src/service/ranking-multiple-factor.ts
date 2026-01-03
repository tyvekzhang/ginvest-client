// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateRankingMultipleFactorsRequest,
  BatchDeleteRankingMultipleFactorsRequest,
  BatchUpdateRankingMultipleFactorsRequest,
  BatchUpdateRankingMultipleFactorsResponse,
  CreateRankingMultipleFactorRequest,
  ExportRankingMultipleFactorsRequest,
  ImportRankingMultipleFactorsRequest,
  ImportRankingMultipleFactorsResponse,
  ListRankingMultipleFactorsRequest,
  RankingMultipleFactor,
  RankingMultipleFactorDetail,
  UpdateRankingMultipleFactorRequest,
} from '@/types/ranking-multiple-factor';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve rankingMultipleFactor details.
 *
 * @param ID of the rankingMultipleFactor resource.
 * @returns The rankingMultipleFactor object containing all its details.
 */
export function useRankingMultipleFactor(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<RankingMultipleFactorDetail>(
    id ? `/rankingMultipleFactors/${id}` : null,
    fetcher,
  );

  return {
    rankingMultipleFactor: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List rankingMultipleFactors with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of rankingMultipleFactors and total count.
 */
export function useRankingMultipleFactors(req: Partial<ListRankingMultipleFactorsRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<RankingMultipleFactor>
  >(['/rankingMultipleFactors', req], ([url, params]) => fetcher(url, params));

  return {
    rankingMultipleFactors: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateRankingMultipleFactors: mutate,
  };
}


/**
 * Create a new rankingMultipleFactor.
 *
 * @param req Request object containing rankingMultipleFactor creation data.
 * @returns The rankingMultipleFactor object.
 */
export function createRankingMultipleFactor(req: CreateRankingMultipleFactorRequest) {
  return httpClient.post<RankingMultipleFactor>('/rankingMultipleFactors', req);
}


/**
 * Update an existing rankingMultipleFactor.
 *
 * @param req Request object containing rankingMultipleFactor update data.
 */
export function updateRankingMultipleFactor(req: UpdateRankingMultipleFactorRequest) {
  return httpClient.put<RankingMultipleFactor>('/rankingMultipleFactors', req);
}


/**
 * Delete rankingMultipleFactor by ID
 *
 * @param id The ID of the rankingMultipleFactor to delete.
 */
export function deleteRankingMultipleFactor(id: string) {
  return httpClient.delete<void>(`/rankingMultipleFactors/${id}`);
}


/**
 *  Batch create rankingMultipleFactors.
 *
 * @param req Request body containing a list of rankingMultipleFactor creation items.
 * @returns Response containing the list of created rankingMultipleFactors.
 */
export function batchCreateRankingMultipleFactors(req: BatchCreateRankingMultipleFactorsRequest) {
  return httpClient.post<number[]>('/rankingMultipleFactors:batchCreate', req);
}


/**
 * Batch updates multiple rankingMultipleFactors in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateRankingMultipleFactors(req: BatchUpdateRankingMultipleFactorsRequest) {
  return httpClient.put<BatchUpdateRankingMultipleFactorsResponse>('/rankingMultipleFactor:batchUpdate', req);
}


/**
 * Batch delete rankingMultipleFactors.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteRankingMultipleFactor(req: BatchDeleteRankingMultipleFactorsRequest) {
  return httpClient.delete<void>('/rankingMultipleFactors:batchDelete', { data: req });
}


/**
 *  Export the Excel template for rankingMultipleFactor import.
 *
 */
export async function exportRankingMultipleFactorTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/rankingMultipleFactors:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'rankingMultipleFactor_import_tpl.xlsx');
}


/**
 * Export rankingMultipleFactor data based on the provided rankingMultipleFactor IDs.
 *
 * @param req Query parameters specifying the rankingMultipleFactors to export.
 */
export async function exportRankingMultipleFactor(req: ExportRankingMultipleFactorsRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/rankingMultipleFactors:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'rankingMultipleFactor_data_export.xlsx');
}


/**
 * Import rankingMultipleFactors from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed rankingMultipleFactor data.
 */
export function importRankingMultipleFactor(req: ImportRankingMultipleFactorsRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportRankingMultipleFactorsResponse>('/rankingMultipleFactors:import', formData);
}