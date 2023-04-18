import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import CloseIcon from '@mui/icons-material/Close';
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
  IconButton,
  Menu,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { Stack } from '@mui/system';

import WatchlistName from 'components/productDetails/WatchlistName';
import { useGetSellerProductQuery } from 'features/product/productAPI';
import {
  useCreateWatchListMutation,
  useGetAllWatchListsQuery
} from 'features/watchList/watchListAPI';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useSelector } from 'react-redux';
import '../../../../../components/SkuMarket/SkuMarketStyle.css';

import { useCheckWatchlistForSkusQuery } from 'features/userSku/userSkuAPI';
import './ProfileMyProduct.css';
import SellerProductCard from './SellerProductCard';

// const productData = [
//   {
//     id: 1,
//     img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
//     BrandName: 'brand Name',
//     ProductName: 'Product Name',
//     price: 45,
//     productDis: '',
//     skuFlag: '../../assets/images/svg/noon-saudi.svg',
//     ratting: 4.5,
//     stock: 234,
//   },
//   {
//     id: 2,
//     img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
//     BrandName: 'brand Name',
//     ProductName: 'Product Name',
//     price: 45,
//     productDis: '',
//     skuFlag: '../../assets/images/svg/noon-saudi.svg',
//     ratting: 4.5,
//     stock: 234,
//   },
//   {
//     id: 3,
//     img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
//     BrandName: 'brand Name',
//     ProductName: 'Product Name',
//     price: 45,
//     productDis: '',
//     skuFlag: '../../assets/images/svg/noon-saudi.svg',
//     ratting: 4.5,
//     stock: 234,
//   },
//   {
//     id: 4,
//     img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
//     BrandName: 'brand Name',
//     ProductName: 'Product Name',
//     price: 45,
//     productDis: '',
//     skuFlag: '../../assets/images/svg/noon-saudi.svg',
//     ratting: 4.5,
//     stock: 234,
//   },
//   {
//     id: 5,
//     img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
//     BrandName: 'brand Name',
//     ProductName: 'Product Name',
//     price: 45,
//     productDis: '',
//     skuFlag: '../../assets/images/svg/noon-saudi.svg',
//     ratting: 4.5,
//     stock: 234,
//   },
//   {
//     id: 6,
//     img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
//     BrandName: 'brand Name',
//     ProductName: 'Product Name',
//     price: 45,
//     productDis: '',
//     skuFlag: '../../assets/images/svg/noon-saudi.svg',
//     ratting: 4.5,
//     stock: 234,
//   },
//   {
//     id: 7,
//     img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
//     BrandName: 'brand Name',
//     ProductName: 'Product Name',
//     price: 45,
//     productDis: '',
//     skuFlag: '../../assets/images/svg/noon-saudi.svg',
//     ratting: 4.5,
//     stock: 234,
//   },
//   {
//     id: 8,
//     img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
//     BrandName: 'brand Name',
//     ProductName: 'Product Name',
//     price: 45,
//     productDis: '',
//     skuFlag: '../../assets/images/svg/noon-saudi.svg',
//     ratting: 4.5,
//     stock: 234,
//   },
//   {
//     id: 9,
//     img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
//     BrandName: 'brand Name',
//     ProductName: 'Product Name',
//     price: 45,
//     productDis: '',
//     skuFlag: '../../assets/images/svg/noon-saudi.svg',
//     ratting: 4.5,
//     stock: 234,
//   },
//   {
//     id: 10,
//     img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
//     BrandName: 'brand Name',
//     ProductName: 'Product Name',
//     price: 45,
//     productDis: '',
//     skuFlag: '../../assets/images/svg/noon-saudi.svg',
//     ratting: 4.5,
//     stock: 234,
//   },
// ];

const ProfileMyProduct = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const usershare = useSelector((state) => state.user.shareuser);

  const { data: sellerproduct } = useGetSellerProductQuery(
    usershare?._id ? usershare?._id : user?._id
  );

  // watcglist API integration
  const { data, refetch, isSuccess: isSuccessWatchlist } = useGetAllWatchListsQuery();
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
  sellerproduct?.product?.map((product) => {
    productIds.push(product.productId);
  });

  const { data: productsWatchlist } = useCheckWatchlistForSkusQuery({ productIds });

  return (
    <>
      {sellerproduct && sellerproduct?.product?.length != 0 && (
        <>
          {' '}
          <Card sx={{ p: 2 }}>
            <Box
              sx={{
                borderBottom: '2px solid #f9f9f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 2,
              }}
            >
              <Typography component="p" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                All products by this seller
              </Typography>
              <Button
                sx={{
                  bgcolor: 'white',
                  fontSize: '14px',
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: (theme) => (theme.palette.mode === 'light' ? 'white' : 'white'),
                    border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  },
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                }}
                component={NavLink}
                to={`/skuMarket?sellerId=${usershare?._id ? usershare?._id : user?._id}`}
              >
                VIEW ALL
              </Button>
            </Box>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              modules={[Navigation]}
              style={{ marginTop: '10px' }}
              breakpoints={{
                '@0.00': {
                  slidesPerView: 1,
                  spaceBetween: 5,
                },
                '@0.75': {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                '@1.00': {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
                '@1.50': {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                '@1.75': {
                  slidesPerView: 7,
                  spaceBetween: 25,
                },
                '@2.00': {
                  slidesPerView: 7,
                  spaceBetween: 30,
                },
              }}
              className="mySwiper"
            >
              {sellerproduct?.product?.map((product) => {
                if (product?.status) {
                  return (
                    <SwiperSlide key={product.id} item lg={2} xs={4}>
                      <SellerProductCard
                        product={product}
                        watchListMenuOpen={watchListMenuOpen}
                        handleStarClick={handleStarClick}
                        seller={sellerproduct?.user}
                        productsWatchlist={productsWatchlist}
                      />
                    </SwiperSlide>
                  );
                }
              })}
            </Swiper>
          </Card>
          <Typography component="p" sx={{ fontSize: '12px' }}>
            Of all the top SKUs on marketplace, those are more from this Shop.
          </Typography>
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
      )}
    </>
  );
};

export default ProfileMyProduct;
