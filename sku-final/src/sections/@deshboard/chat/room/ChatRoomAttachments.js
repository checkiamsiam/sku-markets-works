import { Box, Stack, Typography } from '@mui/material';
import { useGetConversationDetailsQuery } from 'features/chat/chat.api';
import useChat from 'hooks/useChat';
import PropTypes from 'prop-types';
import FileThumbnail from '../../../../components/file-thumbnail';
import Scrollbar from '../../../../components/scrollbar';
import { fDateTime } from '../../../../utils/formatTime';
import ChatRoomCollapseButton from './ChatRoomCollapseButton';

ChatRoomAttachments.propTypes = {
  conversation: PropTypes.object,
  isCollapse: PropTypes.bool,
  onCollapse: PropTypes.func,
};

export default function ChatRoomAttachments({ conversation, isCollapse, onCollapse }) {
  const { participant } = useChat();

  const { data } = useGetConversationDetailsQuery(
    {
      id: participant?.partner?._id,
      query: `page=1&limit=1000&sort=-createdAt&fields=message,type,createdAt,senderId,receiverId,receiver,sender&type[ne]=text`,
    },
    {
      skip: !participant?.partner?._id,
    }
  );

  const totalAttachments = data?.data || [];

  return (
    <Stack
      flexGrow={1}
      sx={{
        pb: 2,
        height: 1,
        overflow: 'hidden',
        borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <ChatRoomCollapseButton
        isCollapse={isCollapse && !!totalAttachments?.length}
        onCollapse={onCollapse}
        disabled={!totalAttachments?.length}
        sx={{
          ...(!isCollapse && {
            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          }),
        }}
      >
        Attachments ({totalAttachments?.length})
      </ChatRoomCollapseButton>

      <Box
        sx={{
          overflow: 'hidden',
          height: isCollapse ? 1 : 0,
          transition: (theme) =>
            theme.transitions.create('height', {
              duration: theme.transitions.duration.shorter,
            }),
        }}
      >
        <Scrollbar>
          {totalAttachments.map((attachment, index) => (
            <AttachmentItem key={attachment.name + index} attachment={attachment} />
          ))}
        </Scrollbar>
      </Box>
    </Stack>
  );
}

function AttachmentItem({ attachment }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 2, px: 2.5 }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: 1,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'background.neutral',
        }}
      >
        <FileThumbnail
          imageView
          file={{
            name: getFileName(attachment?.message),
            path: attachment?.message,
            preview: attachment?.message,
          }}
          onDownload={() => onDownload(attachment?.message)}
          sx={{ width: 28, height: 28 }}
        />
      </Stack>

      <Stack flexGrow={1} sx={{ ml: 1.5, minWidth: 0 }}>
        <Typography variant="body2" noWrap>
          {getFileName(attachment?.message)}
        </Typography>

        <Typography noWrap variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {fDateTime(attachment?.createdAt)}
        </Typography>
      </Stack>
    </Stack>
  );
}

const getFileName = (url) => {
  const arr = url.split('/');
  return arr[arr.length - 1];
};

const onDownload = (url) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = true;
  link.click();
};
