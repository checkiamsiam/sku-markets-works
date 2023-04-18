import RepeatIcon from '@mui/icons-material/Repeat';
import { Card, Divider, IconButton, Stack, Typography } from '@mui/material';
import MPLogo from 'components/common/MPLogo';
import {
  targetBrandForDetailView,
  toggleIsBrandDetailMode,
} from 'features/portfolio/portfolioSlice';
import { SiBrandfolder } from 'react-icons/si';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const BrandAndGrowthCard = ({data}) => {
  const dispatch = useDispatch();
  const handleOpenDetailView = () => {
    dispatch(targetBrandForDetailView(data?.brand));
    dispatch(toggleIsBrandDetailMode());
  };
  return (
    <Card sx={{ p: 3 , boxShadow: 5 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <MPLogo marketplace="noon/ksa" />
        <IconButton onClick={handleOpenDetailView} size="small" aria-label="details">
          <RepeatIcon sx={{ color: '#0D6EFD' }} fontSize="inherit" />
        </IconButton>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 3 }}>
        <SiBrandfolder size="3rem" color="#0052FF" />
        <Stack>
          <Typography
            component={Link}
            fontSize="16px"
            to={`/brand/${data?.brand}`}
            sx={{ textDecoration: 'none', color: 'primary.main' }}
          >
            {data?.brand}
          </Typography>
          <Typography fontSize="16px">{data?.sku}</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Live SKUs</Typography>
        <Typography fontSize="16px">{data?.is_live}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Not Live SKUs</Typography>
        <Typography fontSize="16px">{data?.is_not_live}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Categories</Typography>
        <Typography fontSize="16px">{data?.category}</Typography>
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

export default BrandAndGrowthCard;
