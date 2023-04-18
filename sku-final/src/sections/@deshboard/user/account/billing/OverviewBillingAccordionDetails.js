import { Divider, Grid, Link, Stack, Typography } from '@mui/material';

const OverviewBillingAccordionDetails = ({ setActiveTab }) => {
  return (
    <div>
      <Divider />
      <Grid container sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2">Balance from February</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ my: 1 }}>
              SAR 0.00
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between" sx={{my:2}}>
            <Typography variant="subtitle2">Subscription Fees</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" >
              SAR 0.00
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{my:2}}>
            <Typography variant="subtitle2">Estimated VAT and Taxes (%15)</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" >
              SAR 0.00
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{my:2}}>
            <Typography variant="subtitle2">Net Cost</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" >
              SAR 0.00
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between" sx={{my:2}}>
            <Typography variant="subtitle2">Promotion</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" >
              SAR 0.00
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{my:2}}>
            <Typography variant="subtitle2">Discount (%20)</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" >
              SAR 0.00
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{my:2}}>
            <Typography variant="subtitle2">Payments</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" >
              SAR 0.00
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between" sx={{my:2}}>
            <Typography variant="subtitle2">Current Balance</Typography>
            <Typography variant="subtitle1" fontSize="14px" fontWeight="700" >
              SAR 0.00
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={0.2}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={12} md={3.8} sx={{ px: 3 }}>
          <Typography variant="subtitle1" fontSize="14px" fontWeight="700" sx={{ mb: 1 }}>
            Documents
          </Typography>
          <Typography variant="subtitle2" fontSize="12px" sx={{ mb: 1 }}>
            {' '}
            Documents should be available by 2nd Business day of april.
          </Typography>
          <Link
            href="#"
            onClick={() => setActiveTab('Documents')}
            underline="always"
            sx={{ fontSize: '12px' }}
          >
            View and Download March's billing Documents.
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default OverviewBillingAccordionDetails;
