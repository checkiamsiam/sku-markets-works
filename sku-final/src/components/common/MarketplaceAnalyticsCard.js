import { Card, Divider, Stack, Typography } from '@mui/material';
import MPLogo from 'components/common/MPLogo';
import { Link } from 'react-router-dom';

const MarketplaceCard = ({ data }) => {
  return (
    <Card sx={{ p: 3, boxShadow: 5 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between"></Stack>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 3 }}>
        <MPLogo marketplace={data?.id} />
        <Stack>
          <Typography
            component={Link}
            fontSize="16px"
            to={`/marketplace/${data?.id.split('/')?.join('-')?.toLowerCase()}`}
            sx={{ textDecoration: 'none', color: 'primary.main' }}
          >
            {data?.id}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Categories</Typography>
        <Typography fontSize="16px">{data?.categories}</Typography>
      </Stack>
      <Divider />

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Brands</Typography>
        <Typography fontSize="16px">{data?.brands}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Types</Typography>
        <Typography fontSize="16px">{data?.types}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Sub Types</Typography>
        <Typography fontSize="16px">{data?.subTypes}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Live SKUs</Typography>
        <Typography fontSize="16px">{data?.live}</Typography>
      </Stack>
      <Divider />
    </Card>
  );
};

export default MarketplaceCard;
