import WestIcon from '@mui/icons-material/West';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import TopCard from 'components/portfolio/TransactionMode/TopCard';
import TransactionModeTable from 'components/portfolio/trasactionTable';
import { toggleTransInAlert } from 'features/alert/alertSlice';
import { useDispatch, useSelector } from 'react-redux';

const TransactionMode = () => {
  const dispatch = useDispatch();
  const { targetedSKUForTransaction } = useSelector((state) => state.alertState);
  const theme = useTheme();
  return (
    <Box sx={{ marginTop: '10px' }}>
      <Box width="100px">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0.8}
          onClick={() => dispatch(toggleTransInAlert())}
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
      <TopCard id={targetedSKUForTransaction?._id || targetedSKUForTransaction?.id} />
      <TransactionModeTable targetedForTransaction={targetedSKUForTransaction} />
    </Box>
  );
};

export default TransactionMode;
