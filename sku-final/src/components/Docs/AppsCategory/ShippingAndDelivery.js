import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
const ShippingAndDelivery = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ flexGrow: 1, my: 1, p: 2, bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2 }}
    >
      <Grid container spacing={4}>
        <Grid xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Box
                component="img"
                src="https://i.postimg.cc/3WM2rWmd/aramex.png"
                alt="Image"
                width="80px"
              />
              <Typography>Free</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 'bold' }}>Aramex</Typography>
              <Typography sx={{ fontSize: '14px' }}>Shipping and Delivery</Typography>
            </Box>
            <Box />
          </Box>
          <Box sx={{ py: 2 }}>
            <Typography sx={{ fontSize: '14px', textAlign: 'justify' }}>
              Aramex provides solutions for e-stores by delivering their shipments to any place in
              the Kingdom of Saudi Arabia, with multiple options to suit your needs, and exclusive
              prices for Salla merchants.
            </Typography>
          </Box>
        </Grid>
        <Grid xs={6} md={3} />
        <Grid xs={12} md={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ pb: 2, fontWeight: 'bold' }}>Website: </Typography>
            <Typography
              component={Link}
              to="/"
              sx={{ textDecoration: 'none', color: 'primary.main' }}
            >
              Home Page
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ pb: 2, fontWeight: 'bold' }}>Contact Info: </Typography>
            <Typography>8001000800</Typography>
          </Box>
          <Box>
            <Button
              sx={{
                bgcolor: 'primary.main',
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'white',
                  transition: 'ease-in-out 0.7s',
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                },
                px: 1,
                mt: 5,
                width: '100%',
              }}
              onClick={() => navigate('/')}
            >
              Add App
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShippingAndDelivery;
