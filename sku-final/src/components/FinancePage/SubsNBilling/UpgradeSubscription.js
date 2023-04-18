import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import ConfirmSubscription from './ConfirmSubscription';
import SubscriptionSelection from './SubscriptionSelection';

const UpgradeSubscription = ({ setActiveTab }) => {
  /* Accept Alert */
  const [openAccept, setOpenAccept] = useState(false);
  const handleCloseAccept = () => {
    setOpenAccept(false);
    setActiveTab('Overview');
  };
  const handleShowAccept = () => {
    setOpenAccept(true);
  };
  const theme = useTheme();
  const [checked, setChecked] = useState(true);
  const [selectedObjective, setSelectedObjective] = useState({
    id: 1,
    title: 'B2B Marketplace',
    description: 'Perfect for startups and growing businesses',
  });
  return (
    <>
      <Box>
        {/* top */}
        <Box width="100px" onClick={() => setActiveTab('Overview')}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.8}
            variant="contained"
            sx={{
              py: '5px',
              fontSize: '15px',
              backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : '#EFF2F5',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            <Typography sx={{ fontSize: '16px' }}>Cancel</Typography>
          </Stack>
        </Box>
        {/* body */}
        <>
          <SubscriptionSelection
            setSelectedObjective={setSelectedObjective}
            selectedObjective={selectedObjective}
            checked={checked}
            setChecked={setChecked}
          />
        </>
        {/* bottom */}
        <Stack direction="row" justifyContent="end" alignItems="center">
          <Button
            onClick={handleShowAccept}
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
              width: 120,
            }}
          >
            Confirm
          </Button>
        </Stack>
      </Box>
      <ConfirmSubscription
        plan={selectedObjective}
        open={openAccept}
        handleClose={handleCloseAccept}
        isAnnual={checked}
      />
    </>
  );
};

export default UpgradeSubscription;
