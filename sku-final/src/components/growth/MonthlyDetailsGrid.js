import { Box, Grid } from '@mui/material';
import GrowthSummaryChart from './GrowthSummaryChart';
import MonthlyDetailCard from './MonthlyDetailCard';

const MonthlyDetailsGrid = () => {
  return (
    <Box sx={{ marginTop: '50px' }}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xs={12}>
          <MonthlyDetailCard title="Revenue" /> <br />
          <GrowthSummaryChart
            title="Total Revenue"
            sub_title="0"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 15, 12, 51, 68, 11, 39, 37, 27, 20],
            }}/>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <MonthlyDetailCard title="Credit Notes" /> <br />
          <GrowthSummaryChart
            title="Total Paid Units"
            sub_title="0"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 25, 12, 45, 68, 11, 39, 37, 27, 5],
            }}/>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <MonthlyDetailCard title="Payments Disbursal" /> <br />
          <GrowthSummaryChart
            title="ROI"
            sub_title="0"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 21, 12, 51, 68, 11, 39, 37, 27, 20],
            }}/>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <MonthlyDetailCard title="Paid Units" /> <br />
          <GrowthSummaryChart
            title="Total Credit Notes"
            sub_title="0"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}/>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <MonthlyDetailCard title="ASP" /> <br />
          <GrowthSummaryChart
            title="Total Selling Cost"
            sub_title="0"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}/>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <MonthlyDetailCard title="Monthly Selling Cost" /> <br />
          <GrowthSummaryChart
            title="Total Didicated Amount"
            sub_title="0"
            growthData={{ percentage: 5, time: 3 }}
            chart={{
              colors: ['#F76F72'],
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MonthlyDetailsGrid;
