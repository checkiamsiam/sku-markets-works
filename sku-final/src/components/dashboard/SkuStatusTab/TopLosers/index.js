import { Box, Divider, Grid, Pagination } from '@mui/material';
import SKUCard from 'components/common/SKUCards';
import { pageSize } from 'components/dashboard/variables';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { useGetAllProductsQuery } from 'features/product/productAPI';
import { useState } from 'react';

const logic = 'sort=-price_change';
const fields =
  'sku_marketplace,sku,current_price,is_live,buy_box_currency,all_images,brand_en,category_en,price_change,current_price,number_of_sellers';

const TopLosers = () => {
  /// handle pagination
  const [page, setPage] = useState(1);

  const query = `${logic}&page=${page}&limit=${pageSize}&fields=${fields}`;

  const { data, isFetching, isLoading } = useGetAllProductsQuery(query);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  if (isFetching || isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {data?.data?.map((p, i) => (
          <Grid key={i} item xs={12} md={6} lg={3}>
            <SKUCard data={p} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
          <Pagination
            count={Math.ceil(data?.total / pageSize) || 0}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default TopLosers;
