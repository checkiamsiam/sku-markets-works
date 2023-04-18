import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import BlankWindow from 'components/common/BlankWindow';
import SKUMarquee from 'components/common/marquee';
import SearchBar from 'components/dashboard/SearchBar/SearchBar';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import BrandGrowths from 'components/portfolio/BrandGrowths';
import CaterogyDetailMode from 'components/portfolio/CategoryDetailMode';
import CategoryGrowths from 'components/portfolio/CategoryGrowths';
import OverviewCards from 'components/portfolio/OverviewCards/OverviewCards';
import StorePriceStatus from 'components/portfolio/StorePriceStatus';
import TransactionMode from 'components/portfolio/TransactionMode';
import BrandDetailMode from 'components/portfolio/brandDetailMode';
import PortfolioControl from 'components/portfolio/dashboard/portfolioControl.js';
import SKUStatusCards from 'components/portfolio/skuStatusTab/SkuStatusTab/SKUStatusCards';
import { useSettingsContext } from 'components/settings';
import SvgColor from 'components/svg-color/SvgColor';
import { useGetPortFolioQuery } from 'features/portfolio/portfolio.api';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PortfolioTabs from '../components/common/allTabs/index';

const TABS = [
  { id: 1, tab: 'Overview', label: 'dashboard' },
  { id: 2, tab: 'SKUs Status', label: 'skus_status' },
  { id: 3, tab: 'Brands Growths', label: 'brands_growths' },
  { id: 4, tab: 'Categories Growths', label: 'categories_growths' },
];

export default function Portfolio() {
  const { themeStretch } = useSettingsContext();
  const {
    selectedPortfolio,
    portfolios,
    IsSkuTransactionModeOn,
    IsBrandDetailMode,
    IsCategoryDetailMode,
  } = useSelector((state) => state.portfolios);
  const [portfolioTab, setPortfolioTab] = useState('dashboard');
  const [collapsible, setCollapsible] = useState(true);
  const { data, isLoading } = useGetPortFolioQuery();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <SKUMarquee />
      <Stack direction="row" justifyContent="space-between" sx={{ my: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
          <SvgColor
            src="/assets/icons/navbar/ic_user-edit.svg"
            sx={{ width: '25px', height: '25px' }}
          />
          <Typography>Portfolio</Typography>
        </Stack>
        <SearchBar />
      </Stack>
      <Grid container spacing={2} sx={{ my: 3 }}>
        <Grid
          item
          xs={12}
          md={collapsible ? 3.3 : 0.5}
          sx={{ position: 'relative', transition: '.4s linear' }}
        >
          <PortfolioControl collapsible={collapsible} setCollapsible={setCollapsible} data={data} />
        </Grid>
        {!IsSkuTransactionModeOn && !IsBrandDetailMode && !IsCategoryDetailMode ? (
          <Grid item xs={12} md={collapsible ? 8.7 : 11.5} sx={{ transition: '.4s linear' }}>
            {portfolios.length > 0 && selectedPortfolio?.store_products?.length !== 0 ? (
              <>
                <PortfolioTabs tab={portfolioTab} setTabs={setPortfolioTab} TABS={TABS} />
                <Box>
                  <Grid container spacing={2} sx={{ position: 'relative' }}>
                    {portfolioTab === 'dashboard' && (
                      <>
                        <Grid lg={12} item md={12} xs={12}>
                          <StorePriceStatus />
                        </Grid>
                        <Grid lg={12} item md={12} xs={12}>
                          {/* <OverViewTables /> */}
                          <OverviewCards collapsible={collapsible} />
                        </Grid>
                      </>
                    )}
                    {portfolioTab === 'skus_status' && (
                      <>
                        <Grid xs={12}>
                          {/* <SkuStatusTable /> */}
                          <SKUStatusCards collapsible={collapsible} />
                        </Grid>
                      </>
                    )}
                    {portfolioTab === 'brands_growths' && (
                      <>
                        <Grid lg={12} md={12} xs={12}>
                          <BrandGrowths collapsible={collapsible} />
                        </Grid>
                      </>
                    )}
                    {portfolioTab === 'categories_growths' && (
                      <>
                        <Grid lg={12} md={12} xs={12}>
                          <CategoryGrowths collapsible={collapsible} />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Box>
              </>
            ) : portfolios.length > 0 ? (
              <BlankWindow
                title="You don't have any product stored in this portfolio"
                description="You can select other portfolio to see their products or add new products to this."
              />
            ) : (
              <BlankWindow
                title="You don't have any portfolio Store ID created yet"
                description="You can create portfolio store ID up to 5 store IDs"
              />
            )}
          </Grid>
        ) : (
          <>
            {IsSkuTransactionModeOn && (
              <Grid item xs={12} md={collapsible ? 8.7 : 11.5} sx={{ transition: '.4s linear' }}>
                <TransactionMode />
              </Grid>
            )}
            {IsBrandDetailMode && (
              <Grid item xs={12} md={collapsible ? 8.7 : 11.5} sx={{ transition: '.4s linear' }}>
                <BrandDetailMode collapsible={collapsible} />
              </Grid>
            )}
            {IsCategoryDetailMode && (
              <Grid item xs={12} md={collapsible ? 8.7 : 11.5} sx={{ transition: '.4s linear' }}>
                <CaterogyDetailMode collapsible={collapsible} />
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Container>
  );
}
