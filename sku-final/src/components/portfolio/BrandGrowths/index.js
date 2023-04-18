import { Box, Card, Divider, Grid, Pagination } from '@mui/material';
import { pageSize } from 'components/dashboard/variables';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { useTopBrandsQuery } from 'features/brand/brandAPI';
import { useState } from 'react';
import BrandAndGrowthCard from '../BrandAndGrowthCard';

const BrandGrowths = ({ collapsible }) => {
  // handle pagination
  const [page, setPage] = useState(1);

  const query = `page=${page}&limit=${pageSize}`;
  const { data, isFetching, isLoading } = useTopBrandsQuery(query);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  if (isFetching || isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Card sx={{ p: 2, mx: 3, mt: 2 }}>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {data?.data.map((p, i) => (
          <Grid key={i} item xs={12} md={6} lg={collapsible ? 4 : 3}>
            <BrandAndGrowthCard data={p} />
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
    </Card>
  );
};

export default BrandGrowths;
