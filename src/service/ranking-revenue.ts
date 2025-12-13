// SPDX-License-Identifier: MIT
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateRankingRevenuesRequest,
  BatchDeleteRankingRevenuesRequest,
  BatchUpdateRankingRevenuesRequest,
  BatchUpdateRankingRevenuesResponse,
  CreateRankingRevenueRequest,
  ExportRankingRevenuesRequest,
  ImportRankingRevenuesRequest,
  ImportRankingRevenuesResponse,
  ListRankingRevenuesRequest,
  RankingRevenue,
  RankingRevenueDetail,
  UpdateRankingRevenueRequest,
} from '@/types/ranking-revenue';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve rankingRevenue details.
 *
 * @param ID of the rankingRevenue resource.
 * @returns The rankingRevenue object containing all its details.
 */
export function useRankingRevenue(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<RankingRevenueDetail>(
    id ? `/rankingRevenues/${id}` : null,
    fetcher,
  );

  return {
    rankingRevenue: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List rankingRevenues with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of rankingRevenues and total count.
 */
export function useRankingRevenues(req: Partial<ListRankingRevenuesRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<RankingRevenue>
  >(['/rankingRevenues', req], ([url, params]) => fetcher(url, params));

  return {
    rankingRevenues: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateRankingRevenues: mutate,
  };
}


/**
 * Create a new rankingRevenue.
 *
 * @param req Request object containing rankingRevenue creation data.
 * @returns The rankingRevenue object.
 */
export function createRankingRevenue(req: CreateRankingRevenueRequest) {
  return httpClient.post<RankingRevenue>('/rankingRevenues', req);
}


/**
 * Update an existing rankingRevenue.
 *
 * @param req Request object containing rankingRevenue update data.
 */
export function updateRankingRevenue(req: UpdateRankingRevenueRequest) {
  return httpClient.put<RankingRevenue>('/rankingRevenues', req);
}


/**
 * Delete rankingRevenue by ID
 *
 * @param id The ID of the rankingRevenue to delete.
 */
export function deleteRankingRevenue(id: string) {
  return httpClient.delete<void>(`/rankingRevenues/${id}`);
}


/**
 *  Batch create rankingRevenues.
 *
 * @param req Request body containing a list of rankingRevenue creation items.
 * @returns Response containing the list of created rankingRevenues.
 */
export function batchCreateRankingRevenues(req: BatchCreateRankingRevenuesRequest) {
  return httpClient.post<number[]>('/rankingRevenues:batchCreate', req);
}


/**
 * Batch updates multiple rankingRevenues in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateRankingRevenues(req: BatchUpdateRankingRevenuesRequest) {
  return httpClient.put<BatchUpdateRankingRevenuesResponse>('/rankingRevenue:batchUpdate', req);
}


/**
 * Batch delete rankingRevenues.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteRankingRevenue(req: BatchDeleteRankingRevenuesRequest) {
  return httpClient.delete<void>('/rankingRevenues:batchDelete', { data: req });
}


/**
 *  Export the Excel template for rankingRevenue import.
 *
 */
export async function exportRankingRevenueTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/rankingRevenues:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'rankingRevenue_import_tpl.xlsx');
}


/**
 * Export rankingRevenue data based on the provided rankingRevenue IDs.
 *
 * @param req Query parameters specifying the rankingRevenues to export.
 */
export async function exportRankingRevenue(req: ExportRankingRevenuesRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/rankingRevenues:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'rankingRevenue_data_export.xlsx');
}


/**
 * Import rankingRevenues from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed rankingRevenue data.
 */
export function importRankingRevenue(req: ImportRankingRevenuesRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportRankingRevenuesResponse>('/rankingRevenues:import', formData);
}