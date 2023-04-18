import { Box, Card } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useGetAllStoresQuery } from 'features/store/storeAPI';
import { useState } from 'react';
import { useParams } from 'react-router';
import columns from './columns';

const logic = 'short=store_offer_rank';

const ProductStoreTable = () => {
    const { id } = useParams();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const query = `${id}?page=${page + 1}&limit=${pageSize}&${logic}`;
    const { data, isFetching, isLoading } = useGetAllStoresQuery(query);

    return (
        <>
            <Card sx={{ mt: 2 }}>
                <Box sx={{ height: 400 }}>
                    <ThemeDataGrid
                        page={page}
                        setPage={setPage}
                        columns={columns}
                        toolbar={false}
                        checkbox={false}
                        pageSize={pageSize}
                        rows={data?.data || []}
                        setPageSize={setPageSize}
                        rowCount={data?.total || 0}
                        loading={isLoading || isFetching}
                    />
                </Box>
            </Card>
        </>
    );
};

export default ProductStoreTable;
