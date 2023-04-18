import { Avatar, Link, Stack, Typography } from '@mui/material';
import { formatDistanceToNowStrict } from 'date-fns';
import useAuth from 'hooks/useAuth';
import PropTypes from 'prop-types';
import Image from '../../../../components/image';

ChatMessageItem.propTypes = {
  message: PropTypes.object,
  onOpenLightbox: PropTypes.func,
};

export default function ChatMessageItem({ message, onOpenLightbox }) {
  const { _id } = useAuth();

  const senderDetails = message.senderId === _id ? message.receiver : message.sender;

  const currentUser = message.senderId === _id;

  const isImage = message.type === 'photo';
  const ifFile = message.type === 'file';

  const firstName = message?.sender?.name?.split(' ')[0];

  return (
    <Stack direction="row" justifyContent={currentUser ? 'flex-end' : 'unset'} sx={{ mb: 3 }}>
      {!currentUser && (
        <Avatar
          alt={senderDetails.name}
          src={senderDetails.avatar}
          sx={{ width: 32, height: 32, mr: 2 }}
        />
      )}

      <Stack spacing={1} alignItems="flex-end">
        <Typography
          noWrap
          variant="caption"
          sx={{
            color: 'text.disabled',
            ...(!currentUser && {
              mr: 'auto',
            }),
          }}
        >
          {!currentUser && `${firstName},`} &nbsp;
          {formatDistanceToNowStrict(new Date(message.createdAt), {
            addSuffix: true,
          })}
        </Typography>

        <Stack
          sx={{
            p: 1.5,
            minWidth: 48,
            maxWidth: 320,
            borderRadius: 1,
            overflow: 'hidden',
            typography: 'body2',
            bgcolor: 'background.neutral',
            ...(currentUser && {
              color: 'grey.800',
              bgcolor: 'primary.lighter',
            }),
            ...(isImage && {
              p: 0,
            }),
          }}
        >
          {isImage ? (
            <Image
              alt="attachment"
              src={message?.message}
              onClick={() => onOpenLightbox(message?.message)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            />
          ) : ifFile ? (
            <Link href={message?.message} target="_blank" rel="noreferrer">
              Download File
            </Link>
          ) : (
            message?.message
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
