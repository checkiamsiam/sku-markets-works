import { Box, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import GrowthSummaryChart from 'components/growth/GrowthSummaryChart';
import CompetitorsBubbleChart from '../CompetitorsBubbleChart';

const CompetitorsNoon = () => {
  const theme = useTheme();
  return (
    <Box sx={{ mt:3 }}>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={4} xs={12}>
              <Grid item container direction="column" spacing={2}>
                <Grid item>
                  <GrowthSummaryChart
                    title="No. of Competitors"
                    total={0}
                    growthData={{ percentage: 5 }}
                    chart={{
                      colors: ['#F76F72'],
                      series: [5, 21, 12, 51, 68, 11, 39, 37, 27, 20],
                    }}
                  />
                </Grid>
                <Grid item>
                  <GrowthSummaryChart
                    title="Live SKUs"
                    total={0}
                    growthData={{ percentage: 5 }}
                    chart={{
                      colors: ['#F76F72'],
                      series: [5, 21, 12, 51, 68, 11, 39, 37, 27, 20],
                    }}
                  />
                </Grid>
                <Grid item>
                  <GrowthSummaryChart
                    title="Not Live SKUs"
                    total= {0}
                    growthData={{ percentage: 5 }}
                    chart={{
                      colors: ['#F76F72'],
                      series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={8} md={8} xs={12}>
            <Box sx={{ boxShadow: 3, borderRadius: 1 }}>
                <Box sx={{ boxShadow: 1 }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    sx={{
                      py: 1,
                      borderRadius: 1,
                      borderTop: '1px solid #ced4da',
                    }}
                  >
                    <Typography variant="caption" width="50%" textAlign="center" fontWeight="700">
                      Price Status
                    </Typography>
                    <Typography variant="caption" width="50%" textAlign="center" fontWeight="700">
                      SKUs Status
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
                  <CompetitorsBubbleChart
                    chart={{
                      categories: ['Dec', 'Jan'],
                      series: [
                        {
                          gv: 'Price',
                          data: [
                            { name: 'Current Month', data: [41, 77] },
                            { name: 'Previous Month', data: [34, 65] },
                          ],
                        },
                        {
                          gv: 'SKUs',
                          data: [
                            { name: 'Current Month', data: [31, 87] },
                            { name: 'Previous Month', data: [44, 95] },
                          ],
                        },
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
            title="Buybox SKUs"
            total={0}
            growthData={{ percentage: 5 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GrowthSummaryChart
            title="SKUs in Market"
            total={0}
            growthData={{ percentage: 5 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 15, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GrowthSummaryChart
            title="SKUs in Express"
            total={0}
            growthData={{ percentage: 5 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 25, 12, 45, 68, 11, 39, 37, 27, 5],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GrowthSummaryChart
            title="Increased Prices"
            total={0}
            growthData={{ percentage: 5 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 21, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GrowthSummaryChart
            title="Decreased Prices"
            total={0}
            growthData={{ percentage: 5 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <GrowthSummaryChart
            title="Lowest Price"
            total={0}
            growthData={{ percentage: 5 }}
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

export default CompetitorsNoon;
