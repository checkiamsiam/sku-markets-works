import { Card } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import { BsFillCloudArrowUpFill } from 'react-icons/bs';
import { FaCartPlus, FaCubes, FaHouseDamage } from 'react-icons/fa';
import { HiOutlineTrendingDown, HiOutlineTrendingUp } from 'react-icons/hi';
import { IoIosPeople } from 'react-icons/io';

const BelowCard = ({ data }) => {
  return (
    <Card sx={{ mt: 4, color: 'text.main', p: 3 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>
        <Grid item xs={6} md={4} lg={1.713}>
          <Stack direction="row" spacing={1} alignItems="center">
            <IoIosPeople size="3rem" color="#0052FF" />
            <Box sx={{ fontSize: '12px', color: 'text.main', textAlign: 'end' }}>
              Stores <br />
              {data?.products}
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={6} md={4} lg={1.713}>
          <Stack direction="row" spacing={1} alignItems="center">
            <HiOutlineTrendingUp size="3rem" color="#0052FF" />
            {/* <FontAwesomeIcon icon="fa-solid fa-arrow-up-right-dots" /> */}
            <Box sx={{ fontSize: '12px', color: 'text.main', textAlign: 'end' }}>
              Live SKUs <br />
              {data?.live}
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={6} md={4} lg={1.713}>
          <Stack direction="row" spacing={1} alignItems="center">
            <HiOutlineTrendingDown size="3rem" color="#0052FF" />
            <Box sx={{ fontSize: '12px', color: 'text.main', textAlign: 'end' }}>
              Not Live SKUs <br />
              {data?.notLive}
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={6} md={4} lg={1.713}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FaCartPlus size="3rem" color="#0052FF" />
            <Box sx={{ fontSize: '12px', color: 'text.main', textAlign: 'end' }}>
              Fulfilled by MP <br />
              {data?.express}
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={6} md={4} lg={1.713}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FaHouseDamage size="3rem" color="#0052FF" />
            <Box sx={{ fontSize: '11px', color: 'text.main', textAlign: 'end' }}>
              Fulfilled by stores <br />
              {data?.stores}
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={6} md={4} lg={1.713}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FaCubes size="3rem" color="#0052FF" />
            <Box sx={{ fontSize: '12px', color: 'text.main', textAlign: 'end' }}>
              Stock On Hand <br />
              {data?.stocks?.toFixed(2)}
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={6} md={4} lg={1.713}>
          <Stack direction="row" spacing={1} alignItems="center">
            <BsFillCloudArrowUpFill size="3rem" color="#0052FF" />
            <Box sx={{ fontSize: '11px', color: 'text.main', textAlign: 'end' }}>
              Marketplace Share <br />
              3900
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BelowCard;
