import { Card, Divider, Stack, Typography } from '@mui/material';
import MPLogo from 'components/common/MPLogo';
import { BiNetworkChart } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const CategoryCard = ({ data }) => {
  
  return (
    <Card sx={{ p: 3, boxShadow: 5 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <MPLogo marketplace={data?.marketplace} />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 3 }}>
        <BiNetworkChart size="3rem" color="#0052FF" />
        <Stack>
          <Typography
            component={Link}
            fontSize="16px"
            to={`/category/${data?.category}`}
            sx={{ textDecoration: 'none', color: 'primary.main' }}
          >
            {data?.category}
          </Typography>
          <Typography fontSize="16px">{data?.sku}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Live SKUs</Typography>
        <Typography fontSize="16px">{data?.live}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Not Live SKUs</Typography>
        <Typography fontSize="16px">{data?.not_live}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Brands</Typography>
        <Typography fontSize="16px">{data?.brand}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Types</Typography>
        <Typography fontSize="16px">{data?.type}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Sub Types</Typography>
        <Typography fontSize="16px">{data?.sub_type}</Typography>
      </Stack>
      <Divider />
    </Card>
  );
};

export default CategoryCard;
