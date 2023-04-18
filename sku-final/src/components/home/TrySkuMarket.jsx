import { Box, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import style from 'styles/Home.module.css';
import web_1 from '../../assets/images/Web-01.png';

const TrySkuMarket = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ marginTop: 10 }} maxWidth="lg" id="TrySkuMarket">
      <Grid container spacing={2}>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          item
          lg={6}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ marginY: 3, fontWeight: '600', fontSize: '25px' }}
              component="h4"
            >
              SKU Markets Insights, Analytics & Statistics
            </Typography>
            <Typography sx={{ fontSize: '13px' }} component="p">
              Top selling and trending SKUs on the KSA, UAE and Egypt online marketplaces and Price
              List by Market top Ecommerce Platforms such as Amazon and Noon. List of top Live SKU
              prices of 10,000,000 different online SKUs. A complete list with SKU markets rankings,
              trade volume and value charts as of today.
            </Typography>

            <button
              onClick={() => navigate('/dashboard')}
              style={{ marginTop: '30px' }}
              className={style.btnStyle}
            >
              Try SKU Markets
            </button>
          </Box>
        </Grid>
        <Grid item lg={6}>
          <Box>
            <img
              src={web_1}
              alt="the author"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TrySkuMarket;
