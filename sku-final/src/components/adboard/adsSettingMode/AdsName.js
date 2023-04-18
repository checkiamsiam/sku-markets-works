import { Card, Divider, TextField, Typography } from '@mui/material';

const AdsName = ({ setActiveStep, setAdsName, adsName }) => {
  const handleSetName = (e) => {
    setAdsName(e.target.value);
    if (e.target.value !== '') {
      setActiveStep((prevActiveStep) => {
        if (prevActiveStep === 0) return prevActiveStep + 1;
        else return prevActiveStep;
      });
    } else {
      setActiveStep(0);
    }
  };
  return (
    <Card sx={{ p: 2, my: 2, boxShadow: 5 }}>
      <Typography variant="subtitle1" sx={{ p: 2, fontSize: '14px' }}>
        Your Ad Name
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <TextField
        onChange={handleSetName}
        autoFocus
        size="small"
        margin="dense"
        id="Group-name"
        label="Enter Your ad Name"
        type="text"
        variant="outlined"
        sx={{ width: { lg: '450px', md: '400px', xs: '100%' } }}
      />
    </Card>
  );
};

export default AdsName;
