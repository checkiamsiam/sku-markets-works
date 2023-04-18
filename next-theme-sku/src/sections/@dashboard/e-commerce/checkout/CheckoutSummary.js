import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import noonPayment from "../../../../assets/images/noonEasylogo.svg"
import sabbBank from "../../../../assets/images/SABB_Bank_Logo.png";
import Image from 'next/image';

// ----------------------------------------------------------------------

CheckoutSummary.propTypes = {
  onEdit: PropTypes.func,
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  enableEdit: PropTypes.bool,
  enableDiscount: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
};

export default function CheckoutSummary({
  total,
  onEdit,
  discount,
  subtotal,
  shipping,
  onApplyDiscount,
  enableEdit = false,
  enableDiscount = false,
}) {
  const displayShipping = shipping !== null ? 'Free' : '-';

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title="Order Summary"
          action={
            enableEdit && (
              <Button size="small" onClick={onEdit} startIcon={<Iconify icon="eva:edit-fill" />}>
                Edit
              </Button>
            )
          }
        />

        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Sub Total
              </Typography>
              <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Discount
              </Typography>
              <Typography variant="subtitle2">{discount ? fCurrency(-discount) : '-'}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Shipping
              </Typography>
              <Typography variant="subtitle2">
                {shipping ? fCurrency(shipping) : displayShipping}
              </Typography>
            </Stack>

            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1">Total</Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                  {fCurrency(total)}
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  (VAT included if applicable)
                </Typography>
              </Box>
            </Stack>

            {enableDiscount && onApplyDiscount && (
              <TextField
                fullWidth
                placeholder="Discount codes / Gifts"
                value="DISCOUNT5"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={() => onApplyDiscount(5)} sx={{ mr: -0.5 }}>
                        Apply
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Stack>
        </CardContent>
      </Card>



      <Card sx={{ mb: 3 }}>
        <CardContent sx={{
          color: 'GrayText'
        }}>
          <Box sx={{
            fontSize: "15px",
            textAlign: "center"
          }}>Payment Info</Box>

          <Box sx={{
            fontSize: '10px',
            px: 4,
            mt: 4,
            textAlign: 'center'
          }}>Your card will be billed monthly in advance. By clicking "Pay" you agree to our terms of services. You may cancel your renewal any time in advance of your next billing date from your account dashboard.
          </Box>

          <Box sx={{
            fontSize: '10px',
            px: 4,
            mt: 2,
            textAlign: 'center'
          }}>Our checkout is safe and secure by Noon Payment Gateway. Your personal and payment information is securely transmitted via 128-bit encryption. We do not store any payment card information on our systems.
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 9,
              px: 10,
              mt: 4,
            }}
          >
            <Box component={Image}
              src={noonPayment}
              alt="marketplace"
              sx={{ width: "100px", height: '50px' }}
            />
            <Box component={Image}
              src={sabbBank}
              alt="marketplace"
              sx={{ width: "100px", height: '30px', }}
            />
          </Box>

        </CardContent>
      </Card>
    </>
  );
}
