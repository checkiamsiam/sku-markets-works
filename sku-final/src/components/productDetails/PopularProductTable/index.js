import { Box } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useGetAllProductsQuery, useGetProductDetailQuery } from 'features/product/productAPI';
import { useState } from 'react';
import { useParams } from 'react-router';
import columns from './columns';

const fields = 'brand_en,category_en,all_images,price_change,current_price,sku_marketplace,sku';

const Index = () => {
    const { id } = useParams();
    const { data: product } = useGetProductDetailQuery(id);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const logic = `sort=-views&views[gt]=5&sku_marketplace[eq]=${product?.sku_marketplace}`;
    const query = `${logic}&page=${page + 1}&limit=${pageSize}&fields=${fields}`;

    const { data, isFetching, isLoading } = useGetAllProductsQuery(query, {
        skip: !product,
    });

    return (
        <Box sx={{ height: 400 }}>
            <ThemeDataGrid
                setPage={setPage}
                columns={columns}
                rows={data?.data || []}
                rowCount={data?.total || 0}
                page={page}
                toolbar={false}
                checkbox={false}
                pageSize={pageSize}
                setPageSize={setPageSize}
                loading={isLoading || isFetching}
            />
        </Box>
    );
};

export default Index;
