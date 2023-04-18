import React from 'react';
import Policies from 'components/settings/settingsPages/Policies';
import { Stack, Box, Typography, Button } from '@mui/material';
import useAuth from 'hooks/useAuth';

const RegistrationPolicy = ({ setCurrentStep }) => {
  const user = useAuth();
  return (
    <Box sx={{width: "100%"}}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h6">Accept the agreement</Typography>
      </Box>
      <Policies />
      <Stack direction="row" justifyContent="flex-end" sx={{ my: 5 }}>
        <Button
          onClick={() => {
            setCurrentStep(5)
            window.scrollTo(0, 0);
          }}
          disabled={
            !user?.agreement?.policies || !user?.agreement?.manager || !user?.agreement?.seller_type
          }
          variant="contained"
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
        </Button>
      </Stack>
    </Box>
  );
};

export default RegistrationPolicy;
