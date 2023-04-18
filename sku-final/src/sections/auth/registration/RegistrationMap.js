import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import GMap from './GMap';

import { useAddBillingAddressMutation } from 'features/billingInfo/billingInfoApi';

const RegistrationMap = ({ addressData, setCurrentStep }) => {
  const [addAddress, { isLoading, isSuccess }] = useAddBillingAddressMutation();

  const [center, setCenter] = useState({ lat: 48.858093, lng: 2.294694 });
  const [marker, setMarker] = useState(center);

  useEffect(() => {
    if (isSuccess) {
      setCurrentStep(4);
      window.scrollTo(0, 0);
    }
  }, [isSuccess, setCurrentStep]);

  // Handle Submit
  const handleSubmit = () => {
    const info = { ...addressData, location: marker };
    addAddress(info);
  };
  return (
    <Box sx={{ width: '80%' }}>
      <Typography variant="h4" sx={{ my: 5 }}>
        Choose warehouse location
      </Typography>

      <GMap center={center} setCenter={setCenter} marker={marker} setMarker={setMarker} />

      <Stack direction="row" justifyContent="flex-end" sx={{ my: 5 }}>
        <LoadingButton
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          loading={isLoading}
          sx={{
            px: 4,
            bgcolor: 'primary.main',
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'white',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          }}
        >
          Next
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default RegistrationMap;
