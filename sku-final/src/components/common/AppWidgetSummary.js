import { Box, Card, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/styles';
import Chart from 'components/chart';
import Iconify from 'components/iconify';
import { fNumber, fPercent } from 'utils/formatNumber';

export default function AppWidgetSummary({
    watchList,
    watchListButton,
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
                columnWidth: '32%',
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
            marker: { show: false },
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
            sx={{ display: 'flex', position: 'relative', alignItems: 'center', px: 2, py: 1 , height: "104px" ,  ...sx }}
            {...other}
        >
            <Box sx={{ flexGrow: 1 }} width="50%">
                {title && (
                    <Typography
                        fontSize="10px"
                        variant="caption"
                        textAlign={`${growthData ? 'center' : 'left'}`}
                    >
                        {title}
                    </Typography>
                )}

                {percent && <TrendingInfo percent={percent} />}

                {total &&
                    (watchList ? (
                        <Typography fontSize="12px" variant="caption">
                            {fNumber(total)}
                        </Typography>
                    ) : (
                        <Typography variant="h5" fontSize="10px">
                            {fNumber(total)}
                        </Typography>
                    ))}
                {growthData && (
                    <Typography variant="caption" textAlign="center">
                        {' '}
                        5% Since last 3 M{' '}
                    </Typography>
                )}
            </Box>

            <Box sx={{ width: "50%"}}>
                <Chart   type="area" series={[{ data: series }]} options={chartOptions} />
            </Box>
            <div style={{ position: 'absolute', right: '10px', top: '10px' }}>
                {watchList && watchListButton}
            </div>
        </Card>
    );
}

export function TrendingInfo({ percent }) {
    return (
        <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
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
