import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Box, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import PrintAlert from 'components/sellerboard/sellerboardAlerts/PrintAlert';
import { useEffect, useState } from 'react';

const BuyRTV = ({ shipment, seller }) => {
  const printAlrt = PrintAlert();

  const [totalQty, setTotalQty] = useState(0);
  const [numSkus, setNumSkus] = useState(0);

  useEffect(() => {
    if (shipment) {
      let qty = 0;
      let numSku = shipment?.payment?.rtvOrders?.length;

      shipment?.payment?.rtvOrders?.map((obj) => {
        qty += obj.returnQty;
      });

      setTotalQty(qty);
      setNumSkus(numSku);
    }
  }, []);

  return (
    <>
      <Paper
        sx={{
          boxShadow: 3,
          flexGrow: 1,
          marginTop: '20px',
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
                  <span style={{ fontWeight: 700 }}>RTV Reason:</span> {shipment?.rtvReason}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Shipment (AWB) Number:</span>{' '}
                  {shipment?.awbNumber}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Dispatch Reference Number:</span>{' '}
                  {shipment?._id}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Number Of SKUs:</span> {numSkus} items
                </Typography>{' '}
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <span style={{ fontWeight: 700 }}>Total Quantity:</span> {totalQty} units
                </Typography>{' '}
              </Grid>

              <Grid item>
                <Stack direction="row" spacing={1}>
                  <Typography
                    variant="caption"
                    sx={{ fontSize: '12px', fontWeight: 600, p: 0, color: lightGray }}
                  >
                    RTV Pending
                  </Typography>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Typography variant="caption" sx={{ fontWeight: 700, color: lightGray }}>
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

export default BuyRTV;
