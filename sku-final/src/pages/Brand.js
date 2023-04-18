import { Card, Container, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import BrandTable from 'components/brand';
import BrandPageChart from 'components/chart/BrandPageChart';
import SKUMarquee from 'components/common/marquee';
import { useSettingsContext } from 'components/settings';
import { useBrandAnalyticsQuery } from 'features/brand/brandAPI';
import { useState } from 'react';
import { BsFillCloudArrowUpFill } from 'react-icons/bs';
import { FaCartPlus, FaCubes, FaHouseDamage } from 'react-icons/fa';
import { HiOutlineTrendingDown, HiOutlineTrendingUp } from 'react-icons/hi';
import { IoIosPeople } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router';
import SahudiaLogo from '../assets/images/noon-saudi.svg';
// import tommyPic from '../assets/images/tommy-hilfiger-logo.png';
import { SiBrandfolder } from 'react-icons/si';
import TopSKUCard from 'components/brand/TopSkuCards';

export default function Brand() {
    const { brand } = useParams();
    const { data } = useBrandAnalyticsQuery(brand);

    const navigate = useNavigate();
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
    return (
        <>
            <Container maxWidth={themeStretch ? false : 'xl'}>
                {/* First Section  */}

                <SKUMarquee />

                <Card sx={{ mt: 4, color: 'text.main', p: 3 }}>
                    <Stack
                        direction={{ xs: 'column', lg: 'row' }}
                        justifyContent={{ xs: 'center', lg: 'space-between' }}
                    >
                        {/* Product Image & Name  */}
                        <Box sx={{ mb: { xs: 5, lg: 0 } }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
                                <Box>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <SiBrandfolder size="3rem" color="#0052FF" />

                                        <Box sx={{ fontSize: '14px', color: 'text.main' }}>
                                            {brand}
                                        </Box>
                                    </Stack>
                                    <br />
                                    <Box
                                        sx={{
                                            fontSize: '10px',
                                            color: 'text.main',
                                        }}
                                    >
                                        Brand Insights And Analytics Dashboard.{' '}
                                    </Box>
                                    <Box sx={{ fontSize: '13px', pt: 1 }}>Updated: just now</Box>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Volume   */}
                        <Box sx={{ ml: 10, mb: { xs: 5, lg: 0 } }}>
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
                                SAR 18.87M{' '}
                                <Box component="span" sx={{ color: 'red', ml: 1 }}>
                                    {' '}
                                    -4.04%
                                </Box>
                            </Box>
                            <Box sx={{ fontSize: '15px', fontWeight: 400, mt: 2 }}>SAR 18.87M</Box>
                            {/* <Box sx={{ fontSize: '10px', pt: 3 }}>Updated about 1 hour ago</Box> */}
                        </Box>

                        {/*Graph */}
                        <Box sx={{ mb: { xs: 5, lg: 0 } }}>
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
                                    }}
                                    color="primary"
                                />
                            </Stack>
                            <BrandPageChart
                                chart={{
                                    colors: ['#F76F72'],
                                    series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                fontSize: '12px',
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={10}
                            >
                                <Box>Marketplace</Box>
                                <Box
                                    onClick={() => navigate('/marketPlace')}
                                    sx={{ height: '30px', width: '40px', cursor: 'pointer' }}
                                    component="img"
                                    src={SahudiaLogo}
                                    alt="SahudiaLogo"
                                />
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" spacing={10}>
                                <Box>Catagories</Box>
                                <Box>{data?.categories}</Box>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" spacing={10}>
                                <Box>SKUs</Box>
                                <Box>{data?.products}</Box>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" spacing={10}>
                                <Box>Type</Box>
                                <Box>{data?.types}</Box>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" spacing={10}>
                                <Box>Sub-Types</Box>
                                <Box>{data?.subTypes}</Box>
                            </Stack>
                        </Box>
                    </Stack>
                </Card>

                {/* Second Section  */}
                <Card  sx={{ mt: 4, color: 'text.main', p: 3 }}>
                    <Grid container rowSpacing={3} columnSpacing={3}>
                        <Grid item xs={6} md={4} lg={1.713}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <IoIosPeople size="3rem" color="#0052FF" />
                                <Box
                                    sx={{ fontSize: '12px', color: 'text.main', textAlign: 'end' }}
                                >
                                    Stores <br />
                                    {data?.products}
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
                                    {data?.live}
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
                                    {data?.notLive}
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
                                    {data?.express}
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
                                    {data?.stores}
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
                                    {data?.stocks?.toFixed(2)}
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid item xs={6} md={4} lg={1.713}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <BsFillCloudArrowUpFill size="3rem" color="#0052FF" />
                                <Box
                                    sx={{ fontSize: '11px', color: 'text.main', textAlign: 'end' }}
                                >
                                    Marketplace Share <br />
                                    3900
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
                {/* <BrandTable /> */}
                <TopSKUCard/>
                <Typography variant="caption">
                    Designed for users to instantly see the market situations on the marketplaces
                    and predicts what will come next.
                </Typography>
            </Container>
        </>
    );
}
