import { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Grid, Stack, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { RHFSelect, RHFTextField } from 'components/hook-form';
import FormProvider from 'components/hook-form/FormProvider';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useUpdateDocsInfoMutation } from 'features/auth/authAPI';

const BusinessInfo = ({ setCurrentStep }) => {
  const [update, { isLoading, isSuccess }] = useUpdateDocsInfoMutation();

  useEffect(() => {
    if (isSuccess) {
      setCurrentStep(6);
      window.scrollTo(0, 0);
    }
  }, [isSuccess, setCurrentStep]);

  const businessInfoSchema = Yup.object().shape({
    commercial: Yup.string().required('Commercial registration is required'),
    vat: Yup.string().required('VAT certificate is required'),
    national: Yup.string().required('National identity is required'),
    bank: Yup.string().required('Bank letter is required'),
    courier: Yup.string(),
    dellivery_method: Yup.string(),
  });

  let defaultValues = {
    commercial: '',
    vat: '',
    national: '',
    bank: '',
    courier: '',
    delivery_method: 'company',
  };

  const methods = useForm({
    resolver: yupResolver(businessInfoSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    update(data);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Please fill the Business Info
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ alignItems: 'center', my: 3 }}>
          <Grid item xs={12} md={2.5}>
            <Typography variant="subtitle2">Commercial Registration: </Typography>
          </Grid>
          <Grid item xs={12} md={9.5}>
            <RHFTextField name="commercial" label="Commercial registration" size="small" />
          </Grid>
        </Grid>

        <Grid container sx={{ alignItems: 'center', my: 3 }}>
          <Grid item xs={12} md={2.5}>
            <Typography variant="subtitle2">VAT/TAX Number: </Typography>
          </Grid>
          <Grid item xs={12} md={9.5}>
            <RHFTextField name="vat" label="VAT/TAX Number" size="small" />
          </Grid>
        </Grid>

        <Grid container sx={{ alignItems: 'center', my: 3 }}>
          <Grid item xs={12} md={2.5}>
            <Typography variant="subtitle2">National Identification: </Typography>
          </Grid>
          <Grid item xs={12} md={9.5}>
            <RHFTextField name="national" label="National Identification" size="small" />
          </Grid>
        </Grid>

        <Grid container sx={{ alignItems: 'center', my: 3 }}>
          <Grid item xs={12} md={2.5}>
            <Typography variant="subtitle2">Bank IBAN: </Typography>
          </Grid>
          <Grid item xs={12} md={9.5}>
            <RHFTextField name="bank" label="Bank IBAN Number" size="small" />
          </Grid>
        </Grid>

        <Grid container sx={{ alignItems: 'center', my: 3 }}>
          <Grid item xs={12} md={2.5}>
            <Typography variant="subtitle2">Delivery Method: </Typography>
          </Grid>
          <Grid item xs={12} md={9.5}>
            <RHFSelect
              native
              size="small"
              name="delivery_method"
              label="Delivery Method"
              placeholder="Delivery Method"
            >
              <option style={{ padding: '10px' }} value="company">
                By Your Company
              </option>
              <option style={{ padding: '10px' }} value="courier">
                By Courier Company
              </option>
            </RHFSelect>
          </Grid>
        </Grid>

        <Grid container sx={{ alignItems: 'center', my: 3 }}>
          <Grid item xs={12} md={2.5}>
            <Typography variant="subtitle2">Courier Company: </Typography>
          </Grid>
          <Grid item xs={12} md={9.5}>
            <RHFTextField name="courier" label="Courier Company Name (optional)" size="small" />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="flex-end" sx={{ my: 5 }}>
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            sx={{
              px: 4,
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
            Next
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Box>
  );
};

export default BusinessInfo;
