import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Menu,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Stack } from '@mui/system';
import { AiFillStar, AiOutlinePlusCircle, AiOutlineStar } from 'react-icons/ai';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import './SkuMarketStyle.css';

import MPLogo from 'components/common/MPLogo';
import Label from 'components/label/Label';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import WatchlistName from 'components/productDetails/WatchlistName';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import { useCheckWatchlistForSkusQuery } from 'features/userSku/userSkuAPI';
import {
  useCreateWatchListMutation,
  useGetAllWatchListsQuery,
} from 'features/watchList/watchListAPI';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const productDataMock = [
  {
    id: 1,
    images: [
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_2.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_3.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_4.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_5.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_6.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_7.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_8.jpg',
    ],
    BrandName: 'brand Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 2,
    images: [
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_2.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_3.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_4.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_5.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_6.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_7.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_8.jpg',
    ],
    BrandName: 'brand Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 3,
    images: [
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_2.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_3.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_4.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_5.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_6.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_7.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_8.jpg',
    ],
    BrandName: 'brand Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 4,
    images: [
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_2.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_3.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_4.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_5.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_6.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_7.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_8.jpg',
    ],
    BrandName: 'brand Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 5,
    images: [
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_2.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_3.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_4.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_5.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_6.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_7.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_8.jpg',
    ],
    BrandName: 'brand Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 6,
    images: [
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_2.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_3.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_4.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_5.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_6.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_7.jpg',
      'https://api-prod-minimal-v4.vercel.app/assets/images/products/product_8.jpg',
    ],
    BrandName: 'brand Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
];

const SkuMarketProduct = ({ productData, isLoadingProduct, isFetchingProduct, keyword }) => {
  // console.log(productData?.map(ig => {return ig.images?.map(ik=>{return ik})}));

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  // watcglist API integration
  const { data, refetch, isSuccess } = useGetAllWatchListsQuery();
  const [activeProductId, setActiveProductId] = useState();

  const [watchListMenu, setWatchListMenu] = useState(null);
  const watchListMenuOpen = Boolean(watchListMenu);

  const handleStarClick = (event, id) => {
    event.preventDefault();
    setActiveProductId(id);
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

  let productIds = [];
  productData?.map(({ product }) => {
    productIds.push(product._id);
  });

  const { data: productsWatchlist } = useCheckWatchlistForSkusQuery({ productIds });

  const navigate = useNavigate();

  const handleItemClick = (url) => {
    if (keyword) {
      navigate(url, { state: { keyword } });
    } else {
      navigate(url);
    }
  };

  if (isLoadingProduct || isFetchingProduct) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container sx={{ my: 2 }} maxWidth="xl">
        <Grid container spacing={2}>
          {!productData
            ? productDataMock.map((product) => (
                <Grid key={product.id} item lg={2} md={2} xs={6} sm={6} alignItems="center">
                  <Card
                    sx={{
                      p: 1,
                      position: 'relative',
                      textDecoration: 'none',
                      width: { md: '200px', xs: '170px' },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        justifyContent: 'space-between',
                        top: ' 10px',
                        left: '15px',
                        zIndex: 1,
                      }}
                    >
                      <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
                        BestSeller
                      </Label>
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        justifyContent: 'space-between',
                        right: '20px',
                        top: '10px',
                      }}
                    >
                      <IconButton
                        sx={{
                          justifyContent: 'end',
                          background: ' transparent',
                          color: 'white',
                          fontSize: '18px',
                        }}
                        className="btnHoverEffct"
                        id="star-button"
                        onClick={handleStarClick}
                      >
                        <AiOutlineStar />
                      </IconButton>
                    </Box>
                    <Swiper pagination={true} modules={[Pagination]} style={{ zIndex: -1 }}>
                      {product.images.map((IMG, i) => (
                        <SwiperSlide key={i}>
                          <Box
                            component={NavLink}
                            to={`/skuMarket/${product.id}`}
                            sx={{ textDecoration: 'none' }}
                          >
                            <Box
                              component="img"
                              src={IMG}
                              alt="SKU_Product"
                              sx={{ borderRadius: '20px', width: '200px', height: { md: '240px' } }}
                            />
                          </Box>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <Typography
                      component={NavLink}
                      to={`/skuMarket/${product.id}`}
                      sx={{
                        fontSize: '12px',
                        mt: '8px',
                        textDecoration: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'black' : 'common.white',
                      }}
                    >
                      N36338468A
                    </Typography>
                    <br />
                    <Typography
                      component={NavLink}
                      to={`/brand/${'tommee tippee'}`}
                      sx={{
                        fontSize: '12px',
                        textDecoration: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'black' : 'common.white',
                      }}
                    >
                      Tommee Tippee
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'black' : 'common.white',
                      }}
                      component="p"
                    >
                      SAR 19.45
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: 'red' }} component="p">
                      -4.67
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                      }}
                    >
                      {/* <img height={30} width={50} src={SkuImge} alt="" /> */}
                      <MPLogo width={50} hight={20} marketplace={'noon-ksa'} />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '2px',
                          }}
                        >
                          <Typography
                            sx={{
                              backgroundColor: '#37ae02',
                              fontSize: '10px',
                              color: 'white',
                              fontWeight: '400',
                              padding: '1px 7px 1px 7px',
                              borderRadius: '10px',
                              textAlign: 'center',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              mx: '5px',
                            }}
                            variant="p"
                          >
                            4.5 <AiFillStar />
                          </Typography>
                          <Typography
                            sx={{ color: 'text.main', fontSize: '12px', mx: '5px' }}
                            variant="p"
                          >
                            (424)
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </Card>
                </Grid>
              ))
            : productData?.map(({ product, sellerIds }) => (
                <Grid key={product.id} item lg={2} md={2} xs={6} alignItems="center">
                  <Card
                    sx={{
                      p: 1,
                      position: 'relative',
                      textDecoration: 'none',
                      width: { md: '200px', xs: '170px' },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        justifyContent: 'space-between',
                        top: ' 10px',
                        left: '15px',
                        zIndex: 1,
                      }}
                    >
                      {product.tags.length == 0 ? (
                        <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
                          Normal
                        </Label>
                      ) : (
                        <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
                          {product.tags?.map((tag, i) => {
                            return `${tag}${i != product.tags.length - 1 ? ', ' : ''}`;
                          })}
                        </Label>
                      )}
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        justifyContent: 'space-between',
                        right: '20px',
                        top: '10px',
                      }}
                    >
                      <IconButton
                        sx={{
                          justifyContent: 'end',
                          background: ' transparent',
                          color: '#0d6efd',
                          fontSize: '18px',
                        }}
                        className="btnHoverEffct"
                        id="star-button"
                        onClick={(e) => {
                          handleStarClick(e, product._id);
                        }}
                      >
                        {productsWatchlist?.data?.find((prod) =>
                          prod.product.includes(product._id)
                        ) ? (
                          <AiFillStar style={{ color: '#0d6efd' }} />
                        ) : (
                          <AiOutlineStar style={{ color: '#0d6efd' }} />
                        )}
                      </IconButton>
                    </Box>
                    <Swiper pagination={true} modules={[Pagination]} style={{ zIndex: -1 }}>
                      {product.all_images.map((IMG, i) => (
                        <SwiperSlide key={i}>
                          <Box
                            component={NavLink}
                            to={`/skuMarket/${product.id}/${sellerIds[0]}`}
                            state={{ keyword }}
                            sx={{ textDecoration: 'none' }}
                          >
                            <Box
                              component="img"
                              src={IMG}
                              alt="SKU_Product"
                              sx={{
                                borderRadius: '20px',
                                width: { md: '200px', xs: '170px' },
                                height: { md: '240px' },
                              }}
                            />
                          </Box>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <Typography
                      component={NavLink}
                      to={`/skuMarket/${product.id}/${sellerIds[0]}`}
                      state={{ keyword }}
                      sx={{
                        fontSize: '12px',
                        mt: '8px',
                        textDecoration: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'black' : 'common.white',
                      }}
                    >
                      {product.sku}
                    </Typography>
                    <br />
                    <Typography
                      component={NavLink}
                      to={`/skuMarket?brand=${encodeURIComponent(product?.brand_en)}`}
                      sx={{
                        fontSize: '12px',
                        textDecoration: 'none',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'black' : 'common.white',
                      }}
                    >
                      {product.brand_en}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: (theme) =>
                          theme.palette.mode === 'light' ? 'black' : 'common.white',
                      }}
                      component="p"
                    >
                      {`${product.buy_box_currency} ${product.current_price ?? 0}`}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', color: 'red' }} component="p">
                      <span
                        style={{
                          color:
                            product?.price_change >= 0
                              ? product?.price_change === 0
                                ? lightGray
                                : 'green'
                              : 'red',
                        }}
                      >
                        {product?.price_change} %
                      </span>
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mt: 2,
                      }}
                    >
                      {/* <img height={30} width={50} src={SkuImge} alt="" /> */}
                      <Link
                        to={`/skuMarket?marketplace=${encodeURIComponent(
                          product?.sku_marketplace
                        )}`}
                      >
                        <img
                          src={`/assets/images/marketplace/${product?.sku_marketplace
                            .split('/')
                            ?.join('-')
                            ?.toLowerCase()}.jpeg`}
                          alt={product?.sku_marketplace.replace('/', '-')}
                          style={{
                            height: `15px`,
                            width: `35px`,
                            display: 'inline-block',
                          }}
                        />
                      </Link>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '2px',
                          }}
                        >
                          <Typography
                            sx={{
                              backgroundColor: '#37ae02',
                              fontSize: '10px',
                              color: 'white',
                              fontWeight: '400',
                              padding: '1px 7px 1px 7px',
                              borderRadius: '10px',
                              textAlign: 'center',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              mx: '5px',
                            }}
                            variant="p"
                          >
                            {product.sku_rate} <AiFillStar />
                          </Typography>
                          <Typography
                            sx={{ color: 'text.main', fontSize: '12px', mx: '5px' }}
                            variant="p"
                          >
                            ({product?.sku_rank})
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Container>

      {/* Watchlist Menu */}
      {isSuccess && (
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
                productId={activeProductId}
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
    </>
  );
};

export default SkuMarketProduct;
