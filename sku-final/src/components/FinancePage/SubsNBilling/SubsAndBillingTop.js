import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import CancelSubscription from './CancelSubscription';

const SubsAndBillingTop = ({ setActiveTab }) => {
  const { lastPlan } = useSelector(state => state.subscription);
  const { plan = 'B2B Marketplace', plan_status='active' } = lastPlan || {};

  // Pop -Up Remove
  const [openCancel, setOpenCancel] = useState(false);
  const handleCloseCancel = () => setOpenCancel(false);
  const handleShowCancel = () => setOpenCancel(true);

  return (
  <>
    <Stack spacing={3}>
      <Card sx={{ p: 3 }}>
        <Typography variant="overline" sx={{ display: 'block', color: 'text.secondary' }}>
          Your Subscription Plan
        </Typography>
        <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
          {plan}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: '5px' }}>
          <Button
            size="small"
            sx={{
              px: 1,
              fontWeight: 600,
              color: `${plan_status === 'active' ? 'success.main'
                : plan_status === 'pending' ? 'warning.dark' 
                : plan_status === 'dismissed' && 'info.dark'}`,

              bgcolor: `${plan_status === 'active' ? 'rgba(120, 240, 80, 0.2)'
                : plan_status === 'pending' ? 'rgba(255, 193, 7, 0.2)' 
                : plan_status === 'dismissed' && 'info.lighter'}`,

              '&:hover': {
                bgcolor: `${plan_status === 'active' ? 'rgba(120, 240, 80, 0.2)'
                : plan_status === 'pending' ? 'rgba(255, 193, 7, 0.2)' 
                : plan_status === 'dismissed' && 'info.lighter'}`},
            }}
          >
            {plan_status === 'active' ? "Active"
            : plan_status === 'pending' ? "Waiting Payment"
            : plan_status === 'dismissed' && "Downgrade Plan"}
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
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              '&:hover': {
                bgcolor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
              '&:disabled': { border: (theme) => `1px solid {theme.palette.grey.800}`, cursor: 'not-allowed' },
              mr: 1,
            }}
            disabled={plan === 'B2B Marketplace'}
            onClick={handleShowCancel}
          >
            Cancel Subscription
          </Button>
          <Button
            disabled={lastPlan?.ending_balance > 0.1 || (lastPlan?.plan && lastPlan?.plan !== 'B2B Marketplace')}
            onClick={() => setActiveTab('Upgrade Subscription')}
            size="small"
            sx={{
              bgcolor: 'primary.main',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:disabled': {
                bgcolor: 'grey.200', cursor: 'not-allowed',
                border: (theme) => `1px solid ${theme.palette.grey[600]}`,
              },
              '&:hover': {
                bgcolor: 'white',
                color: (theme) => theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
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

    <CancelSubscription
      open={openCancel}
      handleClose={handleCloseCancel}
      plan={lastPlan}
    />
  </>
  );
};

export default SubsAndBillingTop;
