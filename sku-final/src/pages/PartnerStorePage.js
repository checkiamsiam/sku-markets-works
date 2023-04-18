import StorefrontIcon from '@mui/icons-material/Storefront';
import { Container, Grid, Stack, Typography } from '@mui/material';
import BlankWindow from 'components/common/BlankWindow';
import SKUMarquee from 'components/common/marquee';
import PartnerStoreControl from 'components/PartnerStore-Dashboard/PartnerStoreControl';
import { useSettingsContext } from 'components/settings';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const TABS = [
  { id: 1, tab: 'Overview', label: 'Overview' },
  { id: 2, tab: 'Insights', label: 'Insights' },
  { id: 3, tab: 'Audiences', label: 'Audiences' },
  { id: 4, tab: 'Partner Store', label: 'Partner Store' },
];

const PartnerStorePage = () => {
  const { themeStretch } = useSettingsContext();
  const [tab, setTab] = useState('Overview');
  const [collapsible, setCollapsible] = useState(true);
  return (
    <>
      <Helmet>
        <title> Partner Store Dashboard | SKU Markets</title>
      </Helmet>
      <SKUMarquee />
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack direction="row" justifyContent="space-between" sx={{ my: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <StorefrontIcon sx={{ width: '25px', height: '25px' }} />
            <Typography>Partner Store</Typography>
          </Stack>
        </Stack>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={collapsible ? 3.3 : 0.5}
            sx={{ position: 'relative', transition: '.4s linear' }}
          >
            <PartnerStoreControl
              collapsible={collapsible}
              setCollapsible={setCollapsible}
            />
          </Grid>
            <Grid item xs={12} md={collapsible ? 8.7 : 11.5} sx={{ transition: '.4s linear' }}>
              {/* {test ? (
                <>
                  <AdbaordTab tab={tab} setTabs={setTab} TABS={TABS} />
                  <Box>
                    <Grid container spacing={2} sx={{ position: 'relative' }}>
                      {tab === 'Overview' && (
                        <>
                          <Grid item lg={12} md={12} xs={12}>
                            Overview
                          </Grid>
                        </>
                      )}
                      {tab === 'Insights' && (
                        <>
                          <Grid item lg={12} md={12} xs={12}>
                            Insights
                          </Grid>
                        </>
                      )}
                      {tab === 'Audiences' && (
                        <>
                          <Grid item lg={12} md={12} xs={12}>
                            Audiences
                          </Grid>
                        </>
                      )}
                      {tab === 'Partner Store' && (
                        <>
                          <Grid item lg={12} md={12} xs={12}>
                            Partner Store
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Box>
                </>
              ) : ( */}
                <BlankWindow
                  title="You don't have a partner store yet"
                  description="You can add 1 partner store"
                />
              {/* )} */}
            </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PartnerStorePage;
