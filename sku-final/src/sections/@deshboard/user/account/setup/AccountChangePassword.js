import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
// components

import { RHFTextField } from 'components/hook-form';
import FormProvider from 'components/hook-form/FormProvider';
import Iconify from 'components/iconify/Iconify';
import { useUpdatePasswordMutation } from 'features/auth/authAPI';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const [updatePassword, { isSuccess }] = useUpdatePasswordMutation();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
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
    try {
      await updatePassword({
        oldPassword: data.oldPassword,
        password: data.newPassword,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      reset(defaultValues);
    }
  }, [isSuccess, reset, defaultValues]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/* <Card sx={{ p: 3 }}>
        <Typography variant='subtitle1' sx={{pb: 2}}>Change Password</Typography> */}
      <Stack spacing={3} alignItems="flex-end">
        <RHFTextField name="oldPassword" type="password" label="Old Password" />

        <RHFTextField
          name="newPassword"
          type="password"
          label="New Password"
          helperText={
            <Stack component="span" direction="row" alignItems="center">
              <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be minimum
              6+
            </Stack>
          }
        />

        <RHFTextField name="confirmNewPassword" type="password" label="Confirm New Password" />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            bgcolor: 'primary.main',
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'white',
              color: (theme) => (theme.palette.mode === 'light' ? 'primary.main' : 'primary.main'),
              border: (theme) => `1px solid ${theme.palette.primary.main}`,
            },
          }}
        >
          Save Changes
        </LoadingButton>
      </Stack>
      {/* </Card> */}
    </FormProvider>
  );
}
