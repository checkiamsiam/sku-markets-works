import RepeatIcon from '@mui/icons-material/Repeat';
import { Card, Divider, IconButton, Stack, Typography } from '@mui/material';
import MPLogo from 'components/common/MPLogo';
import {
  targetCategoryForDetailView,
  toggleIsCategoryDetailMode,
} from 'features/portfolio/portfolioSlice';
import { BiNetworkChart } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const CategoryGrowthsCard = ({ data }) => {
  const dispatch = useDispatch();
  const handleOpenDetailView = () => {
    dispatch(targetCategoryForDetailView(data?.category));
    dispatch(toggleIsCategoryDetailMode());
  };
  return (
    <Card sx={{ p: 3, boxShadow: 5 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <MPLogo marketplace="noon/ksa" />
        <IconButton onClick={handleOpenDetailView} size="small" aria-label="details">
          <RepeatIcon sx={{ color: '#0D6EFD' }} fontSize="inherit" />
        </IconButton>
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

export default CategoryGrowthsCard;
