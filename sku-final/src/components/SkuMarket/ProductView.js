import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  Menu,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import {
  AiFillBell,
  AiFillSecurityScan,
  AiFillStar,
  AiOutlineBell,
  AiOutlinePlusCircle,
  AiOutlineStar,
  AiOutlineTags,
  AiOutlineWarning,
} from 'react-icons/ai';
import { GoVerified } from 'react-icons/go';
import logo from '../../assets/images/svg/SKU Market Patt 20x15-01.png';

import { BsShop } from 'react-icons/bs';
import { RiExchangeFundsFill, RiSecurePaymentFill } from 'react-icons/ri';

import { TbTruckDelivery } from 'react-icons/tb';

import CloseIcon from '@mui/icons-material/Close';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Stack } from '@mui/system';
import CustomBadge from 'components/common/CustomBadge/CustomBadge';
import MPLogo from 'components/common/MPLogo';
import CustomBreadcrumbs from 'components/custom-breadcrumbs/CustomBreadcrumbs';
import Iconify from 'components/iconify/Iconify';
import Label from 'components/label/Label';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import AddAlertOnPD from 'components/productDetails/addAlertModal';
import WatchlistName from 'components/productDetails/WatchlistName';
import Scrollbar from 'components/scrollbar/Scrollbar';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import { NAV } from 'config-global';
import {
  useGetAllProductSellersQuery,
  useGetProductDetailQuery,
} from 'features/product/productAPI';
import {
  useAddKeywordAnalyticsMutation,
  useAddUserHistoryMutation,
} from 'features/searchHistory/searchHistoryAPI';
import {
  useCheckAlertForSkuQuery,
  useCheckWatchlistForSkuQuery,
} from 'features/userSku/userSkuAPI';
import { addVisitedSku } from 'features/visitedSkus/visitedSkus';
import {
  useCreateWatchListMutation,
  useGetAllWatchListsQuery,
} from 'features/watchList/watchListAPI';
import { BackSide, Flippy, FrontSide } from 'react-flippy';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { ProductDetailsReview } from 'sections/@deshboard/Sku-Market/details';
import SkuStatusCharts from './FlipBackCart';
import PdRFQ from './PdRFQ';
import ProductDetailsCarousel from './ProductDetailsCarousel';
import ProductOverView from './ProductOverView';

const ProductView = () => {
  const theme = useTheme();
  const [flip, setFlip] = useState(false);
  const flipRef = useRef(null);
  const handleFlip = () => {
    flipRef.current.toggle();
    setFlip(!flip);
  };

  const [openRFQ, setOpenRFQ] = useState(false);
  const handleCloseRFQ = () => setOpenRFQ(false);
  const handleShowRFQ = () => setOpenRFQ(true);

  const [qty, setQty] = useState(0);
  const [unit, setUnit] = useState(0);
  const [qtyError, setQtyError] = useState(false);
  const [unitError, setUnitError] = useState(false);

  const { id, sellerId: currentSellerId } = useParams();
  const { data: product, isLoading: isLoadingProduct, isSuccess } = useGetProductDetailQuery(id);
  const { data: productWatchlist } = useCheckWatchlistForSkuQuery(id);
  const { data: productAlert } = useCheckAlertForSkuQuery(id);

  const { data: sellerIds } = useGetAllProductSellersQuery(id);

  let location = useLocation();
  const navigate = useNavigate();
  const loggedInUserId = useSelector((state) => state.user._id);

  const handleValidate = () => {
    if (loggedInUserId == '') {
      navigate('/login', { state: { from: location }, replace: true });
    } else if (qty <= 0) {
      setQtyError(true);
    } else if (unit <= 0) {
      setUnitError(true);
    } else {
      handleShowRFQ();
    }
  };
  const [currentTab, setCurrentTab] = useState('OverView');

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const TABS = [
    {
      value: 'OverView',
      label: 'OverView',
      component: (
        <ProductOverView
          title={product?.title_en}
          type={product?.category_en}
          subType={product?.sku_sub_type_en}
          description={product?.description_en}
        />
      ),
    },
    {
      value: 'Review',
      label: 'Review',
      component: <ProductDetailsReview rating={product?.sku_rate} rank={product?.sku_rank} />,
    },
  ];

  // let [image, setImage] = useState();
  const [openAddAlertModal, setOpenAddAlertModal] = useState(false);
  const handleCloseNewAdd = () => setOpenAddAlertModal(false);
  const handleShowNewAdd = () => setOpenAddAlertModal(true);

  const [labelTime, setLabelTime] = useState('24H');
  const [lowPrice, setLowPrice] = useState(product?.getTopBottomPrice?.bottomPrice?.last24Hours);
  const [highPrice, setHighPrice] = useState(product?.getTopBottomPrice?.topPrice?.last24Hours);
  const [progress, setProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const handleLabelTime = (t) => {
    if (t === '24H') {
      setLabelTime('07D');
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last24Hours);
      setHighPrice(product?.getTopBottomPrice?.topPrice?.last24Hours);
    }
    if (t === '07D') {
      setLabelTime('14D');
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last7Days);
      setHighPrice(product?.getTopBottomPrice?.topPrice?.last7Days);
    }
    if (t === '14D') {
      setLabelTime('30D');
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last2Weeks);
      setHighPrice(product?.getTopBottomPrice?.topPrice?.last2Weeks);
    }
    if (t === '30D') {
      setLabelTime('24H');
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last30Days);
      setHighPrice(product?.getTopBottomPrice?.topPrice?.last30Days);
    }
  };

  useEffect(() => {
    if (labelTime === '07D') {
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last7Days);
      setHighPrice(product?.getTopBottomPrice?.topPrice?.last7Days);
    } else if (labelTime === '14D') {
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last2Weeks);
      setHighPrice(product?.getTopBottomPrice?.topPrice?.last2Weeks);
    } else if (labelTime === '30D') {
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last30Days);
      setHighPrice(product?.getTopBottomPrice?.topPrice?.last30Days);
    } else {
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last24Hours);
      setHighPrice(product?.getTopBottomPrice?.topPrice?.last24Hours);
    }

    if (product?.current_price === lowPrice && product?.current_price === highPrice) {
      setProgress(50);
      setPercentage(0);
    } else {
      const dbhl = highPrice - lowPrice;
      const dblc = product?.current_price - lowPrice;
      const per = (dblc * 100) / dbhl;
      setProgress(parseInt(per));
      if (product?.current_price === lowPrice && product?.current_price !== highPrice) {
        const diff = product?.current_price - lowPrice;
        const per = (diff * 100) / lowPrice;
        setPercentage(-per.toFixed(2));
      } else if (product?.current_price !== lowPrice && product?.current_price === highPrice) {
        const diff = highPrice - product?.current_price;
        const per = (diff * 100) / highPrice;
        setPercentage(per.toFixed(2));
      } else if (
        Math.ceil(product?.current_price - lowPrice) ===
        Math.ceil(highPrice - product?.current_price)
      ) {
        setPercentage(50);
      } else if (product?.current_price - lowPrice > highPrice - product?.current_price) {
        const diff = highPrice - product?.current_price;
        const per = (diff * 100) / highPrice;
        setPercentage(per.toFixed(2));
      } else {
        const diff = product?.current_price - lowPrice;
        const per = (diff * 100) / lowPrice;
        setPercentage(-per.toFixed(2));
      }
    }
  }, [labelTime, product, lowPrice, highPrice]);

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (openAddAlertModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openAddAlertModal]);

  const { data, refetch, isSuccess: isSuccessWatchlist } = useGetAllWatchListsQuery();

  const [watchListMenu, setWatchListMenu] = useState(null);
  const watchListMenuOpen = Boolean(watchListMenu);

  const handleStarClick = (event) => {
    setWatchListMenu(event.currentTarget);
  };
  const handleStarClose = () => {
    setWatchListMenu(null);
  };

  const [watchListModal, setWatchListModal] = useState(false);

  const handleWatchListModalOpen = () => {
    setWatchListModal(true);
  };

  const handleWatchListModalClose = () => {
    setWatchListModal(false);
  };

  const [createWatchList, { isLoading }] = useCreateWatchListMutation();
  const [title, setTitle] = useState('');

  const handleCreate = async () => {
    await createWatchList({ name: title });
    refetch();
    setTitle('');
    handleWatchListModalClose();
  };

  useEffect(() => {
    if (isSuccess) {
      setLowPrice(product?.getTopBottomPrice?.bottomPrice?.last24Hours);
      setHighPrice(product?.getTopBottomPrice?.topPrice?.last24Hours);
    }
  }, [isSuccess]);

  const sortSellers = (sellerIdsData) => {
    if (sellerIdsData) {
      if (sellerIdsData?.data?.length != 0) {
        const currentSellerIndex = sellerIdsData.data?.findIndex((a) => a.id == currentSellerId);

        if (currentSellerIndex != -1 && currentSellerIndex != 0) {
          return {
            ...sellerIdsData,
            data: [
              sellerIdsData.data[currentSellerIndex],
              ...sellerIdsData.data?.slice(0, currentSellerIndex),
              ...sellerIdsData.data?.slice(currentSellerIndex + 1),
            ],
          };
        } else {
          return sellerIdsData;
        }
      }
    }
  };

  const [addKeywordAnalytics] = useAddKeywordAnalyticsMutation();

  // For Search Analytics
  useEffect(() => {
    if (location.state && location.state.keyword) {
      addKeywordAnalytics({ keyword: location.state.keyword, productId: id });
    }
  }, [location.state]);

  const [addUserSearchHistory] = useAddUserHistoryMutation();

  // For Recently Visited SKUs
  useEffect(() => {
    if (loggedInUserId) {
      addUserSearchHistory({ productId: id });
    } else {
      addVisitedSku(id);
    }
  }, [id]);

  if (isLoadingProduct) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Stack>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Home',
              href: '/',
            },
            {
              name: 'SKU Category',
              href: `/skuMarket_category?name=${product?.category_en}&marketplace=${product?.sku_marketplace}`,
            },
            {
              name: 'SKU Type',
              disable: true,
            },
            {
              name: 'SKU Sub-Type',
              disable: true,
            },
          ]}
        />
      </Stack>
      <Grid container sx={{ my: 1 }} spacing={2}>
        {/* product img section */}
        <Grid item lg={4} xs={12} md={4}>
          <Card sx={{ p: 3, height: { md: '550px' } }}>
            <ProductDetailsCarousel product={{ images: product?.all_images }} />
          </Card>
        </Grid>
        {/* product img section end */}

        {/* product details section*/}
        <Grid item lg={4} xs={12} md={4}>
          <Flippy
            style={{
              height: '395px',
            }}
            ref={flipRef}
            flipOnHover={false}
            flipOnClick={false}
            flipDirection="horizontal"
          >
            <FrontSide
              style={{
                borderRadius: '10px',
                backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
              }}
            >
              <>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box>
                    <IconButton
                      variant="text"
                      id="star-button"
                      aria-controls={watchListMenuOpen && 'basic-menu'}
                      aria-expanded={watchListMenuOpen && 'true'}
                      onClick={handleStarClick}
                      sx={{
                        fontSize: '20px',
                        '&:hover': {
                          border: '1px solid #0d6efd',
                          transition: '0.7s',
                        },
                        border: '1px solid transparent',
                      }}
                    >
                      {productWatchlist?.data.length > 0 ? (
                        <AiFillStar style={{ color: '#0d6efd' }} />
                      ) : (
                        <AiOutlineStar style={{ color: '#0d6efd' }} />
                      )}
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton
                      aria-controls={openAddAlertModal && 'basic-menu'}
                      aria-expanded={openAddAlertModal && 'true'}
                      onClick={handleShowNewAdd}
                      sx={{
                        fontSize: '20px',
                        '&:hover': {
                          border: '1px solid #0d6efd',
                          transition: '0.7s',
                        },
                        border: '1px solid transparent',
                      }}
                    >
                      {productAlert?.data.length > 0 ? (
                        <AiFillBell style={{ color: '#0d6efd' }} />
                      ) : (
                        <AiOutlineBell style={{ color: '#0d6efd' }} />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box>
                    <Typography
                      component={NavLink}
                      to={`/skuMarket?brand=${encodeURIComponent(
                        product?.brand_en
                      )}&marketplace=${encodeURIComponent(product?.sku_marketplace)}`}
                      sx={{
                        fontSize: '12px',
                        textDecoration: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'black' : 'common.white',
                        fontWeight: 'bold',
                      }}
                    >
                      {product?.brand_en}
                    </Typography>
                    <br />
                    <Typography
                      // component={NavLink}
                      // to={`/skuMarket?category=${encodeURIComponent(
                      //   product?.category_en
                      // )}&marketplace=${encodeURIComponent(product?.sku_marketplace)}`}
                      sx={{
                        fontSize: '14px',
                        textDecoration: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'black' : 'common.white',
                        fontWeight: 'bold',
                      }}
                    >
                      {product?.sku}
                    </Typography>
                    <Typography
                      component={NavLink}
                      to={`/skuMarket?category=${encodeURIComponent(
                        product?.category_en
                      )}&marketplace=${encodeURIComponent(product?.sku_marketplace)}`}
                      sx={{
                        fontSize: '12px',
                        textDecoration: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'black' : 'common.white',
                        fontWeight: 'bold',
                        marginTop: '-8px',
                      }}
                    >
                      {product?.category_en}
                    </Typography>
                  </Box>
                  <Link
                    to={`/skuMarket?marketplace=${encodeURIComponent(product?.sku_marketplace)}`}
                  >
                    <img
                      src={`/assets/images/marketplace/${product?.sku_marketplace
                        .split('/')
                        ?.join('-')
                        ?.toLowerCase()}.jpeg`}
                      alt={product?.sku_marketplace.replace('/', '-')}
                      style={{
                        height: `20px`,
                        width: `50px`,
                        display: 'inline-block',
                      }}
                    />
                  </Link>
                </Box>
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '15px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    textDecoration: 'underline',
                    mt: 1,
                    color: '#0d6efd',
                  }}
                  onClick={handleFlip}
                >
                  {flip ? 'SKU Statistics' : 'SKU Status'}
                </Typography>
                <Typography
                  sx={{ fontSize: '12px', textAlign: 'center', fontWeight: 'bold' }}
                  component="p"
                >
                  Buybox Sale Price
                </Typography>
                <Typography sx={{ fontSize: '12px', textAlign: 'center', py: '5px' }} component="p">
                  {`${product?.buy_box_currency} ${product?.current_price ?? 0}`}{' '}
                  <span
                    style={{
                      marginLeft: '5px',
                      color: percentage >= 0 ? (percentage === 0 ? lightGray : 'green') : 'red',
                    }}
                  >
                    {percentage} %
                  </span>
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                  fontSize="12px"
                  sx={{ mb: '5px' }}
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
                      value={progress}
                      sx={{
                        padding: '1px',
                        borderRadius: '5px',
                        bgcolor: '#D3D3D3',
                        margin: '2px 0px',
                      }}
                    />
                    <Stack direction="row" paddingTop="5px" justifyContent="space-between">
                      <span>{`${product?.buy_box_currency} ${lowPrice}`}</span>
                      <span>{`${product?.buy_box_currency} ${highPrice}`}</span>
                    </Stack>
                  </Stack>
                </Stack>

                <Grid container spacing={2}>
                  <Grid item lg={3} md={3} xs={3}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          py: '5px',
                        }}
                        component="p"
                      >
                        SKU Status
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          py: '5px',
                        }}
                        component="p"
                      >
                        DOH
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          py: '5px',
                        }}
                        component="p"
                      >
                        ENR
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          py: '5px',
                        }}
                        component="p"
                      >
                        Stores
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          py: '5px',
                        }}
                        component="p"
                      >
                        Estimated SOH
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          py: '5px',
                        }}
                        component="p"
                      >
                        Sold Units L 24H
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={3} xs={3}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          py: '5px',
                          color: product?.is_live ? 'green' : 'red',
                        }}
                        component="p"
                      >
                        {product?.is_live ? 'Live' : 'Not Live'}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '10px', textAlign: 'center', py: '5px' }}
                        component="p"
                      >
                        {product?.days_on_hand}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '10px', textAlign: 'center', py: '5px' }}
                        component="p"
                      >
                        {`${product?.buy_box_currency} ${Number(product?.est_net_revenue).toFixed(
                          2
                        )}`}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '10px', textAlign: 'center', py: '5px' }}
                        component="p"
                      >
                        {product?.stores?.length}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '10px', textAlign: 'center', py: '5px' }}
                        component="p"
                      >
                        {Number(product?.estimated_SOH).toFixed(2)}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '10px', textAlign: 'center', py: '5px' }}
                        component="p"
                      >
                        {Number(product?.sold_24_hours).toFixed(0)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={3} xs={3}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          py: '5px',
                        }}
                        component="p"
                      >
                        Max Investment
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          py: '5px',
                        }}
                        component="p"
                      >
                        Min Investment
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          py: '5px',
                        }}
                        component="p"
                      >
                        QTY to Invest
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          py: '5px',
                        }}
                        component="p"
                      >
                        E Margin
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          py: '5px',
                        }}
                        component="p"
                      >
                        Opp to stock
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          py: '5px',
                        }}
                        component="p"
                      >
                        Opp to Fulfil
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={3} md={3} xs={3}>
                    <Box>
                      <Typography
                        sx={{ fontSize: '10px', textAlign: 'center', py: '5px' }}
                        component="p"
                      >
                        {`${product?.buy_box_currency} ${Number(product?.max_investment).toFixed(
                          2
                        )}`}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '10px', textAlign: 'center', py: '5px' }}
                        component="p"
                      >
                        {`${product?.buy_box_currency} ${Number(product?.min_investment).toFixed(
                          2
                        )}`}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '10px', textAlign: 'center', py: '5px' }}
                        component="p"
                      >
                        {product?.EQTI ?? 0}
                      </Typography>
                      <Typography
                        sx={{ fontSize: '10px', textAlign: 'center', py: '5px' }}
                        component="p"
                      >
                        {`${product?.buy_box_currency} ${Number(product?.estimated_margin).toFixed(
                          2
                        )}`}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          color: product?.opp_stock ? 'green' : 'red',
                          py: '5px',
                        }}
                        component="p"
                      >
                        {product?.opp_stock ? 'YES' : 'NO'}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '10px',
                          textAlign: 'center',
                          color: product?.opp_ff ? 'green' : 'red',
                          py: '5px',
                        }}
                        component="p"
                      >
                        {product?.opp_ff ? 'YES' : 'NO'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </>
            </FrontSide>
            <BackSide
              style={{
                borderRadius: '10px',
                backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
              }}
            >
              <>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box>
                    <IconButton
                      variant="text"
                      id="star-button"
                      aria-controls={watchListMenuOpen && 'basic-menu'}
                      aria-expanded={watchListMenuOpen && 'true'}
                      onClick={handleStarClick}
                      sx={{
                        fontSize: '20px',
                        '&:hover': {
                          border: '1px solid #0d6efd',
                          transition: '0.7s',
                        },
                        border: '1px solid transparent',
                      }}
                    >
                      {productWatchlist?.data.length > 0 ? (
                        <AiFillStar style={{ color: '#0d6efd' }} />
                      ) : (
                        <AiOutlineStar style={{ color: '#0d6efd' }} />
                      )}
                    </IconButton>
                  </Box>
                  <Box>
                    <IconButton
                      aria-controls={openAddAlertModal && 'basic-menu'}
                      aria-expanded={openAddAlertModal && 'true'}
                      onClick={handleShowNewAdd}
                      sx={{
                        fontSize: '20px',
                        '&:hover': {
                          border: '1px solid #0d6efd',
                          transition: '0.7s',
                        },
                        border: '1px solid transparent',
                      }}
                    >
                      {productAlert?.data.length > 0 ? (
                        <AiFillBell style={{ color: '#0d6efd' }} />
                      ) : (
                        <AiOutlineBell style={{ color: '#0d6efd' }} />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <Box
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box>
                    <Typography
                      component={NavLink}
                      to={`/skuMarket?brand=${encodeURIComponent(
                        product?.brand_en
                      )}&marketplace=${encodeURIComponent(product?.sku_marketplace)}`}
                      sx={{
                        fontSize: '12px',
                        textDecoration: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'black' : 'common.white',
                        fontWeight: 'bold',
                      }}
                    >
                      {product?.brand_en}
                    </Typography>
                    <br />
                    <Typography
                      // component={NavLink}
                      // to={`/skuMarket?category=${encodeURIComponent(
                      //   product?.category_en
                      // )}&marketplace=${encodeURIComponent(product?.sku_marketplace)}`}
                      sx={{
                        fontSize: '14px',
                        textDecoration: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'black' : 'common.white',
                        fontWeight: 'bold',
                      }}
                    >
                      {product?.sku}
                    </Typography>
                    <Typography
                      component={NavLink}
                      to={`/skuMarket?category=${encodeURIComponent(
                        product?.category_en
                      )}&marketplace=${encodeURIComponent(product?.sku_marketplace)}`}
                      sx={{
                        fontSize: '12px',
                        textDecoration: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'black' : 'common.white',
                        fontWeight: 'bold',
                        marginTop: '-8px',
                      }}
                    >
                      {product?.category_en}
                    </Typography>
                  </Box>
                  <MPLogo marketplace={product?.sku_marketplace} />
                </Box>
                <Typography
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '15px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    textDecoration: 'underline',
                    mt: 1,
                    color: '#0d6efd',
                  }}
                  onClick={handleFlip}
                >
                  {flip ? 'SKU Statistics' : 'SKU Status'}
                </Typography>
                <SkuStatusCharts product={product} />
              </>
            </BackSide>
          </Flippy>
          <Card sx={{ p: 1, marginTop: '5px', borderRadius: '10px', height: { md: '50px' } }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack>
                <Typography sx={{ fontSize: '12px' }} component="p">
                  Order in <span style={{ fontWeight: 'bold' }}>9 Hrs 48 Mins</span>
                </Typography>
                <Typography sx={{ fontSize: '12px' }} component="p">
                  Delivered in <span style={{ fontWeight: 'bold' }}>7 Day</span>
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <img width={20} height={20} src={logo} alt="sku markets logo" />
                <ManageHistoryIcon sx={{ color: theme.palette.primary.main }} />
              </Stack>
            </Stack>
          </Card>
          <Card sx={{ p: 1, marginTop: '5px', height: { md: '143px' } }}>
            <Grid container>
              <Grid item xs={4}>
                <Typography
                  sx={{ fontSize: '12px', textAlign: 'center', fontWeight: 'bold' }}
                  component="p"
                >
                  Minimum Order QTY
                </Typography>
                <Typography
                  sx={{ fontSize: '12px', textAlign: 'center', color: '#0d6efd' }}
                  component="p"
                >
                  50 {/**TODO: NEED TO BE IMPLEMENTED LATER ON */}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{ fontSize: '12px', textAlign: 'center', fontWeight: 'bold' }}
                  component="p"
                >
                  Average Bid/Unit
                </Typography>
                <Typography
                  sx={{ fontSize: '12px', textAlign: 'center', color: '#0d6efd' }}
                  component="p"
                >
                  SAR 0 {/**TODO: NEED TO BE IMPLEMENTED LATER ON */}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{ fontSize: '12px', textAlign: 'center', fontWeight: 'bold' }}
                  component="p"
                >
                  Minimum Unit Cost
                </Typography>
                <Typography
                  sx={{ fontSize: '12px', textAlign: 'center', color: '#0d6efd' }}
                  component="p"
                >
                  SAR 0 {/**TODO: NEED TO BE IMPLEMENTED LATER ON */}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <Typography
                  sx={{ fontSize: '12px', textAlign: 'center', fontWeight: 'bold' }}
                  component="p"
                >
                  Sold Units
                </Typography>
                <Typography
                  sx={{ fontSize: '12px', textAlign: 'center', color: '#0d6efd' }}
                  component="p"
                >
                  50 {/**TODO: NEED TO BE IMPLEMENTED LATER ON */}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{ fontSize: '12px', textAlign: 'center', fontWeight: 'bold' }}
                  component="p"
                >
                  SKU Markets Rank
                </Typography>
                <Typography
                  sx={{ fontSize: '12px', textAlign: 'center', color: '#0d6efd' }}
                  component="p"
                >
                  10 {/**TODO: NEED TO BE IMPLEMENTED LATER ON */}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{ fontSize: '12px', textAlign: 'center', fontWeight: 'bold' }}
                  component="p"
                >
                  Count of Buyers
                </Typography>
                <Typography
                  sx={{ fontSize: '12px', textAlign: 'center', color: '#0d6efd' }}
                  component="p"
                >
                  98 {/**TODO: NEED TO BE IMPLEMENTED LATER ON */}
                </Typography>
              </Grid>
            </Grid>

            {currentSellerId != loggedInUserId && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  pt: 1,
                }}
              >
                <Button
                  sx={{
                    width: '90%',
                    bgcolor: 'primary.main',
                    color: (theme) =>
                      theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    '&:hover': {
                      bgcolor: 'white',
                      color: (theme) =>
                        theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                    },
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  }}
                  // size='small'
                  onClick={handleValidate}
                  disabled={sellerIds?.total == 0}
                >
                  RFQ
                </Button>
                <TextField
                  id="outlined-number"
                  type="number"
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                    setQtyError(false);
                  }}
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                    sx: { color: qtyError ? 'red' : 'text.primary' },
                  }}
                  inputProps={{ style: { textAlign: 'center' } }}
                  label="Quantity"
                  variant="outlined"
                  sx={{ m: 1, fontSize: '12px' }}
                  disabled={sellerIds?.total == 0}
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
                  sx={{ m: 1, fontSize: '12px' }}
                  disabled={sellerIds?.total == 0}
                />
              </Box>
            )}
          </Card>
        </Grid>
        {/* product details section end */}

        {/* product offer section */}
        <Grid item lg={4} xs={12} md={4}>
          <Card sx={{ p: 2, height: { md: '550px' }, position: 'relative', overflow: 'visible' }}>
            <div style={{ position: 'absolute', top: '50px', right: '-15px' }}>
              <CustomBadge
                text={
                  ['On Deals', 'On Clearance', 'Code JLS0D62', 'Open Box'][
                    Math.floor(
                      Math.random() *
                        ['Top Deals', 'On Clearance', 'Code JLS0D62', 'Open Box'].length
                    )
                  ]
                }
              />
            </div>

            {sellerIds?.total != 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                <Box sx={{ mx: 3 }}>
                  <Typography
                    sx={{ color: '#1562ff', fontWeight: 'bold' }}
                    component="h4"
                    variant="h4"
                  >
                    <RiExchangeFundsFill />
                  </Typography>
                </Box>
                <Box>
                  <Typography component="p" sx={{ fontSize: '14px' }}>
                    This SKU cannot be exchange or returned
                  </Typography>
                </Box>
              </Box>
            )}

            {sellerIds?.total != 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  my: '10px',
                }}
              >
                <Box sx={{ mx: 3 }}>
                  <Typography
                    sx={{ color: '#1562ff', fontWeight: 'bold' }}
                    component="h4"
                    variant="h4"
                  >
                    <BsShop />
                  </Typography>
                </Box>
                <Box>
                  <Typography component="p" sx={{ fontSize: '14px' }}>
                    Sold by{' '}
                    <span>
                      {' '}
                      <a style={{ color: '#1562ff' }} href={`/UserProfile/${currentSellerId}`}>
                        {' '}
                        {sellerIds?.data?.find((seller) => seller.id == currentSellerId)?.name}{' '}
                        <Tooltip title="Verified Store">
                          <span style={{ color: '#1562ff' }}>
                            {' '}
                            <GoVerified />{' '}
                          </span>
                        </Tooltip>
                      </a>{' '}
                    </span>
                  </Typography>
                </Box>
              </Box>
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                my: 3,
                p: 1,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: '#1562ff' }} component="h4" variant="h4">
                  {productWatchlist?.data.length}
                </Typography>
                <Typography component="p" sx={{ fontSize: '12px' }}>
                  Watchlists
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ color: '#1562ff' }} component="h4" variant="h4">
                  {product.alert_list}
                </Typography>
                <Typography component="p" sx={{ fontSize: '12px' }}>
                  Alerts
                </Typography>
              </Box>
              <Box>
                {product.tags.length != 0 ? (
                  <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
                    {product.tags?.map((tag, i) => {
                      return `${tag}${i != product.tags.length - 1 ? ', ' : ''}`;
                    })}
                  </Label>
                ) : (
                  <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
                    Normal
                  </Label>
                )}
                <Typography
                  component="p"
                  sx={{ fontSize: '12px', mt: '10px', textAlign: 'center' }}
                >
                  Tags
                </Typography>
              </Box>
            </Box>
            <Typography
              sx={{ fontSize: '12px', textAlign: 'center', fontWeight: 'bold', pb: 2 }}
              component="p"
            >
              Updated:{' '}
              <ReactTimeAgo
                date={new Date(
                  product?.price_updated_at || product?.date || product?.updatedAt
                ).getTime()}
                locale="en-US"
              />
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
              <Box sx={{ mx: 3 }}>
                <Typography
                  sx={{ color: '#1562ff', fontWeight: 'bold' }}
                  component="h4"
                  variant="h4"
                >
                  <AiFillSecurityScan />
                </Typography>
              </Box>

              <Box>
                <Typography component="p" sx={{ fontSize: '13px', fontWeight: 'bold' }}>
                  TRADE ASSURANCE & SECURE SHOPPING
                </Typography>
                <Typography component="p" sx={{ fontSize: '12px' }}>
                  On-time Dispatch Guarantee & Your data is always protected
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', my: 3 }}>
              <Box sx={{ mx: 3 }}>
                <Typography
                  sx={{ color: '#1562ff', fontWeight: 'bold' }}
                  component="h4"
                  variant="h4"
                >
                  <RiSecurePaymentFill />
                </Typography>
              </Box>
              <Box>
                <Typography component="p" sx={{ fontSize: '13px', fontWeight: 'bold' }}>
                  HOLDING PAYMENT
                </Typography>
                <Typography component="p" sx={{ fontSize: '12px' }}>
                  Your Payment will be held till you receive your Stock and get confirmed by You
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', mt: 3 }}>
              <Box sx={{ mx: 3 }}>
                <Typography
                  sx={{ color: '#1562ff', fontWeight: 'bold' }}
                  component="h4"
                  variant="h4"
                >
                  <TbTruckDelivery />
                </Typography>
              </Box>
              <Box>
                <Typography component="p" sx={{ fontSize: '13px', fontWeight: 'bold' }}>
                  TRUSTED SHIPPING
                </Typography>
                <Typography component="p" sx={{ fontSize: '12px' }}>
                  Free and direct shipping by the sellers directly to your locations as per your
                  requirements
                </Typography>
              </Box>
            </Box>

            {sellerIds?.total != 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  mt: '30px',
                }}
              >
                <Box sx={{ mx: 3 }}>
                  <Typography
                    sx={{ color: '#1562ff', fontWeight: 'bold' }}
                    component="h4"
                    variant="h4"
                  >
                    <AiOutlineTags />
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Typography component="p" sx={{ fontSize: '12px' }}>
                    {sellerIds?.total} offers from other sellers
                  </Typography>

                  <Typography
                    onClick={handleOpenFilter}
                    component="p"
                    sx={{ fontSize: '13px', fontWeight: 'bold' }}
                  >
                    <span style={{ color: '#1562ff', textAlign: 'right', cursor: 'pointer' }}>
                      {' '}
                      View All Offers
                    </span>{' '}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '50px',
                }}
              >
                <Box sx={{ mx: 3 }}>
                  <Typography sx={{ color: 'red', fontWeight: 'bold' }} component="h4" variant="h4">
                    <AiOutlineWarning />
                  </Typography>
                </Box>
                <Box>
                  <Typography component="p" sx={{ fontSize: '14px', color: 'red' }}>
                    Sorry! This product is not available.
                  </Typography>
                </Box>
              </Box>
            )}
          </Card>
        </Grid>
        {/* product offer section end */}
        {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        {/* <Typography component="p" sx={{ fontSize: '12px', p: 2 }}>
          Designed for users to instantly see the changes that occur on the SKU and predicts what
          will come next.
        </Typography> */}

        {/* product discription section */}
        <Grid item lg={12} md={12} xs={12}>
          <Card sx={{ p: 2 }}>
            <Tabs
              value={currentTab}
              onChange={(event, newValue) => setCurrentTab(newValue)}
              sx={{}}
            >
              {TABS.map((tab) => (
                <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
              ))}
            </Tabs>

            {TABS.map(
              (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
            )}
          </Card>
        </Grid>
        {/* product discription section end */}
        <Typography component="p" sx={{ fontSize: '12px', p: 2 }}>
          Designed for users to instantly see the SKU Description.
        </Typography>

        {/* Start::WatchList, Notification Menu / Modal / Dialog */}
        {/* Watchlist Menu */}
        {isSuccessWatchlist && (
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
              <h3 style={{ fontSize: '12px', color: 'text.main', padding: '0 10px' }}>
                Select Watch List
              </h3>

              {data?.map((dt) => (
                <WatchlistName
                  key={dt._id}
                  watchlist={dt}
                  productId={id}
                  handleStarClose={handleStarClose}
                />
              ))}

              <Stack
                sx={{ width: '200px', padding: '3px 20px' }}
                button
                onClick={() => {
                  handleWatchListModalOpen();
                  handleStarClose();
                }}
              >
                <Chip
                  sx={{ cursor: 'pointer', backgroundColor: 'none !important' }}
                  icon={<AiOutlinePlusCircle style={{ fontSize: '1.4rem' }} />}
                  label="Add To watchList"
                  variant="outlined"
                />
              </Stack>
            </div>
          </Menu>
        )}

        {/* WatchList Dialog/Modal */}
        <Dialog open={watchListModal} onClose={handleWatchListModalClose} fullWidth>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <DialogTitle sx={{ color: 'text.main', fontWeight: 700, fontSize: '20px' }}>
              New WatchList
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleWatchListModalClose}
              sx={{ color: 'text.main', marginRight: '.75rem' }}
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
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions sx={{ padding: '1rem' }}>
            <Button
              variant="outlined"
              sx={{ color: 'text.main' }}
              onClick={handleWatchListModalClose}
            >
              Close
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
              }}
              onClick={handleCreate}
              disabled={title?.length === 0 || isLoading}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
        {/* Add alert modal */}
        <AddAlertOnPD
          openAddNew={openAddAlertModal}
          handleCloseNewAdd={handleCloseNewAdd}
          sku={{
            id: id,
            _id: id,
            sku: product?.sku,
            sku_marketplace: product?.sku_marketplace,
            sku_rank: product?.sku_rank,
            buy_box_currency: product?.buy_box_currency,
            current_price: product?.current_price,
          }}
        />

        {/* 3 offer drawwer  */}

        <Drawer
          anchor="right"
          open={openFilter}
          onClose={handleCloseFilter}
          BackdropProps={{
            invisible: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_BASE,
              background: (theme) => (theme.palette.mode === 'dark' ? '#161C24' : '#fff'),
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ pl: 2, pr: 1, py: 2 }}
          >
            <Typography variant="subtitle1">{sellerIds?.total ?? 0} Offers Available</Typography>

            <IconButton onClick={handleCloseFilter}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Stack>

          <Divider />

          <Scrollbar>
            <Stack spacing={3} sx={{ p: 2.5 }}>
              {
                sortSellers(sellerIds)?.data?.map((seller, index) => {
                  return (
                    <Stack direction="column">
                      <Card sx={{ p: 2 }}>
                        <Typography component="p" sx={{ fontSize: '12px' }}>
                          Order in <span style={{ fontWeight: 'bold' }}> 9 Hrs 48 Mins </span>
                        </Typography>
                        <Typography component="p" sx={{ fontSize: '12px' }}>
                          Delivered in <span style={{ fontWeight: 'bold' }}> 7 Days </span>
                        </Typography>
                        <Box sx={{ my: 1 }}>
                          <Typography component="p" sx={{ fontSize: '12px' }}>
                            Sold By
                          </Typography>
                          <Typography
                            component={NavLink}
                            to={`/UserProfile/${seller.id}`}
                            sx={{ fontSize: '12px', textDecoration: 'underline', color: '#1562ff' }}
                          >
                            {seller.name}
                            <Tooltip title="Verified Store">
                              <span style={{ color: '#1562ff' }}>
                                {' '}
                                <GoVerified />{' '}
                              </span>
                            </Tooltip>
                          </Typography>
                          <Typography component="p" sx={{ fontSize: '12px' }}>
                            Distributer
                          </Typography>
                          <Typography component="p" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                            <span style={{ color: 'orange' }}> 77% </span> Positive Ratings
                          </Typography>
                        </Box>
                        {seller.id == currentSellerId ? (
                          <Button
                            variant="outlined"
                            sx={{ width: 180, fontSize: '13px' }}
                            startIcon={<TaskAltIcon />}
                            disabled
                          >
                            Already Selected
                          </Button>
                        ) : (
                          <Button
                            sx={{
                              bgcolor: 'primary.main',
                              fontSize: '13px',
                              border: (theme) => `1px solid ${theme.palette.primary.main}`,
                              color: (theme) =>
                                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                              '&:hover': {
                                bgcolor: 'white',
                                color: (theme) =>
                                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                              },
                              width: 180,
                            }}
                            onClick={handleCloseFilter}
                            component={Link}
                            to={`/skuMarket/${id}/${seller.id}`}
                          >
                            Selected Offer
                          </Button>
                        )}
                      </Card>
                    </Stack>
                  );
                })
                // <Stack direction="column">
                //   <Card sx={{ p: 2 }}>
                //     <Typography component="p" sx={{ fontSize: '12px' }}>
                //       Order in <span style={{ fontWeight: 'bold' }}> 9 Hrs 48 Mins </span>
                //     </Typography>
                //     <Typography component="p" sx={{ fontSize: '12px' }}>
                //       Delivered in <span style={{ fontWeight: 'bold' }}> 21 Days </span>
                //     </Typography>
                //     <Box sx={{ my: 1 }}>
                //       <Typography component="p" sx={{ fontSize: '12px' }}>
                //         Sold By
                //       </Typography>
                //       <Typography
                //         component={NavLink}
                //         to="/userProfile"
                //         sx={{ fontSize: '12px', textDecoration: 'underline', color: '#1562ff' }}
                //       >
                //         Ultimate
                //         <Tooltip title="Verified Store">
                //           <span style={{ color: '#1562ff' }}>
                //             {' '}
                //             <GoVerified />{' '}
                //           </span>
                //         </Tooltip>
                //       </Typography>
                //       <Typography component="p" sx={{ fontSize: '12px' }}>
                //         Distributer
                //       </Typography>
                //       <Typography component="p" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                //         <span style={{ color: 'orange' }}> 77% </span> Positive Ratings
                //       </Typography>
                //     </Box>

                //     <Button
                //       sx={{
                //         bgcolor: 'primary.main',
                //         fontSize: '13px',
                //         border: (theme) => `1px solid ${theme.palette.primary.main}`,
                //         color: (theme) =>
                //           theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                //         '&:hover': {
                //           bgcolor: 'white',
                //           color: (theme) =>
                //             theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                //           border: (theme) => `1px solid ${theme.palette.primary.main}`,
                //         },
                //         width: 180,
                //       }}
                //       component={NavLink}
                //       to={`/skuMarket/5}`}
                //     >
                //       Select This Offer
                //     </Button>
                //   </Card>
                // </Stack>
                // <Stack direction="column">
                //   <Card sx={{ p: 2 }}>
                //     <Typography component="p" sx={{ fontSize: '12px' }}>
                //       Order in <span style={{ fontWeight: 'bold' }}> 9 Hrs 48 Mins </span>
                //     </Typography>
                //     <Typography component="p" sx={{ fontSize: '12px' }}>
                //       Delivered in <span style={{ fontWeight: 'bold' }}> 30 Days </span>
                //     </Typography>
                //     <Box sx={{ my: 1 }}>
                //       <Typography component="p" sx={{ fontSize: '12px' }}>
                //         Sold By
                //       </Typography>
                //       <Typography
                //         component={NavLink}
                //         to="/userProfile"
                //         sx={{ fontSize: '12px', textDecoration: 'underline', color: '#1562ff' }}
                //       >
                //         Dam- Est
                //         <Tooltip title="Verified Store">
                //           <span style={{ color: '#1562ff' }}>
                //             {' '}
                //             <GoVerified />{' '}
                //           </span>
                //         </Tooltip>
                //       </Typography>
                //       <Typography component="p" sx={{ fontSize: '12px' }}>
                //         Distributer
                //       </Typography>
                //       <Typography component="p" sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                //         <span style={{ color: 'orange' }}> 77% </span> Positive Ratings
                //       </Typography>
                //     </Box>

                //     <Button
                //       sx={{
                //         bgcolor: 'primary.main',
                //         fontSize: '13px',
                //         border: (theme) => `1px solid ${theme.palette.primary.main}`,
                //         color: (theme) =>
                //           theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                //         '&:hover': {
                //           bgcolor: 'white',
                //           color: (theme) =>
                //             theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                //           border: (theme) => `1px solid ${theme.palette.primary.main}`,
                //         },
                //         width: 180,
                //       }}
                //       component={NavLink}
                //       to={`/skuMarket/3}`}
                //     >
                //       Select This Offer
                //     </Button>
                //   </Card>
                // </Stack>
              }
            </Stack>
          </Scrollbar>
        </Drawer>
      </Grid>
      <PdRFQ
        open={openRFQ}
        handleClose={handleCloseRFQ}
        text="Request Sent Successfully"
        qty={qty}
        unit={unit}
        seller={currentSellerId}
        productId={product?._id}
        item={product?.sku}
        totalSellers={sellerIds?.total}
      />
    </>
  );
};

export default ProductView;
