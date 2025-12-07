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


import dayjs from 'dayjs';
import {
  Descriptions,
  Drawer,
  Button,
  Space,
} from 'antd';
import { TenantDetail } from '@/types/tenant';
import React, { useMemo } from 'react';

interface TenantDetailDrawerProps {
  isTenantDetailDrawerVisible: boolean;
  onTenantDetailClose: () => void;
  tenantDetail: TenantDetail | undefined;
  loading: boolean
}

const TenantDetailComponent: React.FC<TenantDetailDrawerProps> = ({
  isTenantDetailDrawerVisible,
  onTenantDetailClose,
  tenantDetail,
  loading
}) => {

  
  return (
    <Drawer
      title="租户信息详情"
      open={isTenantDetailDrawerVisible}
      onClose={onTenantDetailClose}
      destroyOnHidden
      loading={loading}
      width={600}
    >
      { tenantDetail && (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="租户名称">
              { tenantDetail.name}
          </Descriptions.Item>
          <Descriptions.Item label="logo地址">
              { tenantDetail.logo_url}
          </Descriptions.Item>
          <Descriptions.Item label="联系人姓名">
              { tenantDetail.contact_name}
          </Descriptions.Item>
          <Descriptions.Item label="联系电话">
              { tenantDetail.phone}
          </Descriptions.Item>
          <Descriptions.Item label="联系邮箱">
              { tenantDetail.email}
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">
              {dayjs(tenantDetail.create_at).format('YYYY-MM-DD')}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Drawer>
  );
};

export default TenantDetailComponent;