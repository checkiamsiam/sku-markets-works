import { useTheme } from '@emotion/react';
import { Chip, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import AppWidgetSummary from 'components/common/AppWidgetSummary';
import LoadingScreen from 'components/loading-screen/LoadingScreen';
import { useSettingsContext } from 'components/settings';
import { useGetWatchListDetailQuery } from 'features/watchList/watchListAPI';
import { useState } from 'react';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'red',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#4caf50',
  },
}));
const DataStorage = ({ view }) => {
  const { _id } = view || {};
  const { data, isLoading, isFetching } = useGetWatchListDetailQuery(_id, { skip: !view });
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
  const { themeStretch } = useSettingsContext();
  const theme = useTheme();

  const convert = (
    <Chip
      sx={{ fontSize : '10px' }}
      size="small"
      onClick={() => handleLabelTime(labelTime)}
      label={labelTime}
      color="primary"
    />
  );
  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }
  const generateRandomSeries = () => {
    let series = [];
    for (let i = 0; i < 10; i++) {
      const num = Math.random() * 100;
      series.push(parseInt(num));
    }
    return series;
  };
  return (
    <>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{ flexGrow: 1, mx: 2, mb: 4, mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2.4}>
              <AppWidgetSummary
                watchList={true}
                watchListButton={convert}
                title="Marketplace cap"
                percent={2.6}
                total={18765}
                chart={{
                  colors: ['#8BE78B'],
                  series: generateRandomSeries(),
                }}
              />
            </Grid>
            <Grid item xs={12} md={2.4}>
              <AppWidgetSummary
                watchList={true}
                watchListButton={convert}
                title="Trade Volume"
                percent={2.6}
                total={18765}
                chart={{
                  colors: ['#8BE78B'],
                  series: generateRandomSeries(),
                }}
              />
            </Grid>
            <Grid item xs={12} md={2.4}>
              <AppWidgetSummary
                watchList={true}
                watchListButton={convert}
                title="Estimated SOH"
                percent={-2.6}
                total={18765}
                chart={{
                  colors: ['#F76F72'],
                  series: generateRandomSeries(),
                }}
              />
            </Grid>
            <Grid item xs={12} md={2.4}>
              <AppWidgetSummary
                watchList={true}
                watchListButton={convert}
                title="E Sold Units"
                percent={-2.6}
                total={18765}
                chart={{
                  colors: ['#F76F72'],
                  series: generateRandomSeries(),
                }}
              />
            </Grid>
            <Grid item xs={12} md={2.4}>
              <Grid
                sx={{
                  position: 'relative',
                  mt: '2px',
                  height: '100%',
                  boxShadow: 3,
                  background: theme.palette.mode === 'dark' ? '#212B36' : '#fff',
                  color: 'text.main',
                  borderRadius: 2,
                  p: 1,
                }}
                container
                spacing={1}
              >
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: '10px' }}>Gainers/losers</Typography>
                  </Box>
                </Grid>
                <Box sx={{ flexGrow: 1 }}>
                  <BorderLinearProgress sx={{ bgColor: 'red' }} variant="determinate" value={67} />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography sx={{ fontSize: '10px', fontWeight: 'bold', pt: 1 }}>
                      1555 (67%)
                    </Typography>
                    <Typography sx={{ fontSize: '10px', fontWeight: 'bold', pt: 1 }}>
                      780 (33%)
                    </Typography>
                  </Box>
                </Box>
                <div style={{ position: 'absolute', right: '10px', top: '10px' }}>{convert}</div>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default DataStorage;
