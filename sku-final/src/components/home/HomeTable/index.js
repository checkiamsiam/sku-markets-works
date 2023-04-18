import { Box, Card, Container } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useGetAllProductsQuery } from 'features/product/productAPI';
import { useState } from 'react';
import columns from './columns';

const logic = 'sort=createdAt';
const fields =
    'brand_en,category_en,all_images,price_change,current_price,sku_marketplace,sku,sku_rank,number_of_sellers';

const HomeTable = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const query = `${logic}&fields=${fields}`;
    const { data, isFetching, isLoading } = useGetAllProductsQuery(query);

    return (
        <Container>
            <Card sx={{ mt: 2 }}>
                <Box sx={{ height: 400 }}>
                    <ThemeDataGrid
                        setPage={setPage}
                        columns={columns}
                        rows={data?.data || []}
                        rowCount={data?.result || 0}
                        page={page}
                        toolbar={false}
                        checkbox={false}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        loading={isLoading || isFetching}
                        rowsPerPageOptions={[5]}
                    />
                </Box>
            </Card>
        </Container>
    );
};

export default HomeTable;
