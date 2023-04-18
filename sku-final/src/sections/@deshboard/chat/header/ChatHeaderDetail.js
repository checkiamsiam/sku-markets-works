import { Box, IconButton, Link, Stack, Typography } from '@mui/material';
import BadgeStatus from 'components/badge-status/BadgeStatus';
import { CustomAvatar, CustomAvatarGroup } from 'components/custom-avatar';
import Iconify from 'components/iconify/Iconify';
import { formatDistanceToNowStrict } from 'date-fns';
import useChat from 'hooks/useChat';
import { fToNow } from 'utils/formatTime';

export default function ChatHeaderDetail({ participants }) {
  const isGroup = participants.length > 1;
  const { participant } = useChat();

  const participantInfo = participants.length ? participants[0] : null;
  const status = participant?.partner?.socketId
    ? 'online'
    : formatDistanceToNowStrict(new Date(participant?.partner?.last_seen || new Date()), {
        addSuffix: false,
      });

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: (theme) => theme.spacing(2, 1, 2, 2),
      }}
    >
      {isGroup ? (
        <Stack flexGrow={1}>
          <CustomAvatarGroup max={3}>
            {participants.map((participant) => (
              <CustomAvatar
                key={participant?.partner?._id}
                alt={participant?.partner?.name}
                src={participant?.partner?.avatar}
              />
            ))}
          </CustomAvatarGroup>

          <Link
            variant="body2"
            sx={{
              mt: 0.5,
              alignItems: 'center',
              display: 'inline-flex',
              color: 'text.secondary',
            }}
          >
            {participants.length} persons
            <Iconify icon="eva:arrow-ios-forward-fill" width={16} />
          </Link>
        </Stack>
      ) : (
        <Stack flexGrow={1} direction="row" alignItems="center" spacing={2}>
          <CustomAvatar
            alt={participant?.partner?.name}
            src={participant?.partner?.avatar}
            BadgeProps={{
              badgeContent: <BadgeStatus status={participantInfo?.status} />,
            }}
          />

          <div>
            <Typography variant="subtitle2">{participant?.partner?.name}</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {participantInfo?.status === 'offline' ? (
                participantInfo?.lastActivity && fToNow(participantInfo?.lastActivity)
              ) : (
                <Box component="span" sx={{ textTransform: 'capitalize' }}>
                  {status}
                </Box>
              )}
            </Typography>
          </div>
        </Stack>
      )}

      <IconButton>
        <Iconify icon="eva:phone-fill" />
      </IconButton>

      <IconButton>
        <Iconify icon="eva:video-fill" />
      </IconButton>

      <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Stack>
  );
}
