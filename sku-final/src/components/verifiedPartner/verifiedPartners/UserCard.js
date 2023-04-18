import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Button, Card, Link, Stack, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CustomAvatar } from 'components/custom-avatar';
import Iconify from 'components/iconify/Iconify';
import { AiFillShop } from 'react-icons/ai';
import { FaRegShareSquare, FaShare } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const UserCard = ({ user }) => {
  return (
    <Card sx={{ p: 2, my: 2 , boxShadow: 5}}>
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
        <FaRegShareSquare style={{ fontSize: '25px', cursor: 'pointer', color: '#0d6efd' }} />
      </Stack>
      <Stack spacing={1}>
        <Stack direction="column">
          <Typography fontSize="12px">
            Soud Sheikh
            <Tooltip title="Verified Store">
              <span style={{ color: '#1562ff' }}>
                {' '}
                <GoVerified />{' '}
              </span>
            </Tooltip>
          </Typography>

          <Typography sx={{ opacity: 0.72 }} fontSize="12px">
            {' '}
            Seller{' '}
          </Typography>
        </Stack>
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
            <Link component="span" variant="subtitle2" color="text.primary" sx={{ fontSize: '12px' }}>
              Soudi Arabia
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <Typography fontSize="12px" component="h6" variant="h6" sx={{ paddingRight: 2 }}>
            <AiFillShop />
          </Typography>

          <Typography variant="body2" fontSize="12px">
            Seller City &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary" sx={{ fontSize: '12px' }}>
              Riyadh
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" fontSize="12px">
            <Link component="span" variant="subtitle2" sx={{ cursor: 'pointer' }} >
              view all SKUs
            </Link>
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <ChatBubbleOutlineIcon sx={{ fontSize: '25px', cursor: 'pointer', color: '#0d6efd' }} />
            <Button variant="text" fontSize="12px">
              Share{' '}
              <span style={{ marginLeft: '6px' }}>
                {' '}
                <FaShare />{' '}
              </span>{' '}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default UserCard;
