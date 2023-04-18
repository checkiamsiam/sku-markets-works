import { Card, Divider, Stack, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';

const AdsSettings = ({ setActiveStep, start, end, setStart, setEnd }) => {
  const checkStepDone = (value) => {
    setEnd(value);
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === 1) return prevActiveStep + 1;
      else return prevActiveStep;
    });
  };
  return (
    <>
      <Card sx={{ p: 2, my: 2, boxShadow: 5 }}>
        <Typography variant="subtitle1" sx={{ p: 2, fontSize: '14px' }}>
          Select Date Range
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <DateTimePicker
            label="Start Date and Time"
            value={start}
            onChange={(newValue) => setStart(newValue)}
            sx={{
              mb: 2,
              width: '100%',
              fontSize: '12px',
              '& .css-e9crry-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '12px' },
              '& .css-7aor6j-MuiInputBase-root-MuiOutlinedInput-root': { height: '40px' },
              '& .css-1rmd3mv-MuiFormLabel-root-MuiInputLabel-root': {
                fontSize: '12px',
                transform: 'translate(13px, 12px) scale(1)',
              },
            }}
          />
          <DateTimePicker
            label="End Date and Time"
            onChange={checkStepDone}
            sx={{
              width: '100%',
              fontSize: '12px',
              '& .css-e9crry-MuiInputBase-input-MuiOutlinedInput-input': { fontSize: '12px' },
              '& .css-7aor6j-MuiInputBase-root-MuiOutlinedInput-root': { height: '40px' },
              '& .css-1rmd3mv-MuiFormLabel-root-MuiInputLabel-root': {
                fontSize: '12px',
                transform: 'translate(13px, 12px) scale(1)',
              },
            }}
          />
        </Stack>
      </Card>
    </>
  );
};

export default AdsSettings;
