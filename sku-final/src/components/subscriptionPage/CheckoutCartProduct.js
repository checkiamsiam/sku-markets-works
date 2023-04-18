import PropTypes from 'prop-types';
// @mui
import { Box, Button, IconButton, Stack, TableCell, TableRow, Typography } from '@mui/material';
import Iconify from 'components/iconify/Iconify';
import Image from 'components/image/Image';
import ConfirmationAlert from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';
import { useState } from 'react';
import { useGetOrderByIdQuery } from '../../features/order/orderAPI';
import { useGetProductDetailQuery } from '../../features/product/productAPI';

CheckoutCartProduct.propTypes = {
  row: PropTypes.object,
  onDelete: PropTypes.func,
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
};

export default function CheckoutCartProduct({
  order,
  row,
  vat,
  currency,
  handleItemRemoval,
  onDelete,
  onDecrease,
  onIncrease,
}) {
  // const { plan, images, price, qty, currency, total, vatTax } = row;

  const { data: orderDetail } = useGetOrderByIdQuery(order);
  const { data: productDetail } = useGetProductDetailQuery(orderDetail?.order?.product);

  if (!currency) {
    currency = row?.currency;
  }

  if (!vat) {
    if (currency === 'EGP') {
      vat = 14;
    } else if (currency === 'AED') {
      vat = 5;
    } else {
      vat = 15;
    }
  }

  const vatPrice = row
    ? (row?.price * row?.qty * (vat / 100)).toFixed(2)
    : (orderDetail?.order?.price * orderDetail?.order?.quantity * (vat / 100))?.toFixed(2);

  const totalPrice = (
    Number(vatPrice) +
    (row
      ? Number(row?.price) * row?.qty
      : Number(orderDetail?.order?.price) * orderDetail?.order?.quantity)
  ).toFixed(2);

  /* Accept Alert */
  const [openAccept, setOpenAccept] = useState(false);
  const handleCloseAccept = () => setOpenAccept(false);
  const handleShowAccept = () => setOpenAccept(true);

  const handleProductRemovalCallback = () => {
    handleItemRemoval(order);
  };

  return (
    <>
      <TableRow>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Image
            alt="product image"
            src={row?.images ? row?.images : productDetail?.all_images[0]}
            sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }}
          />

          <Stack spacing={0.5}>
            <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
              {row?.plan}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          {currency ?? row?.currency} {row?.price ?? orderDetail?.order?.price}
        </TableCell>

        <TableCell>
          <Box sx={{ width: 96, textAlign: 'center' }}>
            {/* <IncrementerButton
            quantity={qty}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
            disabledDecrease={qty <= 1}
            disabledIncrease={qty >= available}
          /> */}
            <Button variant="outlined" disabled>
              {row?.qty ?? orderDetail?.order?.quantity}
            </Button>
          </Box>
        </TableCell>

        <TableCell align="right">{vat}%</TableCell>
        <TableCell align="right">
          {currency ?? row?.currency} {vatPrice}
        </TableCell>
        <TableCell align="right">
          {currency ?? row?.currency} {totalPrice}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleShowAccept}>
            <Iconify icon="eva:trash-2-outline" />
          </IconButton>
        </TableCell>
      </TableRow>

      <ConfirmationAlert
        open={openAccept}
        handleClose={handleCloseAccept}
        item={''}
        order={order}
        callback={handleProductRemovalCallback}
        alert={'Are you sure you want to remove this Product from Cart'}
        title={'Remove Product from Cart'}
        btnTitle={'Remove'}
      />
    </>
  );
}
