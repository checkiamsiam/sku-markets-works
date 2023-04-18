import { Box, Grid, Pagination } from '@mui/material';
import '../../components/SkuMarket/SkuMarketStyle.css';
import UserCard from './verifiedPartners/UserCard';

const VerifiedPartnerBottom = () => {
  const data = [1, 3, 4, 4, 4];

  return (
    <>
      <Box sx={{ p: 2, my: 2 }}>
        <Grid container spacing={3}>
          {data.map((user, i) => (
            <Grid item md={2.4} xs={12}>
              <UserCard key={i} user={user} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
          <Pagination count={3} color="primary" />
        </Box>
      </Box>
    </>
  );
};

export default VerifiedPartnerBottom;
