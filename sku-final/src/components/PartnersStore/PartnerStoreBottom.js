import { Box, Grid, Pagination } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import '../../components/SkuMarket/SkuMarketStyle.css';
import UserCard from './PartnersStore/UserCard';

const PartnerStoreBottom = () => {
  const data = [1, 3, 4, 4, 4];
  const isMd = useResponsive('up', 'md');
  const fetch = isMd ? data : data.slice(0, 2);
  return (
    <>
      <Box sx={{ p: 2, my: 2 }}>
        <Grid container spacing={3}>
          {fetch.map((user, i) => (
            <Grid item md={2.4} xs={6}>
              <UserCard key={i} user={user} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
          <Pagination count={isMd ? 3 : 6} color="primary" />
        </Box>
      </Box>
    </>
  );
};

export default PartnerStoreBottom;
