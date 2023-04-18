import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Box, Button, Divider, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CancelAlert from 'components/sellerboard/sellerboardAlerts/CancelAlert';
import ConfirmationAlert from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';
import PrintAlert from 'components/sellerboard/sellerboardAlerts/PrintAlert';
import { useGetPartnerSkuByIdQuery, useGetProductDetailQuery } from 'features/product/productAPI';
import { OrderStatus } from 'helper/OrderStatuses';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const lightGray = '#0d6efd';
const demoImage = 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg';

const SellTable = ({ order, buyer, refetch }) => {
  const printAlrt = PrintAlert();

  // modal data
  const { data: productDetail, isSuccess } = useGetProductDetailQuery(order?.product);
  const { data: partnerSkuData } = useGetPartnerSkuByIdQuery(order?.product);

  /* Accept Alert */
  const [openAccept, setOpenAccept] = useState(false);
  const handleCloseAccept = () => setOpenAccept(false);
  const handleShowAccept = () => setOpenAccept(true);

  // Pop -Up Remove
  const [openCancel, setOpenCancel] = useState(false);
  const handleCloseCancel = () => setOpenCancel(false);
  const handleShowCancel = () => setOpenCancel(true);

  const [qty, setQty] = useState(0);
  const [unit, setUnit] = useState(0);
  const [qtyError, setQtyError] = useState(false);
  const [unitError, setUnitError] = useState(false);

  const [vat, setVat] = useState(0);

  const handleValidate = () => {
    if (qty <= 0 || unit <= 0) {
      setQtyError(true);
    } else if (unit <= 0) {
      setUnitError(true);
    } else {
      handleShowAccept();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      switch (productDetail?.buy_box_currency) {
        case 'SAR':
          setVat(15);
          break;
        case 'AED':
          setVat(5);
          break;
        case 'EGP':
          setVat(14);
          break;
        default:
          break;
      }
    }
  }, [isSuccess]);

  return (
    <>
      <Paper
        sx={{
          boxShadow: 3,
          // maxWidth: 500,
          flexGrow: 1,
          bgcolor: 'background.paper',
          borderRadius: 2,
          padding: 2,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={6} md={2}>
            <img
              style={{ borderRadius: '20px' }}
              width="100%"
              alt="complex"
              src={productDetail?.all_images ? productDetail?.all_images[0] : demoImage}
            />
          </Grid>
          <Grid item xs={6} md={3.5} container>
            <Stack item container direction="column" spacing={0}>
              <Grid item>
                <Typography
                  component={Link}
                  to={`/skuMarket/${productDetail?._id}/${order?.seller}`}
                  variant="caption"
                  sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 700 }}
                >
                  {productDetail?.sku}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                  {partnerSkuData?.data}
                </Typography>{' '}
              </Grid>
              <Grid item>
                <Typography variant="caption">{productDetail?.title_en}</Typography>{' '}
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={1}>
                  <Typography
                    component={Link}
                    to={`/skuMarket?marketplace=${encodeURIComponent(
                      productDetail?.sku_marketplace
                    )}&brand=${encodeURIComponent(productDetail?.brand_en)}`}
                    variant="caption"
                    color="text.primary"
                    sx={{ textDecoration: 'none' }}
                  >
                    {productDetail?.brand_en}
                  </Typography>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Typography
                    component={Link}
                    to={`/skuMarket?marketplace=${encodeURIComponent(
                      productDetail?.sku_marketplace
                    )}&category=${encodeURIComponent(productDetail?.category_en)}`}
                    variant="caption"
                    color="text.primary"
                    sx={{ textDecoration: 'none' }}
                  >
                    {productDetail?.category_en}
                  </Typography>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Link
                    to={`/skuMarket?marketplace=${encodeURIComponent(
                      productDetail?.sku_marketplace
                    )}`}
                  >
                    <img
                      src={`/assets/images/marketplace/${productDetail?.sku_marketplace
                        .split('/')
                        ?.join('-')
                        ?.toLowerCase()}.jpeg`}
                      alt={productDetail?.sku_marketplace.replace('/', '-')}
                      style={{
                        height: `15px`,
                        width: `40px`,
                        display: 'inline-block',
                      }}
                    />
                  </Link>
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={1}>
                  <Typography
                    variant="caption"
                    sx={{ color: lightGray, fontSize: '12px', fontWeight: 600, p: 0 }}
                  >
                    Acceptance
                  </Typography>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Typography variant="caption" sx={{ color: lightGray, fontWeight: 700 }}>
                    B2B Sell
                  </Typography>
                </Stack>
              </Grid>
              <Grid item sx={{ textAlign: 'center', mt: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <TextField
                    id="outlined-number"
                    size="small"
                    type="number"
                    disabled
                    defaultValue={order?.quantity}
                    InputLabelProps={{
                      shrink: true,
                      sx: { color: 'text.primary' },
                    }}
                    inputProps={{ style: { textAlign: 'center' } }}
                    label="Quantity"
                    variant="outlined"
                    sx={{ m: 1, fontSize: '12px', width: 75 }}
                  />
                  <TextField
                    id="outlined-number"
                    size="small"
                    type="number"
                    disabled
                    defaultValue={order?.price}
                    InputLabelProps={{
                      shrink: true,
                      sx: { color: 'text.primary' },
                    }}
                    inputProps={{ style: { textAlign: 'center' } }}
                    label="Bid/Unit"
                    variant="outlined"
                    sx={{ m: 1, fontSize: '12px', width: 75 }}
                  />
                </Box>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3.5} sx={{ ml: { xs: 'auto' } }}>
            <Grid item md container direction="column" spacing={1}>
              <Grid item md sx={{ px: { xs: 1 } }}>
                <Typography sx={{ fontWeight: 700 }} variant="caption">
                  Request Number:
                  <span style={{ fontWeight: 300 }}> {order._id}</span>
                </Typography>{' '}
                <br />
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Buyer Name: </span>
                  {buyer?.name}
                </Typography>{' '}
                <br />
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Buyer Country: </span>
                  {buyer?.country}
                </Typography>{' '}
                <br />
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Buyer City: </span>
                  {buyer?.city}
                </Typography>
                <br />
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Buyer Address: </span>
                  {buyer?.address}
                </Typography>
                <br />
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Buyer Zip/ Code: </span>
                  {buyer?.zipCode}
                </Typography>
                <br />
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Buyer Contact: </span>
                  {buyer?.phone}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={3} container>
            <Grid
              item
              md
              container
              direction="column"
              spacing={0}
              alignItems="center"
              sx={{ textAlign: 'center' }}
            >
              <Grid item width="100%">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Box sx={{ cursor: 'pointer' }}>
                    <ChatBubbleOutlineIcon sx={{ fontSize: '20px', color: lightGray }} />
                  </Box>
                  <Box sx={{ cursor: 'pointer' }}>
                    <LocalPrintshopIcon
                      onClick={printAlrt}
                      sx={{ fontSize: '20px', color: lightGray }}
                    />
                  </Box>
                  <Box sx={{ cursor: 'pointer' }}>
                    <SystemUpdateAltIcon
                      onClick={printAlrt}
                      sx={{ fontSize: '20px', color: lightGray }}
                    />
                  </Box>
                </Stack>
              </Grid>
              <Grid item sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                  {' '}
                  <TextField
                    id="outlined-number"
                    size="small"
                    type="number"
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                      setQtyError(false);
                    }}
                    InputLabelProps={{
                      shrink: true,
                      sx: { color: qtyError ? 'red' : 'text.primary' },
                    }}
                    inputProps={{ style: { textAlign: 'center' } }}
                    label="Quantity"
                    variant="outlined"
                    sx={{ m: 1, fontSize: '12px', width: 75 }}
                  />
                  <TextField
                    id="outlined-number"
                    size="small"
                    type="number"
                    value={unit}
                    onChange={(e) => {
                      setUnit(e.target.value);
                      setUnitError(false);
                    }}
                    InputLabelProps={{
                      shrink: true,
                      sx: { color: unitError ? 'red' : 'text.primary' },
                    }}
                    inputProps={{ style: { textAlign: 'center' } }}
                    label="Bid/Unit"
                    variant="outlined"
                    sx={{ m: 1, fontSize: '12px', width: 75 }}
                  />
                </Box>
              </Grid>
              <Grid item md>
                <Typography sx={{ fontWeight: 700 }} variant="caption">
                  Total Amount :{' '}
                  {`${productDetail?.buy_box_currency} ${order?.quantity * order?.price}`}
                </Typography>
                <br />
                <Typography sx={{ fontWeight: 700 }} variant="caption">
                  Tax/ VAT Amount (%{vat}):{' '}
                  {`${productDetail?.buy_box_currency} ${(
                    (vat / 100) *
                    (order?.quantity * order?.price)
                  ).toFixed(2)}`}
                </Typography>
                <br />
                <Typography variant="caption" sx={{ color: lightGray }}>
                  02:23:59:59
                </Typography>
                <Stack direction="row" spacing={0} sx={{ m: 1 }}>
                  <Box>
                    <Button
                      sx={{
                        bgcolor: 'white',
                        border: (theme) => `1px solid ${theme.palette.primary.main}`,
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                        '&:hover': {
                          bgcolor: 'primary.main',
                          color: (theme) =>
                            theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                          border: (theme) => `1px solid ${theme.palette.primary.main}`,
                        },
                        width: { md: 100, xs: 75 },
                        mx: 1,
                      }}
                      onClick={handleShowCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      sx={{
                        bgcolor: 'primary.main',
                        border: (theme) => `1px solid ${theme.palette.primary.main}`,
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                        '&:hover': {
                          bgcolor: 'white',
                          color: (theme) =>
                            theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                          border: (theme) => `1px solid ${theme.palette.primary.main}`,
                        },
                        width: { md: 100, xs: 75 },
                      }}
                      onClick={handleValidate}
                    >
                      Accept
                    </Button>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <CancelAlert
        open={openCancel}
        handleClose={handleCloseCancel}
        item={`Request Number: ${order?._id}`}
        order={order?._id}
        alert={'Are you sure you want to cancel this Request for the'}
        title={'Request Cancel'}
        btnTitle={'Cancel'}
        orderStatus={OrderStatus.REJECTED_FROM_SELLER_RFQ}
        text={'Request Cancelled Successfully'}
        refetch={refetch}
      />
      <ConfirmationAlert
        open={openAccept}
        handleClose={handleCloseAccept}
        item={`Request Number: ${order?._id}`}
        order={order?._id}
        quantity={qty}
        unit={unit}
        alert={'Are you sure you want to accept this Request for the'}
        title={'Request Accept'}
        btnTitle={'Accept'}
        orderStatus={OrderStatus.REVIEWED}
        text={'Request Accepted Successfully'}
        refetch={refetch}
      />
    </>
  );
};

export default SellTable;
