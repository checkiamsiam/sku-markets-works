import { Box, Card, Divider, Grid, Pagination } from '@mui/material';
import MarketplaceCard from 'components/common/MarketplaceAnalyticsCard';
import { pageSize } from 'components/dashboard/variables';
import { useMarketplaceAnalyticsQuery } from 'features/marketplace/marketplaceAPI';
import { useState } from 'react';
import Header from './Header';

const MarketplaceAnalyticsCards = () => {
  const [page, setPage] = useState(1);
  const query = `page=${page}&limit=${pageSize}`;

  const { data } = useMarketplaceAnalyticsQuery(query);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <Header />
      <Grid container spacing={2} sx={{ p: 3 }}>
        {data?.data?.map((p, i) => (
          <Grid item md={3}>
            <MarketplaceCard data={p} />
          </Grid>
        ))}
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
      </Grid>
    </Card>
  );
};

export default MarketplaceAnalyticsCards;
