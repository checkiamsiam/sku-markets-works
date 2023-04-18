import sumBy from 'lodash/sumBy';
import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Divider, LinearProgress, Rating, Stack, Typography } from '@mui/material';
// utils

import { fShortenNumber } from 'utils/formatNumber';
import ProductDetailsReviewNewDialog from './ProductDetailsNewReviewForm';
import ProductDetailsReviewList from './ProductDetailsReviewList';

// ----------------------------------------------------------------------

ProductDetailsReview.propTypes = {
  product: PropTypes.object,
};

export default function ProductDetailsReview({ rating, rank }) {
  const [openReview, setOpenReview] = useState(false);

  const handleOpenReview = () => {
    setOpenReview(true);
  };

  const handleCloseReview = () => {
    setOpenReview(false);
  };

  const total = sumBy(2.3, (star) => star.starCount);

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{
            pt: { xs: 5, md: 0 },
            pb: { xs: 3, md: 0 },
          }}
        >
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Average rating
          </Typography>

          <Typography variant="h2">{`${rating}/5`}</Typography>

          <Rating readOnly value={rating} precision={0.1} />

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            ({fShortenNumber({rank})} reviews)
          </Typography>
        </Stack>

        <Stack
          spacing={1.5}
          sx={{
            p: 3,
            py: { md: 5 },
          }}
        >
          {/* {ratings
            .slice(0)
            .reverse()
            .map((rating) => (
              <ProgressItem key={rating.name} star={rating} total={total} />
            ))} */}
        </Stack>
      </Box>

      <Divider />

      <ProductDetailsReviewList />

      <ProductDetailsReviewNewDialog open={openReview} onClose={handleCloseReview} />
    </>
  );
}

ProgressItem.propTypes = {
  star: PropTypes.object,
  total: PropTypes.number,
};

function ProgressItem({ star, total }) {
  const { name, starCount, reviewCount } = star;

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="subtitle2" sx={{ width: 42 }}>
        {name}
      </Typography>

      <LinearProgress
        color="inherit"
        variant="determinate"
        value={(starCount / total) * 100}
        sx={{
          mx: 2,
          flexGrow: 1,
        }}
      />

      <Typography
        variant="body2"
        sx={{
          minWidth: 48,
          color: 'text.secondary',
        }}
      >
        {fShortenNumber(reviewCount)}
      </Typography>
    </Stack>
  );
}
