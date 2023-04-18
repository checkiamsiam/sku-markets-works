import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { countries } from 'assets/data';
import { useSendOTPMutation } from 'features/auth/authAPI';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import lockIcon from '../../../assets/images/lock.png';

const SendOTP = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [country, setCountry] = useState(user.country);
  const [error, setError] = useState('');
  const [sendOTP, { isLoading, isSuccess }] = useSendOTPMutation();

  useEffect(() => {
    if (isSuccess) navigate('/auth/otp-verification');
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (!user?.token) {
      navigate('/login');
    } else if (user?.isWhatsappVerified) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleSend = async () => {
    const current = await countries.find((item) => item.label === country);
    let lastChar = current?.phone?.charAt(current?.phone?.length - 1);

    if (lastChar === user?.phone.charAt(0)) {
      setError('Please remove the country code from your number');
      return;
    }
    const phone = `+${current.phone}${user.phone}`;
    await sendOTP(phone);
    // }
  };

  return (
    <>
      <Helmet>
        <title>Send OTP | SKU Markets</title>
      </Helmet>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
          px: '10px',
        }}
      >
        <Box
          sx={{
            height: 'fit-content',
          }}
        >
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Box
              component="img"
              src={lockIcon}
              alt="lock"
              sx={{
                height: '120px',
              }}
            />
          </Stack>

          <Box sx={{ mt: 2, mb: 8 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: 26,
                fontWeight: 700,
                textAlign: 'center',
              }}
            >
              Verify Your WhatsApp Number
            </Typography>
          </Box>

          <FormControl sx={{ width: { md: 400, xs: '95%' } }}>
            <InputLabel id="demo-multiple-name-label">Country</InputLabel>
            <Select
              name="country"
              value={country}
              label="Country"
              onChange={(e) => setCountry(e?.target?.value)}
              sx={{ mb: 3 }}
            >
              {countries.map((country) => (
                <MenuItem key={country.label} value={country.label}>
                  {country.label + ' ' + `(+${country.phone})`}
                </MenuItem>
              ))}
            </Select>

            <TextField name="phone" fullWidth label="Phone Number" value={user?.phone} disabled />

            <LoadingButton
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={isLoading}
              onClick={handleSend}
              sx={{
                mt: 5,
                bgcolor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'white',
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              Send OTP
            </LoadingButton>
          </FormControl>

          <Stack direction="row" justifyContent="center" spacing={2} sx={{ pt: 2 }}>
            <Box
              component={Link}
              to="/profile"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '13px',
                color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black'),
              }}
            >
              <ChevronLeftIcon /> Return to Account Settings
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default SendOTP;
