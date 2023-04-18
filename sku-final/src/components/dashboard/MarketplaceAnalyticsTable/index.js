import { Box, Card, CardHeader, Typography } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useMarketplaceAnalyticsQuery } from 'features/marketplace/marketplaceAPI';
import { useState } from 'react';
import columns from './columns';

const logic = 'sort=price_change';
const fields =
    'sku_marketplace,sku,current_price,all_images,brand_en,category_en,price_change,fs,fmp,asp,esh';

const MarketplaceAnalyticsTable = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const query = `${logic}&page=${page + 1}&limit=${pageSize}&fields=${fields}`;
    const { data, isFetching, isLoading } = useMarketplaceAnalyticsQuery(query);

    return (
        <>
            <Card sx={{ mt: 2 }}>
                <CardHeader
                    title="Marketplace Insights, Analytics & Statistics (Top Ranked)"
                    sx={{ mb: 2 }}
                />
                <Box sx={{ height: 500 }}>
                    <ThemeDataGrid
                        setPage={setPage}
                        columns={columns}
                        rows={data?.data || []}
                        rowCount={data?.total || 0}
                        page={page}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        loading={isLoading || isFetching}
                    />
                </Box>
            </Card>
            <Typography variant="caption">
                Designed for users to instantly see the top Brands on the marketplaces for
                opportunities.
            </Typography>
        </>
    );
};

export default MarketplaceAnalyticsTable;
