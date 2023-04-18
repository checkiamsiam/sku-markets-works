import {
  Box,
  Button,
  CardContent,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';

const CartSummery = ({ product, activeStep }) => {
  let vat = 0;

  if (product?.currency === 'EGP') {
    vat = 14;
  } else if (product?.currency === 'AED') {
    vat = 5;
  } else if (product?.currency == 'SAR') {
    vat = 15;
  }

  return (
    <>
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sub Total
            </Typography>
            <Typography variant="subtitle2">
              {product?.currency ?? 0} {(product?.subTotal ?? product?.totalAmount)?.toFixed(2)}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Discount
            </Typography>
            <Typography variant="subtitle2">0</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              VAT Taxs {product?.vat ?? vat} %
            </Typography>
            <Typography variant="subtitle2">
              {product?.currency ?? 0}{' '}
              {product
                ? product?.orders
                  ? (product?.totalAmount * (product?.vat / 100))?.toFixed(2)
                  : (product?.price * product?.qty * (vat / 100))?.toFixed(2)
                : ''}
            </Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {product?.currency}{' '}
                {product
                  ? product?.orders
                    ? (product?.totalAmount * (product?.vat / 100) + product?.totalAmount).toFixed(
                        2
                      )
                    : Number((product?.price * product?.qty * (vat / 100)).toFixed(2)) +
                      Number(product?.price)
                  : ''}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (VAT included if applicable)
              </Typography>
            </Box>
          </Stack>
          {activeStep === 0 && (
            <TextField
              fullWidth
              placeholder="Coupon codes / Gifts"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button sx={{ mr: -0.5 }}>Apply</Button>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Stack>
      </CardContent>
    </>
  );
};

export default CartSummery;
