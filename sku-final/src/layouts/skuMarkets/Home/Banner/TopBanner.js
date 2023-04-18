import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import AnimatedGradiantText from 'components/common/AnimatedGradiantText';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import fullRightImg from '../../../../assets/images/home-banner/banner-left-static-image-1.png';
import rightLeftImg from '../../../../assets/images/home-banner/banner-left-static-image-2.jpg';
import img1 from '../../../../assets/images/home-banner/home-banner-slider-img-1.jpg';
import img2 from '../../../../assets/images/home-banner/home-banner-slider-img-2.jpg';
import img3 from '../../../../assets/images/home-banner/home-banner-slider-img-3.jpg';
import imgAr1 from '../../../../assets/images/home-banner/home-banner-slider-img-ar1.png';
import imgAr2 from '../../../../assets/images/home-banner/home-banner-slider-img-ar2.jpg';
import imgAr3 from '../../../../assets/images/home-banner/home-banner-slider-img-ar3.png';
import '../../../../components/SkuMarket/SkuMarketStyle.css';

const TopBanner = ({ lng }) => {
  const skuIMAGES = [
    { id: 1, img: lng ? imgAr1 : img1, destination: '/signup' },
    { id: 2, img: lng ? imgAr2 : img2, destination: '/become_partner' },
    {
      id: 3,
      img: lng ? imgAr3 : img3,
      destination: '/skuMarket?brand=Apple&marketplace=noon%2Fegypt',
    },
  ];
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid xs={12} md={8}>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {skuIMAGES.map((data, i) => (
                <SwiperSlide key={i}>
                  <Link to={data.destination}>
                    <img src={data.img} alt="" height="210px" width="100%" />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
          <Grid xs={12} md={2}>
            <Link to="/signup">
              <img src={rightLeftImg} alt="" height="210px" width="100%" />
            </Link>
          </Grid>
          <Grid xs={12} md={2}>
            <Link to="/become_partner">
              <img src={fullRightImg} alt="" height="210px" width="100%" />
            </Link>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 1 }}>
          <AnimatedGradiantText>Sponsored Ads</AnimatedGradiantText>
        </Box>
      </Box>
    </>
  );
};

export default TopBanner;
