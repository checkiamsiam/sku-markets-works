import { Box, Link } from '@mui/material';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Sku_MarketLog from '../../assets/images/svg/SKU-Market-Logo.svg';

const Logo = forwardRef(({ disabledLink = false, sx, width, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        height: 100,
        maxWidth: '100%',
        display: 'flex',
      }}
    >
      <Box
        component="img"
        src={Sku_MarketLog}
        alt="sku market logo"
        sx={{ width: { md: 150, lg: 150, xl: 150, xs: 150, sm: 150 }, objectFit: 'contain' }}
      />
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} to="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

export default Logo;
