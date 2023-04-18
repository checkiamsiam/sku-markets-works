import { Box, Card, Link, Stack, Typography } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { AiFillShop } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Iconify from '../../../../../components/iconify';
LinearProgressWithLabel.propTypes = {
  color: PropTypes.string,
};

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  company: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string,
  quote: PropTypes.string,
  role: PropTypes.string,
  school: PropTypes.string,
};

export default function ProfileAbout({ quote, country, email, role, company, school }) {
  const user = useSelector((state) => state.user);
  const usershare=useSelector((state)=>state.user.shareuser);
 
  
  return (
    <>
      <Card>
        <Stack spacing={2} sx={{ p: 4 }}>
          <Stack direction="column">
            <Typography sx={{ fontSize: '14px' }} component="p">
              Open Since
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }} component="p">
              {moment(usershare?.createdAt?usershare?.createdAt:user?.createdAt).format('MMMM, yyyy')}
            </Typography>
          </Stack>

          <Stack direction="column" sx={{ my: 2 }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }} component="p">
              About
            </Typography>
            <Typography sx={{ fontSize: '14px' }} component="p">
              {usershare?.about?usershare?.about:user?.about}
            </Typography>
          </Stack>

          <Stack direction="row">
            <StyledIcon icon="eva:pin-fill" />

            <Typography variant="body2">
              Seller Country &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                {usershare?.country?usershare?.country:user?.country}
              </Link>
            </Typography>
          </Stack>
          <Stack direction="row">
            <Typography component="h6" variant="h6" sx={{ paddingRight: 2 }}>
              <AiFillShop />
            </Typography>

            <Typography variant="body2">
              Seller City &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                {usershare?.city?usershare?.city:user?.city}
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
