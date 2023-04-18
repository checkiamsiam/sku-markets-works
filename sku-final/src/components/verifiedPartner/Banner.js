import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import AnimatedGradiantText from 'components/common/AnimatedGradiantText';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from '../../assets/images/home-banner/home-banner-slider-img-1.jpg';
import img2 from '../../assets/images/home-banner/home-banner-slider-img-2.jpg';
import '../../components/SkuMarket/SkuMarketStyle.css';

export const skuIMAGES = [
  { id: 1, img: img1, destination: '/signup' },
  { id: 2, img: img2, destination: '/become_partner' },
];

const Banner = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid xs={12} md={12}>
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
        </Grid>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 1 }}>
          <AnimatedGradiantText>Sponsored Ads</AnimatedGradiantText>
        </Box>
      </Box>
    </>
  );
};

export default Banner;
