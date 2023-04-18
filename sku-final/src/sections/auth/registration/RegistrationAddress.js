import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { countries } from 'assets/data';
import { RHFSelect, RHFTextField } from 'components/hook-form';
import FormProvider from 'components/hook-form/FormProvider';
import { useAddBillingAddressMutation } from 'features/billingInfo/billingInfoApi';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import RegistrationMap from './RegistrationMap';

// Billing Address Schema
const BillingAddressSchema = Yup.object().shape({
  addressTitle: Yup.string().required('Title is required'),
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  phoneNumber: Yup.string().required('Phone number is required'),
  country: Yup.string().required('Country is required'),
  address: Yup.string().required('Address is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  zipCode: Yup.string().required('Zip code is required'),
});

let defaultValues = {
  addressTitle: 'Warehouse 01',
  email: '',
  phoneNumber: '',
  country: '',
  address: '',
  state: '',
  city: '',
  zipCode: '',
};

const RegistrationAddress = ({ setCurrentStep }) => {
  const theme = useTheme();
  // const { defaultAddress } = useSelector((state) => state.billingInfo);
  const [showMap, setShowMap] = useState(false);
  const [addressData, setAddressData] = useState({});

  // Add New Address
  const [addAddress, { isSuccess, isError }] = useAddBillingAddressMutation();

  useEffect(() => {
    if (isSuccess) setShowMap(true);
  }, [isSuccess]);

  const methods = useForm({
    resolver: yupResolver(BillingAddressSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    const info = {
      title: data.addressTitle,
      email: data.email,
      phone: data.phoneNumber,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      zipCode: data.zipCode,
    };
    setAddressData(info);
    setShowMap(true);
    methods.reset();
  };

  if (showMap) return <RegistrationMap addressData={addressData} setCurrentStep={setCurrentStep} />;

  return (
    <Box sx={{ width: { xs: '98%', md: '60%' }, mx: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Add New Address
        </Typography>
      </Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1.5}>
          <Grid item xs={12} md={12}>
            <RHFTextField name="addressTitle" label="Address Title" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="email" label="Email Address" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RHFTextField name="phoneNumber" label="Phone Number" />
          </Grid>
          <Grid item xs={12} md={12}>
            <RHFTextField name="address" label="Address" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="city" label="City" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="state" label="State/Region" />
          </Grid>
          <Grid item xs={12} md={4}>
            <RHFTextField name="zipCode" label="Zip/Code" />
          </Grid>
          <Grid item xs={12} md={12}>
            <RHFSelect native name="country" label="Country" placeholder="Country">
              <option value="" />
              {countries.map((country) => (
                <option key={country.code} value={country.label}>
                  {country.label}
                </option>
              ))}
            </RHFSelect>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'end', mt: 1.5, mb: 1 }}>
          <Button
            variant="outlined"
            sx={{
              px: 6,
              color: 'text.main',
              border: `1px solid ${theme.palette.primary.main}`,
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
              },
            }}
            onClick={() => methods.reset()}
          >
            Clear
          </Button>
          <Button
            sx={{
              px: 6,
              bgcolor: 'primary.main',
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              '&:hover': {
                bgcolor: 'white',
                color: theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                border: `1px solid ${theme.palette.primary.main}`,
              },
              ml: 2,
            }}
            type="submit"
          >
            Next
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default RegistrationAddress;
