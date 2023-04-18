import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, CardHeader, Stack, useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import Chart from 'react-apexcharts';
import '../productDetails/productDetail.css';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomSmallSelect = styled((props) => (
    <TextField select SelectProps={{ native: true }} {...props} />
  ))(({ theme }) => ({
    '& fieldset': {
      display: 'none',
    },
    '& select': {
      ...theme.typography.subtitle2,
      height: "30px",
      padding: theme.spacing(0.5, 0, 0.5, 1),
      paddingRight: '28px !important',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: Number(theme.shape.borderRadius) * 0.75,
      backgroundColor: alpha(theme.palette.grey[500], 0.08),
    },
  }));

const SkuStatusCharts = ({ product }) => {
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

  // daily chart series
  const getDailyPriceSeries = () => {
    const dayBalanceData = [];
    for (const data of product.dailyPrice) {
      const time = new Date(data.date).getTime();
      dayBalanceData.push([time, data.price]);
    }
    return [{ data: dayBalanceData }];
  };
  // weekly chart series
  const getWeeklyPriceSeries = () => {
    const weekBalanceData = [];
    for (const data of product.weeklyPrice) {
      const time = new Date(data.date).getTime();
      weekBalanceData.push([time, data.price]);
    }
    return [{ data: weekBalanceData }];
  };
  // monthly chart series
  const getMonthlyPriceSeries = () => {
    const monthBalanceData = [];
    for (const data of product.monthlyPrice) {
      const time = new Date(data.date).getTime();
      monthBalanceData.push([time, data.price]);
    }
    return [{ data: monthBalanceData }];
  };
  // yearly chart series
  const getYearlyPriceSeries = () => {
    const yearBalanceData = [];
    for (const data of product.yearlyPrice) {
      const time = new Date(data.date).getTime();
      yearBalanceData.push([time, data.price]);
    }
    return [{ data: yearBalanceData }];
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

  const [seriesData, setSeriesData] = useState('Buybox Sale Price');

  const series = [
    { label: 'Buybox Sale Price' },
    { label: 'Estimated SOH ' },
    { label: 'Sales volume L 24 H' },
    { label: 'E Marketplace cap' },
    { label: 'Trade Volume' },
  ];

  return (
    <TabContext value={value}>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        marginTop="-5px"
      >
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
           
            {tabData.map((tab, i) => (
              <Tab
                key={i}
                label={tab.label}
                value={tab.value}
                sx={{
                  fontSize: '10px',
                  color: value === tab.value ? 'primary.main' : 'black',
                //   backgroundColor: value === tab.value ? 'primary.main' : 'transparent',
                //   borderRadius: '10px',
                }}
              />
            ))}
          </TabList>
        </Box>
      </Stack>
      <CardHeader
        // title='SKU STATUS'
        // subheader={subheader}
        sx={{ mr: 2 , mt: "-25px" }}
        action={
          <CustomSmallSelect
            value={seriesData}
            onChange={(event) => setSeriesData(event.target.value)}
            sx={{padding: "10px"}}
          >
            {series.map((option) => (
              <option  key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </CustomSmallSelect>
        }
      />
      <TabPanel value="1" sx={{marginTop: "-45px"}}>
        <Chart options={apexChartOpts} series={getDailyPriceSeries()} type="area" height={200} />
      </TabPanel>
      <TabPanel value="2"  sx={{marginTop: "-45px"}}>
        <Chart options={apexChartOpts} series={getWeeklyPriceSeries()} type="area" height={200} />
      </TabPanel>
      <TabPanel value="3" sx={{marginTop: "-45px"}}>
        <Chart options={apexChartOpts} series={getMonthlyPriceSeries()} type="area" height={200} />
      </TabPanel>
      <TabPanel value="4" sx={{marginTop: "-45px"}}>
        <Chart options={apexChartOpts} series={getYearlyPriceSeries()} type="area" height={200} />
      </TabPanel>
    </TabContext>
  );
};

export default SkuStatusCharts;
