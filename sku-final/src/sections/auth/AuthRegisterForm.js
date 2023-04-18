import { useEffect, useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material';
// auth
// components
import { useRegistrationMutation } from 'features/auth/authAPI';
import { useNavigate } from 'react-router';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function AuthRegisterForm({ v2, setCurrentStep }) {
  // const location = useLocation();
  const navigate = useNavigate();
  // let { from } = location.state || { from: { pathname: '/profile' } };
  const [register, { isLoading, isSuccess }] = useRegistrationMutation();

  useEffect(() => {
    if (isSuccess && v2) {
      setCurrentStep(2);
      window.scrollTo(0, 0);
    }
    if (isSuccess && !v2) {
      navigate('/emailConfirmation');
      window.scrollTo(0, 0);
    }
  }, [isSuccess, navigate, setCurrentStep, v2]);

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    companyName: Yup.string().required('Enter a company name'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    await register({
      name: data.firstName + ' ' + data.lastName,
      companyName: data.companyName,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="companyName" label="Company Name" />
        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
          sx={{
            bgcolor: 'primary.main',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'white',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          }}
        >
          {v2 ? 'Next' : 'Create account'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
