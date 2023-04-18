import { Container, Grid, Stack, Typography } from '@mui/material';
import BrandTable from 'components/dashboard/BrandTable';
import BrandOCards from 'components/dashboard/BrandTable/BrandCards';
import CategoryTable from 'components/dashboard/CategoryTable';
import CategoryOCard from 'components/dashboard/CategoryTable/CategoryCards';
import FulfillmentTable from 'components/dashboard/FulfillmentTable';
import InvestInsigntAnalitics from 'components/dashboard/InvestInsightAnalitics/InvestInsigntAnalitics';
import MarketplaceAnalyticsCards from 'components/dashboard/MarketplaceAnalyticsTable/MarketplaceAnalyticsCards';
import MarketplaceTop from 'components/dashboard/MarketplaceTop';
import OpportunityTable from 'components/dashboard/OpportunityTable';
import SearchBar from 'components/dashboard/SearchBar/SearchBar';
import SKUStatusCards from 'components/dashboard/SkuStatusTab/SKUStatusCards';
import { useSettingsContext } from 'components/settings';
import SvgColor from 'components/svg-color/SvgColor';
import { useState } from 'react';
import MarketplaceTab from '../components/common/allTabs/index';
import SKUMarquee from '../components/common/marquee/index.jsx';

const TABS = [
  { id: 1, tab: 'Overview', label: 'dashboard' },
  { id: 2, tab: 'Insights & Analytics', label: 'IIA' },
  // { id: 3, tab: 'Stock Opportunities', label: 'stock_opp' },
  { id: 4, tab: 'SKUs Status', label: 'skus_status' },
  { id: 5, tab: 'Brands Opportunities', label: 'BO' },
  { id: 6, tab: 'Categories Opportunities', label: 'CO' },
  // { id: 7, tab: 'Categories & Brands Opportunities', label: 'CBO' },
];

const Dashboard = () => {
  const { themeStretch } = useSettingsContext();
  const [marketTab, setMarketTab] = useState('dashboard');

  return (
    <>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <SKUMarquee />
        <Stack direction="row" justifyContent="space-between" sx={{ my: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <SvgColor
              src="/assets/icons/navbar/ic_marketplace_outline.svg"
              sx={{ width: '25px', height: '25px' }}
            />
            <Typography>Marketplaces</Typography>
          </Stack>

          <SearchBar />
        </Stack>
        <Stack sx={{ mt: 5 }}>
          <MarketplaceTab tab={marketTab} setTabs={setMarketTab} TABS={TABS} />
        </Stack>
        <Grid container spacing={3}>
          {marketTab === 'dashboard' && (
            <>
              <MarketplaceTop />
              <Grid lg={12} item md={12} xs={12}>
                {/* <MarketplaceAnalyticsTable /> */}
                <MarketplaceAnalyticsCards />
              </Grid>
            </>
          )}
          {marketTab === 'IIA' && (
            <>
              <Grid lg={12} item md={12} xs={12}>
                <InvestInsigntAnalitics />
              </Grid>

              {/* <Grid lg={12} item md={12} xs={12}>
                <RankedSKUTable />
              </Grid>
              <Grid lg={12} item md={12} xs={12}>
                <InvestmentAnalyticsTable />
              </Grid>

              <Grid item lg={12} md={12} xs={12}>
                <RecentlyRankTable />
              </Grid> */}
            </>
          )}
          {marketTab === 'stock_opp' && (
            <>
              <Grid lg={12} item md={12} xs={12}>
                <OpportunityTable />
              </Grid>
              <Grid lg={12} item md={12} xs={12}>
                <FulfillmentTable />
              </Grid>
            </>
          )}
          {marketTab === 'skus_status' && (
            <>
              <Grid lg={12} item md={12} xs={12}>
                <SKUStatusCards />
              </Grid>
              {/* <Grid lg={12} item md={12} xs={12}>
                <TopGainersTable />
              </Grid>
              <Grid lg={12} item md={12} xs={12}>
                <TopLosersTable />
              </Grid>
              <Grid lg={12} item md={12} xs={12}>
                <NewHighTable />
              </Grid>
              <Grid lg={12} item md={12} xs={12}>
                <NewLowTable />
              </Grid>
              <Grid lg={12} item md={12} xs={12}>
                <UnusualVolumeTable />
              </Grid>
              <Grid lg={12} item md={12} xs={12}>
                <MostVolatileTable />
              </Grid> */}
            </>
          )}
          {marketTab === 'BO' && (
            <>
              <Grid item lg={12} md={12} xs={12}>
                <BrandOCards />
              </Grid>
            </>
          )}
          {marketTab === 'CO' && (
            <>
              <Grid item lg={12} md={12} xs={12}>
                <CategoryOCard />
              </Grid>
            </>
          )}
          {marketTab === 'CBO' && (
            <>
              <Grid item lg={12} md={12} xs={12}>
                <CategoryTable />
              </Grid>
              <Grid item lg={12} md={12} xs={12}>
                <BrandTable />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
