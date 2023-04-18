import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Box, Button, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import CancelAlert from 'components/sellerboard/sellerboardAlerts/CancelAlert';
import ConfirmationAlert from 'components/sellerboard/sellerboardAlerts/ConfirmationAlert';
import PrintAlert from 'components/sellerboard/sellerboardAlerts/PrintAlert';
import { OrderStatus } from 'helper/OrderStatuses';
import { useState } from 'react';
// const qnty = [12, 24, 36, 48, 60];

const BuyPending = ({ payment, seller, refetch }) => {
  const printAlrt = PrintAlert();
  // modal data

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

  return (
    <>
      <Paper
        sx={{
          boxShadow: 3,
          marginTop: '20px',
          flexGrow: 1,
          bgcolor: 'background.paper',
          borderRadius: 2,
          padding: 2,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={6} md={4} container>
            <Stack item container direction="column" spacing={0}>
              <Grid item>
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Payment Reference Number:</span> {payment?._id}
                </Typography>{' '}
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Number Of SKUs:</span> {payment?.orders.length}{' '}
                  items
                </Typography>{' '}
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Total Quantity:</span> {payment?.totalQty} units
                </Typography>{' '}
              </Grid>

              <Grid item>
                <Stack direction="row" spacing={1}>
                  <Typography
                    variant="caption"
                    sx={{ color: lightGray, fontSize: '12px', fontWeight: 600, p: 0 }}
                  >
                    Pay
                  </Typography>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Typography variant="caption" sx={{ color: lightGray, fontWeight: 700 }}>
                  B2B Buy
                  </Typography>
                </Stack>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={6} md={4} sx={{ ml: { xs: 'auto' } }}>
            <Grid item md container direction="column" spacing={1}>
              <Grid item md sx={{ px: { xs: 1 } }}>
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Seller Name: </span>
                  {seller?.name}
                </Typography>{' '}
                <br />
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Seller Country: </span>
                  {seller?.country}
                </Typography>{' '}
                <br />
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Seller City: </span>
                  {seller?.city}
                </Typography>
                <br />
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Seller Address: </span>
                  {seller?.address}
                </Typography>
                <br />
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Seller Zip/ Code: </span>
                  {seller?.zipCode}
                </Typography>
                <br />
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Seller Contact: </span>
                  {seller?.phone}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={4} container>
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
              <Grid item md>
                <Typography sx={{ fontWeight: 700 }} variant="caption">
                  Total Amount : {payment?.currency} {payment?.totalAmount}
                </Typography>
                <br />
                <Typography sx={{ fontWeight: 700 }} variant="caption">
                  Tax/ VAT Amount (%{payment?.vat}): {payment?.currency}{' '}
                  {((payment?.vat / 100) * payment?.totalAmount + payment?.totalAmount)?.toFixed(2)}
                </Typography>
                <br />
                <Typography variant="caption" sx={{ color: lightGray }}>
                  02:23:59:59
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  spacing={0}
                  sx={{ m: 1 }}
                >
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
                      onClick={handleShowAccept}
                    >
                      Pay
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
        item={''}
        order={payment}
        orderStatus={OrderStatus.REJECTED_FROM_BUYER_PAYMENT}
        alert={'Are you sure you want to cancel this Payment Pending'}
        title={'Payment Pending Cancel'}
        btnTitle={'Cancel'}
        text={'Payment Pending Cancelled Successfully'}
        refetch={refetch}
      />
      <ConfirmationAlert
        open={openAccept}
        handleClose={handleCloseAccept}
        item={''}
        order={payment}
        alert={'Are you sure you want to Pay this Payment Pending'}
        title={'Payment Pending Pay'}
        btnTitle={'Pay'}
        refetch={refetch}
      />
    </>
  );
};

export default BuyPending;
