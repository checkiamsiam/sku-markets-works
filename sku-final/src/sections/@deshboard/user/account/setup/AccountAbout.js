import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';

import { countries } from 'assets/data';

import FormProvider, { RHFSelect, RHFTextField } from 'components/hook-form';
import { useUpdateProfileMutation } from 'features/auth/authAPI';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';

export default function AccountSetup() {
  const user = useAuth();
  const [updateProfile] = useUpdateProfileMutation();
  const [phoneChanged, setPhoneChanged] = useState(false);

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip code is required'),
    about: Yup.string().required('About is required'),
  });

  const defaultValues = {
    displayName: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phone || '',
    country: user?.country || '',
    address: user?.address || '',
    state: user?.state || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    about: user?.about || '',
    isPublic: user?.isPublic || false,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const watchPhone = watch('phoneNumber');
  useEffect(() => {
    if (watchPhone !== user?.phone) {
      setPhoneChanged(true);
    } else {
      setPhoneChanged(false);
    }
  }, [watchPhone, user?.phone]);

  const onSubmit = async (data) => {
    await updateProfile({
      name: data.displayName,
      phone: data.phoneNumber,
      country: data.country,
      address: data.address,
      state: data.state,
      city: data.city,
      zipCode: data.zipCode,
      about: data.about,
      isWhatsappVerified: phoneChanged ? false : user?.isWhatsappVerified,
    });
  };
  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {/* <Card sx={{ p: 3 }}> */}
        {/* <Typography variant='subtitle1' sx={{pb: 2}}>Account</Typography> */}
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <RHFTextField name="displayName" label="Name" disabled />

          <RHFTextField name="email" label="Email Address" disabled />

          <RHFTextField name="phoneNumber" label="Phone Number" />

          <RHFTextField name="address" label="Address" disabled />

          <RHFSelect native name="country" label="Country" placeholder="Country" disabled>
            <option value="" />
            {countries.map((country) => (
              <option key={country.code} value={country.label}>
                {country.label}
              </option>
            ))}
          </RHFSelect>

          <RHFTextField name="state" label="State/Region" disabled />

          <RHFTextField name="city" label="City" disabled />

          <RHFTextField name="zipCode" label="Zip/Code" disabled />
        </Box>

        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <RHFTextField name="about" multiline rows={4} label="About" />
          {phoneChanged && user.isWhatsappVerified && (
            <Typography variant="caption" sx={{ color: 'red' }}>
              If you change your phone number you need to verify your WhatsApp again.
            </Typography>
          )}
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
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
              },
            }}
          >
            Save Changes
          </LoadingButton>
        </Stack>
        {/* </Card> */}
      </FormProvider>
    </Box>
  );
}
