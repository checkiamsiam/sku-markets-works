import { useEffect, useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, IconButton, InputAdornment, Link, Stack } from '@mui/material';
// auth
import useAuth from 'hooks/useAuth';
// components
import { useLoginMutation } from 'features/auth/authAPI';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function AuthLoginForm() {
  const user = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isSuccess, isLoading }] = useLoginMutation();

  let { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if(isSuccess && user?.isProfileComplete) {
      navigate(from, { replace: true });
    } else if (isSuccess && !user?.isProfileComplete) {
      navigate('/signup', { replace: true });
    }
  }, [from, isSuccess, navigate, user]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'admin@sku.com',
    password: 'admin/sku',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error(error);

      reset();

      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

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
      </Stack>

      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to="/forgotPassword"
          variant="body2"
          color="inherit"
          underline="always"
        >
          Forgot password?
        </Link>
      </Stack>

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
        Login
      </LoadingButton>
    </FormProvider>
  );
}
