import WestIcon from '@mui/icons-material/West';
import { Box, Card, Grid, Stack, Typography, useTheme } from '@mui/material';
import { toggleSkuTransactionMode } from 'features/portfolio/portfolioSlice';
import { useDispatch, useSelector } from 'react-redux';
import TransactionModeTable from '../trasactionTable';
import TopCard from './TopCard';

const TransactionMode = () => {
  const dispatch = useDispatch();
  const { targetedForTransaction } = useSelector((state) => state.portfolios);
  const theme = useTheme();
  return (
    <Box sx={{ mt: '-10px' }}>
      <Box width="100px">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0.8}
          onClick={() => dispatch(toggleSkuTransactionMode())}
          variant="contained"
          sx={{
            py: '5px',
            fontSize: '15px',
            backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : '#EFF2F5',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          <WestIcon sx={{ fontSize: '15px' }} />
          <Typography sx={{ fontSize: '16px' }}>Back</Typography>
        </Stack>
      </Box>
      <TopCard id={targetedForTransaction._id}/>
      <TransactionModeTable targetedForTransaction={targetedForTransaction}/>
    </Box>
  );
};

export default TransactionMode;
