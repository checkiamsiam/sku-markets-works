import { Box, Container, Pagination } from '@mui/material';
import Banner from 'components/ClearanceArea/Banner';
import ClearProducts from 'components/ClearanceArea/ClearProducts';
import SponsoredSkus from 'components/ClearanceArea/SponsoredSkus';
import ActiveSKUProductsMarquee from 'components/common/marquee/ActiveSKUProductsMarquee';
import { useSettingsContext } from 'components/settings';

const ClearanceArea = () => {
  const { themeStretch } = useSettingsContext();
  return (
    <Container sx={{ mt: 20 }} maxWidth={themeStretch ? false : 'lg'}>
      <ActiveSKUProductsMarquee />
      <Box sx={{ mb: 2, mt: 0.5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Banner />
      </Box>
      <SponsoredSkus />
      {/* <ClearanceAreaMain /> */}
      <ClearProducts />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
        <Pagination count={3} color="primary" />
      </Box>
    </Container>
  );
};

export default ClearanceArea;
