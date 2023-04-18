import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../components/SkuMarket/SkuMarketStyle.css';
import UserCard from './UserCard';

const lightGray = '#0d6efd';

const VerifiedPartnersSlider = ({ userDummy }) => {
  return (
    <>
      {userDummy?.length !== 0 && (
        <>
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
                slidesPerView: 1,
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
                slidesPerView: 4,
                spaceBetween: 20,
              },
              '@2.00': {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="mySwiper"
          >
            {userDummy?.map(({ user, i }) => (
              <SwiperSlide key={i} item lg={2} xs={4}>
                <UserCard user={user} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </>
  );
};

export default VerifiedPartnersSlider;
