import RepeatIcon from '@mui/icons-material/Repeat';
import { Card, Divider, IconButton, Stack, Typography } from '@mui/material';
import MPLogo from 'components/common/MPLogo';
import UpdateAlert from 'components/common/SKUactions/UpdateAlert';
import WatchlistAction from 'components/common/SKUactions/WatchlistAction';
import {
  targetSkuForTransaction,
  toggleSkuTransactionMode,
} from 'features/portfolio/portfolioSlice';
import { SiBrandfolder } from 'react-icons/si';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { dummyProduct } from '_mock/static/dummyProduct';
const SKUCard = () => {
  const dispatch = useDispatch();
  const handleOpenDetailView = () => {
    dispatch(targetSkuForTransaction({ _id: '63d80b197075dddb93109359' }));
    dispatch(toggleSkuTransactionMode());
    window.scrollTo(0, 0);
  };
  return (
    <Card sx={{ p: 3, boxShadow: 5 }}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <MPLogo marketplace="noon/ksa" />
        <Stack direction="row" justifyContent="center" alignItems="center">
          <WatchlistAction row={dummyProduct} />
          <UpdateAlert row={dummyProduct} />
          <IconButton onClick={handleOpenDetailView} size="small" aria-label="details">
            <RepeatIcon sx={{ color: '#0D6EFD' }} fontSize="inherit" />
          </IconButton>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 3 }}>
        <SiBrandfolder size="3rem" color="#0052FF" />
        <Stack>
          <Typography
            component={Link}
            fontSize="16px"
            to="#"
            sx={{ textDecoration: 'none', color: 'primary.main' }}
          >
            SKU Name
          </Typography>
          <Typography fontSize="16px">50</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Categories</Typography>
        <Typography fontSize="16px">60</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Brand</Typography>
        <Typography fontSize="16px">60</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">SKU Status</Typography>
        <Typography fontSize="16px">Live</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Buybox Sale Price</Typography>
        <Typography fontSize="16px">SAR 70</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ my: 2 }}>
        <Typography fontSize="16px">Chg 24h</Typography>
        <Typography fontSize="16px">50</Typography>
      </Stack>
      <Divider />
    </Card>
  );
};

export default SKUCard;
