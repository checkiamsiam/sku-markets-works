import { Box, Card, Divider, Stack, Typography } from '@mui/material';
import MPLogo from 'components/common/MPLogo';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import { Link } from 'react-router-dom';

const SKUCard = ({ data }) => {
  return (
    <Card sx={{ p: 3, boxShadow: 5 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <MPLogo marketplace={data?.sku_marketplace} />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 3 }}>
        <Box
          component="img"
          src={data?.all_images[0]}
          alt="product img"
          sx={{ width: 80, height: 80, objectFit: 'cover' }}
        />
        <Stack>
          <Typography
            component={Link}
            fontSize="16px"
            to={`#`}
            sx={{ textDecoration: 'none', color: 'primary.main' }}
          >
            {data?.sku}
          </Typography>
          <Typography fontSize="16px">{data?.number_of_sellers}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Category</Typography>
        <Typography fontSize="16px">{data?.category_en}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Brand</Typography>
        <Typography fontSize="16px">{data?.brand_en}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">SKU Status</Typography>
        <Typography fontSize="16px" sx={{ color: data?.is_live ? 'green' : 'red' }}>
          {data?.is_live ? 'Live' : 'Not Live'}
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Buybox Sale Price</Typography>
        <Typography fontSize="16px">
          {data?.current_price ? data?.buy_box_currency : ''} {data?.current_price}
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Chg 24h</Typography>
        <Typography
          fontSize="16px"
          color={data?.price_change >= 0 ? (data?.price_change === 0 ? lightGray : 'green') : 'red'}
        >
         {data?.price_change &&  `${data?.price_change} %`}
        </Typography>
      </Stack>
      <Divider />
    </Card>
  );
};

export default SKUCard;
