import { Box, Card, CardHeader } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useTopBrandsQuery } from 'features/brand/brandAPI';
import { useState } from 'react';
import columns from './columns';

const BrandTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const query = `page=${page + 1}&limit=${pageSize}`;
  const { data, isFetching, isLoading } = useTopBrandsQuery(query);

  return (
    <>
      <Card sx={{ mt: 2 }}>
        <CardHeader title="Top Ranked Brands" sx={{ mb: 2 }} />
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
    </>
  );
};

export default BrandTable;
