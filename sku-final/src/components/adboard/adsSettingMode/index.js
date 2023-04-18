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
import dayjs from 'dayjs';
import { toggleAdsSettingsMode } from 'features/adboard/adboardSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import AdsName from './AdsName';
import AdsSettings from './AdsSettings';
import Objecttives from './Objectives';
import TypesSelector from './TypesSelector';

const AdsSettingMode = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [adsName, setAdsName] = useState('');
  const [selectedObjective, setSelectedObjective] = useState({});
  const [selectedType, setSelectedType] = useState({});

  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Ad Name', 'Ad Settings', 'Ad Details', 'Ad Budget and bidding'];

  const date = new Date();
  const [start, setStart] = useState(dayjs(date));
  const [end, setEnd] = useState(null);

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
          onClick={() => dispatch(toggleAdsSettingsMode())}
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
            <AdsName adsName={adsName} setActiveStep={setActiveStep} setAdsName={setAdsName} />
          )}
          {activeStep >= 1 && (
            <AdsSettings
              start={start}
              end={end}
              setStart={setStart}
              setEnd={setEnd}
              setActiveStep={setActiveStep}
            />
          )}
          {activeStep >= 2 && (
            <Objecttives
              setActiveStep={setActiveStep}
              setSelectedObjective={setSelectedObjective}
              selectedObjective={selectedObjective}
            />
          )}
          {activeStep >= 3 && (
            <TypesSelector
              setActiveStep={setActiveStep}
              setSelectedObjective={setSelectedType}
              selectedObjective={selectedType}
            />
          )}
          {activeStep === steps.length && (
            <Stack direction="row" justifyContent="end" alignItems="center" spacing={1}>
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
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Stack>
          )}
        </Grid>
      </Grid>
      {/* bottom */}
    </Box>
  );
};

export default AdsSettingMode;
