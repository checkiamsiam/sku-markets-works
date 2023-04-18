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
} from '@mui/material';
import { Stack } from '@mui/system';
import Label from 'components/label/Label';
import WatchlistName from 'components/productDetails/WatchlistName';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import {
  useGetAllSellerProductsQuery,
  useGetProductDetailQuery,
} from 'features/product/productAPI';
import { useCheckWatchlistForSkusQuery } from 'features/userSku/userSkuAPI';
import {
  useCreateWatchListMutation,
  useGetAllWatchListsQuery,
} from 'features/watchList/watchListAPI';
import { useState } from 'react';
import { AiFillStar, AiOutlinePlusCircle, AiOutlineStar } from 'react-icons/ai';
import { Link, NavLink, useParams } from 'react-router-dom';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import './SkuMarketStyle.css';

export const productData = [
  {
    id: 1,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 2,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 3,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 4,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 5,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 6,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 7,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 8,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 9,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 10,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 11,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 12,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 13,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 14,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 15,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 16,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
  {
    id: 17,
    img: 'https://api-dev-minimal-v4.vercel.app/assets/images/products/product_1.jpg',
    BrandName: 'brand Name',
    CtgryName: 'Category Name',
    ProductName: 'Product Name',
    price: 45,
    productDis: '',
    skuFlag: '../../assets/images/svg/noon-saudi.svg',
    ratting: 4.5,
    stock: 234,
  },
];

const SameBrandProduct = () => {
  // watcglist API integration
  const { data, refetch, isSuccess } = useGetAllWatchListsQuery();
  const [activeProductId, setActiveProductId] = useState();

  const [watchListMenu, setWatchListMenu] = useState(null);
  const watchListMenuOpen = Boolean(watchListMenu);

  const { id } = useParams();
  const { data: product } = useGetProductDetailQuery(id);

  const logic = `brand_en[eq]=${product?.brand_en}&sku_marketplace[eq]=${product?.sku_marketplace}&_id[ne]=${product?._id}`;
  const fields = `brand_en,price_change,sku,sku_marketplace,sku_rank,sku_rate,buy_box_currency,current_price,price_change,all_images,tags`;
  const query = `${logic}&fields=${fields}&limit=50&page=1`;

  const { data: productsData } = useGetAllSellerProductsQuery(query, {
    skip: !product,
  });

  const [products, setProducts] = useState([]);

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
  productsData?.data?.map(({ product }) => {
    productIds.push(product?._id);
  });

  const { data: productsWatchlist } = useCheckWatchlistForSkusQuery({ productIds });

  return (
    <>
      {productsData?.data.length != 0 && (
        <>
          <Card sx={{ p: 2 }}>
            <Box sx={{ borderBottom: '2px solid #f9f9f9', py: 2 }}>
              <Typography component="p" sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                More From {product?.brand_en}
              </Typography>
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
              {productsData?.data.map(({ product, sellerIds }) => (
                <SwiperSlide key={product.id} item lg={2} xs={4}>
                  <Card
                    sx={{
                      p: 1,
                      my: 1,
                      position: 'relative',
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark' ? '0px 3px 14px -2px #000000' : 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        justifyContent: 'space-between',
                        top: ' 10px',
                        left: '15px',
                      }}
                    >
                      {product.tags.length === 0 ? (
                        <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
                          Normal
                        </Label>
                      ) : (
                        <Label sx={{ borderRadius: 2 }} variant={'filled'} color="default">
                          {product.tags?.map((tag, i) => {
                            return `${tag}${i !== product.tags.length - 1 ? ', ' : ''}`;
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
                      <div>
                        <Button
                          sx={{
                            justifyContent: 'end',
                            background: ' transparent',
                            color: '#0d6efd',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '18px',
                          }}
                          variant="text"
                          className="btnHoverEffct"
                          id="star-button"
                          aria-controls={watchListMenuOpen && 'basic-menu'}
                          aria-haspopup="true"
                          aria-expanded={watchListMenuOpen && 'true'}
                          onClick={(e) => {
                            handleStarClick(e, product?._id);
                          }}
                        >
                          {productsWatchlist?.data?.find((prod) =>
                            prod.product.includes(product?._id)
                          ) ? (
                            <AiFillStar style={{ color: '#0d6efd' }} />
                          ) : (
                            <AiOutlineStar style={{ color: '#0d6efd' }} />
                          )}
                        </Button>
                      </div>
                    </Box>
                    <Box
                      component={NavLink}
                      to={`/skuMarket/${product.id}/${sellerIds[0]}`}
                      sx={{ textDecoration: 'none' }}
                    >
                      <img
                        src={product.all_images[0]}
                        alt=""
                        style={{ borderRadius: '20px', height: '200px' }}
                      />
                      <Typography
                        component={NavLink}
                        to={`/skuMarket/${product.id}/${sellerIds[0]}`}
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
                    </Box>
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
                            height: `20px`,
                            width: `50px`,
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
                            sx={{
                              color: 'text.main',
                              fontSize: '12px',
                              mx: '5px',
                            }}
                            variant="p"
                          >
                            ({product.sku_rank})
                          </Typography>
                        </div>
                      </div>
                    </Box>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Card>
          <Typography component="p" sx={{ fontSize: '12px', p: 2 }}>
            Of all the top SKUs on marketplace, those are more from the same brand.
          </Typography>
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
          </Dialog>{' '}
        </>
      )}
    </>
  );
};

export default SameBrandProduct;
