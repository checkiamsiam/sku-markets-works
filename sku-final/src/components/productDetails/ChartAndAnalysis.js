import { Box, LinearProgress, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import ThemeTooltip from 'components/common/ThemeTooltip';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { useGetProductDetailQuery } from 'features/product/productAPI';
import { useRef } from 'react';
import Flippy, { BackSide, FrontSide } from 'react-flippy';
import { useParams } from 'react-router';
import BuyBoxPriceStatus from './BuyBoxPriceStatus';
import HistoricalDataCard from './HistoricalDataCard';

const gray = 'text.main';

const ChartAndAnalysis = () => {
  const ref = useRef(null);
  const theme = useTheme();
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductDetailQuery(id);

  const handleFlip = () => {
    ref.current.toggle();
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <section style={{ margin: '30px 0' }}>
      <Grid container spacing={{ xs: 4, md: 2, lg: 4 }}>
        {/* Start::BuyBox Price Status Chart */}
        <Grid item xs={12} lg={8} sx={{ width: { xs: '100%', lg: '60%' } }}>
          <BuyBoxPriceStatus product={product} />
          <p style={{ fontSize: '12px', color: gray }}>
            The SKU Markets chart is designed for users to instantly see the changes that occur on
            the marketplaces and predicts what will come next.
          </p>
        </Grid>
        {/* End::BuyBox Price Status Chart */}

        {/* Start::SKU Analysis & Statistics */}
        <Grid item xs={12} lg={4} sx={{ width: { xs: '100%', lg: '40%' } }}>
          <Flippy ref={ref} flipOnHover={false} flipOnClick={false} flipDirection="horizontal">
            <FrontSide
              style={{
                borderRadius: '10px',
                backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
                boxShadow: 3,
                height: '515px',
                px: 3,
              }}
            >
              <>
                <h2
                  style={{
                    fontSize: '15px',
                    color: gray,
                    textAlign: 'center',
                    marginBottom: '20px',
                  }}
                >
                  SKU Analysis & Statistics
                </h2>

                <Stack sx={{ my: 1 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    E Marketplace cap <ThemeTooltip />
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    {product?.buy_box_currency} {product?.est_market_cap}
                  </Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    Trade Volume
                    <ThemeTooltip />
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    {product?.buy_box_currency} {product?.trade_value}
                  </Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    Chg 24H
                    <ThemeTooltip />
                  </Typography>
                  <Typography
                    sx={{ fontSize: '12px' }}
                    color={product?.price_change > 0 ? 'green' : 'red'}
                  >
                    {product?.price_change} %
                  </Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    ASP
                    <ThemeTooltip />
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    {product?.buy_box_currency} {product?.average_selling_price}
                  </Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    Vol(24h)/MCap
                    <ThemeTooltip />
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    {product?.volume_to_market_cap_ratio}
                  </Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    SKU Status
                    <ThemeTooltip />
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }} color={product?.is_live ? 'green' : 'red'}>
                    {product?.is_live ? 'Live' : 'Not Live'}
                  </Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    DOH
                    <ThemeTooltip />
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    {Math.ceil(product?.days_on_hand || 0)}
                  </Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    ENR
                    <ThemeTooltip />
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    {product?.buy_box_currency} {product?.est_net_revenue}
                  </Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    Max Investment
                    <ThemeTooltip />
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    {product?.buy_box_currency} {product?.max_investment}
                  </Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    Min Investment
                    <ThemeTooltip />
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>
                    {product?.buy_box_currency} {product?.min_investment}
                  </Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    EQTI
                    <ThemeTooltip />
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>{product?.EQTI}</Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    EM
                    <ThemeTooltip />
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }}>{product?.estimated_margin}</Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    E Opp to stock
                    <ThemeTooltip />
                  </Typography>
                  <Typography
                    sx={{ fontSize: '12px' }}
                    color={product?.opp_stock ? 'green' : 'red'}
                  >
                    {product?.opp_stock ? 'Yes' : 'No'}
                  </Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    E Opp to Fulfillment
                    <ThemeTooltip />
                  </Typography>
                  <Typography sx={{ fontSize: '12px' }} color={product?.opp_ff ? 'green' : 'red'}>
                    {product?.opp_ff ? 'Yes' : 'No'}
                  </Typography>
                </Stack>
                <Stack sx={{ my: 0.7 }} justifyContent={'space-between'} direction={'row'}>
                  <Typography sx={{ fontSize: '12px' }}>
                    E Opp to Other Platform Fulfillment
                    <ThemeTooltip />
                  </Typography>
                  <Typography
                    color={product?.opp_other_platform ? 'green' : 'red'}
                    sx={{ fontSize: '12px' }}
                  >
                    {product?.opp_other_platform ? 'Yes' : 'No'}
                  </Typography>
                </Stack>

                <Box sx={{ mt: 1 }}>
                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      color: gray,
                      textAlign: 'center',
                      margin: '.5rem 0 .25rem 0 ',
                    }}
                  >
                    Trading Activity
                  </p>
                  <Stack direction="row" alignItems="center" justifyContent="space-center">
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: gray,
                        width: '25%',
                      }}
                    >
                      {Math.ceil(product?.demand_percentage || 0)} % Demand
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={Math.ceil(product?.supply_percentage || 0)}
                      sx={{
                        width: '45%',
                        padding: '1px',
                        borderRadius: '5px',
                        bgcolor: '#D3D3D3',
                        // margin: '2px 0px',
                        mr: 3,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: gray,
                        width: '25%',
                      }}
                    >
                      {Math.ceil(product?.supply_percentage || 0)} % Supply
                    </Typography>
                  </Stack>
                </Box>
                <Stack direction="row" justifyContent="center">
                  <Typography
                    sx={{
                      cursor: 'pointer',
                      fontSize: '12px',
                      textDecoration: 'underline',
                      mt: 1,
                      color: '#0d6efd',
                    }}
                    onClick={handleFlip}
                  >
                    View Historical Data
                  </Typography>
                </Stack>
              </>
            </FrontSide>
            <BackSide
              style={{
                borderRadius: '10px',
                backgroundColor: theme.palette.mode === 'dark' ? '#212B36' : 'white',
                boxShadow: 3,
                height: '515px',
                px: 3,
              }}
            >
              <HistoricalDataCard product={product} handleFlip={handleFlip} />
            </BackSide>
          </Flippy>

          <p style={{ fontSize: '12px', color: gray }}>
            Designed for users to instantly see the statistics.
          </p>
        </Grid>
      </Grid>
    </section>
  );
};

export default ChartAndAnalysis;
