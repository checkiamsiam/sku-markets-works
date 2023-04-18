import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useTimeAgo } from 'next-time-ago';
import {
  Button,
  Card,
  Dialog,
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  LinearProgress,
  Link,
  Menu,
  TextField,
  Typography,
  DialogContentText,
  Chip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import saudiImg from '../../assets/images/noon-saudi.svg';
import SkuProduct from '../../assets/images/sku-product.png';
import alertModalData from '../../assets/data/alertModalData';
import Image from 'next/image';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const ProductAnalysisCardOne = ({ product }) => {
  const { TimeAgo } = useTimeAgo();
  let delivery_method = [];

  // handle buy box price progress
  const [labelTime, setLabelTime] = useState('24H');
  const [lowPrice , setLowPrice] = useState(product?.getTopBottomPrice?.bottomPrice?.last24Hours)
  const [highPrice , setHighPrice] = useState(product?.getTopBottomPrice?.topPrice?.last24Hours)
  const [progressValue , setProgressValue] = useState(null)
  const handleLabelTime = (t) => {
    if (t === '24H') {
      setLabelTime('7D');
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last7Days)
      setHighPrice(product?.getTopBottomPrice?.bottomPrice?.last7Days)
    }
    if (t === '7D') {
      setLabelTime('14D');
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last2Weeks)
      setHighPrice(product?.getTopBottomPrice?.bottomPrice?.last2Weeks)
    }
    if (t === '14D') {
      setLabelTime('30D');
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last30Days)
      setHighPrice(product?.getTopBottomPrice?.bottomPrice?.last30Days)
    }
    if (t === '30D') {
      setLabelTime('24H');
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last24Hours)
      setHighPrice(product?.getTopBottomPrice?.bottomPrice?.last24Hours)
    }
  };

  

  // Handle Watch List Menu
  const [watchListMenu, setWatchListMenu] = useState(null);
  const watchListMenuOpen = Boolean(watchListMenu);
  const handleStarClick = (event) => {
    setWatchListMenu(event.currentTarget);
  };
  const handleStarClose = () => {
    setWatchListMenu(null);
  };

  // Handle Watch List Dialog/Modal
  const [watchListModal, setWatchListModal] = useState(false);

  const handleWatchListModalOpen = () => {
    setWatchListModal(true);
  };

  const handleWatchListModalClose = () => {
    setWatchListModal(false);
  };

  const [openAddAlertModal, setOpenAddAlertModal] = useState(false);

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (openAddAlertModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openAddAlertModal]);

  //fake data
  const [alertData, setAlertData] = useState({
    platform: '',
    platform_country: '',
    category: '',
    sku_type: '',
    sku_sub_type: '',
    fulfilment_sku_type: '',
    brand: '',
    sku: '',
    alert_type: '',
    price_moves_below: '',
    price_moves_above: '',
    frequency: '',
    comment: '',
    delivery_method: '',
    summary: '',
  });

  const handleChange = (e) => {
    console.log(e);
    setAlertData({ ...alertData, [e.target.name]: e.target.value });
  };

  const handleChangeDeliveryMethod = (e) => {
    if (e.target.checked) {
      delivery_method.push(e.target.name);
      setAlertData({ ...alertData, delivery_method });
    } else {
      delivery_method = delivery_method.filter((item) => item !== e.target.name);
      setAlertData({ ...alertData, delivery_method });
    }
  };

  // colors
  const gray = '#7A797D';
  const lightGray = '#999999';

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip placement="right" {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

  const img = product?.all_images.length > 0 ? product.all_images[0] : null;

  return (
    <>
      <Card
        sx={{
          padding: '1.5rem',
          width: { lg: '60%' },
          borderRadius: '10px',
          boxShadow: 3,
        }}
      >
        <Stack direction={{ md: 'row' }} justifyContent="space-between" spacing={3}>
          <div style={{ width: { xs: '100%', md: '40%' } }}>
            <Stack direction="column" spacing={1} fontSize="12px">
              <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Image src={img} width="80" height="70" alt="" />
                  <Link href={`/product/${product?._id}`} underline="none">
                    {product?.sku}
                  </Link>
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  Rank{' '}
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                  {/* <Tooltip title="there is something" placement="top-end" arrow>
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </Tooltip> */}
                </span>
                <span style={{ color: gray }}>{product?.sku_rank}</span>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  Rate
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                </span>
                <span style={{ color: gray }}>{product?.sku_rate}</span>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  SKU Marketplace{' '}
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                </span>
                <span style={{ color: gray }}>
                  <Link href="/marketplace">
                    <Image src={saudiImg} width="40" alt="" />
                  </Link>
                </span>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  No. Of Sellers{' '}
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                </span>
                <span style={{ color: gray }}>{product?.sellers}</span>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  Tags{' '}
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                </span>
                <span style={{ color: gray }}>
                  {product?.tags.length > 0 ? product?.tags[0] : 'N/A'}
                </span>
              </Stack>
            </Stack>
          </div>
          <div style={{ width: { xs: '100%', md: '30%' } }}>
            <Stack
              direction="column"
              fontSize="12px"
              justifyContent="center"
              alignItems="center"
              spacing={0}
              color={gray}
              height="100%"
            >
              <Stack direction="row">
                <IconButton
                  id="star-button"
                  aria-controls={watchListMenuOpen && 'basic-menu'}
                  aria-haspopup="true"
                  aria-expanded={watchListMenuOpen && 'true'}
                  onClick={handleStarClick}
                  sx={{
                    '&:hover': {
                      border: '1px solid blue',
                      transition: '0.7s',
                    },
                    border: '1px solid transparent',
                  }}
                >
                  <StarOutlineIcon />
                </IconButton>
                <IconButton
                  id="notify-button"
                  aria-controls={openAddAlertModal && 'basic-menu'}
                  aria-haspopup="true"
                  aria-expanded={openAddAlertModal && 'true'}
                  onClick={() => setOpenAddAlertModal(true)}
                  sx={{
                    '&:hover': {
                      border: '1px solid blue',
                      transition: '0.7s',
                    },
                    border: '1px solid transparent',
                  }}
                >
                  <NotificationsNoneIcon />
                </IconButton>
              </Stack>
              <p>{product?.watch_list.length} Watchlists</p>
              <p>10 Alerts</p>
              <p style={{ fontWeight: 'bold' }}>
                Updated: <TimeAgo date={product?.updatedAt} locale='en-US' />
              </p>
            </Stack>
          </div>
          <div style={{ width: { xs: '100%', md: '40%' } }}>
            <h6
              style={{
                fontWeight: 'bold',
                color: gray,
                textAlign: 'center',
              }}
            >
              Buybox Sale Price{' '}
              <HtmlTooltip
                title={
                  <>
                    <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                    {"It's very engaging. Right?"}
                  </>
                }
              >
                <InfoIcon htmlColor={lightGray} fontSize="3px" />
              </HtmlTooltip>
            </h6>
            <Typography fontSize="12px" style={{ textAlign: 'center' }}>
              {product?.buy_box_currency} &nbsp;
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                  color: gray,
                }}
              >
                {product?.current_price}
              </span>{' '}
              &nbsp;
              <span style={{ color: `${product?.price_change > 0 ? 'green' : 'red'}` }}>
                {product?.price_change}%
              </span>
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={2}
              fontSize="12px"
              marginTop="10px"
            >
              <Stack width="100%">
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <span>Low</span>
                  <Chip
                    onClick={() => handleLabelTime(labelTime)}
                    label={labelTime}
                    color="primary"
                    size="small"
                    sx={{ marginBottom: '5px' }}
                  />

                  <span>high</span>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={25}
                  sx={{
                    padding: '1px',
                    borderRadius: '5px',
                    bgcolor: '#D3D3D3',
                    margin: '2px 0px',
                  }}
                />
                <Stack direction="row" paddingTop="5px" justifyContent="space-between">
                  <span>SAR {lowPrice}</span>
                  <span>SAR {highPrice}</span>
                </Stack>
              </Stack>
            </Stack>
            <Stack fontSize="12px" paddingTop="1rem">
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  Estimated SOH{' '}
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                </span>
                <span style={{ color: gray }}>0</span>
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                <span style={{ fontWeight: 'bold', color: gray }}>
                  Estimated SU Last 24h{' '}
                  <HtmlTooltip
                    title={
                      <>
                        <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                        {"It's very engaging. Right?"}
                      </>
                    }
                  >
                    <InfoIcon htmlColor={lightGray} fontSize="3px" />
                  </HtmlTooltip>
                </span>
                <span style={{ color: gray }}>0</span>
              </Stack>
            </Stack>
          </div>
        </Stack>
      </Card>

      {/* Start::WatchList, Notification Menu / Modal / Dialog */}
      {/* Watchlist Menu */}
      <Menu
        id="basic-menu"
        anchorEl={watchListMenu}
        open={watchListMenuOpen}
        onClose={handleStarClose}
        MenuListProps={{
          'aria-labelledby': 'star-button',
        }}
        sx={{ width: '300px', height: '300px', fontSize: '12px' }}
      >
        <div>
          <h3 style={{ fontSize: '12px', color: gray, padding: '0 10px' }}>Select Watch List</h3>
          <ListItem button sx={{ padding: '3px 6px' }}>
            <ListItemText sx={{ fontSize: '10px' }}>Siam</ListItemText>
            <ListItemAvatar sx={{ textAlign: 'right' }}>
              <CheckCircleIcon color="primary" sx={{ fontSize: '1.2rem' }} />
            </ListItemAvatar>
          </ListItem>
          <ListItem button sx={{ padding: '3px 6px' }}>
            <ListItemText primary="Sheikh" />
            <ListItemAvatar sx={{ textAlign: 'right' }}>
              <CheckCircleIcon color="primary" sx={{ fontSize: '1.2rem' }} />
            </ListItemAvatar>
          </ListItem>
          <Stack
            sx={{ width: '200px', padding: '3px 20px' }}
            button
            onClick={() => {
              handleWatchListModalOpen();
              handleStarClose();
            }}
          >
            <Chip
              sx={{ cursor: 'pointer' }}
              avatar={
                <AddCircleOutlineIcon color="primary" sx={{ fontSize: '1.2rem', color: 'blue' }} />
              }
              label="Add To watchList"
              variant="outlined"
            />
          </Stack>
        </div>
      </Menu>

      {/* WatchList Dialog/Modal */}
      <Dialog open={watchListModal} onClose={handleWatchListModalClose} fullWidth>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <DialogTitle sx={{ color: gray, fontWeight: 700, fontSize: '20px' }}>
            New WatchList
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleWatchListModalClose}
            sx={{ color: gray, marginRight: '.75rem' }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider light />
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="watchlist"
            label="Enter Watchlist Title"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions sx={{ padding: '1rem' }}>
          <Button variant="outlined" sx={{ color: gray }} onClick={handleWatchListModalClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleWatchListModalClose}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add alert modal */}
      <Dialog
        open={openAddAlertModal}
        onClose={() => setOpenAddAlertModal(false)}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <DialogTitle
            id="scroll-dialog-title"
            sx={{ color: gray, fontWeight: 700, fontSize: '15px' }}
          >
            Add New Alert
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpenAddAlertModal(false)}
            sx={{ color: gray, marginRight: '.75rem' }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
        {/* <DialogTitle id="scroll-dialog-title">Get Alert</DialogTitle> */}
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Box component="form" autoComplete="off">
              <Grid container spacing={1}>
                {alertModalData.map((item) => (
                  <Grid item xs={12} sm={6} key={item.name}>
                    <FormControl
                      sx={{ m: 1, minWidth: 120 }}
                      size="small"
                      // width="100%"
                      fullWidth
                    >
                      <InputLabel id={item.name}>{item.label}</InputLabel>
                      <Select
                        labelId={item.name}
                        id={item.name}
                        name={item.name}
                        value={alertData[item.name]}
                        label={item.label}
                        onChange={handleChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {item.values.map((value) => (
                          <MenuItem key={value.label} value={value.label}>
                            {value.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                ))}
              </Grid>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <span style={{ fontSize: '15px', color: gray, fontWeight: 500 }}>
                  Delivery Method
                </span>
                <FormControlLabel
                  control={<Checkbox />}
                  label="WhatsApp"
                  name="whatsapp"
                  id="whatsapp"
                  value="whatsapp"
                  onChange={handleChangeDeliveryMethod}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Email"
                  name="email"
                  id="email"
                  value="email"
                  onChange={handleChangeDeliveryMethod}
                />
              </Stack>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{ color: gray }}
            onClick={() => setOpenAddAlertModal(false)}
          >
            Close
          </Button>
          <Button variant="contained">Add Alert</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductAnalysisCardOne;
