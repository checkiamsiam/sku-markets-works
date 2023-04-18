import {
  Box,
  Button,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from '@mui/material';
import { toggleCampaignMode } from 'features/adboard/adboardSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CampainNameStep from './CampainNameStep';
import MarketSelection from './MarketSelection';
import PlacementSelection from './PlacementSelection';

const AddCampaignMode = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [campaignName, setCampaignName] = useState('');
  const [selectedPlacement, setSelectedPlacement] = useState({});
  const [selectedMarket, setSelectedMarket] = useState({});

  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Add Campaign', 'Placement', 'Market'];

  const handleSubmit = () => {};

  return (
    <Box sx={{ mt: '-10px' }}>
      {/* top */}
      <Box width="100px" sx={{ mb: '15px' }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0.8}
          onClick={() => dispatch(toggleCampaignMode())}
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
      <Grid container>
        <Grid item md={12} sx={{ mb: 2 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item md={12}>
          {activeStep >= 0 && (
            <CampainNameStep
              campaignName={campaignName}
              setActiveStep={setActiveStep}
              setCampaignName={setCampaignName}
            />
          )}
          {activeStep >= 1 && (
            <PlacementSelection
              setActiveStep={setActiveStep}
              setSelectedObjective={setSelectedPlacement}
              selectedObjective={selectedPlacement}
            />
          )}
          {activeStep >= 2 && (
            <MarketSelection
              setActiveStep={setActiveStep}
              setSelectedObjective={setSelectedMarket}
              selectedObjective={selectedMarket}
            />
          )}
        </Grid>
      </Grid>
      {/* bottom */}
     {activeStep === steps.length && <Stack direction="row" justifyContent="end" alignItems="center" spacing={1}>
        <Button
          sx={{
            bgcolor: 'primary.main',
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'white',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
            width: 120,
          }}
          onClick={handleSubmit}
        >
          Add Campaign
        </Button>
      </Stack>}
    </Box>
  );
};

export default AddCampaignMode;
