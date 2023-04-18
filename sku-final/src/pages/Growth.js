import { Container, Typography } from '@mui/material';
import SKUMarquee from 'components/common/marquee';
// import DetailCards from 'components/growth/DetailCards';
import GrowthTable from 'components/growth/GrowthTable';
import GvsAndShippingDetails from 'components/growth/GvsAndShippingDetails';
import MarketTabs from 'components/growth/MarketsTab';
import MonthlyDetailsGrid from 'components/growth/MonthlyDetailsGrid';
import SKUsExport from 'components/growth/SKUsExport';
import { useSettingsContext } from 'components/settings';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const GrowthPage = () => {
  const { themeStretch } = useSettingsContext();
  const [marketTab, setMarketTab] = useState('sku_markets');
  return (
    <>
      <Helmet>
        <title> Growth | SKU Markets</title>
      </Helmet>
      <SKUMarquee />
      <Container sx={{ marginTop: '30px' }} maxWidth={themeStretch ? false : 'xl'}>
        <Typography sx={{ my: 3 }}>Growth & Health Performance</Typography>
        <MarketTabs setMarketTab={setMarketTab} />
        {/* <DetailCards /> */}
        {marketTab === 'sku_markets' && (
          <>
            <MonthlyDetailsGrid />
            <GvsAndShippingDetails />
            <GrowthTable />
          </>
        )}
        {marketTab === 'noon' && (
          <>
            <MonthlyDetailsGrid />
            <GvsAndShippingDetails />
            <GrowthTable />
            <SKUsExport />
          </>
        )}
      </Container>
    </>
  );
};

export default GrowthPage;
