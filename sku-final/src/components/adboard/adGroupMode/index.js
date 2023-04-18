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
import { toggleGroupMode } from 'features/adboard/adboardSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import GroupNameStep from './GroupName';
import GroupTarget from './GroupTarget';
import Objecttives from './Objectives';
import TypesSelector from './TypesSelector';

const AddGroupMode = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState('');
  const [selectedObjective, setSelectedObjective] = useState({});
  const [selectedType, setSelectedType] = useState({});

  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Add Group Name', 'Group Targets', 'Objective', 'Type'];

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
          onClick={() => dispatch(toggleGroupMode())}
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
            <GroupNameStep
              groupName={groupName}
              setActiveStep={setActiveStep}
              setGroupName={setGroupName}
            />
          )}
          {activeStep >= 1 && <GroupTarget setActiveStep={setActiveStep} />}
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

export default AddGroupMode;
