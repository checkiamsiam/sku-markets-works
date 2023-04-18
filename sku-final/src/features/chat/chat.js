import { createSlice } from '@reduxjs/toolkit';
import keyBy from 'lodash/keyBy';
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: null,
  contacts: { byId: {}, allIds: [] },
  conversations: {},
  activeConversationId: null,
  participants: [],
  recipients: [],
  conversation: [],
  participant: {},
  conversationDetails: [],
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET CONTACT SSUCCESS
    getContactsSuccess(state, action) {
      const contacts = action.payload;

      state.contacts.byId = keyBy(contacts, 'id');
      state.contacts.allIds = Object.keys(state.contacts.byId);
    },

    // GET CONVERSATIONS
    getConversationsSuccess(state, action) {
      const conversations = action.payload;

      // state.conversations.byId = keyBy(conversations, 'id');
      // state.conversations.allIds = Object.keys(state.conversations.byId);
    },

    // GET CONVERSATION
    getConversationSuccess(state, action) {
      // const conversation = action.payload;
      // if (conversation) {
      //   state.conversations.byId[conversation.id] = conversation;
      //   state.activeConversationId = conversation.id;
      //   if (!state.conversations.allIds.includes(conversation.id)) {
      //     state.conversations.allIds.push(conversation.id);
      //   }
      // } else {
      //   state.activeConversationId = null;
      // }
    },

    // ON SEND MESSAGE
    sendMessage(state, action) {
      // const conversation = action.payload;
      // const { conversationId, messageId, message, contentType, attachments, createdAt, senderId } =
      //   conversation;
      // const newMessage = {
      //   id: messageId,
      //   body: message,
      //   contentType,
      //   attachments,
      //   createdAt,
      //   senderId,
      // };
      // state.conversations.byId[conversationId].messages.push(newMessage);
    },

    markConversationAsReadSuccess(state, action) {
      // const { conversationId } = action.payload;
      // const conversation = state.conversations.byId[conversationId];
      // if (conversation) {
      //   conversation.unreadCount = 0;
      // }
    },

    // GET PARTICIPANTS
    getParticipantsSuccess(state, action) {
      const participants = action.payload;
      state.participants = participants;
    },

    // RESET ACTIVE CONVERSATION
    resetActiveConversation(state) {
      state.activeConversationId = null;
    },

    addRecipients(state, action) {
      const recipients = action.payload;
      state.recipients = recipients;
    },

    setConversation(state, action) {
      state.conversation = action.payload;
    },

    setParticipant: (state, action) => {
      state.participant = action.payload;
    },

    setLastMessageOnConversation: (state, action) => {
      const targetConversation = state.conversation.find(
        (conversation) => conversation.partner._id === action.payload.receiver
      );
      if (targetConversation) {
        targetConversation.message = action.payload.message;
        targetConversation.createdAt = new Date().toISOString();
      }

      // sort conversation by createdAt
      state.conversation.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
    },

    setConversationDetails: (state, action) => {
      state.conversationDetails = action.payload;
    },

    setConversationDetailsLastMessage: (state, action) => {
      state.conversationDetails.push(action.payload);
    },

    setConversationDetailsLastMessageRealtime: (state, action) => {
      // get conversation by id
      const targetConversation = state.conversation.find(
        (conversation) => conversation.partner._id === action.payload.sender
      );

      const senderDetails = targetConversation?.partner;

      const newMessage = {
        ...action.payload,
        sender: senderDetails,
      };

      state.conversationDetails.push(newMessage);
    },

    setConversations: (state, action) => {
      const conversationID = action.payload.conversationID;
      const selectedConversation = state.conversations[conversationID];
      const newState = {
        ...selectedConversation,
        ...action.payload.message,
      };
      state.conversations[conversationID] = newState;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  addRecipients,
  sendMessage,
  resetActiveConversation,
  setConversation,
  setParticipant,
  setLastMessageOnConversation,
  setConversationDetails,
  setConversationDetailsLastMessage,
  setConversationDetailsLastMessageRealtime,
  setConversations,
} = slice.actions;

// ----------------------------------------------------------------------

export function getContacts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/chat/contacts');
      const response = await axios.get('https://api-prod-minimal-v4.vercel.app/api/chat/contacts');
      dispatch(slice.actions.getContactsSuccess(response.data.contacts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getConversations() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/chat/conversations');
      const response = await axios.get(
        'https://api-prod-minimal-v4.vercel.app/api/chat/conversations'
      );
      dispatch(slice.actions.getConversationsSuccess(response.data.conversations));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getConversation(conversationKey) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/chat/conversation', {
      const response = await axios.get(
        'https://api-prod-minimal-v4.vercel.app/api/chat/conversations',
        {
          params: { conversationKey },
        }
      );
      dispatch(slice.actions.getConversationSuccess(response.data.conversation));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function markConversationAsRead(conversationId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.get('/api/chat/conversation/mark-as-seen', {
        params: { conversationId },
      });
      dispatch(slice.actions.markConversationAsReadSuccess({ conversationId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getParticipants(conversationKey) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/chat/participants', {
      const response = await axios.get(
        'https://api-prod-minimal-v4.vercel.app/api/chat/participants',
        {
          params: { conversationKey },
        }
      );
      dispatch(slice.actions.getParticipantsSuccess(response.data.participants));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export const selectChart = (state) => state.chat;
