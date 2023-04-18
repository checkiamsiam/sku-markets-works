import ApiBase from 'app/ApiBase';
import { addMessage } from 'features/message/messageSlice';

export const alertAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    addOrUpdateAlert: builder.mutation({
      query: (alert) => ({
        url: '/api/v1/alert',
        method: 'POST',
        body: alert,
      }),

      invalidatesTags: ['singleAlert'],

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Requesting...',
              type: 'info',
            })
          );
          await queryFulfilled;
          dispatch(
            addMessage({
              message: 'Alert modified',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Alert failed',
              type: 'error',
            })
          );
        }
      },

      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.alert;
      },
    }),

    deleteAlert: builder.mutation({
      query: (id) => ({
        url: `/api/v1/alert/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Alert'],

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Deleting alert...',
              type: 'info',
            })
          );

          await queryFulfilled;
          dispatch(
            addMessage({
              message: 'Alert deleted',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Alert failed',
              type: 'error',
            })
          );
        }
      },
    }),

    getAlerts: builder.query({
      query: (page) => `/api/v1/alert?page=${page + 1}`,
      providesTags: ['Alert'],

      // async onQueryStarted(query, { queryFulfilled, dispatch }) {
      //   try {
      //     dispatch(
      //       addMessage({
      //         message: 'Requesting...',
      //         type: 'info',
      //       })
      //     );
      //     await queryFulfilled;
      //     dispatch(
      //       addMessage({
      //         message: 'Alerts loaded',
      //         type: 'success',
      //       })
      //     );
      //   } catch (error) {
      //     dispatch(
      //       addMessage({
      //         message: error?.error?.data?.message || error.message || 'Alert failed',
      //         type: 'error',
      //       })
      //     );
      //   }
      // },
    }),

    bulkUpdateAlerts: builder.mutation({
      query: (alerts) => ({
        url: '/api/v1/alert/bulk',
        method: 'POST',
        body: alerts,
      }),
      invalidatesTags: ['Alert'],
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Updating alerts...',
              type: 'info',
            })
          );

          await queryFulfilled;
          dispatch(
            addMessage({
              message: 'Alerts updated',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Alert failed',
              type: 'error',
            })
          );
        }
      },
    }),

    getSingleAlert: builder.query({
      query: (alert_id) => `/api/v1/alert/get/${alert_id}`,
      providesTags: ['singleAlert'],
    }),
  }),
});

export const {
  useGetAlertsQuery,
  useDeleteAlertMutation,
  useAddOrUpdateAlertMutation,
  useBulkUpdateAlertsMutation,
  useGetSingleAlertQuery,
} = alertAPI;
