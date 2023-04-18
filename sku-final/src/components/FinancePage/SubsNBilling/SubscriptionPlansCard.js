import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Box, Card, Stack, Typography, useTheme } from '@mui/material';
import useCurrency from 'layouts/dashboard/header/useCurrency';
import { defaultCurrency } from 'layouts/dashboard/header/currency';
import heroJumpLgo from '../../../assets/images/svg/SKU Market Patt 20x15-01.png';

const SubscriptionPlanCard = ({ checked ,objective, setSelectedObjective, selectedObjective }) => {
  const theme = useTheme();
  const getCrncy = useCurrency();
  const selectObjtive = () => {
    setSelectedObjective(objective);
  };
  let price = objective.price;
  if(!checked){
    let per = price + (price * 25) / 100 ;
    let amount = Math.round(per * (getCrncy?.rate || defaultCurrency?.rate))
    price= amount
  }
  return (
    <Card
      onClick={selectObjtive}
      sx={{
        p: 2,
        overflow: 'visible',
        position: 'relative',
        border:
          objective?.id === selectedObjective?.id ? '2px solid #1562ff' : '2px solid transparent',
      }}
    >
      {/* <LocalOfferIcon /> */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Box component="img" width={15} height={15} src={heroJumpLgo} alt="sku market logo" />
        <Box>
          <Typography sx={{ fontSize: '12px' , fontWeight:800 }}> {getCrncy?.label} {price}/mo </Typography>
          <Typography sx={{ fontSize: '10px', color: 'primary.main' }}>+5% Selling Fees</Typography>
          <Typography sx={{ fontSize: '10px', color: 'primary.main' }}> + Ads fees CPC </Typography>
        </Box>
      </Stack>

      <Typography sx={{ fontSize: '12px', fontWeight: 'bold', pt: 1 }}>
        {objective.title}
      </Typography>
      <Typography sx={{ fontSize: '12px' }}> {objective.description} </Typography>
      {objective?.id === selectedObjective?.id && (
        <CheckCircleOutlineIcon
          sx={{
            color: '#1562ff',
            backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
            borderRadius: '50%',
            position: 'absolute',
            zIndex: 10,
            top: '-7px',
            right: '-7px',
          }}
        />
      )}
    </Card>
  );
};

export default SubscriptionPlanCard;
