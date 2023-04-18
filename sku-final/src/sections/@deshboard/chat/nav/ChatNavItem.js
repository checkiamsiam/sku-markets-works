import { ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import { CustomAvatar } from 'components/custom-avatar';
import { formatDistanceToNowStrict } from 'date-fns';
import BadgeStatus from '../../../../components/badge-status';

export default function ChatNavItem({ conversation, openNav, isSelected, onSelect }) {
  const isUnread = false;

  const status = conversation?.partner?.socketId ? 'online' : 'offline';

  return (
    <ListItemButton
      disableGutters
      onClick={onSelect}
      sx={{
        py: 1.5,
        px: 2.5,
        ...(isSelected && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <CustomAvatar
          key={conversation?.partner?._id}
          alt={conversation?.partner?.name}
          src={conversation?.partner?.avatar}
          BadgeProps={{
            badgeContent: <BadgeStatus status={status} />,
          }}
          sx={{ width: 48, height: 48 }}
        />
      </ListItemAvatar>

      {openNav && (
        <>
          <ListItemText
            primary={conversation?.partner?.name}
            primaryTypographyProps={{ noWrap: true, variant: 'subtitle2' }}
            secondary={conversation?.message}
            secondaryTypographyProps={{
              noWrap: true,
              variant: isUnread ? 'subtitle2' : 'body2',
              color: isUnread ? 'text.primary' : 'text.secondary',
            }}
          />

          <Stack alignItems="flex-end" sx={{ ml: 2, height: 44 }}>
            <Typography
              noWrap
              variant="body2"
              component="span"
              sx={{
                mb: 1.5,
                fontSize: 12,
                color: 'text.disabled',
              }}
            >
              {formatDistanceToNowStrict(new Date(conversation?.createdAt), {
                addSuffix: false,
              })}
            </Typography>

            {isUnread && <BadgeStatus status="unread" size="small" />}
          </Stack>
        </>
      )}
    </ListItemButton>
  );
}
