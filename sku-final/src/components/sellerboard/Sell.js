import { Box, Chip, Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import AppWidgetSummary from 'components/common/AppWidgetSummary';
import { useState } from 'react';

const RFQ = [
    { label: 'Requests New', price: 319.54, percent: -12.41 },
    { label: 'Requests Review', price: 319.54, percent: 0.64 },
    { label: 'Requests Rejected', price: 319.54, percent: 0.64 },
    { label: 'Requests Completed', price: 319.54, percent: 64 },
];

const PAYMENTS = [
    { label: 'Payments Pending', price: 319.54, percent: 64 },
    { label: 'Payments Retrived', price: 319.54, percent: -12.41 },
    { label: 'Payments Disbursed', price: 319.54, percent: 0.64 },
];

const SHIPMENTS = [
    { label: 'Shipments Pending', price: 319.54, percent: 64 },
    { label: 'Shipments Shipped', price: 319.54, percent: 64 },
    { label: 'Shipments Delivered', price: 319.54, percent: -64 },
    { label: 'RTV', price: 319.54, percent: '0.64%' },
];

const INVOICES = [
    { label: 'Order Invoices', price: 319.54, percent: -64 },
    { label: 'Order Credit Notes', price: 319.54, percent: 64 },
    { label: 'Order Ref. fees Invc.', price: 319.54, percent: 6 },
    { label: 'Vat Payable', price: 319.54, percent: 64 },
];

const Sell = ({ sellTab }) => {
    const theme = useTheme();
    /*Button Label */
    const [labelTime, setLabelTime] = useState('24H');

    const handleLabelTime = (t) => {
        if (t === '24H') {
            setLabelTime('07D');
        }
        if (t === '07D') {
            setLabelTime('14D');
        }
        if (t === '14D') {
            setLabelTime('30D');
        }
        if (t === '30D') {
            setLabelTime('24H');
        }
    };

    const convert = (
        <Chip
            size="small"
            onClick={() => handleLabelTime(labelTime)}
            label={labelTime}
            color="primary"
        />
    );
    return (
        <>
            <Box sx={{ flexGrow: 1, mb: 3 }}>
                {sellTab === 'rfq' && (
                    <Grid container spacing={4}>
                        {RFQ.map((rqst, i) => (
                            <Grid key={i} item xs={12} md={3}>
                                <AppWidgetSummary
                                    watchList={true}
                                    watchListButton={convert}
                                    title={rqst.label}
                                    percent={rqst.percent}
                                    total={rqst.price}
                                    chart={{
                                        colors: rqst.percent > 0 ? ['#8BE78B'] : ['#F76F72'],
                                        series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
                {sellTab === 'payment' && (
                    <Grid container spacing={4}>
                        {PAYMENTS.map((pay, i) => (
                            <Grid key={i} item xs={12} md={4}>
                                <AppWidgetSummary
                                    watchList={true}
                                    watchListButton={convert}
                                    title={pay.label}
                                    percent={pay.percent}
                                    total={pay.price}
                                    chart={{
                                        colors: pay.percent > 0 ? ['#8BE78B'] : ['#F76F72'],
                                        series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
                {sellTab === 'shipments' && (
                    <Grid container spacing={4}>
                        {SHIPMENTS.map((ship, i) => (
                            <Grid key={i} item xs={12} md={3}>
                                <AppWidgetSummary
                                    watchList={true}
                                    watchListButton={convert}
                                    title={ship.label}
                                    percent={ship.percent}
                                    total={ship.price}
                                    chart={{
                                        colors: ship.percent > 0 ? ['#8BE78B'] : ['#F76F72'],
                                        series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
                {sellTab === 'invoices' && (
                    <Grid container spacing={4}>
                        {INVOICES.map((invc, i) => (
                            <Grid key={i} item xs={12} md={3}>
                                <AppWidgetSummary
                                    watchList={true}
                                    watchListButton={convert}
                                    title={invc.label}
                                    percent={invc.percent}
                                    total={invc.price}
                                    chart={{
                                        colors: invc.percent > 0 ? ['#8BE78B'] : ['#F76F72'],
                                        series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </>
    );
};

export default Sell;
