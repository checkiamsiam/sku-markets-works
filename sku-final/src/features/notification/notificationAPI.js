import ApiBase from 'app/ApiBase';
import { addMessage } from 'features/message/messageSlice';

export const notificationAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: (query) => ({
        url: `/api/v1/notification?${query}`,
        method: 'GET',
      }),
    }),
    getUnReadNotifications: builder.query({
      query: (query) => ({
        url: `/api/v1/notification/unread?${query}`,
        method: 'GET',
      }),

      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Notification', id })) : [],

      transformResponse: (response) => response.notifications,
    }),
    markAllNotificationsAsRead: builder.mutation({
      query: () => ({
        url: `/api/v1/notification`,
        method: 'PUT',
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'Notification', id: 'LIST' }],
    }),
    markNotificationAsRead: builder.mutation({
      query: (id) => ({
        url: `/api/v1/notification/${id}`,
        method: 'PUT',
      }),

      invalidatesTags: (result, error, id) => [{ type: 'Notification', id }],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/api/v1/notification/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: (result, error, id) => [{ type: 'Notification', id }],

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Deleting...',
              type: 'info',
            })
          );

          await queryFulfilled;

          dispatch(
            addMessage({
              message: 'Delete successful',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Delete failed',
              type: 'error',
            })
          );
        }
      },
    }),
    deleteAllNotifications: builder.mutation({
      query: () => ({
        url: `/api/v1/notification`,
        method: 'DELETE',
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'Notification', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetUnReadNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
} = notificationAPI;
