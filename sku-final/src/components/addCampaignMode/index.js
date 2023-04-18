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
import ObjectiveSelection from './ObjectiveSelection';

const AddCampaignMode = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedObjective, setSelectedObjective] = useState({});

  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    'Add Campaign',
    'Ad Group',
    'Group Target',
    'Ad',
    'Placement',
    'Market',
    'Objective',
    'Type',
    'Ad Details',
    'Ad Settings',
    'Ad Budget and Billing',
    'Online Ads & Social',
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
        <Grid item md={2}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item md={10}>
          {activeStep === 0 && (
            <ObjectiveSelection
              setSelectedObjective={setSelectedObjective}
              selectedObjective={selectedObjective}
            />
          )}
          <Stack direction="row" justifyContent="end" alignItems="center" spacing={1}>
        {activeStep === steps.length ? (
          <>
            <Button
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
              onClick={handleReset}
            >
              Reset All
            </Button>
          </>
        ) : (
          <>
            {activeStep === 0 || (
              <Button
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
                onClick={handleBack}
              >
                Previous
              </Button>
            )}
            <Button
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
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </>
        )}
      </Stack>
        </Grid>
      </Grid>
      {/* bottom */}
      
    </Box>
  );
};

export default AddCampaignMode;
