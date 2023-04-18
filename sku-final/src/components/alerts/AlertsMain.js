import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import SKUMarquee from 'components/common/marquee';
import DeliveryMethod from './DeliveryMethod';
import NewAlert from './NewAlert';

const AlertsMain = () => {
  return (
    <>
      <SKUMarquee />
      <Box sx={{ my: 3 }}>
        <Typography sx={{ pb: 1, mx: 5 }}>SKUs Signals, Stock and Price Alerts</Typography>
      </Box>
      <NewAlert />
      <DeliveryMethod />
    </>
  );
};

export default AlertsMain;
