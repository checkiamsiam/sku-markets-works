import { useTheme } from '@mui/styles';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { fNumber } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

SellerChart.propTypes = {
    sx: PropTypes.object,
    chart: PropTypes.object,
    title: PropTypes.string,
    total: PropTypes.number,
    percent: PropTypes.number,
};

export default function SellerChart({ chart, sx, ...other }) {
    const { colors, series, options } = chart;
    const theme = useTheme();
    const chartOptions = {
        colors,
        chart: {
            sparkline: {
                enabled: true,
            },
        },
        plotOptions: {
            area: {
                columnWidth: '100%',
                borderRadius: 2,
            },
        },
        tooltip: {
            x: { show: false },
            y: {
                formatter: (value) => fNumber(value),
                title: {
                    formatter: () => '',
                },
            },
            marker: { show: true },
            theme: theme.palette.mode === 'light' ? 'light' : 'dark',
        },
        // Stroke
        stroke: {
            width: 1,
            curve: 'smooth',
            lineCap: 'round',
        },
        ...options,
    };

    return (
        <Chart
            type="area"
            series={[{ data: series }]}
            options={chartOptions}
            width="60px"
            height="50px"
        />
    );
}
