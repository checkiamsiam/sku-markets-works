import { Grid, Box } from '@mui/material';
import { AppWidgetSummary } from 'sections/@deshboard/general/app';

const DetailCards = () => {
  return (
    <Box sx={{ marginTop: '50px' }}>
      <Grid container spacing={{ lg: 5, xs: 1 }}>
        <Grid item lg={4} md={6} xs={12}>
          <AppWidgetSummary
            title="total Revenue"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#8BE78B'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <AppWidgetSummary
            title="total Revenue"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#8BE78B'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <AppWidgetSummary
            title="total Revenue"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#8BE78B'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <AppWidgetSummary
            title="total Revenue"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#8BE78B'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <AppWidgetSummary
            title="total Revenue"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#8BE78B'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <AppWidgetSummary
            title="total Revenue"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#8BE78B'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <AppWidgetSummary
            title="total Revenue"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#8BE78B'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <AppWidgetSummary
            title="total Revenue"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#8BE78B'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <AppWidgetSummary
            title="total Revenue"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#8BE78B'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailCards;
