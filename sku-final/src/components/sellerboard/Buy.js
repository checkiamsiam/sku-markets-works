import { Box, Chip, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { HiArrowDownRight, HiArrowUpRight } from 'react-icons/hi2';
import BuyChart from './BuyChart';

const Buy = () => {
      /*Button Label */
  const [labelTime, setLabelTime] = useState('24H');

  const handleLabelTime = (t) => {
    if (t === '24H') {
      setLabelTime('7D');
    }
    if (t === '7D') {
      setLabelTime('14D');
    }
    if (t === '14D') {
      setLabelTime('30D');
    }
    if (t === '30D') {
      setLabelTime('24H');
    }
  };
    return (
        <>
        <Box sx={{ mx: 5, mb: 5 }}>
            
        <Box sx={{ flexGrow: 1, mx: 3, my: 5 }}>
            <Typography sx={{pb:2}}>Buy</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={2.4}>
              <Grid
                sx={{ border: '1px solid #ced4da', borderRadius: 1, p: 1 }}
                container
                spacing={1}
              >
                <Grid item xs={8} md={8}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: '10px' }}>Watchlist Marketcap</Typography>
                    <Chip
                      size="small"
                      onClick={() => handleLabelTime(labelTime)}
                      label={labelTime}
                      color="primary"
                    />
                  </Box>
                  <Typography sx={{ fontSize: '10px', pb: 2 }}>
                    <span style={{ fontWeight: 'bold' }}> $319.54B </span>
                    <span style={{ fontSize: '8px', color: 'red' }}>
                      -12.41% <HiArrowDownRight />
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                    }}
                  >
                    <BuyChart
                      chart={{
                        colors: ['#F76F72'],
                        series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2.4}>
              <Grid
                sx={{ border: '1px solid #ced4da', borderRadius: 1, p: 1 }}
                container
                spacing={1}
              >
                <Grid item xs={8} md={8}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: '10px' }}>Watchlist Marketcap</Typography>
                    <Chip
                      size="small"
                      onClick={() => handleLabelTime(labelTime)}
                      label={labelTime}
                      color="primary"
                    />
                  </Box>
                  <Typography sx={{ fontSize: '10px', pb: 2 }}>
                    <span style={{ fontWeight: 'bold' }}> $319.54B </span>
                    <span style={{ fontSize: '8px', color: 'green' }}>
                      0.64% <HiArrowUpRight />
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                    }}
                  >
                    <BuyChart
                      chart={{
                        colors: ['#F76F72'],
                        series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2.4}>
              <Grid
                sx={{ border: '1px solid #ced4da', borderRadius: 1, p: 1 }}
                container
                spacing={1}
              >
                <Grid item xs={8} md={8}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: '10px' }}>Watchlist Marketcap</Typography>
                    <Chip
                      size="small"
                      onClick={() => handleLabelTime(labelTime)}
                      label={labelTime}
                      color="primary"
                    />
                  </Box>
                  <Typography sx={{ fontSize: '10px', pb: 2 }}>
                    <span style={{ fontWeight: 'bold' }}> $319.54B </span>
                    <span style={{ fontSize: '8px', color: 'green' }}>
                      0.64% <HiArrowUpRight />
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                    }}
                  >
                    <BuyChart
                      chart={{
                        colors: ['#F76F72'],
                        series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2.4}>
              <Grid
                sx={{ border: '1px solid #ced4da', borderRadius: 1, p: 1 }}
                container
                spacing={1}
              >
                <Grid item xs={8} md={8}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: '10px' }}>Watchlist Marketcap</Typography>
                    <Chip
                      size="small"
                      onClick={() => handleLabelTime(labelTime)}
                      label={labelTime}
                      color="primary"
                    />
                  </Box>
                  <Typography sx={{ fontSize: '10px', pb: 2 }}>
                    <span style={{ fontWeight: 'bold' }}> $319.54B </span>
                    <span style={{ fontSize: '8px', color: 'green' }}>
                      0.64% <HiArrowUpRight />
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                    }}
                  >
                    <BuyChart
                      chart={{
                        colors: ['#F76F72'],
                        series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2.4}>
              <Grid
                sx={{ border: '1px solid #ced4da', borderRadius: 1, p: 1 }}
                container
                spacing={1}
              >
                <Grid item xs={8} md={8}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: '10px' }}>Watchlist Marketcap</Typography>
                    <Chip
                      size="small"
                      onClick={() => handleLabelTime(labelTime)}
                      label={labelTime}
                      color="primary"
                    />
                  </Box>
                  <Typography sx={{ fontSize: '10px', pb: 2 }}>
                    <span style={{ fontWeight: 'bold' }}> $319.54B </span>
                    <span style={{ fontSize: '8px', color: 'green' }}>
                      0.64% <HiArrowUpRight />
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                    }}
                  >
                    <BuyChart
                      chart={{
                        colors: ['#F76F72'],
                        series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
        </>
    );
};

export default Buy;