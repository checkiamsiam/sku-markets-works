import { Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import ProfileAbout from './ProfileAbout';
import ProfileMyProduct from './ProfileMyProduct';
import ProfileOrders from './ProfileOrders';
import ProfilePostInput from './ProfilePostInput';
import ProfileRates from './ProfileRates';
import ProfileShipment from './ProfileShipment';

Profile.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};

export default function Profile({ info, posts }) {
  return (
    <Grid container spacing={3}>
      <Grid item lg={4} xs={12} md={12}>
        <Stack spacing={2}>
          <ProfileAbout
            quote={info.quote}
            country={info.country}
            email={info.email}
            role={info.role}
            company={info.company}
            school={info.school}
          />
        </Stack>
      </Grid>

      <Grid item lg={8} xs={12} md={12}>
        <Stack spacing={2}>
          <ProfilePostInput />
        </Stack>
      </Grid>

      <Grid item lg={12} xs={12} md={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <ProfileOrders />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <ProfileShipment />
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <ProfileRates />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={12} xs={12} md={12}>
        <Stack spacing={3}>
          <ProfileMyProduct />
        </Stack>
      </Grid>
    </Grid>
  );
}
