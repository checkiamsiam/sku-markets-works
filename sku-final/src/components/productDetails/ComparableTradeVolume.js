import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Card, Link, Stack } from '@mui/material';
import PopularProductTable from 'components/productDetails/PopularProductTable';
import ComparableTradeVolumeTable from './ComparableTradeVolumeTable';

const ComparableTradeVolume = () => {
    const gray = 'text.main';
    return (
        <section style={{ margin: '30px 0' }}>
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
                {/* Left Card */}
                <Box sx={{ width: { xs: '100%', lg: '50%' } }}>
                    <Card
                        sx={{
                            boxShadow: 3,
                            pt: '.5rem',
                            borderRadius: '10px',
                        }}
                    >
                        {/* Section heading */}
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ padding: '0 .75rem 1rem .75rem' }}
                        >
                            <h2 style={{ fontSize: '15px', color: gray }}>
                                Comparable Trade Volume
                            </h2>
                            <Link
                                href="/dashboard"
                                underline="none"
                                sx={{ fontSize: '12px', fontWeight: '600' }}
                            >
                                <Stack direction="row" alignItems="center">
                                    <span>See All SKUs</span>
                                    <KeyboardArrowRightIcon />
                                </Stack>
                            </Link>
                        </Stack>

                        <ComparableTradeVolumeTable />
                    </Card>
                    <p style={{ fontSize: '12px', color: gray }}>
                        Of all the top SKUs on marketplace, these are the closest in trade volume.
                    </p>
                </Box>

                {/* Right Card */}
                <Box sx={{ width: { xs: '100%', lg: '50%' } }}>
                    <Card
                        sx={{
                            boxShadow: 3,
                            pt: '.5rem',
                            borderRadius: '10px',
                        }}
                    >
                        {/* Section heading */}
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ padding: '0 .75rem 1rem .75rem' }}
                        >
                            <h2 style={{ fontSize: '15px', color: gray }}>People also view</h2>
                            <Link
                                href="/dashboard"
                                underline="none"
                                sx={{ fontSize: '12px', fontWeight: '600' }}
                            >
                                <Stack direction="row" alignItems="center">
                                    <span>See All SKUs</span>
                                    <KeyboardArrowRightIcon />
                                </Stack>
                            </Link>
                        </Stack>

                        <PopularProductTable />
                    </Card>
                    <p style={{ fontSize: '12px', color: gray }}>
                        People who viewed This SKU tend to also view the following SKUs on
                        marketplace.
                    </p>
                </Box>
            </Stack>
        </section>
    );
};

export default ComparableTradeVolume;
