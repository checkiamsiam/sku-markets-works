import AssignmentIcon from '@mui/icons-material/Assignment';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  useGetAllNotificationsQuery,
  useGetUnReadNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
} from 'features/notification/notificationAPI';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IconButtonAnimate } from '../../../components/animate';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import Scrollbar from '../../../components/scrollbar';
import { fToNow } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const { data: unRead, refetch: unRefetch } = useGetUnReadNotificationsQuery();
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllRead] = useMarkAllNotificationsAsReadMutation();
  const { data, refetch } = useGetAllNotificationsQuery();

  const markAllHandler = async () => {
    await markAllRead();
    refetch();
    unRefetch();
  };

  const markHandler = async (id) => {
    await markAsRead(id);
    handleClosePopover();
    refetch();
    unRefetch();
  };

  const loggedInUserId = useSelector((state) => state.user._id);

  const [openPopover, setOpenPopover] = useState(null);
  const handleOpenPopover = (event) => {
    if (loggedInUserId) {
      setOpenPopover(event.currentTarget);
    }
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  return (
    <>
      <IconButtonAnimate
        color={openPopover ? 'primary' : 'default'}
        onClick={handleOpenPopover}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={unRead?.length} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 360, p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {unRead?.length} unread messages
            </Typography>
          </Box>

          {unRead?.length > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={markAllHandler}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {unRead?.slice(0, 2).map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                markHandler={markHandler}
              />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {data?.notifications?.slice(0, 3).map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                markHandler={markHandler}
              />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Link to="/notification" onClick={handleClosePopover} style={{ textDecoration: 'none' }}>
            <Button fullWidth disableRipple>
              View All
            </Button>
          </Link>
        </Box>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

function NotificationItem({ notification, markHandler }) {
  const navigate = useNavigate();

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification?.read === false && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>
          {' '}
          <AssignmentIcon />
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        onClick={() => {
          markHandler(notification._id);
          navigate(notification.url);
        }}
        sx={{ fontSize: '15px' }}
        disableTypography
        primary={notification.message}
        secondary={
          <Stack direction="row" sx={{ mt: 0.5, typography: 'caption', color: 'text.disabled' }}>
            <Iconify icon="eva:clock-fill" width={16} sx={{ mr: 0.5 }} />
            <Typography variant="caption">{fToNow(notification?.createdAt)}</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

/* function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_package.svg" />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/notification/ic_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
} */
