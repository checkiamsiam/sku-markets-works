import { Box, Grid } from '@mui/material';
import StorePriceStatus from '../StorePriceStatus';
import StoreSkuTable from '../StoreSkuTable';

const Dashboard = () => {
  return (
    <Box width="100%">
      <Grid container>
        <Grid lg={12} item md={12} xs={12}>
          <StorePriceStatus />
        </Grid>
        <Grid lg={12} item md={12} xs={12}>
          <StoreSkuTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
