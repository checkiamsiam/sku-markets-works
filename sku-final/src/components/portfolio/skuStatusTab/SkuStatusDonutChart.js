// components
import { Card, CardContent } from '@mui/material';
import Chart, { useChart } from '../../chart';

// ----------------------------------------------------------------------

const series = [44, 55, 13, 43, 40, 30];

export default function SkuStatusDonutChart() {
  const chartOptions = useChart({
    labels: [
      'Top Gainers SKUs',
      'Top Losers SKUs',
      'New High (ATH) SKUs',
      'New Low (ATL) SKUs',
      'Unusual Volume SKUs',
      'Most Volatile SKUs',
    ],
    stroke: {
      show: false,
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '85%',
        },
      },
    },
  });

  return (
    <Card dir="ltr">
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Chart type="donut" series={series} options={chartOptions} width={400} />{' '}
      </CardContent>
    </Card>
  );
}
