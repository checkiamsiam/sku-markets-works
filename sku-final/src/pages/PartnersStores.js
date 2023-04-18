import { Box, Container } from '@mui/material';
import ActiveSKUProductsMarquee from 'components/common/marquee/ActiveSKUProductsMarquee';
import Banner from 'components/PartnersStore/Banner';
import PartnerStoreMain from 'components/PartnersStore/PartnersStore/PartnerStoreMain';
import PartnerStoreBottom from 'components/PartnersStore/PartnerStoreBottom';
import SponsoredSkus from 'components/PartnersStore/SponsoredSkus';
import { useSettingsContext } from 'components/settings';

const PartnersStores = () => {
  const { themeStretch } = useSettingsContext();
  return (
    <Container sx={{ mt: 20 }} maxWidth={themeStretch ? false : 'lg'}>
      <ActiveSKUProductsMarquee />
      <Box sx={{ mb: 2, mt: 0.5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Banner />
      </Box>
      <SponsoredSkus />
      <PartnerStoreMain />
      <PartnerStoreBottom />
    </Container>
  );
};

export default PartnersStores;
