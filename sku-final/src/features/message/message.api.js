import ApiBase from 'app/ApiBase';
import {
  setConversation,
  setConversationDetails,
  setLastMessageOnConversation,
  setParticipant,
} from 'features/chat/chat';
import { getSocket } from 'socket';

export const MessageApi = ApiBase.injectEndpoints({
  endpoints: (build) => ({
    getConversations: build.query({
      query: (query) => `/api/v1/message?${query}`,

      providesTags: ['Conversations'],

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        // async OnQueryStarted({ queryArg, dispatch, getState }) {
        // const { auth } = getState();
        // if (!auth.user) {
        //   return;
        // }

        // const { data } = await build
        //   .query({
        //     query: (query) => `/api/v1/message?${query}`,
        //   })
        //   .initiate({ queryArg });

        const { data } = await queryFulfilled;

        dispatch(setConversation(data?.data));
        dispatch(setParticipant(data?.data[0]));
      },
    }),

    getConversation: build.query({
      query: (query) => `/api/v1/message/${query}`,

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const socket = getSocket();

          // listen for message
          socket.on('message', (data) => {
            dispatch(
              setLastMessageOnConversation({
                receiver: data?.sender,
                message: data?.message,
              })
            );

            // dispatch(setConversationDetailsLastMessageRealtime(data));
          });

          const { data } = await queryFulfilled;
          console.log(query);
          dispatch(setConversationDetails(data?.data));
        } catch (error) {
          console.log({ error });
        }
      },
    }),
  }),
});

export const { useGetConversationsQuery, useGetConversationQuery } = MessageApi;
