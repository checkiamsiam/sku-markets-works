import { Box, Button, Card, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import Iconify from 'components/iconify/Iconify';
import { useState } from 'react';
// import CheckoutBillingNewAddressForm from './CheckoutBillingNewAddressForm';
import { useGetBillingInfoQuery } from 'features/billingInfo/billingInfoApi';
import { useSelector } from 'react-redux';
import AddNewAddress from 'sections/@deshboard/user/account/billing/AddNewAddress';

const CartBillingAddress = ({ activeStep, onCreateBilling, setOnCreateBilling, backStep }) => {
  const { addresses, defaultAddress } = useSelector((state) => state.billingInfo);
  // Get Billing information's
  const { isLoading } = useGetBillingInfoQuery();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {addresses.length === 0 ? (
                <Typography variant="subtitle1" sx={{ mt: 5, mb: 2, textAlign: 'center' }}>
                  No Address found
                </Typography>
              ) : (
                <>
                  {addresses.map((address, index) => (
                    <AddressItem
                      key={index}
                      defaultAddress={defaultAddress}
                      address={address}
                      activeStep={activeStep}
                      setOnCreateBilling={setOnCreateBilling}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="space-between">
        <Button
          size="small"
          color="inherit"
          onClick={backStep}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
        >
          Back
        </Button>

        <Button
          size="small"
          variant="soft"
          onClick={handleOpen}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add new address
        </Button>
      </Stack>
      {/*<CheckoutBillingNewAddressForm
        open={open}
        onClose={handleClose}
        onCreateBilling={setOnCreateBilling}
      /> */}
      <AddNewAddress
        open={open}
        handleClose={handleClose}
        text="New Address Added Successfully"
        title="Add New Billing Address"
      />
    </>
  );
};

export default CartBillingAddress;

function AddressItem({ address, defaultAddress, activeStep, onCreateBilling, setOnCreateBilling }) {
  const { _id, title, phone, address: street, city, state, country, zipCode, isApproved } = address || {};
  const fullAddress = street + ', ' + city + ', ' + state + ', ' + country + ' / ' + zipCode;

  return (
    <>
      <Card
        sx={{
          p: 3,
          mb: 3,
        }}
      >
        <Stack
          spacing={2}
          alignItems={{
            md: 'flex-end',
          }}
          direction={{
            xs: 'column',
            md: 'row',
          }}
        >
          <Stack flexGrow={1} spacing={1}>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle1">{title}</Typography>
              {defaultAddress === _id && (
                <Typography
                  variant="caption"
                  sx={{
                    color: 'info.darker',
                    bgcolor: 'info.lighter',
                    px: 1,
                    borderRadius: 10,
                    ml: 1,
                  }}
                >
                  Default
                </Typography>
              )}
            </Stack>

            <Typography variant="body2">{fullAddress}</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {phone}
            </Typography>
          </Stack>

          <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
            {/* {!isDefault && (
              <Button variant="outlined" size="small" color="inherit" sx={{ mr: 1 }}>
                Delete
              </Button>
            )} */}

            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setOnCreateBilling({ ...address, fullAddress });
                activeStep();
              }}
              disabled={isApproved ? false : true}
            >
              Deliver to this Address
            </Button>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
