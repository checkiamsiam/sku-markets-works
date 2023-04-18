import { Box, Card, Typography } from '@mui/material';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { Link, NavLink } from 'react-router-dom';
import { Navigation, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/react';

const TypeBanner = ({ types, isLoading, isFetching }) => {
  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }

  return (
    <Card>
      <Swiper
        slidesPerView={1}
        slidesPerGroupSkip={1}
        spaceBetween={10}
        navigation={true}
        loop={false}
        scrollbar={true}
        modules={[Scrollbar, Navigation]}
        style={{ marginTop: '10px', marginBottom: '10px' }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 3,
            spaceBetween: 5,
            slidesPerGroup: 3,
          },
          '@0.75': {
            slidesPerView: 6,
            spaceBetween: 6,
            slidesPerGroup: 6,
          },
          '@1.00': {
            slidesPerView: 8,
            spaceBetween: 8,
            slidesPerGroup: 8,
          },
          '@1.50': {
            slidesPerView: 9,
            spaceBetween: 5,
            slidesPerGroup: 9,
          },
          '@1.75': {
            slidesPerView: 10,
            spaceBetween: 10,
            slidesPerGroup: 10,
          },
          '@2.00': {
            slidesPerView: 12,
            spaceBetween: 15,
            slidesPerGroup: 12,
          },
        }}
        className="mySwiper2"
      >
        {types?.map((type, i) => (
          <SwiperSlide key={i}>
            <Card
              sx={{
                p: 1,
                my: 1,
                textAlign: 'center',
                // width: '150px',
                // height: '150px',
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark' ? '0px 3px 14px -2px #000000' : 0.5,
              }}
            >
              <Box
                component={NavLink}
                to={`/skuMarket?category=${encodeURIComponent(type?.category)}&${
                  type?.sku_type_en ? 'type' : 'sub_type'
                }=${encodeURIComponent(
                  type?.sku_type_en ?? type?.sku_sub_type_en
                )}&marketplace=${encodeURIComponent(type?.sku_marketplace)}`}
                sx={{
                  textDecoration: 'none',
                  display: 'flex',
                  'flex-direction': 'column',
                  'align-items': 'center',
                }}
              >
                <img
                  src={type.products[0]?.product?.all_images[0]}
                  alt=""
                  style={{ borderRadius: '10px', height: '100px', width: '100%' }}
                />

                <Typography
                  component={NavLink}
                  to={`/skuMarket?category=${encodeURIComponent(type?.category)}&${
                    type?.sku_type_en ? 'type' : 'sub_type'
                  }=${encodeURIComponent(
                    type?.sku_type_en ?? type?.sku_sub_type_en
                  )}&marketplace=${encodeURIComponent(type?.sku_marketplace)}`}
                  sx={{
                    fontSize: '12px',
                    textDecoration: 'none',
                    width: '150px',
                    height: '20px',
                    display: 'block',
                    overflow: 'hidden',
                    'white-space': 'nowrap',
                    'text-overflow': 'ellipsis',
                    color: (theme) => (theme.palette.mode === 'light' ? 'black' : 'common.white'),
                  }}
                >
                  {type.sku_type_en ?? type.sku_sub_type_en}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 0.5,
                }}
              >
                <Link to={`/skuMarket?marketplace=${encodeURIComponent(type?.sku_marketplace)}`}>
                  <img
                    src={`/assets/images/marketplace/${type?.sku_marketplace
                      .split('/')
                      ?.join('-')
                      ?.toLowerCase()}.jpeg`}
                    alt={type?.sku_marketplace.replace('/', '-')}
                    style={{
                      height: `20px`,
                      width: `50px`,
                      display: 'inline-block',
                    }}
                  />
                </Link>
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
};

export default TypeBanner;
