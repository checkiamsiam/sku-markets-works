import { Box, Card, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';

LinearProgressWithLabel.propTypes = {
  color: PropTypes.string,
};

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const ProfileRates = () => {
  return (
    <Card sx={{ p: 3 }}>
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 'bold',
          borderBottom: '2px solid #f9f9f9',
          paddingBottom: '10px',
        }}
        component="p"
      >
        Seller Rates
      </Typography>
      <Stack spacing={2} sx={{ my: 1 }}>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', marginRight: 2 }} variant="body2">
            Order Fulfillment Rate
          </Typography>
          <Box sx={{ width: '60%' }}>
            <LinearProgressWithLabel color="warning" value={60} />
          </Box>
        </Stack>

        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', marginRight: 2 }} variant="body2">
            Always in Stock
          </Typography>
          <Box sx={{ width: '60%' }}>
            <LinearProgressWithLabel color="success" value={97} />
          </Box>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', marginRight: 2 }} variant="body2">
            Response time
          </Typography>
          <Box sx={{ textAlign: 'center', width: '70%' }}>
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
              5H
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', marginRight: 2 }} variant="body2">
            Seller Rating
          </Typography>
          <Box sx={{ textAlign: 'center', width: '70%' }}>
            <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>
              <span style={{ color: '#ffab00' }}> 77%</span> Positive Ratings
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProfileRates;
