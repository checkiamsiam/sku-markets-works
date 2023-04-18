import PropTypes from 'prop-types';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
import { useChart } from 'components/chart';
import { CustomSmallSelect } from 'components/custom-input';
import { useState } from 'react';
import Chart from 'react-apexcharts';

CompetitorsBubbleChart.propTypes = {
  chart: PropTypes.object,
};

export default function CompetitorsBubbleChart({ chart, ...other }) {
  const { colors, categories, series, options } = chart;

  const [seriesData, setSeriesData] = useState('Price');
  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  return (
    <Card {...other} sx={{ borderRadius: '0px 0px 10px 10px' }}>
      <CardHeader
       /*  title={title}
        subheader={subheader} */
        action={
          <CustomSmallSelect
            value={seriesData}
            onChange={(event) => {setSeriesData(event.target.value)}}
          >
            {series.map((option) => (
              <option key={option.gv} value={option.gv}>
                {option.gv}
              </option>
            ))}
          </CustomSmallSelect>
        }
      />
      {series.map((item) => (
        <Box key={item.gv} sx={{ mt: 1, mx: 3 }} dir="ltr">
          {item.gv === seriesData && (
            <Chart type="line" series={item.data} options={chartOptions} height={300} />
          )}
        </Box>
      ))}
    </Card>
  );
}
