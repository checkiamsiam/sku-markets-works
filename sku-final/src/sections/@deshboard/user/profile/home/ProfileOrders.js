import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Card, Typography, Stack, Box } from '@mui/material';

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

const ProfileOrders = () => {
  return (
    <Card sx={{p:3}} >
        <Typography sx={{fontSize:"14px",fontWeight:"bold",borderBottom:"2px solid #f9f9f9",paddingBottom:"10px"}} component="p" >
        Seller Orders
        </Typography>
      <Stack spacing={2} sx={{my:1}} >
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', marginRight: 2 }} variant="body2">
            Requests Completed
          </Typography>
          <Box sx={{ width: '60%' }}>
            <LinearProgressWithLabel color="warning" value={60} />
          </Box>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', marginRight: 2 }} variant="body2">
            Requests Rejected
          </Typography>
          <Box sx={{ width: '60%' }}>
            <LinearProgressWithLabel color="success" value={97} />
          </Box>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', marginRight: 2 }} variant="body2">
            Payments Disbursal
          </Typography>
          <Box sx={{ width: '60%' }}>
            <LinearProgressWithLabel color="error" value={60} />
          </Box>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: '12px', marginRight: 2 }} variant="body2">
          Payments Retrieved
          </Typography>
          <Box sx={{ width: '60%' }}>
            <LinearProgressWithLabel color="success" value={97} />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProfileOrders;
