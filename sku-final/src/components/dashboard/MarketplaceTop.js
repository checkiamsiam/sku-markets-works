import AddIcon from '@mui/icons-material/Add';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
  Backdrop,
  Box,
  Button,
  Card,
  Chip,
  Fade,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Stack,
  TablePagination,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import ChartForDashboardCard from 'components/chart/ChartForDashboard';
import LoadingOverlay from 'components/common/LoadingOverlay';
import MPLogo from 'components/common/MPLogo';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { useGetAlertsQuery } from 'features/alert/alertAPI';
import {
  useCreateWatchListMutation,
  useGetAllWatchListsQuery,
  useGetWatchListDetailQuery,
  useRemoveProductInWatchListMutation,
} from 'features/watchList/watchListAPI';
import { useEffect, useState } from 'react';
import { BsArrowUpShort, BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { EcommerceYearlySales } from 'sections/@deshboard/general/e-commerce';
import SFlagRing from '../../assets/images/noon-saudi.svg';

const gray = 'text.main';
const lightGray = '#0d6efd';
const borderColor = '#EFF2F5';
const ITEM_HEIGHT = 48;
const logic = '';
const fields =
  'watchList_id,sku_marketplace,sku,current_price,all_images,brand_en,buy_box_currency,supply_percentage';

const MarketplaceTop = () => {
  const theme = useTheme();
  const [target, setTarget] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event, id) => {
    setTarget(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //   handle pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  /* For see my watchlist */
  const { data, isLoading, isSuccess, refetch: getWAgain } = useGetAllWatchListsQuery();
  const [removePdFromWatchlist] = useRemoveProductInWatchListMutation();
  const [anchorEw, setAnchorEw] = useState(false);
  const openW = Boolean(anchorEw);
  const handleClickWatchlist = (event) => {
    setAnchorEw(event.currentTarget);
  };
  const handleCloseClickWatchlist = () => {
    setAnchorEw(null);
  };
  const [view, setView] = useState(null);

  const query = `${view?._id}?${logic}&page=${page + 1}&limit=${rowsPerPage}&fields=${fields}`;
  const {
    data: watchlistDetail,
    isLoading: wdLoading,
    isFetching,
    isSuccess: isgetDetail,
    refetch: refetchDetail,
  } = useGetWatchListDetailQuery(query, { skip: isLoading });

  const handleSelectWatchlist = async (view) => {
    setView(view);
    await refetchDetail();
    handleCloseClickWatchlist();
  };

  const handleRemovePd = async () => {
    await removePdFromWatchlist(`${view?._id}/product/${target}`);
    handleClose();
  };

  const [createWatchList] = useCreateWatchListMutation();
  /* New */
  const [newD, setNewD] = useState('');
  const [openNew, setOpenNew] = useState(false);
  const handleCloseNewD = () => setOpenNew(false);
  const handleShowNewD = () => setOpenNew(true);

  const handleCreate = async () => {
    await createWatchList({ name: newD });
    await getWAgain();
    setNewD('');
    handleCloseNewD();
  };

  useEffect(() => {
    if (!view) {
      setView(data?.[0]);
    }
  }, [data, view]);

  // For Alert
  const { data: alertD, refetch } = useGetAlertsQuery();
  // Pop -Up Remove
  const [openRemoveAlert, setOpenRemoveAlert] = useState(false);
  const handleCloseAlertRemove = () => setOpenRemoveAlert(false);
  const handleShowAlertRemove = () => setOpenRemoveAlert(true);

  if (isLoading || wdLoading || !isSuccess) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Grid item xs={12} md={6} lg={8}>
        <Grid container spacing={2}>
          {alertD?.alerts?.slice(0, 3).map((alrt) => (
            <Grid key={alrt?._id} item xs={12} md={4}>
              <Card sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item lg={4} md={6} xs={6}>
                    <div>
                      <img width={50} height={50} src={alrt?.product?.all_images[0]} alt="" />
                    </div>
                  </Grid>
                  <Grid item lg={8} md={6} xs={6}>
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box>
                        <Box
                          component={Link}
                          sx={{ textdecoration: 'none' }}
                          to={`/marketplace/${1}`}
                        >
                          <img width={50} height={30} src={SFlagRing} alt="marketplace" />
                        </Box>
                        <Typography
                          component={Link}
                          sx={{
                            fontSize: '12px',
                            color: '#2065D1',
                            textDecoration: 'none',
                            lineHeight: '1px',
                          }}
                          to={`/product/${1}`}
                        >
                          {' '}
                          {alrt?.sku}{' '}
                        </Typography>
                        <Typography
                          style={{
                            color: 'green',
                            fontSize: '11px',
                            lineHeight: '1px',
                          }}
                        >
                          <BsArrowUpShort /> 4.40%
                        </Typography>
                      </Box>
                      <Box>
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
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '12px', color: 'text.main' }}>
                          {' '}
                          Buybox Sale Price <br />{' '}
                          <span style={{ fontSize: '10px' }}> SAR {alrt?.price} </span>
                        </p>
                      </div>
                      <div>
                        <ChartForDashboardCard
                          chart={{
                            colors: ['#F76F72'],
                            series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                          }}
                        />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12} md={12} lg={12}>
            <EcommerceYearlySales
              title="Estimated Marketplaces Status"
              subheader="(+43%) than last year"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    year: '2022',
                    data: [
                      {
                        name: 'SKU Markets',
                        data: [10, 41, 35, 131, 49, 62, 69, 91, 48],
                      },
                      {
                        name: 'Noon SKUs',
                        data: [10, 34, 13, 56, 77, 88, 99, 77, 45],
                      },
                      {
                        name: 'Amazon SKUs',
                        data: [5, 64, 31, 58, 71, 88, 99, 77, 95],
                      },
                    ],
                  },
                  {
                    year: '2023',
                    data: [
                      {
                        name: 'SKU Markets',
                        data: [138, 91, 69, 62, 49, 51, 35, 41, 10],
                      },
                      {
                        name: 'Noon SKUs',
                        data: [45, 77, 99, 88, 77, 56, 13, 34, 10],
                      },
                      {
                        name: 'Amazon SKUs',
                        data: [35, 87, 79, 88, 77, 65, 13, 43, 10],
                      },
                    ],
                  },
                ],
                colors: ['#6190E6', '#F7F700', '#FF9900'],
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12} lg={4}>
        {isgetDetail ? (
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Link
                style={{
                  textDecoration: 'none',
                  color: '#0072E5',
                  fontSize: '13px',
                }}
                to="/watchlist"
              >
                My Watchlist
              </Link>
              <div>
                <Button
                  id="fade-button"
                  aria-controls={openW ? 'fade-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openW ? 'true' : undefined}
                  onClick={handleClickWatchlist}
                >
                  See Watchlist
                </Button>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                  anchorEl={anchorEw}
                  open={openW}
                  onClose={handleCloseClickWatchlist}
                  TransitionComponent={Fade}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      minWidth: '200',
                    },
                  }}
                >
                  {data?.map((mi) => (
                    <MenuItem key={mi._id} onClick={() => handleSelectWatchlist(mi)}>
                      {mi.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            <Box sx={{ height: '350px', overflowX: 'auto' }}>
              {isFetching ? (
                <LoadingOverlay />
              ) : (
                <>
                  {watchlistDetail?.data &&
                    watchlistDetail?.data.map((list) => (
                      <Grid
                        key={list.id}
                        container
                        sx={{ justifyContent: 'center', marginY: '2px' }}
                        spacing={2}
                      >
                        <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <img height={40} width={50} src={list?.all_images[0]} alt="" />
                            <IconButton
                              aria-label="more"
                              id="long-button"
                              aria-controls={open ? 'long-menu' : undefined}
                              aria-expanded={open ? 'true' : undefined}
                              aria-haspopup="true"
                              onClick={(e) => handleClick(e, list.id)}
                            >
                              <BsThreeDots style={{ fontSize: '14px' }} />
                            </IconButton>
                          </div>
                        </Grid>
                        <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <MPLogo marketplace={list?.sku_marketplace} />
                          </div>
                          <Link to={`/product/${list?.id}`} style={{ textDecoration: 'none' }}>
                            <p style={{ fontSize: '11px', lineHeight: '5px', color: '#0072E5' }}>
                              {list?.sku}
                            </p>
                          </Link>
                          <Link to={`/brand/${list?.brand_en}`} style={{ textDecoration: 'none' }}>
                            <p style={{ fontSize: '11px', lineHeight: '5px', color: '#0072E5' }}>
                              {list?.brand_en}
                            </p>
                          </Link>
                        </Grid>
                        <Grid sx={{ justifyContent: 'center' }} item lg={4} md={4} xs={4}>
                          <Typography
                            sx={{ fontSize: '12px', color: 'text.main' }}
                            variant="p"
                            component="p"
                          >
                            {list?.buy_box_currency} <br /> {list?.current_price} <br />{' '}
                            <span style={{ color: 'green' }}>
                              {parseInt(list?.supply_percentage)}%
                            </span>
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                </>
              )}
            </Box>

            <TablePagination
              component="div"
              count={watchlistDetail?.total || 50}
              rowsPerPageOptions={[4, 10, 50]}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        ) : (
          <Box
            boxShadow={5}
            borderRadius={2}
            padding={7}
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
            }}
          >
            <Typography textAlign="center" fontSize="20px" fontWeight="500">
              You currently have no watchlist
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              sx={{ padding: '3px 40px', mt: 2 }}
              button
            >
              <div onClick={handleShowNewD}>
                <Chip
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: lightGray,
                    color: 'white',
                  }}
                  icon={
                    <AddIcon
                      style={{
                        fontSize: '1.4rem',
                        color: 'white',
                      }}
                    />
                  }
                  label="Create Watchlist"
                  variant="outlined"
                />
              </div>
            </Stack>
          </Box>
        )}
      </Grid>

      {alertD?.alerts?.slice(1, 5).map((alrt) => (
        <Grid key={alrt?._id} item xs={12} md={3}>
          <Card sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item lg={4} md={6} xs={6}>
                <div>
                  <img width={50} height={50} src={alrt?.product?.all_images[0]} alt="" />
                </div>
              </Grid>
              <Grid item lg={8} md={6} xs={6}>
                <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Box component={Link} sx={{ textdecoration: 'none' }} to={`/marketplace/${1}`}>
                      <img width={50} height={30} src={SFlagRing} alt="marketplace" />
                    </Box>
                    <Typography
                      component={Link}
                      sx={{
                        fontSize: '12px',
                        color: '#2065D1',
                        textDecoration: 'none',
                        lineHeight: '1px',
                      }}
                      to={`/product/${1}`}
                    >
                      {alrt?.sku}{' '}
                    </Typography>
                    <Typography
                      style={{
                        color: 'green',
                        fontSize: '11px',
                        lineHeight: '1px',
                      }}
                    >
                      <BsArrowUpShort /> 4.40%
                    </Typography>
                  </Box>
                  <Box>
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
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={12} md={12} xs={12}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: 'text.main' }}>
                      {' '}
                      Buybox Sale Price <br />{' '}
                      <span style={{ fontSize: '10px' }}> SAR {alrt?.price} </span>
                    </p>
                  </div>
                  <div>
                    <ChartForDashboardCard
                      chart={{
                        colors: ['#F76F72'],
                        series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                      }}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
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
        <MenuItem onClick={handleRemovePd}>
          <span style={{ fontSize: '11px', color: 'red' }}> Remove </span>
        </MenuItem>
      </Menu>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openNew}
        onClose={handleCloseNewD}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openNew}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { md: '40vw', xs: '90vw', sm: '90vw' },
              borderRadius: 2,
              boxShadow: 0,
              bgcolor: 'background.paper',
              px: 3,
              py: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Typography id="transition-modal-title" variant="h6" component="h2">
                New watchlist
              </Typography>
              <IconButton sx={{ color: 'text.main' }} onClick={handleCloseNewD}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              sx={{ mt: 2, mb: 5 }}
              id="outlined-basic"
              label="Enter Watchlist Title"
              variant="outlined"
              value={newD}
              onChange={(e) => {
                setNewD(e.target.value);
              }}
            />
            <Box sx={{ textAlign: 'end', mb: 2 }}>
              <Button variant="outlined" sx={{ color: 'text.main' }} onClick={handleCloseNewD}>
                Cancel
              </Button>
              <Button
                sx={{
                  bgcolor: 'primary.main',
                  color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                  '&:hover': {
                    bgcolor: 'white',
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  },
                  mx: 2,
                }}
                onClick={handleCreate}
                disabled={newD.length === 0 || isLoading}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default MarketplaceTop;
