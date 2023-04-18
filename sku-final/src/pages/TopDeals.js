import { Box, Container } from '@mui/material';
import ActiveSKUProductsMarquee from 'components/common/marquee/ActiveSKUProductsMarquee';
import { useSettingsContext } from 'components/settings';
import Banner from 'components/TopDeals/Banner';
import CategoryForDeal from 'components/TopDeals/categoryForDeal';
import SponsoredSkus from 'components/TopDeals/SponsoredSkus';

const TopDeals = () => {
  const { themeStretch } = useSettingsContext();
  return (
    <Container sx={{ mt: 20 }} maxWidth={themeStretch ? false : 'lg'}>
      <ActiveSKUProductsMarquee />
      <Box sx={{ mb: 2, mt: 0.5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Banner />
      </Box>
      <SponsoredSkus />
      <CategoryForDeal />
    </Container>
  );
};

export default TopDeals;
