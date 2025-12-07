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
  BatchCreateTenantsRequest,
  BatchDeleteTenantsRequest,
  BatchUpdateTenantsRequest,
  BatchUpdateTenantsResponse,
  CreateTenantRequest,
  ExportTenantsRequest,
  ImportTenantsRequest,
  ImportTenantsResponse,
  ListTenantsRequest,
  Tenant,
  TenantDetail,
  UpdateTenantRequest,
} from '@/types/tenant';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


/**
 * Retrieve tenant details.
 *
 * @param ID of the tenant resource.
 * @returns The tenant object containing all its details.
 */
export function useTenant(id: string) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<TenantDetail>(
    id ? `/tenants/${id}` : null,
    fetcher,
  );

  return {
    tenant: data,
    isLoading,
    isError: error,
    isValidating,
    mutateMenu: mutate,
  };
}

/**
 * List tenants with pagination.
 *
 * @param req Request object containing pagination, filter and sort parameters.
 * @returns Paginated list of tenants and total count.
 */
export function useTenants(req: Partial<ListTenantsRequest>) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    PageResult<Tenant>
  >(['/tenants', req], ([url, params]) => fetcher(url, params));

  return {
    tenants: data?.records,
    total: data?.total,
    isLoading,
    isError: error,
    isValidating,
    mutateTenants: mutate,
  };
}


/**
 * Create a new tenant.
 *
 * @param req Request object containing tenant creation data.
 * @returns The tenant object.
 */
export function createTenant(req: CreateTenantRequest) {
  return httpClient.post<number>('/tenants', req);
}


/**
 * Update an existing tenant.
 *
 * @param req Request object containing tenant update data.
 */
export function updateTenant(req: UpdateTenantRequest) {
  return httpClient.put<Tenant>('/tenants', req);
}


/**
 * Delete tenant by ID
 *
 * @param id The ID of the tenant to delete.
 */
export function deleteTenant(id: string) {
  return httpClient.delete<void>(`/tenants/${id}`);
}


/**
 *  Batch create tenants.
 *
 * @param req Request body containing a list of tenant creation items.
 * @returns Response containing the list of created tenants.
 */
export function batchCreateTenants(req: BatchCreateTenantsRequest) {
  return httpClient.post<number[]>('/tenants:batchCreate', req);
}


/**
 * Batch updates multiple tenants in a single operation.
 *
 * @param req The batch update request data.
 */
export function batchUpdateTenants(req: BatchUpdateTenantsRequest) {
  return httpClient.put<BatchUpdateTenantsResponse>('/tenant:batchUpdate', req);
}


/**
 * Batch delete tenants.
 *
 * @param req Request object containing delete info.
 */
export function batchDeleteTenant(req: BatchDeleteTenantsRequest) {
  return httpClient.delete<void>('/tenants:batchDelete', { data: req });
}


/**
 *  Export the Excel template for tenant import.
 *
 */
export async function exportTenantTemplate() {
  const response = await httpClient.get<AxiosResponse>(
    `/tenants:exportTemplate`,
    {},
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'tenant_import_tpl.xlsx');
}


/**
 * Export tenant data based on the provided tenant IDs.
 *
 * @param req Query parameters specifying the tenants to export.
 */
export async function exportTenant(req: ExportTenantsRequest) {
  const params = {
    ids: req.ids,
  };
  const response = await httpClient.get<AxiosResponse>(
    `/tenants:export`,
    params,
    {
      responseType: 'blob',
    },
  );
  downloadBlob(response, 'tenant_data_export.xlsx');
}


/**
 * Import tenants from an uploaded Excel file.
 *
 * @param req The request with file to import.
 * @returns  List of successfully parsed tenant data.
 */
export function importTenant(req: ImportTenantsRequest) {
  const formData = new FormData();
  formData.append('file', req.file);
  return httpClient.post<ImportTenantsResponse>('/tenants:import', formData);
}