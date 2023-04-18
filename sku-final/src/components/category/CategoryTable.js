import { Box, Card, CardHeader } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useTopBrandsQuery } from 'features/brand/brandAPI';
import { useState } from 'react';
import { useParams } from 'react-router';
import columns from './columns';

const CategoryTable = () => {
    const { marketplace } = useParams();
    const mp = marketplace?.split('-')?.join('/');

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const query = `page=${page + 1}&limit=${pageSize}&marketplace=${mp}`;
    const { data, isFetching, isLoading } = useTopBrandsQuery(query);

    return (
        <>
            <Card>
                <CardHeader title="Top Ranked Brands" sx={{ mb: 2 }} />
                <Box sx={{ height: 500 }}>
                    <ThemeDataGrid
                        page={page}
                        columns={columns}
                        setPage={setPage}
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

export default CategoryTable;
