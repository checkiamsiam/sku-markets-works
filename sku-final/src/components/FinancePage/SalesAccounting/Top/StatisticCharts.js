import { Card, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TrendingInfo } from 'components/common/AppWidgetSummary';
import { fNumber } from 'utils/formatNumber';

const StatisticCharts = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                py: 1,
                height: '104px',
              }}
            >
              <div>
                <Typography fontSize="12px" variant="caption" fontWeight={700} textAlign="left">
                  GMV
                </Typography>
                <TrendingInfo percent={'15'} />
              </div>
              <Typography fontSize="16px" fontWeight={500}>
                SAR {fNumber(5000)}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                py: 1,
                height: '104px',
              }}
            >
              <div>
                <Typography fontSize="12px" variant="caption" fontWeight={700} textAlign="left">
                  Referral fees
                </Typography>
                <TrendingInfo percent={'15'} />
              </div>
              <Typography fontSize="16px" fontWeight={500}>
                SAR {fNumber(5000)}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                py: 1,
                height: '104px',
              }}
            >
              <div>
                <Typography fontSize="12px" variant="caption" fontWeight={700} textAlign="left">
                  Payables
                </Typography>
                <TrendingInfo percent={-15} />
              </div>
              <Typography fontSize="16px" fontWeight={500}>
                SAR {fNumber(5000)}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                py: 1,
                height: '104px',
              }}
            >
              <div>
                <Typography fontSize="12px" variant="caption" fontWeight={700} textAlign="left">
                  Net Revenue
                </Typography>
                <TrendingInfo percent={'15'} />
              </div>
              <Typography fontSize="16px" fontWeight={500}>
                SAR {fNumber(5000)}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default StatisticCharts;
