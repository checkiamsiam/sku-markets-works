import SKUMarquee from 'components/common/marquee';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useSettingsContext } from 'components/settings';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CompetitorsTab from 'components/competitors/CompetitorsTab';
import CompetitorsDetailsGrid from 'components/competitors/CompetitorsDetailsGrid';
import PricesBuilderTable from 'components/competitors/pricesBuilder/PricesBuilderTable';
import IncreaseBuyboxDecrease from 'components/competitors/increaseBuyboxDecrease/IncreaseBuyboxDecrease';
import CompetitorsNoon from 'components/competitors/noon/CompetitorsNoon';
import NoonIncreaseBuyboxDecrease from 'components/competitors/noon/NoonIncreaseBuyboxDecrease';

const Competitors = () => {
  const { themeStretch } = useSettingsContext();
  const [competitorsTab, setCompetitorsTab] = useState('sku_markets');
  return (
    <>
      <Helmet>
        <title> Competitors Dashboard | SKU Markets</title>
      </Helmet>
      <SKUMarquee />
      <Container sx={{ marginTop: '30px' }} maxWidth={themeStretch ? false : 'xl'}>
        <Typography sx={{ my: 3 }}>Competitors Dashboard</Typography>
        <CompetitorsTab setCompetitorsTab={setCompetitorsTab}/>
        
        {competitorsTab === 'sku_markets' && <>
        <CompetitorsDetailsGrid/>
        <PricesBuilderTable/>
        <IncreaseBuyboxDecrease/>
        </>}
        {competitorsTab === 'noon' && <>
        <CompetitorsNoon/>
        <PricesBuilderTable/>
        <NoonIncreaseBuyboxDecrease/>
        </>}
      </Container>
    </>
  );
};

export default Competitors;
