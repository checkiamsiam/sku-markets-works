import { Box, Card, Container, Grid, Stack, Typography } from '@mui/material';
import SKUMarquee from 'components/common/marquee';
import AdsPayCardAds from 'components/FinancePage/adsBilling/AdsPayCard';
import BillingOverviewOtherAds from 'components/FinancePage/adsBilling/BillingOverviewOther';
import BillingTransferTabAds from 'components/FinancePage/adsBilling/BillingTransfersTab';
import DocumentsTabAds from 'components/FinancePage/adsBilling/DocumentsTab';
import PreviusActivitiesAds from 'components/FinancePage/adsBilling/PreviusActivities';
import PromotionTabAds from 'components/FinancePage/adsBilling/PromotionTab';
import SettingsTabAllowAds from 'components/FinancePage/adsBilling/SettingsTab';
import BillingOverviewOtherSA from 'components/FinancePage/SalesAccounting/BillingOverviewOther';
import BillingTransferTabSA from 'components/FinancePage/SalesAccounting/BillingTransfersTab';
import DocumentsTabSA from 'components/FinancePage/SalesAccounting/DocumentsTab';
import PreviusActivitiesSA from 'components/FinancePage/SalesAccounting/PreviusActivities';
import PromotionTabSA from 'components/FinancePage/SalesAccounting/PromotionTab';
import SettingsTabSA from 'components/FinancePage/SalesAccounting/SettingsTab';
import SalesAccountingTopSA from 'components/FinancePage/SalesAccounting/Top/SalesAccounting';
import SubsNBilling from 'components/FinancePage/SubsNBilling';
import BillingTransferTabSub from 'components/FinancePage/SubsNBilling/BillingTransfersTab';
import DocumentsTabSub from 'components/FinancePage/SubsNBilling/DocumentsTab';
import FinanceRootTab from 'components/FinancePage/SubsNBilling/FinacneTabs';
import PromotionTabSub from 'components/FinancePage/SubsNBilling/PromotionTab';
import SettingsTabSub from 'components/FinancePage/SubsNBilling/SettingsTab';
import TabsControl from 'components/FinancePage/SubsNBilling/Tabs';
import UpgradeSubscription from 'components/FinancePage/SubsNBilling/UpgradeSubscription';
import BillingOverviewOtherWallet from 'components/FinancePage/Wallet/BillingOverviewOther';
import BillingTransferTabWallet from 'components/FinancePage/Wallet/BillingTransfersTab';
import DocumentsTabWallet from 'components/FinancePage/Wallet/DocumentsTab';
import PreviusActivitiesWallet from 'components/FinancePage/Wallet/PreviusActivities';
import AffiliationTabWallet from 'components/FinancePage/Wallet/PromotionTab';
import SettingsTabWallet from 'components/FinancePage/Wallet/SettingsTab';
import SubsAndBillingTopWallet from 'components/FinancePage/Wallet/SubsAndBillingTop';
import { useSettingsContext } from 'components/settings';
import SvgColor from 'components/svg-color/SvgColor';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const TABS = [
  { id: 1, tab: 'Sales Accounting', label: 'Sales Accounting' },
  { id: 2, tab: 'SKU Markets Wallet', label: 'SKU Markets Wallet' },
  { id: 3, tab: 'Subscription & Billing', label: 'Subscription & Billing' },
  { id: 4, tab: "Ads' billing", label: "Ads' billing" },
];

const FinancePage = () => {
  const { themeStretch } = useSettingsContext();
  const [rootTab, setRootTab] = useState('Sales Accounting');
  const [activeTab, setActiveTab] = useState('Overview');
  const [collapsible, setCollapsible] = useState(true);

  return (
    <>
      <Helmet>
        <title> Finance Dashboard | SKU Markets</title>
      </Helmet>
      <SKUMarquee />
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack direction="row" justifyContent="space-between" sx={{ my: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
            <SvgColor
              src="/assets/icons/navbar/ic_banking.svg"
              sx={{ width: '25px', height: '25px' }}
            />
            <Typography>Finance</Typography>
          </Stack>
        </Stack>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={collapsible ? 2.5 : 0.5}
            sx={{ position: 'relative', transition: '.4s linear' }}
          >
            <Box sx={{ position: 'sticky', top: '75px' }}>
              {(rootTab === 'Subscription & Billing' ||
                rootTab === "Ads' billing" ||
                rootTab === 'SKU Markets Wallet' ||
                rootTab === 'Sales Accounting') && (
                <TabsControl
                  rootTab={rootTab}
                  collapsible={collapsible}
                  setCollapsible={setCollapsible}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={collapsible ? 9.5 : 11.5} sx={{ transition: '.4s linear' }}>
            <>
              <FinanceRootTab
                tab={rootTab}
                setTabs={setRootTab}
                TABS={TABS}
                setActiveTab={setActiveTab}
              />
              {(rootTab === 'Subscription & Billing' ||
                rootTab === "Ads' billing" ||
                rootTab === 'SKU Markets Wallet' ||
                rootTab === 'Sales Accounting') && (
                <Card sx={{ p: 2, overflow: 'visible' }}>
                  {activeTab === 'Overview' && (
                    <>
                      {rootTab === 'Subscription & Billing' && (
                        <SubsNBilling setActiveTab={setActiveTab} />
                      )}
                      {rootTab === 'SKU Markets Wallet' && (
                        <Grid container spacing={5}>
                          <Grid item xs={12} md={12}>
                            <SubsAndBillingTopWallet setActiveTab={setActiveTab} />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <BillingOverviewOtherWallet setActiveTab={setActiveTab} />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <PreviusActivitiesWallet setActiveTab={setActiveTab} />
                          </Grid>
                        </Grid>
                      )}
                      {rootTab === "Ads' billing" && (
                        <Grid container spacing={5}>
                          <Grid item xs={12} md={12}>
                            <AdsPayCardAds />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <BillingOverviewOtherAds setActiveTab={setActiveTab} />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <PreviusActivitiesAds setActiveTab={setActiveTab} />
                          </Grid>
                        </Grid>
                      )}
                      {rootTab === 'Sales Accounting' && (
                        <Grid container spacing={5}>
                          <Grid item xs={12} md={12}>
                            <SalesAccountingTopSA />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <BillingOverviewOtherSA setActiveTab={setActiveTab} />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <PreviusActivitiesSA setActiveTab={setActiveTab} />
                          </Grid>
                        </Grid>
                      )}
                    </>
                  )}
                  {activeTab === 'Documents' && (
                    <>
                      {rootTab === 'Subscription & Billing' && <DocumentsTabSub />}
                      {rootTab === 'SKU Markets Wallet' && <DocumentsTabWallet />}
                      {rootTab === "Ads' billing" && <DocumentsTabAds />}
                      {rootTab === 'Sales Accounting' && <DocumentsTabSA />}
                    </>
                  )}
                  {activeTab === 'Promotions' && (
                    <>
                      {rootTab === 'Subscription & Billing' && <PromotionTabSub />}
                      {rootTab === "Ads' billing" && <PromotionTabAds />}
                      {rootTab === 'Sales Accounting' && <PromotionTabSA />}
                    </>
                  )}
                  {activeTab === 'Billing Transfers' && (
                    <>
                      {rootTab === 'Subscription & Billing' && <BillingTransferTabSub />}
                      {rootTab === 'SKU Markets Wallet' && <BillingTransferTabWallet />}
                      {rootTab === "Ads' billing" && <BillingTransferTabAds />}
                    </>
                  )}
                  {activeTab === 'Payment Transfers' && (
                    <>{rootTab === 'Sales Accounting' && <BillingTransferTabSA />}</>
                  )}
                  {activeTab === 'Affiliation' && (
                    <> {rootTab === 'SKU Markets Wallet' && <AffiliationTabWallet />}</>
                  )}
                  {activeTab === 'Settings' && (
                    <>
                      {rootTab === 'Subscription & Billing' && <SettingsTabSub />}
                      {rootTab === 'SKU Markets Wallet' && <SettingsTabWallet />}
                      {rootTab === "Ads' billing" && <SettingsTabAllowAds />}
                      {rootTab === 'Sales Accounting' && <SettingsTabSA />}
                    </>
                  )}
                  {activeTab === 'Upgrade Subscription' && (
                    <UpgradeSubscription setActiveTab={setActiveTab} />
                  )}
                </Card>
              )}
            </>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FinancePage;
