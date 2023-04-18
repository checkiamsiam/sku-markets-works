import { LoadingButton } from '@mui/lab';
import { Card, Stack, Typography } from '@mui/material';
import OrderAccordions from './TopCard/OrderAccordions';
import PaymentAccordions from './TopCard/PaymentAccordions';
import RetrurningAccordions from './TopCard/Returing';
import ShipmentPreparing from './TopCard/shipmentPreparing';
import Shipping from './TopCard/Shipping';
const TopCard = () => {
  return (
    <Card sx={{ p: 2, overflow: 'visible' }}>
      <Typography variant="subtitle1" sx={{ pb: 2 }}>
        B2B SellerBoard Flow Setup
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 3, display: 'block', color: "#3366FF" }}>
        Promising Time
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
        Orders
      </Typography>
      <Card sx={{ p: 2, overflow: 'visible', boxShadow: 5 }}>
        <OrderAccordions />
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            //   loading={isSubmitting}
            sx={{
              bgcolor: 'primary.main',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'white',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
            }}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
      <Typography variant="subtitle2" sx={{ my: 3, display: 'block', color: 'text.secondary' }}>
        Payment (Pay)
      </Typography>
      <Card sx={{ p: 2, overflow: 'visible', boxShadow: 5 }}>
        <PaymentAccordions />
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            //   loading={isSubmitting}
            sx={{
              bgcolor: 'primary.main',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'white',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
            }}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
      <Typography variant="subtitle2" sx={{ my: 3, display: 'block', color: 'text.secondary' }}>
        Shipments
      </Typography>
      <Typography variant="subtitle2" sx={{ my: 3, display: 'block', color: 'text.secondary' }}>
        Preparing
      </Typography>
      <Card sx={{ p: 2, overflow: 'visible', boxShadow: 5 }}>
        <ShipmentPreparing />
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            //   loading={isSubmitting}
            sx={{
              bgcolor: 'primary.main',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'white',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
            }}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
      <Typography variant="subtitle2" sx={{ my: 3, display: 'block', color: 'text.secondary' }}>
        Shipping
      </Typography>
      <Card sx={{ p: 2, overflow: 'visible' , boxShadow: 5}}>
        <Shipping />
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            //   loading={isSubmitting}
            sx={{
              bgcolor: 'primary.main',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'white',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
            }}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
      <Typography variant="subtitle2" sx={{ my: 3, display: 'block', color: 'text.secondary' }}>
        Returning
      </Typography>
      <Card sx={{ p: 2, overflow: 'visible' , boxShadow: 5}}>
        <RetrurningAccordions />
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            //   loading={isSubmitting}
            sx={{
              bgcolor: 'primary.main',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'white',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
            }}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </Card>
  );
};

export default TopCard;
