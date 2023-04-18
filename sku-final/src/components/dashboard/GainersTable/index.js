import { Box, Card, CardHeader, Typography } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useGetAllProductsQuery } from 'features/product/productAPI';
import { useState } from 'react';
import columns from './columns';

const logic = 'price_change[gt]=3&sort=price_change';
const fields = 'sku_marketplace,sku,current_price,all_images,brand_en,category_en,price_change';

const TopGainersTable = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const query = `${logic}&page=${page + 1}&limit=${pageSize}&fields=${fields}`;
    const { data, isLoading, isFetching } = useGetAllProductsQuery(query);

    return (
        <>
            <Card>
                <CardHeader title="Top Gainers" sx={{ mb: 2 }} />
                <Box sx={{ height: 500 }}>
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
                Designed for users to instantly see the market situations on the marketplaces and
                predicts what will come next.
            </Typography>
        </>
    );
};

export default TopGainersTable;
