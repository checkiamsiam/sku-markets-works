import { Box } from '@mui/material';
import { Container } from '@mui/system';
import ActiveSKUProductsMarquee from 'components/common/marquee/ActiveSKUProductsMarquee';
import ProductView from 'components/SkuMarket/ProductView';
import SameBrandProduct from 'components/SkuMarket/SameBrandProduct';
import SponsoredInDetail from 'components/SkuMarket/SponsoredInDetailPage';
import TradeVolumeProdcut from 'components/SkuMarket/TradeVolumeProdcut';

const SkuProductView = () => {
  
  return (
    <>
      <Container sx={{ mt: 20, mb: 4 }} maxWidth="xl">
        <Box sx={{ my: 2 }}>
          <ActiveSKUProductsMarquee />
        </Box>
        <ProductView />
        <SponsoredInDetail />
        <TradeVolumeProdcut />
        <SameBrandProduct />
      </Container>
    </>
  );
};

export default SkuProductView;
