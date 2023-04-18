import PropTypes from 'prop-types';
import { useRef } from 'react';
// @mui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import Carousel, { CarouselArrows, CarouselDots } from '../../../../components/carousel';
import Image from '../../../../components/image';

// ----------------------------------------------------------------------

CarouselBasic3.propTypes = {
  data: PropTypes.array,
};

export default function CarouselBasic3({ data }) {
  const theme = useTheme();

  const carouselRef = useRef(null);

  const carouselSettings = {
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      rounded: true,
      sx: { mt: 3 },
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box
      sx={{
        position: 'relative',
        '& .slick-list': {
          borderRadius: 2,
          boxShadow: theme.customShadows.z16,
        },
      }}
    >
      <CarouselArrows filled shape="rounded" onNext={handleNext} onPrevious={handlePrev}>
        <Carousel ref={carouselRef} {...carouselSettings}>
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
};

function CarouselItem({ item }) {
  const { image, title } = item;

  return <Image alt={title} src={image} ratio="1/1" />;
}
