import { Box, Container, Typography } from '@mui/material';
import Banner from 'components/BuyAgain/Banner';
import FrequentlyBuyedSkuForBuyAgainPage from 'components/BuyAgain/FrequentlyBuyed';
import SponsoredSkus from 'components/BuyAgain/SponsoredSkus';
import ActiveSKUProductsMarquee from 'components/common/marquee/ActiveSKUProductsMarquee';
import { useSettingsContext } from 'components/settings';
import SkuMarketProduct from 'components/SkuMarket/SkuMarketProduct';

const BuyAgain = () => {
  const { themeStretch } = useSettingsContext();
  return (
    <Container sx={{ mt: 20 }} maxWidth={themeStretch ? false : 'lg'}>
      <ActiveSKUProductsMarquee />
      <Box sx={{ mb: 2, mt: 0.5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Banner />
      </Box>
      <SponsoredSkus />
      <Typography
        sx={{ fontSize: `14px`, fontWeight: 'bold', marginRight: 2, paddingLeft: '15px' }}
      >
        Buy Again SKUs
      </Typography>
      <SkuMarketProduct />
      <FrequentlyBuyedSkuForBuyAgainPage />
    </Container>
  );
};

export default BuyAgain;
