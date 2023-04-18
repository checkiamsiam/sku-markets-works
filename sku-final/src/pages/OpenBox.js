import { Box, Container, Pagination, Typography } from '@mui/material';
import ActiveSKUProductsMarquee from 'components/common/marquee/ActiveSKUProductsMarquee';
import Banner from 'components/OpenBox/Banner';
import SponsoredSkus from 'components/OpenBox/SponsoredSkus';
import { useSettingsContext } from 'components/settings';
import SkuMarketProduct from 'components/SkuMarket/SkuMarketProduct';
const OpenBox = () => {
  const { themeStretch } = useSettingsContext();

  return (
    <Container sx={{ mt: 20 }} maxWidth={themeStretch ? false : 'lg'}>
      <ActiveSKUProductsMarquee />
      <Box sx={{ mb: 2, mt: 0.5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Banner />
      </Box>
      <SponsoredSkus label="Sponoserd SKUs" />
      <SponsoredSkus label="Sponsored Open Box SKUs" />
      <Typography
        sx={{ fontSize: `14px`, fontWeight: 'bold', marginRight: 2, paddingLeft: '15px' }}
      >
        Open Box SKUs
      </Typography>
      <SkuMarketProduct />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 3 }}>
        <Pagination count={5} color="primary" />
      </Box>
    </Container>
  );
};

export default OpenBox;
