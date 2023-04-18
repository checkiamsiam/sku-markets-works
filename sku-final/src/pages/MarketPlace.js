import { Card, Container, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import MarketplaceChart from 'components/chart/MarketplaceChart';
import SKUMarquee from 'components/common/marquee';
import MPLogo from 'components/common/MPLogo';
import CategoryCards from 'components/marketplace/CategoryCards';
import { useSettingsContext } from 'components/settings';
import { useAnalyticsByMarketplaceQuery } from 'features/marketplace/marketplaceAPI';
import { useState } from 'react';
import { BiNetworkChart } from 'react-icons/bi';
import { FaCartPlus, FaCubes, FaHouseDamage } from 'react-icons/fa';
import { HiOutlineTrendingDown, HiOutlineTrendingUp } from 'react-icons/hi';
import { IoIosPeople } from 'react-icons/io';
import { useParams } from 'react-router';
import getFullName from 'utils/getFullName';
import milBil from 'utils/mil-bil';

export default function MarketPlace() {
    const [labelTime, setLabelTime] = useState('24 H');

    const handleLabelTime = (t) => {
        if (t === '24 H') {
            setLabelTime('07 D');
            console.log(labelTime);
        }
        if (t === '07 D') {
            setLabelTime('14 D');
        }
        if (t === '14 D') {
            setLabelTime('30 D');
        }
        if (t === '30 D') {
            setLabelTime('24 H');
        }
    };

    const { themeStretch } = useSettingsContext();

    const { marketplace } = useParams();

    const { data: analytics } = useAnalyticsByMarketplaceQuery(marketplace);

    return (
        <>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                {/* First Section  */}

                <SKUMarquee />

                <Card  sx={{ mt: 4, color: 'text.main', p: 3 }}>
                    <Stack
                        direction={{ xs: 'column', lg: 'row' }}
                        justifyContent={{ xs: 'center', lg: 'space-between' }}
                    >
                        {/* Product Image & Name  */}
                        <Box sx={{ mb: { xs: 5, lg: 0 } }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
                                <Box>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <MPLogo
                                            width={120}
                                            hight={50}
                                            link={false}
                                            marketplace={marketplace}
                                        />
                                        <Typography fontWeight={700}>
                                            {getFullName(marketplace)}
                                        </Typography>
                                    </Stack>
                                    <br />
                                    <Box
                                        sx={{
                                            fontSize: '10px',
                                            color: 'text.main',
                                        }}
                                    >
                                        MarketPlace Insights And Analytics Dashboard.{' '}
                                    </Box>
                                    <Box sx={{ fontSize: '13px', pt: 1 }}>Updated: just now</Box>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Volume   */}
                        <Box sx={{ mb: { xs: 5, lg: 0 }, ml: 10 }}>
                            <Box
                                sx={{
                                    display: {
                                        xs: 'none',
                                        lg: 'block',
                                    },
                                }}
                            >
                                Volume
                            </Box>
                            <Box sx={{ fontSize: '15px', fontWeight: 400, mt: 2 }}>
                                SAR {milBil(analytics?.trade_value || 0)}
                                <Box component="span" sx={{ color: 'red', ml: 1 }}>
                                    -4.04%
                                </Box>
                            </Box>
                            <Box sx={{ fontSize: '15px', fontWeight: 400, mt: 2 }}>
                                SAR {milBil(analytics?.est_market_cap || 0)}
                            </Box>
                        </Box>

                        {/*Graph */}
                        <Box
                            sx={{
                                mb: { xs: 5, lg: 0 },
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent={{ xs: 'space-between', lg: 'start' }}
                                sx={{ mx: 'auto', width: { xs: '100%', md: '400px', lg: '100%' } }}
                            >
                                <Box
                                    sx={{
                                        display: {
                                            xs: 'block',
                                            lg: 'none',
                                        },
                                    }}
                                >
                                    Volume
                                </Box>

                                <Chip
                                    label={labelTime}
                                    onClick={() => handleLabelTime(labelTime)}
                                    size="small"
                                    sx={{
                                        borderRadius: '5px',
                                        fontSize: '12px',
                                        py: '0px',
                                        color: '',
                                    }}
                                    color="primary"
                                />
                            </Stack>
                            <MarketplaceChart
                                chart={{
                                    colors: ['#F76F72'],
                                    series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                fontSize: '12px',
                                pt: 3,
                            }}
                        >
                            <Stack direction="row" justifyContent="space-between" spacing={10}>
                                <Box>Brands</Box>
                                <Box>{analytics?.brands}</Box>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" spacing={10}>
                                <Box>SKUs</Box>
                                <Box>{analytics?.products}</Box>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" spacing={10}>
                                <Box>Type</Box>
                                <Box>{analytics?.types}</Box>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" spacing={10}>
                                <Box>Sub-Types</Box>
                                <Box>{analytics?.subTypes}</Box>
                            </Stack>
                        </Box>
                    </Stack>
                </Card>

                {/* Second Section  */}
                <Card sx={{ mt: 4, color: 'text.main', p: 3 }}>
                    <Grid container rowSpacing={3} columnSpacing={3}>
                        <Grid item xs={6} md={4} lg={1.713}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <BiNetworkChart size="3rem" color="#0052FF" />
                                <Box
                                    sx={{ fontSize: '12px', color: 'text.main', textAlign: 'end' }}
                                >
                                    Categories
                                    <br />
                                    {analytics?.categories}
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid item xs={6} md={4} lg={1.713}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <IoIosPeople size="3rem" color="#0052FF" />
                                <Box
                                    sx={{ fontSize: '12px', color: 'text.main', textAlign: 'end' }}
                                >
                                    Stores <br />
                                    {analytics?.stores}
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid item xs={6} md={4} lg={1.713}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <HiOutlineTrendingUp size="3rem" color="#0052FF" />
                                {/* <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-dots" /> */}
                                <Box
                                    sx={{ fontSize: '12px', color: 'text.main', textAlign: 'end' }}
                                >
                                    Live SKUs <br />
                                    {analytics?.live}
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid item xs={6} md={4} lg={1.713}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <HiOutlineTrendingDown size="3rem" color="#0052FF" />
                                <Box
                                    sx={{ fontSize: '12px', color: 'text.main', textAlign: 'end' }}
                                >
                                    Not Live SKUs <br />
                                    {analytics?.notLive}
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid item xs={6} md={4} lg={1.713}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <FaCartPlus size="3rem" color="#0052FF" />
                                <Box
                                    sx={{ fontSize: '12px', color: 'text.main', textAlign: 'end' }}
                                >
                                    Fulfilled by MP <br />
                                    {analytics?.ff_mp}
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid item xs={6} md={4} lg={1.713}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <FaHouseDamage size="3rem" color="#0052FF" />
                                <Box
                                    sx={{ fontSize: '11px', color: 'text.main', textAlign: 'end' }}
                                >
                                    Fulfilled by stores <br />
                                    {analytics?.ff_store}
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid item xs={6} md={4} lg={1.713}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <FaCubes size="3rem" color="#0052FF" />
                                <Box
                                    sx={{ fontSize: '12px', color: 'text.main', textAlign: 'end' }}
                                >
                                    Stock On Hand <br />
                                    {Math.ceil(analytics?.stocks || 0)}
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </Card>
                <Box
                    sx={{
                        fontSize: 11,
                        my: 2,
                        color: 'text.main',
                    }}
                >
                    Designed for users to instantly see the changes that occur on the Category and
                    predicts what will come next.
                </Box>
                {/* <CategoryTable /> */}
                <CategoryCards  />
                <Typography variant="caption">
                    Designed for users to instantly see the top categories on the marketplaces for
                    opportunities.
                </Typography>
            </Container>
        </>
    );
}
