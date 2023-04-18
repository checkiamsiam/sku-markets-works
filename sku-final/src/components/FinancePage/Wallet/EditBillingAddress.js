import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
  Button,
  Grid,
  IconButton,
  Box,
  Fade,
  Modal,
  Typography,
  Backdrop,
  Stack,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { countries } from 'assets/data';
import { RHFSelect, RHFTextField } from 'components/hook-form';
import FormProvider from 'components/hook-form/FormProvider';
import { useUpdateBillingAddressMutation } from 'features/billingInfo/billingInfoApi';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";

import AddressMapModal from './AddressMapModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { md: '40vw', xs: '95vw', sm: '95vw' },
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: (theme) => (theme.palette.mode === 'dark' ? 5 : 0),
  px: 3,
  py: 1,
};

const EditBillingAddress = ({ handleClose, address, text, open, title, defaultAddress }) => {
  const [openMap, setOpenMap] = useState(false);
  const [addressData, setAddressData] = useState({});
  const [isDefault, setIsDefault] = useState(false);

  // Set Default Values
  const defaultValues = {
    addressTitle: address.title || '',
    email: address.email || '',
    phoneNumber: address.phone || '',
    country: address.country || '',
    address: address.address || '',
    state: address.state || '',
    city: address.city || '',
    zipCode: address.zipCode || 0,
  };

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

  const methods = useForm({
    resolver: yupResolver(BillingAddressSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
  } = methods;

    useEffect(() => {
      setValue('addressTitle', address.title);
      setValue('email', address.email);
      setValue('phoneNumber', address.phone);
      setValue('address', address.address);
      setValue('city', address.city);
      setValue('state', address.state);
      setValue('country', address.country);
      setValue('zipCode', address.zipCode);
      setIsDefault(address._id === defaultAddress ? true : false);
    }, [address, defaultAddress]);

  const onSubmit = async (data) => {
    const info = {
      _id: address._id,
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
    setOpenMap(true);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <IconButton sx={{ color: 'text.main' }} onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
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
            <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2} sx={{mt: 1.5, mb: 1}} >

              <Box>
                <FormControlLabel control={<Checkbox name='isDefault' checked={isDefault} disabled />} label="Default Address" />
              </Box>

              <Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={2}>
                <Button
                    variant="outlined"
                    sx={{
                        color: 'text.main',
                        border: (theme) => `1px solid ${theme.palette.primary.main}`,
                    }}
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button
                    sx={{
                        bgcolor: 'primary.main',
                        border: (theme) => `1px solid ${theme.palette.primary.main}`,
                        color: (theme) =>
                            theme.palette.mode === 'light'
                                ? 'common.white'
                                : 'grey.800',
                        '&:hover': {
                            bgcolor: 'white',
                            color: (theme) =>
                                theme.palette.mode === 'light'
                                    ? 'primary.main'
                                    : 'primary.main',
                            border: (theme) =>
                                `1px solid ${theme.palette.primary.main}`,
                        },
                        ml: 2,
                    }}
                    type="submit"
                >
                    Next
                </Button>
                </Stack>
            </Stack>
          </FormProvider>

          <AddressMapModal
            openMap={openMap}
            onClose={() => setOpenMap(false)}
            addressData={addressData}
            useFunction={useUpdateBillingAddressMutation}
            handleParentClose={handleClose}
            location={address?.location}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditBillingAddress;
