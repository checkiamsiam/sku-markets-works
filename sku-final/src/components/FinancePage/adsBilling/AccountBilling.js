import PropTypes from 'prop-types';
// @mui
import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
//
// import AccountBillingAddressBook from './AccountBillingAddressBook';
// import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import CancelAlert from 'components/sellerboard/sellerboardAlerts/CancelAlert';
import { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import BillingOverviewOther from './BillingOverviewOther';
import BillingTransferTab from './BillingTransfersTab';
import DocumentsTab from './DocumentsTab';
import PromotionTab from './PromotionTab';
import SettingsTab from './SettingsTab';
import TabsControl from './Tabs';
import PreviusActivities from './PreviusActivities';
import UpgradeSubscription from './UpgradeSubscription';

// ----------------------------------------------------------------------

AccountBilling.propTypes = {
  cards: PropTypes.array,
  invoices: PropTypes.array,
  addressBook: PropTypes.array,
};

export default function AccountBilling({ cards, addressBook, invoices }) {
  // Pop -Up Remove
  const [openCancel, setOpenCancel] = useState(false);
  const handleCloseCancel = () => setOpenCancel(false);
  const handleShowCancel = () => setOpenCancel(true);

  // ----------- Subscription not applied ------------
  const subscription = 'free';

  const [activeTab, setActiveTab] = useState('Overview');

  return (
    // <Card sx={{ p:2 ,position: 'relative'}}>
    <>
      <Grid container spacing={2} >
        <Grid item xs={12} md={2} sx={{position: 'relative'}}>
          <Box sx={{position: 'sticky', top: 50}}>
          <TabsControl activeTab={activeTab} setActiveTab={setActiveTab} />
          </Box>
        </Grid>
        <Grid item spacing={5} xs={12} md={10}>
          <Card sx={{p:2,overflow:"visible"}}>
          {activeTab === 'Overview' && (
            <Grid container spacing={5}>
              <Grid item xs={12} md={12}>
                <Stack spacing={3}>
                  <Card sx={{ p: 3 }}>
                    <Typography
                      variant="overline"
                      sx={{  display: 'block', color: 'text.secondary' }}
                    >
                      Your Subscription Plan
                    </Typography>
                    <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
                      {subscription}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{mt:"5px"}}>
                    <Button
                      size='small'
                      sx={{
                        px: 1,
                        fontWeight: 600,
                        color: `success.main`,
                        bgcolor: `rgba(120, 240, 80, 0.2)`,
                        '&:hover': {bgcolor: "rgba(120, 240, 80, 0.2)"}
                      }}
                    >
                      Active
                    </Button>
                    {/* <Button
                      size='small'
                      sx={{
                        px: 1,
                        fontWeight: 600,
                        color: `warning.dark`,
                        bgcolor: `rgba(255, 193, 7, 0.2)`,
                        '&:hover': {bgcolor: "rgba(255, 193, 7, 0.2)"}
                      }}
                    >
                      Waiting Payment
                    </Button>
                    <Button
                      size='small'
                      sx={{
                        px: 1,
                        fontWeight: 600,
                        color: `info.dark`,
                        bgcolor: `info.lighter`,
                        '&:hover': {bgcolor: "info.lighter"}
                      }}
                    >
                      Downgrade Plan
                    </Button> */}
                    </Stack>
                    <Box
                      sx={{
                        mt: { xs: 2, sm: 0 },
                        position: { sm: 'absolute' },
                        top: { sm: 24 },
                        right: { sm: 24 },
                      }}
                    >
                      <Button
                        size="small"
                        sx={{
                          bgcolor: 'white',
                          border: (theme) => `1px solid ${theme.palette.primary.main}`,
                          color: (theme) =>
                            theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                          '&:hover': {
                            bgcolor: 'primary.main',
                            color: (theme) =>
                              theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                            border: (theme) => `1px solid ${theme.palette.primary.main}`,
                          },
                          mr: 1,
                        }}
                        disabled={subscription === 'free'}
                        onClick={handleShowCancel}
                      >
                        Cancel Subscription
                      </Button>
                      <Button
                      onClick={() => setActiveTab('Upgrade Subscription')}
                        size="small"
                        sx={{
                          bgcolor: 'primary.main',
                          border: (theme) => `1px solid ${theme.palette.primary.main}`,
                          color: (theme) =>
                            theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                          '&:hover': {
                            bgcolor: 'white',
                            color: (theme) =>
                              theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                            border: (theme) => `1px solid ${theme.palette.primary.main}`,
                          },
                        }}
                      >
                        Upgrade Subscription
                      </Button>
                    </Box>
                    <Stack
                      sx={{
                        mt: { xs: 2, sm: 0 },
                        position: { sm: 'absolute' },
                        top: { sm: 90 },
                        right: { sm: 24 },
                      }}
                    >
                      <Typography fontSize="12px" sx={{ color: '#1562ff' }}>
                      If you want to upgrade your subscription we suggested it on the 1st of the Month
                      </Typography>
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <BillingOverviewOther setActiveTab={setActiveTab} />
              </Grid>
              <Grid item xs={12} md={12}>
                <PreviusActivities setActiveTab={setActiveTab} />
              </Grid>
            </Grid>
          )}
          {activeTab === 'Documents' && <DocumentsTab />}
          {activeTab === 'Promotions' && <PromotionTab />}
          {activeTab === 'Billing Transfers' && <BillingTransferTab />}
          {activeTab === 'Settings' && <SettingsTab />}
          {activeTab === 'Upgrade Subscription' && <UpgradeSubscription setActiveTab={setActiveTab} />}
          </Card>
        </Grid>
      </Grid>
      <CancelAlert
        open={openCancel}
        handleClose={handleCloseCancel}
        item={''}
        alert={'Are you sure you want to cancel this Suscription'}
        title={'Subscription Cancel'}
        btnTitle={'Cancel'}
        text={'Subscription Cancelled Successfully'}
      />
      </>
    // </Card>
  );
}
