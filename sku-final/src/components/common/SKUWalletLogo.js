import { Box, Stack, Typography } from '@mui/material';
import heroJumpLgo from '../../assets/images/svg/SKU Market Patt 20x15-01.png';

const SKUWalletLogo = ({ width = 20, height = 20 }) => {
  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Box component="img" width={width} height={height} src={heroJumpLgo} alt="sku market logo" />
      <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
        Pay
      </Typography>
    </Stack>
  );
};

export default SKUWalletLogo;
