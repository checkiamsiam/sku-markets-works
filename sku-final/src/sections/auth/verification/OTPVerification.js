import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, FormHelperText, Stack, Typography } from '@mui/material';
// components
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useVerifyOTPMutation } from 'features/auth/authAPI';
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BsWhatsapp } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import FormProvider from '../../../components/hook-form/FormProvider';
import RHFCodes from '../../../components/hook-form/RHFCodes';

// ----------------------------------------------------------------------

export default function OTPVerification() {
  const user = useAuth();
  const navigate = useNavigate();

  const [verify, { isLoading, isSuccess }] = useVerifyOTPMutation();

  useEffect(() => {
    if (isSuccess) navigate('/profile');
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (!user?.token) {
      navigate('/login');
    } else if (user?.isWhatsappVerified) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data) => {
    const { code1, code2, code3, code4, code5, code6 } = data;
    const otp = code1 + code2 + code3 + code4 + code5 + code6;
    await verify({ otp });
  };

  return (
     <>
     <Helmet>
        <title>OTP Verification | SKU Markets</title>
      </Helmet>

    <Box>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <BsWhatsapp style={{ color: '#27C469', fontSize: '80px' }} />
      </Stack>

      <Typography
        variant="subtitle1"
        sx={{
          mt: "10px",
          fontSize: 28,
          fontWeight: 700,
          textAlign: 'center',
        }}
      >
        Please check your WhatsApp
      </Typography>
      <Box sx={{ mt: 3, mb: 6 }}>
        <Typography variant="paragraph" sx={{ color: 'gray' }} mt={4} mb={8}>
          We have sent you a 6-digit OTP to <b>{user?.phone}</b> at WhatsApp, please enter the code
          below.
        </Typography>
      </Box>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFCodes
            keyName="code"
            inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']}
          />

          {(!!errors.code1 ||
            !!errors.code2 ||
            !!errors.code3 ||
            !!errors.code4 ||
            !!errors.code5 ||
            !!errors.code6) && (
            <FormHelperText error sx={{ px: 2 }}>
              Code is required
            </FormHelperText>
          )}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
            sx={{
              mt: 3,
              bgcolor: 'primary.main',
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
              color: (theme) =>
                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              '&:hover': {
                bgcolor: 'white',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
            }}
          >
            Verify
          </LoadingButton>
        </Stack>
      </FormProvider>

      <Box sx={{ my: 3 }}>
        <Typography variant="paragraph">
          Dont't have a code?{' '}
          <Typography
            component={Link}
            sx={{ textDecoration: 'underline', color: 'text.primary', fontWeight: 600 }}
            to="/auth/send-otp"
          >
            Resend code
          </Typography>
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Box
          component={Link}
          to="/profile"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '13px',
            color: (theme) => theme.palette.mode === 'dark' ? 'white' : 'black',
          }}
        >
          <ChevronLeftIcon /> Return to Account Settings
        </Box>
      </Stack>
    </Box>
    </>
  );
}