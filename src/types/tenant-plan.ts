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

export interface ListTenantPlansRequest extends PaginationRequest {
    tenant_id: string
    id: string;
    team_size: number;
    file_usage: number;
    token_count: number;
    options: string;
    create_at: string;

}

export interface TenantPlan {
    id: string;
    team_size: number;
    file_usage: number;
    token_count: number;
    options: string;
    create_at: string;
}

export interface TenantPlanDetail extends TenantPlan {

}

export interface CreateTenantPlan {
    team_size: number;
    file_usage: number;
    token_count: number;
    options: string;
    create_at: string;
}

export interface CreateTenantPlanRequest {
tenantPlan: CreateTenantPlan;
}

export interface UpdateTenantPlan {
    id: string;
    team_size: number;
    file_usage: number;
    token_count: number;
    options: string;
}

export interface UpdateTenantPlanRequest {
tenantPlan: UpdateTenantPlan;
}

export interface BatchGetTenantPlansResponse {
    tenantPlans: TenantPlanDetail[];
}

export interface BatchCreateTenantPlansRequest {
    tenantPlans: CreateTenantPlan[];
}

export interface BatchCreateTenantPlanResponse {
    tenantPlans: TenantPlan[];
}

export interface BatchUpdateTenantPlan {
    team_size: number;
    file_usage: number;
    token_count: number;
    options: string;
}

export interface BatchUpdateTenantPlansRequest {
    ids: string[];
    tenantPlan: BatchUpdateTenantPlan;
}

export interface BatchPatchTenantPlansRequest {
    tenantPlans: UpdateTenantPlan[];
}

export interface BatchUpdateTenantPlansResponse {
    tenantPlans: TenantPlan[];
}

export interface BatchDeleteTenantPlansRequest {
    ids: string[];
}

export interface ExportTenantPlan extends TenantPlan {
}

export interface ExportTenantPlansRequest {
    ids: string[];
}

export interface ImportTenantPlansRequest {
    file: File;
}

export interface ImportTenantPlan extends CreateTenantPlan {
    errMsg: string;
}

export interface ImportTenantPlansResponse {
    tenantPlans: ImportTenantPlan[];
}