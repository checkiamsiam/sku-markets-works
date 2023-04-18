import { useTheme } from '@mui/material';
import Chart from 'react-apexcharts';

function StatisticsChart() {
  const theme = useTheme()
  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
      foreColor: theme.palette.mode === 'light' ? 'black' : '#ccc',
    },
    yaxis: {
      labels: {
        // Set an empty array for the rows you want to hide
        formatter: (value, index) => {
          if (index === 5) {
            return value;
          }
          return "";
        },
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeFormatter: {
          hour: 'HH:mm',
        },
      },
      categories: [
        '2023-03-26T00:00:00',
        '2023-03-26T01:00:00',
        '2023-03-26T02:00:00',
        '2023-03-26T03:00:00',
        '2023-03-26T04:00:00',
        '2023-03-26T05:00:00',
      ],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: ['#FFA41B', '#008FFB', '#FEB019', '#3EB3F3'],
      strokeColors: '#fff',
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    stroke: {
      width: [2, 2, 2, 2],
      curve: 'straight',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val) {
          return val + 'K';
        },
      },
      x: {
        format: 'HH:mm',
      },
      theme: theme.palette.mode === 'light' ? 'light' : 'dark',
    },
    grid: {
      borderColor: '#f1f1f1',
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      offsetY: -20,
    },
    menu: {
      show: true,
      position: 'bottom',
      offsetY: 10,
      customHTML: function () {
        return '<button class="btn btn-primary">Export to PDF</button>';
      },
    },
  };

  const series = [
    { name: 'GMV', data: [0, 0, 90, 0, 0, 0] },
    {
      name: 'Referral fees',
      data: [0, 0, 5, 0, 0, 0],
    },
    {
      name: 'Payables',
      data: [0, 0, 20, 0, 30, 0],
    },
    {
      name: 'Net Revenue',
      data: [0, 0, 0, 20, 0, 0],
    },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Chart options={options} series={series} type="line" height={250} width={500} />
    </div>
  );
}

export default StatisticsChart;
