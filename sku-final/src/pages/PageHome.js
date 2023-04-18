import { Box } from '@mui/material';
import LineScrollCount from 'components/common/LineScrollCount';
import ActiveSKUProductsMarquee from 'components/common/marquee/ActiveSKUProductsMarquee';
import ContactUs from 'components/home/ContactUs';
import { Helmet } from 'react-helmet-async';
import FAQSection from '../components/home/FAQSection';
import HomeTable from '../components/home/HomeTable';
import LandingPage from '../components/home/LandingPage';
import MapLocation from '../components/home/MapLocation';
import MarketSolution from '../components/home/MarketSolution';
import Plugin from '../components/home/Plugin';
import PricingCard from '../components/home/PricingCard';
import SkuSolution from '../components/home/SkuSolution';
import TrySkuMarket from '../components/home/TrySkuMarket';

const PageHome = () => {
  return (
    <>
      <Helmet>
        <title> Home | Minimal UI</title>
      </Helmet>
      <LineScrollCount />
      <LandingPage />
      <Box sx={{ mt: { md: 10, xs: 0 } }}>
        <ActiveSKUProductsMarquee />
      </Box>
      <MapLocation />
      <TrySkuMarket />
      <HomeTable />
      <MarketSolution />
      <SkuSolution />
      <Plugin />
      <FAQSection />
      <PricingCard />
      <ContactUs />
    </>
  );
};

export default PageHome;
