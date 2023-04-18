import React from 'react';
import { Paper, Stack, Typography, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useResetPasswordMutation } from 'features/auth/authAPI';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate,  useParams } from 'react-router-dom';

import FormProvider, { RHFTextField } from 'components/hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Iconify from 'components/iconify/Iconify';

export default function ResetPassword () {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPass, { isSuccess, isLoading}] = useResetPasswordMutation();

  useEffect(() => {
    if(isSuccess) navigate('/login');
  }, [isSuccess, navigate])

  const ChangePassWordSchema = Yup.object().shape({
    password: Yup.string()
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password required'),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    resetPass({token, ...data})
    reset();
  };

return (
  <>
  <Helmet>
    <title>Reset Password | SKU Markets</title>
  </Helmet>

  <Paper elevation={6} sx={{ px: 2, pt: 6, py: 2 }}>
    <Stack spacing={0.5} sx={{ mb: 4, position: 'relative' }}>
      <Typography variant="h4" textAlign="left">
        Reset Password
      </Typography>
      <Typography
        sx={{
          fontSize: '.7rem',
          fontWeight: '400',
          color: 'GrayText',
          textAlign: 'left',

        }}
        component="p"
      >
        choose a new strong password that you can remember
      </Typography>
    </Stack>

    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} alignItems="flex-end">
      <RHFTextField
        name="password"
        label="New Password"
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
        helperText={
          <Stack component="span" direction="row" alignItems="center">
            <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be
            minimum 6+
          </Stack>
        }
      />

        <RHFTextField
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          label="Confirm New Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(prev => !prev)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton type="submit" variant="contained" loading={isSubmitting || isLoading}
          sx={{
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
          Set Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  </Paper>
  </>
)};
