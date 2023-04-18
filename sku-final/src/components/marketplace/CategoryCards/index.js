import { Box, Card, Divider, Grid, Pagination } from '@mui/material';
import CategoryCard from 'components/common/CategoryCards';
import { pageSize } from 'components/dashboard/variables';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { useCategoryAnalyticsQuery } from 'features/category/categoryAPI';
import { useState } from 'react';
import { useParams } from 'react-router';
import Header from './Header';

const CategoryCards = () => {
  const { marketplace } = useParams();
  const mp = marketplace?.split('-')?.join('/');

  const [page, setPage] = useState(1);
  const query = `page=${page}&limit=${pageSize}&marketplace=${mp}`;
  const { data, isFetching, isLoading } = useCategoryAnalyticsQuery(query);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  if (isFetching || isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Card>
      <Header />
      <Grid container spacing={2} sx={{ p: 3 }}>
        {data?.data?.map((p, i) => (
          <Grid key={i} item xs={12} md={6} lg={3}>
            <CategoryCard data={p} />
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

export default CategoryCards;
