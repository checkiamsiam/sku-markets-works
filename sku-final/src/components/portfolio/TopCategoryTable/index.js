import { Box, Card, CardHeader, Typography } from '@mui/material';
import ThemeDataGrid from 'components/common/ThemeDataGrid';
import { useGetTopBrandAndCategoryQuery } from 'features/userSku/userSkuAPI';
import { useState } from 'react';
import columns from './columns';

const logic = 'filter=category_en';
const fields =
  'sku_marketplace,sku,current_price,all_images,brand_en,category_en,price_change,sold_24_hours,estimated_SOH';

const TopCategoryTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const query = `${logic}&page=${page + 1}&limit=${pageSize}&fields=${fields}`;
  const { data, isLoading, isFetching } = useGetTopBrandAndCategoryQuery(query);

  return (
    <>
      <Card>
        <CardHeader title="Top Ranked Categories" sx={{ mb: 2 }} />
        <Box sx={{ height: 500 }}>
          <ThemeDataGrid
            setPage={setPage}
            columns={columns}
            rows={data?.data}
            rowCount={data?.total}
            page={page}
            pageSize={pageSize}
            setPageSize={setPageSize}
            loading={isLoading || isFetching}
          />
        </Box>
      </Card>

      <Typography variant="caption">
        Designed for users to instantly see the opportunities on the marketplaces.
      </Typography>
    </>
  );
};

export default TopCategoryTable;
