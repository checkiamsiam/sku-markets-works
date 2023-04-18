import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, CardHeader, Stack, Typography, useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import { CustomSmallSelect } from 'components/custom-input';
import { useState } from 'react';
import Chart from 'react-apexcharts';
import './productDetail.css';

const BuyBoxPriceStatus = ({ product }) => {
  //   Tab Controls
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //   Tab Data
  const tabData = [
    { label: 'DAY', value: '1' },
    { label: 'WEEK', value: '2' },
    { label: 'MONTH', value: '3' },
    { label: 'YEAR', value: '4' },
  ];

  const getSeriesData = (params) => {
    const result = [];
    for (const data of params) {
      const time = new Date(data.date).getTime();
      result.push([time, data.price]);
    }
    return [{ data: result }];
  };

  //   Chart Controls
  const theme = useTheme();
  const colors = [theme.palette.primary.main];
  const apexChartOpts = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false,
      },
      foreColor: theme.palette.mode === 'light' ? 'black' : '#ccc',
    },
    colors: colors,
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 6,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value;
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
      theme: theme.palette.mode === 'light' ? 'light' : 'dark',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
  };

  const [seriesDataMode, setSeriesDataMode] = useState('Buybox Sale Price');

  const series = [
    { label: 'Buybox Sale Price' },
    { label: 'Estimated SOH' },
    { label: 'Sales volume L 24 H' },
    { label: 'E Marketplace cap' },
    { label: 'Trade Volume' },
  ];

  return (
    <Card sx={{ padding: '', boxShadow: 5, borderRadius: '10px', height: '515px' }}>
      <Typography sx={{ mt: 2, mb: 1, textAlign: 'center', fontWeight: 700 }}>
        SKU STATUS
      </Typography>
      <TabContext value={value}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          // padding="10px 0px 10px 0px"
        >
          <Box>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {tabData.map((tab, i) => (
                <Tab
                  key={i}
                  label={tab.label}
                  value={tab.value}
                  sx={{
                    // margin: '10px 0px',
                    padding: '0px 30px',
                    fontSize: '10px',
                    mx: { xs: 0, md: '5px' },
                    color: value === tab.value ? 'white' : '#6190E6',
                    backgroundColor: value === tab.value ? 'primary.main' : 'transparent',
                    borderRadius: '10px',
                  }}
                />
              ))}
            </TabList>
          </Box>
        </Stack>
        <CardHeader
          // title='SKU STATUS'
          // subheader={subheader}
          sx={{ mr: 2 }}
          action={
            <CustomSmallSelect
              value={seriesDataMode}
              onChange={(event) => setSeriesDataMode(event.target.value)}
            >
              {series.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </CustomSmallSelect>
          }
        />
        <TabPanel value="1">
          {seriesDataMode === 'Buybox Sale Price' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.dailyPrice)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'E Marketplace cap' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.daily_market_cap)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'Trade Volume' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.daily_trade_value)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'Estimated SOH' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.daily_stock)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'Sales volume L 24 H' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.daily_sold_24_hours)}
              type="area"
              height={346}
            />
          )}
        </TabPanel>
        <TabPanel value="2">
          {seriesDataMode === 'Buybox Sale Price' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.weeklyPrice)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'E Marketplace cap' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.weekly_market_cap)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'Trade Volume' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.weekly_trade_value)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'Estimated SOH' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.weekly_stock)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'Sales volume L 24 H' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.weekly_sold_24_hours)}
              type="area"
              height={346}
            />
          )}
        </TabPanel>
        <TabPanel value="3">
          {seriesDataMode === 'Buybox Sale Price' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.monthlyPrice)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'E Marketplace cap' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.monthly_market_cap)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'Trade Volume' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.monthly_trade_value)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'Estimated SOH' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.monthly_stock)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'Sales volume L 24 H' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.monthly_sold_24_hours)}
              type="area"
              height={346}
            />
          )}
        </TabPanel>
        <TabPanel value="4">
          {seriesDataMode === 'Buybox Sale Price' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.yearlyPrice)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'E Marketplace cap' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.yearly_market_cap)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'Trade Volume' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.yearly_trade_value)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'Estimated SOH' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.yearly_stock)}
              type="area"
              height={346}
            />
          )}
          {seriesDataMode === 'Sales volume L 24 H' && (
            <Chart
              options={apexChartOpts}
              series={getSeriesData(product.yearly_sold_24_hours)}
              type="area"
              height={346}
            />
          )}
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default BuyBoxPriceStatus;
