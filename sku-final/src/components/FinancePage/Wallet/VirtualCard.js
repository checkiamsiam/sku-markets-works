import { Box } from '@mui/material';
import { _bankingCreditCard } from '_mock/arrays';
import BankingCurrentBalance from './VirtualCardTheme';

const VirtualCard = () => {
  return (
    <Box sx={{ minHeight: '100%' }}>
      <BankingCurrentBalance sx={{minHeight: '100%'}} list={_bankingCreditCard} />
    </Box>
  );
};

export default VirtualCard;
