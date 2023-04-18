import { Card } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import BrandPageChart from 'components/chart/BrandPageChart';
import MPLogo from 'components/common/MPLogo';
import { useState } from 'react';
import { SiBrandfolder } from 'react-icons/si';
import { useSelector } from 'react-redux';
const TopCard = ({ data, collapsible }) => {
  console.log(data);
  const { targetedBrandForBrandDetail } = useSelector((state) => state.portfolios);
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
  return (
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
                  {targetedBrandForBrandDetail}
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
        <Box sx={{ ml: !collapsible ? 20 : 0, mb: { xs: 5, lg: 0 } }}>
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
        <Box sx={{ mr: !collapsible ? 20 : 0, mb: { xs: 5, lg: 0 } }}>
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
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={10}>
            <Box>Marketplace</Box>
            <MPLogo marketplace="noon/ksa" />
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
  );
};

export default TopCard;
