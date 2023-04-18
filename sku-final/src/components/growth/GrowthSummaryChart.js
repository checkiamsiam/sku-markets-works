import PropTypes from 'prop-types';
// @mui
import { Box, Card, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// components
import { useTheme } from '@mui/styles';
import Iconify from 'components/iconify/Iconify';
import Chart from 'react-apexcharts';
import { fNumber, fPercent } from 'utils/formatNumber';

// ----------------------------------------------------------------------

GrowthSummaryChart.propTypes = {
    sx: PropTypes.object,
    chart: PropTypes.object,
    title: PropTypes.string,
    sub_title: PropTypes.string,
    total: PropTypes.number,
    percent: PropTypes.number,
    growthData: PropTypes.object,
};

export default function GrowthSummaryChart({
    title,
    percent,
    sub_title,
    growthData,
    total,
    chart,
    sx,
    ...other
}) {
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
        <Card
            sx={{
                display: 'flex',
                boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.55)',
                alignItems: 'center',
                ...sx,
                borderRadius: 1,
            }}
            {...other}
        >
            <Stack
                alignItems="center"
                direction="column"
                spacing={0.5}
                sx={{ flexGrow: 1, px: 2 }}
                width="50%"
            >
                {title && (
                    <Typography sx={{ fontWeight: '700' }} variant="caption">
                        {title}
                    </Typography>
                )}
                {total && <Typography variant="caption">{fNumber(total)}</Typography>}
                {sub_title && <Typography variant="caption">{sub_title}</Typography>}
                {growthData && (
                    <TrendingInfo percent={growthData?.percentage} time={growthData?.time} />
                )}
            </Stack>

            <Box width="50%">
                <Chart type="area" series={[{ data: series }]} options={chartOptions} />
            </Box>
        </Card>
    );
}

// ----------------------------------------------------------------------

TrendingInfo.propTypes = {
    percent: PropTypes.number,
};

function TrendingInfo({ percent, time }) {
    return (
        <Stack direction="row" alignItems="center">
            <Iconify
                icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
                sx={{
                    mr: 1,
                    p: 0.5,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    color: 'success.main',
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.16),
                    ...(percent < 0 && {
                        color: 'error.main',
                        bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
                    }),
                }}
            />

            <Typography sx={{ fontWeight: 700 }} component="div" variant="caption">
                {percent > 0 && '+'}
                {fPercent(percent)} Since last {time} M
            </Typography>
        </Stack>
    );
}
