import PropTypes from 'prop-types';
// @mui
import { Card, Box } from '@mui/material';
import Chart, { useChart } from 'components/chart';

MonthlyDetailsChart.propTypes = {
  chart: PropTypes.object,
};

export default function MonthlyDetailsChart({ chart, ...other }) {
  const { colors, categories, series, options } = chart;

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  return (
    <Card {...other} sx={{ borderRadius: '0px 0px 10px 10px' }}>
      <Box sx={{ mx: 3 }} dir="ltr">
        <Chart type="line" series={series} options={chartOptions} height={200} />
      </Box>
    </Card>
  );
}
