import ApiBase from 'app/ApiBase';
import { store } from 'app/store';
import { addMessage } from 'features/message/messageSlice';
import { getSocket } from 'socket';
import {
  setConversation,
  setConversationDetailsLastMessage,
  setConversations,
  setParticipant,
} from './chat';

export const ChatApi = ApiBase.injectEndpoints({
  endpoints: (build) => ({
    getConversations: build.query({
      query: (query) => `/api/v1/message?${query}`,
      providesTags: ['Conversations'],
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        dispatch(setConversation(data?.data));
        dispatch(setParticipant(data?.data[0]));
      },
    }),

    getConversationDetails: build.query({
      query: ({ id, query }) => `/api/v1/message/${id}?${query}`,

      providesTags: ['ConversationDetails'],

      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        // create a websocket connection when the cache subscription starts
        const socket = getSocket();
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (newMessage) => {
            store.dispatch(
              addMessage({
                message: 'New message received',
                type: 'success',
              })
            );

            updateCachedData((draft) => {
              const argSender = arg?.id;
              const msgSender = newMessage?.sender;

              if (argSender !== msgSender) return;
              const conversation = draft?.data;

              let sample = conversation[0];

              sample = JSON.parse(JSON.stringify(sample));

              const message = {
                ...newMessage,
                sender: sample?.senderId === newMessage?.sender ? sample?.sender : sample?.receiver,
                receiver:
                  sample?.senderId === newMessage?.sender ? sample?.receiver : sample?.sender,
              };

              // push the new message to the end of the array
              conversation?.push(message);
            });
          };

          socket.on('message', listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        // socket.close();
      },

      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;

        dispatch(setConversations({ conversationID: id, message: data?.data }));
      },
    }),

    sendMessage: build.mutation({
      query: (body) => ({
        url: '/api/v1/message',
        method: 'POST',
        body,
      }),

      invalidatesTags: ['Conversations', 'ConversationDetails'],

      async onQueryStarted(body, { queryFulfilled, dispatch }) {
        try {
          console.log(body?.message);

          if (!body?.message) {
            dispatch(
              addMessage({
                message: 'File is uploading...',
                type: 'info',
              })
            );
          }

          const { data } = await queryFulfilled;
          dispatch(
            setConversationDetailsLastMessage({
              ...data?.data,
              senderId: data?.data?.sender,
            })
          );

          dispatch(
            ChatApi.util.updateQueryData('getConversationDetails', undefined, (draft) => {
              console.log('draft');
              draft?.data?.push(data?.data);
            })
          );
        } catch (error) {
          console.log({ error });
        }
      },
    }),
  }),
});

export const { useGetConversationsQuery, useGetConversationDetailsQuery, useSendMessageMutation } =
  ChatApi;
