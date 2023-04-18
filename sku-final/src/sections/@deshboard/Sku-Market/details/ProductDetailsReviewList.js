import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Stack, Button, Rating, Avatar, Pagination, Typography } from '@mui/material';
import { fDate } from 'utils/formatTime';
import Iconify from 'components/iconify/Iconify';
// utils

// ----------------------------------------------------------------------

ProductDetailsReviewList.propTypes = {
  reviews: PropTypes.array,
};

export default function ProductDetailsReviewList() {
  return (
    <>
      <Stack
        spacing={5}
        sx={{
          pt: 5,
          pl: {
            xs: 2.5,
            md: 0,
          },
          pr: {
            xs: 2.5,
            md: 5,
          },
        }}
      >
        {/* {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))} */}
      </Stack>

      <Stack
        alignItems={{
          xs: 'center',
          md: 'flex-end',
        }}
        sx={{
          my: 5,
          mr: { md: 5 },
        }}
      >
        <Pagination count={10} />
      </Stack>
    </>
  );
}

// ----------------------------------------------------------------------

ReviewItem.propTypes = {
  review: PropTypes.object,
};

function ReviewItem({ review }) {
  const { name, rating, comment, helpful, postedAt, avatarUrl, isPurchased } = review;

  const [isHelpful, setIsHelpful] = useState(false);

  return (
    <Stack
      spacing={2}
      direction={{
        xs: 'column',
        md: 'row',
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        direction={{
          xs: 'row',
          md: 'column',
        }}
        sx={{
          width: { md: 240 },
          textAlign: { md: 'center' },
        }}
      >
        <Avatar
          src={avatarUrl}
          sx={{
            width: { md: 64 },
            height: { md: 64 },
          }}
        />

        <Stack spacing={{ md: 0.5 }}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>

          <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
            {fDate(postedAt)}
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={1} flexGrow={1}>
        <Rating size="small" value={rating} precision={0.1} readOnly />

        {isPurchased && (
          <Typography
            variant="caption"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'success.main',
            }}
          >
            <Iconify icon="ic:round-verified" width={16} sx={{ mr: 0.5 }} />
            Verified purchase
          </Typography>
        )}

        <Typography variant="body2">{comment}</Typography>

        
      </Stack>
    </Stack>
  );
}
