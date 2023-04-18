import { Box, Card, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/styles';
import Chart from '../../../../components/chart';
import Iconify from '../../../../components/iconify';
import { fNumber, fPercent } from '../../../../utils/formatNumber';

export default function AppWidgetSummary({
    title,
    percent,
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
        <Card sx={{ display: 'flex', alignItems: 'center', p: 2, ...sx }} {...other}>
            <Box sx={{ flexGrow: 1 }} width="50%">
                {title && (
                    <Typography variant="subtitle2" textAlign={`${growthData ? 'center' : 'left'}`}>
                        {title}
                    </Typography>
                )}

                {percent && <TrendingInfo percent={percent} />}

                {total && <Typography variant="h3">{fNumber(total)}</Typography>}
                {growthData && (
                    <Typography variant="subtitle1" textAlign="center">
                        {' '}
                        5% Since last 3 M{' '}
                    </Typography>
                )}
            </Box>

            <Box width="50%">
                <Chart type="area" series={[{ data: series }]} options={chartOptions} />
            </Box>
        </Card>
    );
}

function TrendingInfo({ percent }) {
    return (
        <Stack direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
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

            <Typography component="div" variant="subtitle2">
                {percent > 0 && '+'}

                {fPercent(percent)}
            </Typography>
        </Stack>
    );
}
