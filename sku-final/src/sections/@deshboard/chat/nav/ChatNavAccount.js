import { useState } from 'react';
// @mui
import { Divider, List, MenuItem, Select, Stack, Typography } from '@mui/material';
// auth
// import { useAuthContext } from '../../../../auth/useAuthContext';
// components
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import BadgeStatus from '../../../../components/badge-status';
import { CustomAvatar } from '../../../../components/custom-avatar';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';

// ----------------------------------------------------------------------

const STATUS = ['online', 'invisible', 'away'];

export default function ChatNavAccount() {
  const user = useAuth();

  const [status, setStatus] = useState('online');

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const navigate = useNavigate();

  return (
    <>
      <CustomAvatar
        src={user?.avatar}
        alt={user?.name}
        name={user?.name}
        BadgeProps={{
          badgeContent: <BadgeStatus status={status} />,
        }}
        onClick={handleOpenPopover}
        sx={{ cursor: 'pointer', width: 48, height: 48 }}
      />

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="top-left" sx={{ p: 0 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 2, pr: 1, pl: 2.5 }}>
          <div>
            <Typography noWrap variant="subtitle2">
              {user?.name}
            </Typography>

            <Typography noWrap variant="body2" sx={{ color: 'text.secondary' }}>
              {user?.email}
            </Typography>
          </div>

          {/* <Tooltip title="Log out">
            <IconButton color="error">
              <Iconify icon="ic:round-power-settings-new" />
            </IconButton>
          </Tooltip> */}
        </Stack>

        <Divider />

        <List sx={{ px: 1 }}>
          <MenuItem>
            <BadgeStatus size="large" status={status} sx={{ m: 0.5, flexShrink: 0 }} />

            <Select
              native
              fullWidth
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  p: 0,
                  pl: 2,
                  typography: 'body2',
                  textTransform: 'capitalize',
                },
                '& .MuiNativeSelect-icon': {
                  right: -16,
                  top: 'unset',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  display: 'none',
                },
              }}
            >
              {STATUS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </MenuItem>

          <MenuItem onClick={() => navigate('/userprofile')}>
            <Iconify icon="ic:round-account-box" />
            My Profile
          </MenuItem>

          <MenuItem onClick={() => navigate('/profile')}>
            <Iconify icon="eva:settings-2-fill" />
            Account Settings
          </MenuItem>
        </List>
      </MenuPopover>
    </>
  );
}
