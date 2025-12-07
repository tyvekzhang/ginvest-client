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
import {PaginationRequest} from '.';

export interface ListTenantsRequest extends PaginationRequest {
    
    id: string;
    
    name: string;
    
    contact_name: string;
    
    create_at: string;
    
}

export interface Tenant {
    
    id: string;
    
    name: string;
    
    logo_url: string;
    
    contact_name: string;
    
    phone: string;
    
    email: string;
    
    create_at: string;
    
}

export interface TenantDetail extends Tenant {

}

export interface CreateTenant {
    
    name: string;
    
    logo_url: string;
    
    contact_name: string;
    
    phone: string;
    
    email: string;
    
    create_at: string;
    
}

export interface CreateTenantRequest {
tenant: CreateTenant;
}

export interface UpdateTenant {
    
    id: string;
    
    name: string;
    
    logo_url: string;
    
    contact_name: string;
    
    phone: string;
    
    email: string;
    
}

export interface UpdateTenantRequest {
tenant: UpdateTenant;
}

export interface BatchGetTenantsResponse {
    tenants: TenantDetail[];
}

export interface BatchCreateTenantsRequest {
    tenants: CreateTenant[];
}

export interface BatchCreateTenantResponse {
    tenants: Tenant[];
}

export interface BatchUpdateTenant {
    
    name: string;
    
    logo_url: string;
    
    contact_name: string;
    
    phone: string;
    
    email: string;
    
}

export interface BatchUpdateTenantsRequest {
    ids: string[];
    tenant: BatchUpdateTenant;
}

export interface BatchPatchTenantsRequest {
    tenants: UpdateTenant[];
}

export interface BatchUpdateTenantsResponse {
    tenants: Tenant[];
}

export interface BatchDeleteTenantsRequest {
    ids: string[];
}

export interface ExportTenant extends Tenant {
}

export interface ExportTenantsRequest {
    ids: string[];
}

export interface ImportTenantsRequest {
    file: File;
}

export interface ImportTenant extends CreateTenant {
    errMsg: string;
}

export interface ImportTenantsResponse {
    tenants: ImportTenant[];
}