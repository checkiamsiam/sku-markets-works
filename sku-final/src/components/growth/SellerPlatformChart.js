import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
import Chart, { useChart } from 'components/chart';
import { CustomSmallSelect } from 'components/custom-input';
// components


// ----------------------------------------------------------------------

SellerPlatformChart.propTypes = {
  chart: PropTypes.object,
};

export default function SellerPlatformChart({chart, ...other }) {
  const { colors, categories, series, options } = chart;

  const [seriesData, setSeriesData] = useState('Seller');
  const [seriesData2, setSeriesData2] = useState('Revenue');

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  return (
    <Card {...other} sx={{borderRadius:'0px 0px 10px 10px'}}>
      <CardHeader
       /*  title={title}
        subheader={subheader} */
        action={
          <CustomSmallSelect
            value={seriesData || seriesData2}
            onChange={(event) => {setSeriesData(event.target.value);setSeriesData2(event.target.value) }}
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
          {(item.gv === seriesData ||item.gv === seriesData2) && (
            <Chart type="line" series={item.data} options={chartOptions} height={200} />
          )}
        </Box>
      ))}
    </Card>
  );
}
