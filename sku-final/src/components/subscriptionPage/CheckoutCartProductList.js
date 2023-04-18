import PropTypes from 'prop-types';
// @mui
import {
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableContainer,
  Typography
} from '@mui/material';
import Iconify from 'components/iconify/Iconify';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { TableHeadCustom } from 'components/table';
import { usePaymentRemoveOrderMutation } from 'features/payment/paymentAPI';
import { clearPlan } from 'features/plan/planSlice';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { HashLink } from 'react-router-hash-link';
import CheckoutCartProduct from './CheckoutCartProduct';

const TABLE_HEAD = [
  { id: 'product', label: 'Product' },
  { id: 'price', label: 'Price' },
  { id: 'quantity', label: 'Quantity', align: 'center' },
  { id: 'vat', label: 'VAT', align: 'right' },
  { id: 'vat_amount', label: 'VAT Amount', align: 'right' },
  { id: 'totalPrice', label: 'Total Price', align: 'right' },
  { id: '' },
];

// ----------------------------------------------------------------------

CheckoutCartProductList.propTypes = {
  onDelete: PropTypes.func,
  products: PropTypes.array,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function CheckoutCartProductList({
  products,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
  backStep,
  activeStep,
}) {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [removeOrderFromPayment] = usePaymentRemoveOrderMutation();

  const handleItemRemoval = async (orderId) => {
    dispatch(clearPlan());

    if (state && state.orders) {
      const newOrders = {
        ...state.orders,
        orders: state.orders.orders.filter(({ orderNo: oNo }) => oNo != orderId),
      };

      await removeOrderFromPayment({ paymentId: state.orders._id, orderId });

      navigate('/checkout', { state: { orders: newOrders }, replace: true });
    }
  };

  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={
            <Typography variant="h6">
              Cart
              <Typography component="span" sx={{ color: 'text.secondary' }}>
                &nbsp;({products?.orders ? products.orders.length : products.length})
              </Typography>
            </Typography>
          }
          sx={{ mb: 3 }}
        />
        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar>
            <Table sx={{ minWidth: 720 }}>
              <TableHeadCustom headLabel={TABLE_HEAD} />

              <TableBody>
                {products?.orders
                  ? products?.orders?.map(({ orderNo }, index) => (
                      <CheckoutCartProduct
                        key={index}
                        order={orderNo}
                        vat={products?.vat}
                        currency={products?.currency}
                        handleItemRemoval={handleItemRemoval}
                      />
                    ))
                  : products?.map((row, index) => (
                      <CheckoutCartProduct
                        key={index}
                        row={row}
                        handleItemRemoval={handleItemRemoval}
                        /*  onDelete={() => onDelete(row?.id)}
                      onDecrease={() => onDecreaseQuantity(row?.id)}
                      onIncrease={() => onIncreaseQuantity(row?.id)} */
                      />
                    ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>
      <Button
        size="small"
        color="inherit"
        component={HashLink}
        to={products?.orders ? '/sellerboard' : '/become_partner/#PricingPlans'}
        sx={{ textDecoration: 'none', color: 'text.primary' }}
        startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
      >
        {products?.orders ? 'Back to Seller Board' : 'Back to Pricing Plans'}
      </Button>
    </>
  );
}
