import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Box, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import PrintAlert from 'components/sellerboard/sellerboardAlerts/PrintAlert';

// const qnty = [12, 24, 36, 48, 60];

const SellPending = ({ payment, buyer }) => {
  const printAlrt = PrintAlert();

  return (
    <>
      <Paper
        sx={{
          boxShadow: 3,
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
                    Payment Pending
                  </Typography>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Typography variant="caption" sx={{ color: lightGray, fontWeight: 700 }}>
                  B2B Sell
                  </Typography>
                </Stack>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={6} md={4} sx={{ ml: { xs: 'auto' } }}>
            <Grid item md container direction="column" spacing={1}>
              <Grid item md sx={{ px: { xs: 1 } }}>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default SellPending;
