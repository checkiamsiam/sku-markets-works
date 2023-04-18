import { useEffect, useState } from 'react';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Grid, Stack, TextField, Typography } from '@mui/material';

import { currency } from 'layouts/dashboard/header/currency';

import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider, { RHFTextField } from 'components/hook-form';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { useUpdatePaymentInfoMutation } from 'features/auth/authAPI';

export default function SignupPayment({ setCurrentStep }) {
  const [updatePayment, { isLoading, isSuccess }] = useUpdatePaymentInfoMutation();
  const [salesCurrency, setSalesCurrency] = useState(currency[0]);
  const [subscriptionCurrency, setSubscriptionCurrency] = useState(currency[0]);
  const [adsCurrency, setAdsCurrency] = useState(currency[0]);

  useEffect(() => {
    if (isSuccess) {
      setCurrentStep(7);
      window.scrollTo(0, 0);
    }
  }, [isSuccess, setCurrentStep]);

  const cardData = [
    { title: 'Sales Accounting', vat: 'salesVat', setCurrency: setSalesCurrency },
    {
      title: 'Subscription & billing',
      vat: 'subscriptionVat',
      setCurrency: setSubscriptionCurrency,
    },
    { title: 'Ads & billing', vat: 'adsVat', setCurrency: setAdsCurrency },
  ];

  const Schema = Yup.object().shape({
    salesVat: Yup.string('Must be a number')
      .required('vat is required')
      .min(0, 'Positive value required')
      .max(90, "vat can't more then 99"),
    subscriptionVat: Yup.string('Must be a number')
      .required('vat is required')
      .min(0, 'Positive value required')
      .max(90, "vat can't more then 99"),
    adsVat: Yup.string('Must be a number')
      .required('vat is required')
      .min(0, 'Positive value required')
      .max(90, "vat can't more then 99"),
  });

  const methods = useForm({
    resolver: yupResolver(Schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    const info = {
      sales: {
        currency: { label: salesCurrency?.label, value: salesCurrency?.value },
        vat: data?.salesVat,
      },
      subscription: {
        currency: { label: subscriptionCurrency?.label, value: subscriptionCurrency?.value },
        vat: data?.subscriptionVat,
      },
      ads: {
        currency: { label: adsCurrency?.label, value: adsCurrency?.value },
        vat: data?.adsVat,
      },
    };
    updatePayment(info);
  };

  return (
    <Stack sx={{ width: '100%', my: 4 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2.5}>
          {cardData?.map((item, i) => (
            <Grid item xs={12} lg={6} key={i}>
              <Box
                sx={{
                  p: 3,
                  width: '100%',
                  mx: 'auto',
                  overflow: 'visible',
                  boxShadow: 3,
                  borderRadius: 1.5,
                }}
              >
                <Typography variant="subtitle1" color="primary" sx={{ textAlign: 'left' }}>
                  {item?.title}
                </Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={8} sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                      <CurrencyExchangeIcon />
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Select Your Currency
                      </Typography>
                    </Stack>
                    <Autocomplete
                      disablePortal
                      id="Store-Currency-campaigns"
                      defaultValue={currency[0]}
                      options={currency}
                      getOptionLabel={(option) => option.value}
                      onChange={(e, newValue) => item.setCurrency(newValue)}
                      sx={{ width: '100%' }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{ position: 'relative', mt: { xs: 1, md: 4 } }}
                    >
                      <RHFTextField
                        name={item?.vat}
                        label="Vat/Tax Rate"
                        maxLength={2}
                        fullWidth
                        sx={{ pr: 5, fontSize: 20 }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{ fontSize: 20, position: 'absolute', top: 10, right: 10 }}
                      >
                        %
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" justifyContent="flex-end" sx={{ m: 5 }}>
          <LoadingButton
            disabled={!salesCurrency?.value || !subscriptionCurrency?.value || !adsCurrency?.value}
            variant="contained"
            type="submit"
            loading={isLoading}
            sx={{
              px: 6,
              py: 1,
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
        {/*</Stack>*/}
      </FormProvider>
    </Stack>
  );
}
