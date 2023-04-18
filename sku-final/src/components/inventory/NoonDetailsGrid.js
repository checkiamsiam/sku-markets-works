import { Box, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import GrowthSummaryChart from 'components/growth/GrowthSummaryChart';
import InventoryStockChart from './InventoryStockChart';

const NoonDetailsGrid = () => {
  const theme = useTheme();
  return (
    <Box sx={{ marginTop: '50px' }}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xs={12}>
          <GrowthSummaryChart
            title="Stock- In/ Inbound"
            sub_title="0"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 15, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GrowthSummaryChart
            title="Stock- In/ QC Accepted"
            sub_title="0"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 25, 12, 45, 68, 11, 39, 37, 27, 5],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GrowthSummaryChart
            title="Stock- In/ QC Rejected"
            sub_title="0"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 21, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <Grid container spacing={4}>
            <Grid item lg={4} md={4} xs={12}>
              <Grid item container direction="column" spacing={4}>
                <Grid item>
                  <GrowthSummaryChart
                    title="QC Unidefined"
                    sub_title="0"
                    growthData={{ percentage: 5, time: 3 }}
                    chart={{
                      colors: ['#F76F72'],
                      series: [5, 21, 12, 51, 68, 11, 39, 37, 27, 20],
                    }}
                  />
                </Grid>
                <Grid item>
                  <GrowthSummaryChart
                    title="SOH"
                    sub_title="0"
                    growthData={{ percentage: 5, time: 3 }}
                    chart={{
                      colors: ['#F76F72'],
                      series: [5, 21, 12, 51, 68, 11, 39, 37, 27, 20],
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={8} md={8} xs={12}>
            <Box sx={{ boxShadow: 3, borderRadius: 1 }}>
            <Box sx={{ boxShadow: 1 }}>
            <Stack
          sx={{
            // backgroundColor: theme.palette.primary.background,
            py: 1,
            borderRadius: 1,
            borderTop: '1px solid #ced4da',
          }}
        >
          <Typography variant="caption" textAlign="center" sx={{fontWeight:'700'}}>
            Stock Status
          </Typography>
        </Stack>
              <Stack
                direction="row"
                divider={
                  <Divider
                    orientation="vertical"
                    flexItem
                    color={theme.palette.secondary.contrastText}
                  />
                }
                sx={{ backgroundColor: theme.palette.primary.background, py: 1 }}
              >
                <Typography
                  variant="caption"
                  width="50%"
                  textAlign="center"
                  color={theme.palette.secondary.contrastText}
                >
                  Current Month
                </Typography>
                <Typography
                  variant="caption"
                  width="50%"
                  textAlign="center"
                  color={theme.palette.secondary.contrastText}
                >
                  Previous Month
                </Typography>
              </Stack>
            </Box>
            <Stack>
              <InventoryStockChart
                chart={{
                  categories: ['Dec','Jan'],
                  series: [  
                        { name: 'Current Month', data: [ 41, 77, ] },
                        { name: 'Previous Month', data: [ 34, 65, ] },
                  ],
                  colors: ['#8BE78B', '#F76F72'],
                }}
              />
            </Stack>
          </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GrowthSummaryChart
            title="Agening Stock"
            sub_title="0"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GrowthSummaryChart
            title="RTV"
            sub_title="0"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GrowthSummaryChart
            title="RTV %"
            sub_title="0"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NoonDetailsGrid;
