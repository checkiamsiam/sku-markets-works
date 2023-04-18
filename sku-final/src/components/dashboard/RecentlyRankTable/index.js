import { Box, Card, CardHeader, Typography } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useGetAllProductsQuery } from 'features/product/productAPI';
import { useState } from 'react';
import columns from './columns';

// get previous 2days data
const date = new Date();
date.setDate(date.getDate() - 3);
const logic = `createdAt[gt]=${date.toISOString()}`;

// const logic = 'sort=-createdAt,-sku_rank';
const fields =
    'sku,brand_en,category_en,all_images,sku_rate,sku_rank,number_of_sellers,sku_marketplace,is_live,buy_box_sku_fulfillment_type,current_price,price_change,trade_value,tags,estimated_SOH,max_investment,min_investment,EQTI,sold_24_hours,est_market_cap,demand_percentage,supply_percentage';

const RecentlyRankTable = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const query = `${logic}&page=${page + 1}&limit=${pageSize}&fields=${fields}`;
    const { data, isLoading, isFetching } = useGetAllProductsQuery(query);

    return (
        <>
            <Card>
                <CardHeader title="Recently Added SKUs To Top Ranked" sx={{ mb: 2 }} />
                <Box sx={{ height: 467 }}>
                    <ThemeDataGrid
                        page={page}
                        setPage={setPage}
                        columns={columns}
                        pageSize={pageSize}
                        rows={data?.data || []}
                        setPageSize={setPageSize}
                        rowCount={data?.total || 0}
                        loading={isLoading || isFetching}
                    />
                </Box>
            </Card>
            <Typography variant="caption">
                Designed for users to instantly see the market situations on the marketplaces.
            </Typography>
        </>
    );
};

export default RecentlyRankTable;
