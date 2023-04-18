import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Box, Button, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import mapIcon from 'assets/images/map.png';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import CancelAlert from 'components/sellerboard/sellerboardAlerts/CancelAlert';
import PrintAlert from 'components/sellerboard/sellerboardAlerts/PrintAlert';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShippedAlert from './ShippedAlert';

const BuyRTV = ({ shipment, seller, refetch }) => {
  const printAlrt = PrintAlert();
  /* Accept Alert */
  const [openAccept, setOpenAccept] = useState(false);
  const handleCloseAccept = () => setOpenAccept(false);
  const handleShowAccept = () => setOpenAccept(true);
  // Pop -Up Remove
  const [openCancel, setOpenCancel] = useState(false);
  const handleCloseCancel = () => setOpenCancel(false);
  const handleShowCancel = () => setOpenCancel(true);

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
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Link
                    to={`https://google.com/maps/@${3.22},${1.99},20z`}
                    target="_blank"
                    rel="noreffer"
                  >
                    <Box component="img" src={mapIcon} width="20px" height="20px" />
                  </Link>
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
                        width: 135,
                      }}
                      onClick={handleShowAccept}
                    >
                      RTV Shipped
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
        alert={'Are you sure you want to cancel this RTV'}
        title={'RTV Cancel'}
        btnTitle={'Cancel'}
        text={'RTV Cancelled Successfully'}
      />
      <ShippedAlert
        open={openAccept}
        handleClose={handleCloseAccept}
        item={''}
        delivered={true}
        alert={'Are you sure you want to confirm this Shipment Delivered'}
        title={'Shipment Delivered Confirm'}
        btnTitle={'Confirm'}
        childTitle={'RTV Shipment (AWB) Number:'}
        text={'Shipment Delivered Confirmed Successfully'}
        shipmentId={shipment?._id}
        refetch={refetch}
      />
    </>
  );
};

export default BuyRTV;
