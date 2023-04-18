import { List } from '@mui/material';
import { setParticipant } from 'features/chat/chat';
import { useGetConversationsQuery } from 'features/message/message.api';
import useChat from 'hooks/useChat';
import { useDispatch } from 'react-redux';
import { SkeletonConversationItem } from '../../../../components/skeleton';
import useResponsive from '../../../../hooks/useResponsive';
import ChatNavItem from './ChatNavItem';

export default function ChatNavList({
  conversations,
  openNav,
  onCloseNav,
  selected,
  sx,
  ...other
}) {
  const isDesktop = useResponsive('up', 'md');
  const query = 'fields=message,type,createdAt,partner&sort=-createdAt&limit=1000';
  const { isLoading } = useGetConversationsQuery(query);
  const dispatch = useDispatch();
  const { conversation, participant } = useChat();

  return (
    <List disablePadding sx={sx} {...other}>
      {(conversation.length <= 0 && isLoading ? [...Array(12)] : conversation).map(
        (conversation, index) =>
          conversation?._id ? (
            <ChatNavItem
              key={conversation?._id}
              openNav={openNav}
              conversation={conversation}
              isSelected={conversation?._id === participant?._id}
              onSelect={() => {
                if (!isDesktop) {
                  onCloseNav();
                }
                dispatch(setParticipant(conversation));
              }}
            />
          ) : (
            <SkeletonConversationItem key={index} />
          )
      )}
    </List>
  );
}
