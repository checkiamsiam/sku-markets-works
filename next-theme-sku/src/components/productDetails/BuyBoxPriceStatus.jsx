import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import dynamic from 'next/dynamic'
import React, { useState } from "react";
const Chart = dynamic(
  () => import('react-apexcharts'),
  { ssr: false }
)

const BuyBoxPriceStatus = () => {
  //   Tab Controls
  const [value, setValue] = useState("1");

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  //   Tab Data
  const tabData = [
    { label: "L 24 HOUR", value: "1" },
    { label: "L 7 DAYS", value: "2" },
    { label: "L 2 WEEKS", value: "3" },
    { label: "L MONTH", value: "4" },
  ];

  // Chart Data
  const generateData = () => {
    let balanceData = [];
    for (let i = 0; i < 100; i++) {
      balanceData.push(5000 + Math.random() * 100000 + 0.8 * i * i * i);
    }
    return balanceData;
  };

  //   Daily Chart
  const getDayBalance = () => {
    let dayDummyData = generateData();
    let dayBalanceData = [];

    for (let i = 0; i < 100; i++) {
      let start = new Date();
      dayBalanceData.push([start.setDate(start.getDate() + i - 100), dayDummyData[i]]);
    }
    return [{ data: dayBalanceData }];
  };

  //   Weekly Chart
  const getWeekBalance = () => {
    let weekDummyData = generateData();
    let weekBalanceData = [];

    for (let i = 0; i < 100; i++) {
      let start = new Date();
      weekBalanceData.push([start.setDate(start.getDate() + i * 7 - 100 * 7), weekDummyData[i]]);
    }
    return [{ data: weekBalanceData }];
  };

  //   Monthly Chart
  const getMonthBalance = () => {
    let monthDummyData = generateData();
    let monthBalanceData = [];

    for (let i = 0; i < 100; i++) {
      let start = new Date();
      monthBalanceData.push([start.setDate(start.getDate() + i * 30 - 100 * 30), monthDummyData[i]]);
    }
    return [{ data: monthBalanceData }];
  };

  //   Yearly Chart
  const getYearBalance = () => {
    let yearDummyData = generateData();
    let yearBalanceData = [];

    for (let i = 0; i < 100; i++) {
      let start = new Date();
      yearBalanceData.push([start.setDate(start.getDate() + i * 365 - 100 * 365), yearDummyData[i]]);
    }
    return [{ data: yearBalanceData }];
  };

  //   Chart Controls
  const colors = ["#0acf97"];
  const apexChartOpts = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
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
      style: "hollow",
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return "$" + value;
        },
      },
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
  };

  return (
    <Box sx={{ padding: "", boxShadow: 5, borderRadius: "10px" , height:"500px" , }}>
      <TabContext value={value}>
        <Stack direction="column" alignItems="center" justifyContent="space-between" spacing={2} padding="10px 0px 25px 0px">
          <h2
            style={{
              fontSize: "17px",
              fontWeight: 500,
              color: "#7A797D",
              margin: 0,
            }}
          >
            BUYBOX PRICE STATUS
          </h2>
          <Box sx={{}}>
            <TabList
              // onChange={handleChange}
              aria-label="lab API tabs example"
              TabIndicatorProps={{
                style: {
                  display: "none",
                },
              }}
            >
              <Stack direction={{ sm: "row" }}>
                {tabData.map((tab) => (
                  <Button
                    key={tab.value}
                    value={tab.value}
                    variant={value === tab.value ? "contained" : "text"}
                    size="small"
                    onClick={() => setValue(tab.value)}
                    sx={{
                      padding: "8px 20px",
                      fontSize: "10px",
                      mx: { xs: 0, md: "5px" },
                    }}
                  >
                    {tab.label}
                  </Button>
                ))}
              </Stack>
            </TabList>
          </Box>
        </Stack>
        <TabPanel value="1">
          <Chart options={apexChartOpts} series={getDayBalance()} type="area" height={346} />
        </TabPanel>
        <TabPanel value="2">
          <Chart options={apexChartOpts} series={getWeekBalance()} type="area" height={346} />
        </TabPanel>
        <TabPanel value="3">
          <Chart options={apexChartOpts} series={getMonthBalance()} type="area" height={346} />
        </TabPanel>
        <TabPanel value="4">
          <Chart options={apexChartOpts} series={getYearBalance()} type="area" height={346} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default BuyBoxPriceStatus;
