import { Divider, Grid } from '@mui/material';
import StatisticsChartS from './ChartPart';
import { BalanceSheetTable, ProbablityTable } from './DataGrids';
import MenuBar from './MenuBar';
import StatisticCharts from './StatisticCharts';

const SalesAccountingTop = () => {
  return (
    <Grid container>
      <Grid item md={12}>
        <MenuBar />
        <Divider sx={{ mt: 1.5 }} />
        <StatisticCharts />
        <StatisticsChartS />
      </Grid>
      <Grid container spacing={2} sx={{px:3}}>
      <Grid item xs={12} md={6}>
        <BalanceSheetTable />
      </Grid>
      <Grid item xs={12} md={6}>
        <ProbablityTable />
      </Grid>
      </Grid>
    </Grid>
  );
};

export default SalesAccountingTop;
