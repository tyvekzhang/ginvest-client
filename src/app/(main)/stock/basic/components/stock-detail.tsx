// SPDX-License-Identifier: MIT


import dayjs from 'dayjs';
import {
    Descriptions,
    Drawer,
} from 'antd';
import { StockDetail } from '@/types/stock';
import React from 'react';

interface StockDetailDrawerProps {
    isStockDetailDrawerVisible: boolean;
    onStockDetailClose: () => void;
    stockDetail: StockDetail | undefined;
    loading: boolean
}

const StockDetailComponent: React.FC<StockDetailDrawerProps> = ({
    isStockDetailDrawerVisible,
    onStockDetailClose,
    stockDetail,
    loading
}) => {


    return (
        <Drawer
            title="股票基础信息详情"
            open={isStockDetailDrawerVisible}
            onClose={onStockDetailClose}
            destroyOnHidden
            loading={loading}
            width={800}
        >
            {stockDetail && (
                <Descriptions column={1} bordered labelStyle={{ width: '120px', minWidth: '120px' }}>
                    <Descriptions.Item label="股票编号">
                        {stockDetail.stock_code}
                    </Descriptions.Item>
                    <Descriptions.Item label="股票名称">
                        {stockDetail.stock_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="所属市场">
                        {stockDetail.market_type}
                    </Descriptions.Item>
                    <Descriptions.Item label="所属行业">
                        {stockDetail.industry}
                    </Descriptions.Item>
                    <Descriptions.Item label="成立日期">
                        {dayjs(stockDetail.establish_date).format('YYYY-MM-DD')}
                    </Descriptions.Item>
                    <Descriptions.Item label="上市日期">
                        {dayjs(stockDetail.listing_date).format('YYYY-MM-DD')}
                    </Descriptions.Item>
                    <Descriptions.Item label="注册资金">
                        {(Number(stockDetail.registered_capital) * 10000).toLocaleString('zh-CN')} 元
                    </Descriptions.Item>
                    <Descriptions.Item label="主营业务">
                        {stockDetail.main_business}
                    </Descriptions.Item>
                    <Descriptions.Item label="省份">
                        {stockDetail.province}
                    </Descriptions.Item>
                    <Descriptions.Item label="城市">
                        {stockDetail.city ? stockDetail.city : "--"}
                    </Descriptions.Item>
                    <Descriptions.Item label="公司全称">
                        {stockDetail.company_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="英文名称">
                        {stockDetail.english_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="曾用简称">
                        {stockDetail.former_name ? stockDetail.former_name : "--"}
                    </Descriptions.Item>
                    <Descriptions.Item label="法人代表">
                        {stockDetail.legal_representative}
                    </Descriptions.Item>

                    <Descriptions.Item label="官网">
                        {stockDetail.website}
                    </Descriptions.Item>
                    <Descriptions.Item label="电子邮箱">
                        {stockDetail.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="联系电话">
                        {stockDetail.telephone}
                    </Descriptions.Item>
                    <Descriptions.Item label="传真">
                        {stockDetail.fax}
                    </Descriptions.Item>
                    <Descriptions.Item label="注册地址">
                        {stockDetail.registered_address}
                    </Descriptions.Item>
                    <Descriptions.Item label="办公地址">
                        {stockDetail.business_address}
                    </Descriptions.Item>
                    <Descriptions.Item label="邮政编码">
                        {stockDetail.postal_code}
                    </Descriptions.Item>

                    <Descriptions.Item label="经营范围">
                        {stockDetail.business_scope}
                    </Descriptions.Item>
                    <Descriptions.Item label="机构简介">
                        {stockDetail.company_profile}
                    </Descriptions.Item>
                    <Descriptions.Item label="更新时间">
                        {dayjs(stockDetail.updated_at).format('YYYY-MM-DD')}
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Drawer>
    );
};

export default StockDetailComponent;