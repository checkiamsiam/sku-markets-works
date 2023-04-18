import { Box, Card, Grid } from '@mui/material';
import AnimatedGradiantText from 'components/common/AnimatedGradiantText';
import { Link } from 'react-router-dom';
import leftImage from '../../../../assets/images/home-banner/home-banner-slider-img-1.jpg';

const TopFooter = () => {
  return (
    <Grid container justifyContent="center" sx={{ my: 3 }}>
      <Grid item md={9.5}>
        <Card>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', pr: 1 }}>
            <AnimatedGradiantText>Sponsored Ad</AnimatedGradiantText>
          </Box>
          <Link to="/signup">
            <Box
              component="img"
              src={leftImage}
              alt="sku markets"
              sx={{ width: '100%', height: { md: '172px', xs: '140px' } }}
            />
          </Link>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TopFooter;
