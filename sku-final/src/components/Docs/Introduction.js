import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router';
import cover from '../../assets/images/sku-market-default-cover-profile.jpg';

const Introduction = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={2} sx={{ my: 3, alignItems: 'center' }}>
        <Grid xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                fontSize: '3rem',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1,
                mb: 2,
              }}
            >
              Many Tools For Your <br />
              <Typography
                component="span"
                sx={{
                  color: 'primary.main',
                  fontSize: '3rem',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                }}
              >
                SKU Markets
              </Typography>{' '}
              <br />
              Store’s Success
            </Typography>
            <Typography sx={{ fontSize: '1.25rem' }}>
              Discover many apps that supercharge <br />
              your SKU Markets store needs.
            </Typography>
          </Box>

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
              mt: 2,
            }}
            onClick={() => navigate('/')}
          >
            Explore Apps
          </Button>
        </Grid>
        <Grid xs={12} md={6}>
          <img src={cover} alt="SKU Markets" />
        </Grid>
      </Grid>
    </>
  );
};

export default Introduction;
