import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  Divider,
  FormControl,
  Grid,
  Link,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Link as RouterLink } from 'react-router-dom';

const MonthlySpendDetails = ({ setActiveTab }) => {
  return (
    <div>
      <Divider />
      <Grid container sx={{ my: 3 }}>
        <Grid item xs={12} md={8}>
          <Stack sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Control your costs with a monthly spend limit
            </Typography>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <Stack direction="row" spacing={1}>
                  <FormControlLabel value="on" control={<Radio />} label="ON" />
                  <FormControlLabel value="off" control={<Radio />} label="OFF" />
                </Stack>
              </RadioGroup>
            </FormControl>
          </Stack>
          <Stack sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Monthly Spend Limit
            </Typography>
            <TextField
              id="standard-search"
              placeholder="SAR 500"
              type="number"
              variant="standard"
              sx={{ width: '200px' }}
            />
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              VAT & Taxes are not included
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Stack>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Last month’s spent
                <Link component={RouterLink} to="/help_center" underline="none">
                  <HelpOutlineIcon sx={{ fontSize: '16px' }} />
                </Link>
              </Typography>
              <Typography variant="body2" fontWeight={700} fontSize="16px">SAR 300</Typography>
            </Stack>
            <Stack>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
              This month’s spend
                <Link component={RouterLink} to="/help_center" underline="none">
                  <HelpOutlineIcon sx={{ fontSize: '16px' }} />
                </Link>
              </Typography>
              <Typography variant="body2" fontWeight={700} fontSize="16px">SAR 600</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={0.2}>
          <Divider orientation="vertical" />
        </Grid>
        <Grid item xs={12} md={3.8} sx={{ px: 3 }}>
          <Typography variant="subtitle2" fontSize="12px" sx={{ mb: 1 }}>
            {' '}
            Your{' '}
            <Link
              onClick={() => setActiveTab('Settings')}
              underline="none"
              sx={{ fontSize: '12px' }}
            >
              Monthly Spend Limit
            </Link>
            <ul style={{ marginLeft: '18px' }}>
              <li>Takes effect the day you set it</li>
              <li>Stops all campaigns when it's reached your limit</li>
              <li>Resets on the 1st of the month, every month</li>
              <li>Can be updated anytime</li>
            </ul>
          </Typography>
          <Typography variant="subtitle2" fontSize="12px" sx={{ mb: 1 }}>
            {' '}
            Reporting isn’t on real time, so your costs may go over your limit in the first month,
            and anytime you lower your limit. You'll need to pay any excess.
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Stack direction="row" justifyContent="end" spacing={2} sx={{ mt: 2 }}>
        <Link sx={{ cursor: 'pointer', fontSize: '14px', fontWeight: 700 }} underline="none">
          CANCEL
        </Link>
        <Link sx={{ cursor: 'pointer', fontSize: '14px', fontWeight: 700 }} underline="none">
          SAVE
        </Link>
      </Stack>
    </div>
  );
};

export default MonthlySpendDetails;
