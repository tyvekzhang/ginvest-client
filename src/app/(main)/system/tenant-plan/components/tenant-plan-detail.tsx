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
import AdvancedSelect, { AdvancedSelectOption } from '@/components/advanced-select';


import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
  Button,
  Space,
} from 'antd';
import { TenantPlanDetail } from '@/types/tenant-plan';
import React, { useMemo } from 'react';

interface TenantPlanDetailDrawerProps {
  isTenantPlanDetailDrawerVisible: boolean;
  onTenantPlanDetailClose: () => void;
  tenantPlanDetail: TenantPlanDetail | undefined;
  loading: boolean
  tenantOptions: AdvancedSelectOption[];
}

const TenantPlanDetailComponent: React.FC<TenantPlanDetailDrawerProps> = ({
  isTenantPlanDetailDrawerVisible,
  onTenantPlanDetailClose,
  tenantPlanDetail,
  loading,
  tenantOptions,
}) => {

  
  return (
    <Drawer
      title="套餐信息详情"
      open={isTenantPlanDetailDrawerVisible}
      onClose={onTenantPlanDetailClose}
      destroyOnHidden
      loading={loading}
      width={600}
    >
      { tenantPlanDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="团队人数">
              { tenantPlanDetail.team_size}
          </Descriptions.Item>
          <Descriptions.Item label="文件使用">
              { tenantPlanDetail.file_usage}
          </Descriptions.Item>
          <Descriptions.Item label="Token数量">
              { tenantPlanDetail.token_count}
          </Descriptions.Item>
          <Descriptions.Item label="其他配置">
              { tenantPlanDetail.options}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
              {dayjs(tenantPlanDetail.create_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default TenantPlanDetailComponent;