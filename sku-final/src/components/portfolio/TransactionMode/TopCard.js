import { Card, Grid, Typography } from '@mui/material';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { lightGray } from 'components/sellerboard/rfq/new/SellTable';
import { useGetProductDetailQuery } from 'features/product/productAPI';
import LeftGrid from './LeftGrid';
import MiddleGrid from './MiddleGrid';
import RightGrid from './RightGrid';

const TopCard = ({ id }) => {
  const { data: product, isLoading: productLoading } = useGetProductDetailQuery(id);

  const img = product?.all_images.length > 0 ? product.all_images[0] : null;

  if (productLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Card sx={{ mt: '20px', p: 2 }}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12} sm={6} md={4.5}>
            <LeftGrid img={img} product={product} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MiddleGrid id={id} product={product} />
          </Grid>
          <Grid item xs={12} sm={6} md={4.5}>
            <RightGrid product={product} />
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ mt: '20px', p: 2 }}>
        <Grid container alignItems="center" spacing={3} rowGap={1.5}>
          <Grid item xs={6} md={2}>
            <Typography textAlign="center" fontWeight="700" sx={{ fontSize: '14px' }}>
              E Marketplace cap
            </Typography>{' '}
            <Typography textAlign="center" sx={{ fontSize: '14px' }}>
              {' '}
              {product?.buy_box_currency} {product?.est_market_cap}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography textAlign="center" fontWeight="700" sx={{ fontSize: '14px' }}>
              Trade Volume
            </Typography>{' '}
            <Typography textAlign="center" sx={{ fontSize: '14px' }}>
              {' '}
              {product?.buy_box_currency} {product?.trade_value}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography textAlign="center" fontWeight="700" sx={{ fontSize: '14px' }}>
              Chg 24H
            </Typography>{' '}
            <Typography
              textAlign="center"
              sx={{ color: product?.price_change >= 0 ? (product?.price_change === 0 ? lightGray : 'green') : 'red', fontSize: '14px' }}
            >
              {' '}
              {product?.price_change} %
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography textAlign="center" fontWeight="700" sx={{ fontSize: '14px' }}>
              ASP
            </Typography>{' '}
            <Typography textAlign="center" sx={{ fontSize: '14px' }}>
              {' '}
              {product?.buy_box_currency} {product?.average_selling_price}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              Vol(24h)/MCap
            </Typography>{' '}
            <Typography textAlign="center" sx={{ fontSize: '14px' }}>
              {' '}
              {product?.volume_to_market_cap_ratio}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              SKU Status
            </Typography>{' '}
            <Typography
              textAlign="center"
              sx={{ color: product?.is_live ? 'green' : 'red', fontSize: '14px' }}
            >
              {' '}
              {product?.is_live ? 'Live' : 'Not Live'}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              DOH
            </Typography>{' '}
            <Typography textAlign="center" sx={{ fontSize: '14px' }}>
              {' '}
              {product?.days_on_hand}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              ENR
            </Typography>{' '}
            <Typography textAlign="center" sx={{ fontSize: '14px' }}>
              {' '}
              {product?.buy_box_currency} {product?.est_net_revenue}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              Max Investment
            </Typography>{' '}
            <Typography textAlign="center" sx={{ fontSize: '14px' }}>
              {' '}
              {product?.buy_box_currency} {product?.max_investment}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              Min Investment
            </Typography>{' '}
            <Typography textAlign="center" sx={{ fontSize: '14px' }}>
              {' '}
              {product?.buy_box_currency} {product?.min_investment}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              EQTI
            </Typography>{' '}
            <Typography textAlign="center" sx={{ fontSize: '14px' }}>
              {' '}
              {product?.EQTI || 0}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              EM
            </Typography>{' '}
            <Typography textAlign="center" sx={{ fontSize: '14px' }}>
              {' '}
              {product?.min_investment}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              E Opp to stock
            </Typography>{' '}
            <Typography
              textAlign="center"
              sx={{ color: product?.opp_stock ? 'green' : 'red', fontSize: '14px' }}
            >
              {' '}
              {product?.opp_stock ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              E Opp to Fulfillment
            </Typography>{' '}
            <Typography
              textAlign="center"
              sx={{ color: product?.opp_ff ? 'green' : 'red', fontSize: '14px' }}
            >
              {' '}
              {product?.opp_ff ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              Other Platform Fulfillment
            </Typography>{' '}
            <Typography
              textAlign="center"
              sx={{ color: product?.opp_ff ? 'green' : 'red', fontSize: '14px' }}
            >
              {' '}
              {product?.opp_ff ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              Demand
            </Typography>{' '}
            <Typography
              textAlign="center"
              sx={{ color: product?.demand_percentage ? 'green' : 'red', fontSize: '14px' }}
            >
              {' '}
              {product?.demand_percentage} %
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              Supply
            </Typography>{' '}
            <Typography
              textAlign="center"
              sx={{ color: product?.supply_percentage ? 'green' : 'red', fontSize: '14px' }}
            >
              {' '}
              {product?.supply_percentage} %
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography fontWeight="700" textAlign="center" sx={{ fontSize: '14px' }}>
              No. Of Sellers
            </Typography>{' '}
            <Typography textAlign="center" sx={{ fontSize: '14px' }}>
              {' '}
              {product?.number_of_sellers}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default TopCard;
