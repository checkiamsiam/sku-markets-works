import { Box, Container } from '@mui/material';
import ActiveSKUProductsMarquee from 'components/common/marquee/ActiveSKUProductsMarquee';
import { useSettingsContext } from 'components/settings';
import Banner from 'components/verifiedPartner/Banner';
import SponsoredSkus from 'components/verifiedPartner/SponsoredSkus';
import VerifiedPartnerBottom from 'components/verifiedPartner/VerifiedPartnerBottom';
import VerifiedPartnersMain from 'components/verifiedPartner/verifiedPartners/VerifiedPartners';

const VerifiedPartners = () => {
  const { themeStretch } = useSettingsContext();
  return (
    <Container sx={{ mt: 20 }} maxWidth={themeStretch ? false : 'lg'}>
      <ActiveSKUProductsMarquee />
      <Box sx={{ mb: 2, mt: 0.5, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Banner />
      </Box>
      <SponsoredSkus />
      <VerifiedPartnersMain />
      <VerifiedPartnerBottom />
    </Container>
  );
};

export default VerifiedPartners;
