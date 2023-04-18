import { ListItemAvatar, ListItemText, MenuItem, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { setParticipant } from 'features/chat/chat';
import { useGetConversationsQuery } from 'features/chat/chat.api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { IconButtonAnimate } from '../../../components/animate';
import BadgeStatus from '../../../components/badge-status';
import { CustomAvatar } from '../../../components/custom-avatar';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import Scrollbar from '../../../components/scrollbar';
import { fToNow } from '../../../utils/formatTime';

const ITEM_HEIGHT = 64;
const query =
  'fields=message,type,createdAt,partner&sort=partner.last_seen&sort=-partner.online&limit=200';

export default function ContactsPopover() {
  const dispatch = useDispatch();
  const [openPopover, setOpenPopover] = useState(null);
  const { data } = useGetConversationsQuery(query);
  const navigate = useNavigate();

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handelClick = (contact) => {
    dispatch(setParticipant(contact));
    navigate('/chat');
  };

  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{
          width: 40,
          height: 40,
          ...(openPopover && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Iconify icon="eva:people-fill" />
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 320 }}>
        <Typography variant="h6" sx={{ p: 1.5 }}>
          Contacts <Typography component="span">({data?.total})</Typography>
        </Typography>

        <Scrollbar sx={{ height: ITEM_HEIGHT * 6 }}>
          {data?.data?.map((contact) => (
            <MenuItem
              key={contact._id}
              onClick={() => handelClick(contact)}
              sx={{ height: ITEM_HEIGHT }}
            >
              <ListItemAvatar>
                <CustomAvatar
                  src={contact?.partner?.avatar}
                  BadgeProps={{
                    badgeContent: (
                      <BadgeStatus status={contact?.partner?.online ? 'online' : 'offline'} />
                    ),
                  }}
                />
              </ListItemAvatar>

              <ListItemText
                primary={contact?.partner?.name}
                secondary={fToNow(contact?.partner?.last_seen)}
                primaryTypographyProps={{ typography: 'subtitle2', sx: { mb: 0.25 } }}
                secondaryTypographyProps={{ typography: 'caption' }}
              />
            </MenuItem>
          ))}
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
