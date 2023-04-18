import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
/* import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper'; */
import PriceIncreaseTable from './PriceIncreaseTable';
import PriceDecreaseTable from './PriceDecreaseTable';
import SkuBuyboxTable from './SkuBuyboxTable';

/* const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.55)',
}));

const SKUs = [
  { label: 'SKUs At Min Price', value: 1345, type: 'Live SKUs' },
  { label: 'Estimated Current Value', value: 1345, type: 'Live SKUs' },
  { label: 'New Prices update to upload', value: 556, type: 'Live SKUs' },
]; */

const IncreaseBuyboxDecrease = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={3.75}>
            <PriceIncreaseTable/>
          </Grid>
          <Grid xs={12} md={4.5}>
            <SkuBuyboxTable/>
          </Grid>
          <Grid xs={12} md={3.75}>
            <PriceDecreaseTable/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default IncreaseBuyboxDecrease;
