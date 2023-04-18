import { Box, Container, Pagination } from '@mui/material';
import ActiveSKUProductsMarquee from 'components/common/marquee/ActiveSKUProductsMarquee';
import Banner from 'components/CouponArea/Banner';
import CouponAreaCard from 'components/CouponArea/CouponArea/CouponArea';
import SponsoredSkus from 'components/CouponArea/SponsoredSkus';
import { useSettingsContext } from 'components/settings';

const CouponArea = () => {
  const { themeStretch } = useSettingsContext();
  return (
    <Container sx={{ mt: 20 }} maxWidth={themeStretch ? false : 'lg'}>
      <ActiveSKUProductsMarquee />
      <Box sx={{ mb: 2, mt: 0.5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Banner />
      </Box>
      <SponsoredSkus />
      <CouponAreaCard />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
        <Pagination count={3} color="primary" />
      </Box>
    </Container>
  );
};

export default CouponArea;
