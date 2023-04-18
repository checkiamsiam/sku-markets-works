import { Box, Card, Grid, Typography } from '@mui/material';
import AnimatedGradiantText from 'components/common/AnimatedGradiantText';
import { Link } from 'react-router-dom';
import { MegaDeal } from '../Banner/ProductBanner';

const OffersSection = () => {
  return (
    <Card
      sx={{
        px: 2,
        pt: 2,
      }}
    >
      <Typography variant="subtitle1" sx={{ pl: 2, pb: 2, fontSize: '18px' }}>
        More to focus
      </Typography>
      <Grid container spacing={2}>
        {MegaDeal.map((deal, i) => (
          <Grid item key={i} xs={12} md={3}>
            <Card sx={{ height: '300px' }}>
              <Link to={deal.destination} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box sx={{ px: 0.5 }}>
                  <Box
                    component="img"
                    src={deal.image}
                    alt=""
                    height="250px"
                    width="100%"
                    sx={{ borderRadius: 1 }}
                  />
                  <Typography variant="subtitle1" sx={{ fontSize: '14px' }}>
                    {deal.label}
                  </Typography>
                  <Typography variant="caption">{deal.sublabel}</Typography>
                </Box>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <AnimatedGradiantText>Sponsored Ads</AnimatedGradiantText>
      </Box>
    </Card>
  );
};

export default OffersSection;
