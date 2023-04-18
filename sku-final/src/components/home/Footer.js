import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import SKUWalletLogo from 'components/common/SKUWalletLogo';
import { Link } from 'react-router-dom';
import apple from '../../assets/images/Apple_Pay_logo.png';
import btcIcon from '../../assets/images/btcIcon.png';
import payment from '../../assets/images/payment-cards2.png';
import SkuMarketLogo from '../../assets/images/svg/SKU-Market-Logo.svg';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Container maxWidth="xl">
      <Grid
        container
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        spacing={2}
      >
        <Grid
          item
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          lg={4}
        >
          <img height={50} style={{ width: '150px' }} src={SkuMarketLogo} alt="" />
          <Typography sx={{ fontWeight: 'bold', fontSize: '12px' }} component="p">
            <span>&copy;</span> All rights reserved {year}
          </Typography>
        </Grid>
        <Grid item sx={{ display: 'flex', gap: "3px" , justifyContent: 'center', alignItems: 'center' }} lg={4}>
          <SKUWalletLogo />
          <img width={49} height={20} src={apple} alt="apple" />
          <img width={160} height={20} src={payment} alt="apple" />
          <img src={btcIcon} width={25} height={25} alt="payment_icon" />
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} item lg={4}>
          <Box sx={{ textDecoration: 'none' }}>
            <Link
              style={{
                textDecoration: 'none',
                marginRight: '20px',
                color: '#0D6EFD',
              }}
              to="/"
              onClick={() => window.scrollTo(0, 0)}
            >
              Home
            </Link>

            <Link
              style={{
                textDecoration: 'none',
                marginRight: '20px',
                color: '#0D6EFD',
              }}
              to="/help_center"
            >
              Help Center
            </Link>

            <Link
              style={{
                textDecoration: 'none',
                marginRight: '20px',
                color: '#0D6EFD',
              }}
              to="/policies"
            >
              Policies
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
