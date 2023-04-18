import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Card, Link, Stack, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CustomAvatar } from 'components/custom-avatar';
import Iconify from 'components/iconify/Iconify';
import { AiFillShop } from 'react-icons/ai';
import {
  FaFacebookF,
  FaInstagramSquare,
  FaRegShareSquare,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { GiEarthAmerica } from 'react-icons/gi';
import { GoVerified } from 'react-icons/go';
import { IoLogoWhatsapp } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const UserCard = ({ user, topSkuCard, ctgry }) => {
  return (
    <Card
      sx={{
        p: 0.5,
        my: 0.5,
        boxShadow: (theme) => (theme.palette.mode === 'dark' ? '0px 3px 14px -2px #000000' : 5),
      }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <CustomAvatar
          // src={usershare?.avatar?usershare?.avatar:user?.avatar}
          alt={'avatar'}
          name={'Soud Sheikh'}
          sx={{
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 40, md: 80 },
            height: { xs: 40, md: 80 },
          }}
        />
        {topSkuCard ? (
          <Stack direction="row" spacing={1}>
            <ChatBubbleOutlineIcon sx={{ fontSize: '25px', cursor: 'pointer', color: '#0d6efd' }} />
            <FaRegShareSquare style={{ fontSize: '25px', cursor: 'pointer', color: '#0d6efd' }} />
            {ctgry && (
              <GiEarthAmerica style={{ fontSize: '25px', cursor: 'pointer', color: '#0d6efd' }} />
            )}
          </Stack>
        ) : (
          <GiEarthAmerica style={{ fontSize: '25px', cursor: 'pointer', color: '#0d6efd' }} />
        )}
      </Stack>
      <Stack spacing={1}>
        <Stack direction="column">
          {topSkuCard ? (
            <Typography sx={{ fontSize: '12px' , fontWeight: 700 }}>Brand Name</Typography>
          ) : (
            <Typography fontSize="12px">
              Soud Sheikh
              <Tooltip title="Verified Store">
                <span style={{ color: '#1562ff' }}>
                  <GoVerified />
                </span>
              </Tooltip>
            </Typography>
          )}
          <Typography sx={{ opacity: 0.72 }} fontSize="12px">
            {topSkuCard ? 'Ad Headline' : 'Seller'}
          </Typography>
        </Stack>

        {!topSkuCard && (
          <>
            <Stack direction="column">
              <Typography sx={{ fontSize: '12px' }} component="p">
                Open Since
              </Typography>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }} component="p">
                {/* {moment(realData).format('MMMM, yyyy')} */}
                February, 2023
              </Typography>
            </Stack>
            <Stack direction="column" sx={{ my: 2 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }} component="p">
                About
              </Typography>
              <Typography sx={{ fontSize: '12px' }} component="p">
                businessman
              </Typography>
            </Stack>

            <Stack direction="row">
              <StyledIcon icon="eva:pin-fill" />

              <Typography variant="body2" fontSize="12px">
                Seller Country &nbsp;
                <Link
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  sx={{ fontSize: '12px' }}
                >
                  Soudi Arabia
                </Link>
              </Typography>
            </Stack>
            <Stack direction="row">
              <Typography component="h6" variant="h6" sx={{ paddingRight: 2 }}>
                <AiFillShop />
              </Typography>

              <Typography variant="body2" sx={{ fontSize: '12px' }}>
                Seller City &nbsp;
                <Link
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  sx={{ fontSize: '12px' }}
                >
                  Riyadh
                </Link>
              </Typography>
            </Stack>
          </>
        )}
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
          <FaFacebookF style={{ fontSize: '25px', cursor: 'pointer', color: '#0d6efd' }} />
          <FaTwitter style={{ fontSize: '25px', cursor: 'pointer', color: '#0d6efd' }} />
          <FaInstagramSquare style={{ fontSize: '25px', cursor: 'pointer', color: '#0d6efd' }} />
          <FaYoutube style={{ fontSize: '25px', cursor: 'pointer', color: '#0d6efd' }} />
          <MdEmail style={{ fontSize: '25px', cursor: 'pointer', color: '#0d6efd' }} />
          <IoLogoWhatsapp style={{ fontSize: '25px', cursor: 'pointer', color: '#0d6efd' }} />
        </Stack>
      </Stack>
    </Card>
  );
};

export default UserCard;
