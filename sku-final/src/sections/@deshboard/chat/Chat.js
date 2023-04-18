import { Card, Container, Stack } from '@mui/material';
import { useSettingsContext } from 'components/settings';
import {
  addRecipients,
  getContacts,
  getConversation,
  getConversations,
  getParticipants,
  markConversationAsRead,
  resetActiveConversation,
  sendMessage,
} from 'features/chat/chat';
import useChat from 'hooks/useChat';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { PATH_DASHBOARD } from '../../../routes/paths';
import ChatHeaderCompose from './header/ChatHeaderCompose';
import ChatHeaderDetail from './header/ChatHeaderDetail';
import ChatMessageInput from './message/ChatMessageInput';
import ChatMessageList from './message/ChatMessageList';
import ChatNav from './nav/ChatNav';
import ChatRoom from './room/ChatRoom';

const CURRENT_USER_ID = '8864c717-587d-472a-929a-8e5f298024da-0';

export default function Chat() {
  const { themeStretch } = useSettingsContext();
  const { participant } = useChat();

  const conversation = participant?.partner?._id;

  const dispatch = useDispatch();

  const { push, pathname } = useLocation();

  let { conversationKey } = useParams();

  const { contacts, recipients, participants, activeConversationId, conversations } = useSelector(
    (state) => state.chat
  );

  const selectedConversation = useSelector(() => {
    if (activeConversationId) {
      return conversations.byId[activeConversationId];
    }

    return {
      id: '',
      messages: [],
      participants: [],
      unreadCount: 0,
      type: '',
    };
  });

  const detailView = !conversationKey;

  const displayParticipants = participants?.filter((item) => item.id !== CURRENT_USER_ID);
  // console.log(participants);

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(`${conversationKey}`));
      try {
        await dispatch(getConversation(`${conversationKey}`));
      } catch (error) {
        console.error(error);
        push(PATH_DASHBOARD.chat.new);
      }
    };

    if (conversationKey) {
      getDetails();
    } else if (activeConversationId) {
      dispatch(resetActiveConversation());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationKey]);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(markConversationAsRead(activeConversationId));
    }
  }, [dispatch, activeConversationId]);

  const handleAddRecipients = (selectedRecipients) => {
    dispatch(addRecipients(selectedRecipients));
  };

  const handleSendMessage = async (value) => {
    try {
      dispatch(sendMessage(value));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <Card sx={{ height: '75vh', display: 'flex' }}>
        <ChatNav conversations={conversations} activeConversationId={activeConversationId} />

        <Stack flexGrow={1}>
          {/* detail view true hobe. ui te dekhar jnw false kore rakhsi. true hole calling option dekhabe. false hole input type dekhabe */}
          {detailView ? (
            <ChatHeaderDetail participants={displayParticipants} />
          ) : (
            <ChatHeaderCompose
              recipients={recipients}
              contacts={Object.values(contacts.byId)}
              onAddRecipients={handleAddRecipients}
            />
          )}

          <Stack
            direction="row"
            flexGrow={1}
            sx={{
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <Stack flexGrow={1}>
              <ChatMessageList conversation={selectedConversation} />

              <ChatMessageInput
                conversationId={activeConversationId}
                onSend={handleSendMessage}
                // disabled={pathname === PATH_DASHBOARD.ChatPage || pathname === PATH_DASHBOARD.new}
              />
            </Stack>
            {/* detail view true hole attachments bar dekhabe. false hole dekhabena */}
            {detailView && (
              <ChatRoom conversation={selectedConversation} participants={displayParticipants} />
            )}
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}
