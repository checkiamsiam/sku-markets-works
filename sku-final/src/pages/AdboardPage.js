import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import AdbaordTab from 'components/adboard/AdbaordTab';
import AddGroupMode from 'components/adboard/adGroupMode';
import AdboardControl from 'components/adboard/adboardControl';
import AddCampaignMode from 'components/adboard/addCampaignMode';
import AdsSettingMode from 'components/adboard/adsSettingMode';
import BlankWindow from 'components/common/BlankWindow';
import SKUMarquee from 'components/common/marquee';
import { useSettingsContext } from 'components/settings';
import SvgColor from 'components/svg-color/SvgColor';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
const TABS = [
  { id: 1, tab: 'Overview', label: 'Overview' },
  { id: 2, tab: 'Insights', label: 'Insights' },
  { id: 3, tab: 'Audiences', label: 'Audiences' },
  { id: 4, tab: 'Partner Store', label: 'Partner Store' },
];

const AdboardPage = () => {
  const [test, setTest] = useState(false);
  const { themeStretch } = useSettingsContext();
  const [tab, setTab] = useState('Overview');
  const [collapsible, setCollapsible] = useState(true);
  const { addCampaignMode, addGroupMode , adsSettingsMode} = useSelector((state) => state.adboard);
  return (
    <>
      <Helmet>
        <title> Adboard | SKU Markets</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <SKUMarquee />
        <Stack direction="row" justifyContent="space-between" sx={{ my: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <SvgColor
              src="/assets/icons/navbar/ic_ads.svg"
              sx={{ width: '25px', height: '25px' }}
            />
            <Typography>AdBoard</Typography>
          </Stack>
        </Stack>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={collapsible ? 3.3 : 0.5}
            sx={{ position: 'relative', transition: '.4s linear' }}
          >
            <AdboardControl
              collapsible={collapsible}
              setCollapsible={setCollapsible}
              setTest={setTest}
            />
          </Grid>
          {!addCampaignMode && !addGroupMode && !adsSettingsMode ? (
            <Grid item xs={12} md={collapsible ? 8.7 : 11.5} sx={{ transition: '.4s linear' }}>
              {test ? (
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
              ) : (
                <BlankWindow
                  title="You don't have any campaigns yet"
                  description="You can add unlimited campaigns"
                />
              )}
            </Grid>
          ) : (
            <>
              {addCampaignMode && (
                <Grid item xs={12} md={collapsible ? 8.7 : 11.5} sx={{ transition: '.4s linear' }}>
                  <AddCampaignMode />
                </Grid>
              )}
              {addGroupMode && (
                <Grid item xs={12} md={collapsible ? 8.7 : 11.5} sx={{ transition: '.4s linear' }}>
                  <AddGroupMode />
                </Grid>
              )}
              {adsSettingsMode && (
                <Grid item xs={12} md={collapsible ? 8.7 : 11.5} sx={{ transition: '.4s linear' }}>
                  <AdsSettingMode />
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default AdboardPage;
