import { Box, Card, CardHeader } from '@mui/material';
import { useState } from 'react';
import Chart, { useChart } from '../../../../components/chart';
import { CustomSmallSelect } from '../../../../components/custom-input';

export default function AppAreaInstalled({ title, subheader, chart, ...other }) {
  const { colors, categories, series, options } = chart;

  const [seriesData, setSeriesData] = useState('2022');

  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <CustomSmallSelect
            value={seriesData}
            onChange={(event) => setSeriesData(event.target.value)}
          >
            {series.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </CustomSmallSelect>
        }
      />

      {series.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <Chart type="line" series={item.data} options={chartOptions} height={500} />
          )}
        </Box>
      ))}
    </Card>
  );
}
