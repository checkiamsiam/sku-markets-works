import PropTypes from 'prop-types';
// @mui
import { Box, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { bgBlur } from '../../../../utils/cssStyles';
// auth
// components
import { GoVerified } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { CustomAvatar } from '../../../../components/custom-avatar';
import Image from '../../../../components/image';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  '&:before': {
    ...bgBlur({
      color: theme.palette.primary.darker,
    }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const StyledInfo = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  cover: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
};

export default function ProfileCover({ name, role, cover }) {
  //const { user } = useAuthContext();
  const user = useSelector((state) => state.user);
  const usershare=useSelector((state)=>state.user.shareuser);
  return (
    <StyledRoot>
      <StyledInfo>
        <CustomAvatar
          src={usershare?.avatar?usershare?.avatar:user?.avatar}
          alt={usershare?.name?usershare?.name:user?.name}
          name={usershare?.name?usershare?.name:user?.name}
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />

        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4">
            {usershare?.name?usershare?.name:user?.name}
            <Tooltip title="Verified Store">
              <span style={{ color: '#1562ff' }}>
                {' '}
                <GoVerified />{' '}
              </span>
            </Tooltip>
          </Typography>

          <Typography sx={{ opacity: 0.72 }}> {usershare?.seller_type?usershare?.seller_type:user?.seller_type} </Typography>
        </Box>
      </StyledInfo>

      <Image
        alt="cover"
        src={usershare?.cover?usershare?.cover:user?.cover ? user?.cover : cover}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
        }}
      />
    </StyledRoot>
  );
}
