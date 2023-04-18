import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
// @mui
import { Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Carousel, { CarouselArrowIndex } from '../../../../components/carousel';
import Image from '../../../../components/image';

// ----------------------------------------------------------------------

CarouselBasic1.propTypes = {
  data: PropTypes.array,
};

export default function CarouselBasic1({ data }) {
  const theme = useTheme();

  const carouselRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? data.length - 1 : 0);

  const carouselSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Card>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {data.map((item) => (
          <Image key={item.id} alt={item.title} src={item.image} ratio="1/1" />
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={currentIndex}
        total={data.length}
        onNext={handleNext}
        onPrevious={handlePrev}
      />
    </Card>
  );
}
