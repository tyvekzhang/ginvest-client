// Copyright (c) 2025 FastWeb and/or its affiliates. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import httpClient, { fetcher } from '@/lib/http';
import { downloadBlob } from '@/service/util';
import { PageResult } from '@/types';
import {
  BatchCreateTenantPlansRequest,
  BatchDeleteTenantPlansRequest,
  BatchUpdateTenantPlansRequest,
  BatchUpdateTenantPlansResponse,
  CreateTenantPlanRequest,
  ExportTenantPlansRequest,
  ImportTenantPlansRequest,
  ImportTenantPlansResponse,
  ListTenantPlansRequest,
  TenantPlan,
  TenantPlanDetail,
  UpdateTenantPlanRequest,
} from '@/types/tenant-plan';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve tenantPlan details.
 *
 * @param ID of the tenantPlan resource.
 * @returns The tenantPlan object containing all its details.
 */
export function useTenantPlan(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<TenantPlanDetail>(
    id ? `/tenantPlans/${id}` : null,
    fetcher,
  );

  return {
    tenantPlan: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List tenantPlans with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of tenantPlans and total count.
 */
export function useTenantPlans(req: Partial<ListTenantPlansRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<TenantPlan>
  >(['/tenantPlans', req], ([url, params]) => fetcher(url, params));

  return {
    tenantPlans: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateTenantPlans: mutate,
  };
}


/**
 * Create a new tenantPlan.
 *
 * @param req Request object containing tenantPlan creation data.
 * @returns The tenantPlan object.
 */
export function createTenantPlan(req: CreateTenantPlanRequest) {
  return httpClient.post<number>('/tenantPlans', req);
}


/**
 * Update an existing tenantPlan.
 *
 * @param req Request object containing tenantPlan update data.
 */
export function updateTenantPlan(req: UpdateTenantPlanRequest) {
  return httpClient.put<TenantPlan>('/tenantPlans', req);
}


/**
 * Delete tenantPlan by ID
 *
 * @param id The ID of the tenantPlan to delete.
 */
export function deleteTenantPlan(id: string) {
  return httpClient.delete<void>(`/tenantPlans/${id}`);
}


/**
 *  Batch create tenantPlans.
 *
 * @param req Request body containing a list of tenantPlan creation items.
 * @returns Response containing the list of created tenantPlans.
 */
export function batchCreateTenantPlans(req: BatchCreateTenantPlansRequest) {
  return httpClient.post<number[]>('/tenantPlans:batchCreate', req);
}


/**
 * Batch updates multiple tenantPlans in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateTenantPlans(req: BatchUpdateTenantPlansRequest) {
  return httpClient.put<BatchUpdateTenantPlansResponse>('/tenantPlan:batchUpdate', req);
}


/**
 * Batch delete tenantPlans.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteTenantPlan(req: BatchDeleteTenantPlansRequest) {
  return httpClient.delete<void>('/tenantPlans:batchDelete', { data: req });
}


/**
 *  Export the Excel template for tenantPlan import.
 *
 */
export async function exportTenantPlanTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/tenantPlans:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'tenantPlan_import_tpl.xlsx');
}


/**
 * Export tenantPlan data based on the provided tenantPlan IDs.
 *
 * @param req Query parameters specifying the tenantPlans to export.
 */
export async function exportTenantPlan(req: ExportTenantPlansRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/tenantPlans:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'tenantPlan_data_export.xlsx');
}


/**
 * Import tenantPlans from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed tenantPlan data.
 */
export function importTenantPlan(req: ImportTenantPlansRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportTenantPlansResponse>('/tenantPlans:import', formData);
}