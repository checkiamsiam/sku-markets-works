// next
import Head from 'next/head';

import CloseIcon from '@mui/icons-material/Close';
import Basket from '../../assets/images/basket.png';
import SFlagRing from '../../assets/images/noon-saudi.svg';
import lineChart from './line.png';
// @mui
import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// _mock_
// components
import { useSettingsContext } from '../../components/settings';
// sections
import { EcommerceYearlySales } from '../../sections/@dashboard/general/e-commerce';
// assets
import { Stack } from '@mui/system';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BsArrowUpShort, BsPlusLg, BsThreeDots } from 'react-icons/bs';
import alertModalData from '../../assets/data/alertModalData';
import SKUMarquee from '../../components/common/marquee';
import DataGridCustom from '../../sections/_examples/mui/data-grid/DataGridCustom';
import _mock, { randomInArray } from '../../_mock';

export const _dataGrid = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  lastLogin: _mock.time(index),
  performance: _mock.number.percent(index),
  rating: _mock.number.rating(index),
  status: randomInArray(['online', 'away', 'busy']),
  isAdmin: _mock.boolean(index),
  lastName: _mock.name.lastName(index),
  firstName: _mock.name.firstName(index),
  age: _mock.number.age(index),
}));

GeneralEcommercePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;

export default function GeneralEcommercePage() {
  const { user } = useAuthContext();
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  let delivery_method = [];
  const [labelTime, setLabelTime] = useState('24H');
  const handleLabelTime = (t) => {
    if (t === '24H') {
      setLabelTime('7D');
    }
    if (t === '7D') {
      setLabelTime('14D');
    }
    if (t === '14D') {
      setLabelTime('30D');
    }
    if (t === '30D') {
      setLabelTime('24H');
    }
  };

  // Handle Watch List Menu
  const [watchListMenu, setWatchListMenu] = useState(null);
  const watchListMenuOpen = Boolean(watchListMenu);

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

  return (
    <>
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
            sx={{ color: 'gray', fontWeight: 700, fontSize: '15px' }}
          >
            Add New Alert
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={() => setOpenAddAlertModal(false)}
            sx={{ color: 'gray', marginRight: '.75rem' }}
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
                <span style={{ fontSize: '15px', color: 'gray', fontWeight: 500 }}>
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
            sx={{ color: 'gray' }}
            onClick={() => setOpenAddAlertModal(false)}
          >
            Close
          </Button>
          <Button variant="contained">Add Alert</Button>
        </DialogActions>
      </Dialog>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <span style={{ fontSize: '11px', color: 'blue' }}> Refresh </span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <span style={{ fontSize: '11px', color: 'red' }}> Remove </span>
        </MenuItem>
      </Menu>
      <Head>
        <title> General: E-commerce | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <SKUMarquee />

        <Grid sx={{ marginTop: '30px' }} container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item lg={4} md={6} xs={6}>
                      <div>
                        <Image width={50} height={50} src={Basket} alt="" />
                      </div>
                    </Grid>
                    <Grid item lg={8} md={6} xs={6}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <Image width={50} height={30} src={SFlagRing} alt="" />
                          <p style={{ lineHeight: '3px', fontSize: '12px' }}> N35997789A </p>
                          <p style={{ color: 'green', fontSize: '11px', lineHeight: '3px' }}>
                            {' '}
                            <BsArrowUpShort /> 4.40%{' '}
                          </p>
                        </div>
                        <div>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            <BsThreeDots style={{ fontSize: '14px' }} />
                          </IconButton>
                        </div>
                      </div>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                          <p style={{ fontSize: '12px', color: 'gray' }}>
                            {' '}
                            Buybox Sale Price <br />{' '}
                            <span style={{ fontSize: '10px' }}> SAR 185 </span>
                          </p>
                        </div>
                        <div>
                          <Image width={60} height={60} src={lineChart} alt="" />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              <Grid item sx={{ justifyContent: 'center', alignItems: 'center' }} xs={12} md={4}>
                <Card sx={{ p: 2, cursor: 'pointer' }}>
                  <Box
                    sx={{
                      height: '139px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    aria-controls={openAddAlertModal && 'basic-menu'}
                    aria-haspopup="true"
                    aria-expanded={openAddAlertModal && 'true'}
                    onClick={() => setOpenAddAlertModal(true)}
                  >
                    <Typography
                      sx={{ textAlign: 'center', color: 'gray', fontSize: '18px' }}
                      component="p"
                    >
                      <BsPlusLg /> <br />
                      Add New Alert
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item lg={4} md={6} xs={6}>
                      <div>
                        <Image width={50} height={50} src={Basket} alt="" />
                      </div>
                    </Grid>
                    <Grid item lg={8} md={6} xs={6}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <Image width={50} height={30} src={SFlagRing} alt="" />
                          <p style={{ lineHeight: '3px', fontSize: '12px' }}> N35997789A </p>
                          <p style={{ color: 'green', fontSize: '11px', lineHeight: '3px' }}>
                            {' '}
                            <BsArrowUpShort /> 4.40%{' '}
                          </p>
                        </div>
                        <div>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            <BsThreeDots style={{ fontSize: '14px' }} />
                          </IconButton>
                        </div>
                      </div>
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                          <p style={{ fontSize: '12px', color: 'gray' }}>
                            {' '}
                            Buybox Sale Price <br />{' '}
                            <span style={{ fontSize: '10px' }}> SAR 185 </span>
                          </p>
                        </div>
                        <div>
                          <Image width={60} height={60} src={lineChart} alt="" />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              <Grid item xs={12} md={12} lg={12}>
                <EcommerceYearlySales
                  title="Yearly Sales"
                  subheader="(+43%) than last year"
                  chart={{
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    series: [
                      {
                        year: '2019',
                        data: [
                          { name: 'Total Income', data: [10, 41, 35, 131, 49, 62, 69, 91, 48] },
                          { name: 'Total Expenses', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                        ],
                      },
                      {
                        year: '2020',
                        data: [
                          { name: 'Total Income', data: [138, 91, 69, 62, 49, 51, 35, 41, 10] },
                          { name: 'Total Expenses', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                        ],
                      },
                    ],
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Link
                  style={{
                    textDecoration: 'none',
                    color: 'gray',
                    marginRight: 'auto',
                    fontSize: '13px',
                  }}
                  href=""
                >
                  My Watchlist
                </Link>
                <Link
                  style={{
                    textDecoration: 'none',
                    color: 'blue',
                    marginLeft: 'auto',
                    marginLeft: '209px',
                    fontSize: '13px',
                  }}
                  href=""
                >
                  See Watchlist
                </Link>
              </div>
              <Grid container sx={{ justifyContent: 'center', marginY: '6px' }} spacing={2}>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
                    <Image height={40} width={50} src={Basket} alt="" />
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <BsThreeDots style={{ fontSize: '14px' }} />
                    </IconButton>
                  </div>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image height={20} width={50} src={SFlagRing} alt="" />
                  </div>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'blue' }}>N35997789A</p>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'gray' }}>Tomme Tippee</p>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <Typography sx={{ fontSize: '12px', color: 'gray' }} variant="p" component="p">
                    SAR <br /> 70 <br /> 10%
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ justifyContent: 'center', marginY: '6px' }} spacing={2}>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image height={40} width={50} src={Basket} alt="" />
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <BsThreeDots style={{ fontSize: '14px' }} />
                    </IconButton>
                  </div>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image height={20} width={50} src={SFlagRing} alt="" />
                  </div>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'blue' }}>N35997789A</p>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'gray' }}>Tomme Tippee</p>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <Typography sx={{ fontSize: '12px', color: 'gray' }} variant="p" component="p">
                    SAR <br /> 70 <br /> 10%
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ justifyContent: 'center', marginY: '6px' }} spacing={2}>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image height={40} width={50} src={Basket} alt="" />
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <BsThreeDots style={{ fontSize: '14px' }} />
                    </IconButton>
                  </div>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image height={20} width={50} src={SFlagRing} alt="" />
                  </div>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'blue' }}>N35997789A</p>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'gray' }}>Tomme Tippee</p>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <Typography sx={{ fontSize: '12px', color: 'gray' }} variant="p" component="p">
                    SAR <br /> 70 <br /> 10%
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ justifyContent: 'center', marginY: '6px' }} spacing={2}>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image height={40} width={50} src={Basket} alt="" />
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <BsThreeDots style={{ fontSize: '14px' }} />
                    </IconButton>
                  </div>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image height={20} width={50} src={SFlagRing} alt="" />
                  </div>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'blue' }}>N35997789A</p>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'gray' }}>Tomme Tippee</p>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <Typography sx={{ fontSize: '12px', color: 'gray' }} variant="p" component="p">
                    SAR <br /> 70 <br /> 10%
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ justifyContent: 'center', marginY: '6px' }} spacing={2}>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image height={40} width={50} src={Basket} alt="" />
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <BsThreeDots style={{ fontSize: '14px' }} />
                    </IconButton>
                  </div>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image height={20} width={50} src={SFlagRing} alt="" />
                  </div>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'blue' }}>N35997789A</p>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'gray' }}>Tomme Tippee</p>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <Typography sx={{ fontSize: '12px', color: 'gray' }} variant="p" component="p">
                    SAR <br /> 70 <br /> 10%
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ justifyContent: 'center', marginY: '6px' }} spacing={2}>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image height={40} width={50} src={Basket} alt="" />
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <BsThreeDots style={{ fontSize: '14px' }} />
                    </IconButton>
                  </div>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image height={20} width={50} src={SFlagRing} alt="" />
                  </div>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'blue' }}>N35997789A</p>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'gray' }}>Tomme Tippee</p>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <Typography sx={{ fontSize: '12px', color: 'gray' }} variant="p" component="p">
                    SAR <br /> 70 <br /> 10%
                  </Typography>
                </Grid>
              </Grid>
              <Grid container sx={{ justifyContent: 'center', marginY: '6px' }} spacing={2}>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image height={40} width={50} src={Basket} alt="" />
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <BsThreeDots style={{ fontSize: '14px' }} />
                    </IconButton>
                  </div>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image height={20} width={50} src={SFlagRing} alt="" />
                  </div>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'blue' }}>N35997789A</p>
                  <p style={{ fontSize: '11px', lineHeight: '5px', color: 'gray' }}>Tomme Tippee</p>
                </Grid>
                <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                  <Typography sx={{ fontSize: '12px', color: 'gray' }} variant="p" component="p">
                    SAR <br /> 70 <br /> 10%
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Card sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item lg={4} md={6} xs={6}>
                  <div>
                    <Image width={50} height={50} src={Basket} alt="" />
                  </div>
                </Grid>
                <Grid item lg={8} md={6} xs={6}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <Image width={50} height={30} src={SFlagRing} alt="" />
                      <p style={{ lineHeight: '3px', fontSize: '12px' }}> N35997789A </p>
                      <p style={{ color: 'green', fontSize: '11px', lineHeight: '3px' }}>
                        {' '}
                        <BsArrowUpShort /> 4.40%{' '}
                      </p>
                    </div>
                    <div>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <BsThreeDots style={{ fontSize: '14px' }} />
                      </IconButton>
                    </div>
                  </div>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                      <p style={{ fontSize: '12px', color: 'gray' }}>
                        {' '}
                        Buybox Sale Price <br /> <span style={{ fontSize: '10px' }}> SAR 185 </span>
                      </p>
                    </div>
                    <div>
                      <Image width={60} height={60} src={lineChart} alt="" />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item sx={{ justifyContent: 'center', alignItems: 'center' }} xs={12} md={4} lg={3}>
            <Card sx={{ p: 2, cursor: 'pointer' }}>
              <Box
                sx={{
                  height: '139px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                aria-controls={openAddAlertModal && 'basic-menu'}
                aria-haspopup="true"
                aria-expanded={openAddAlertModal && 'true'}
                onClick={() => setOpenAddAlertModal(true)}
              >
                <Typography
                  sx={{ textAlign: 'center', color: 'gray', fontSize: '18px' }}
                  component="p"
                >
                  <BsPlusLg /> <br />
                  Add New Alert
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Card sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item lg={4} md={6} xs={6}>
                  <div>
                    <Image width={50} height={50} src={Basket} alt="" />
                  </div>
                </Grid>
                <Grid item lg={8} md={6} xs={6}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <Image width={50} height={30} src={SFlagRing} alt="" />
                      <p style={{ lineHeight: '3px', fontSize: '12px' }}> N35997789A </p>
                      <p style={{ color: 'green', fontSize: '11px', lineHeight: '3px' }}>
                        {' '}
                        <BsArrowUpShort /> 4.40%{' '}
                      </p>
                    </div>
                    <div>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <BsThreeDots style={{ fontSize: '14px' }} />
                      </IconButton>
                    </div>
                  </div>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                      <p style={{ fontSize: '12px', color: 'gray' }}>
                        {' '}
                        Buybox Sale Price <br /> <span style={{ fontSize: '10px' }}> SAR 185 </span>
                      </p>
                    </div>
                    <div>
                      <Image width={60} height={60} src={lineChart} alt="" />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item sx={{ justifyContent: 'center', alignItems: 'center' }} xs={12} md={4} lg={3}>
            <Card sx={{ p: 2, cursor: 'pointer' }}>
              <Box
                sx={{
                  height: '139px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                aria-controls={openAddAlertModal && 'basic-menu'}
                aria-haspopup="true"
                aria-expanded={openAddAlertModal && 'true'}
                onClick={() => setOpenAddAlertModal(true)}
              >
                <Typography
                  sx={{ textAlign: 'center', color: 'gray', fontSize: '18px' }}
                  component="p"
                >
                  <BsPlusLg /> <br />
                  Add New Alert
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid lg={8} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={4} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={12} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={4} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={8} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid lg={6} item md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Card>
              <CardHeader title="Custom" sx={{ mb: 2 }} />
              <Box sx={{ height: 500 }}>
                <DataGridCustom data={_dataGrid} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

// import React from 'react';

// const ecommerce = () => {
//   return <div>this is ecommerce page</div>;
// };

// export default ecommerce;
