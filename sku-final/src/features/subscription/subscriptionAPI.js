import ApiBase from 'app/ApiBase';
import { addMessage } from '../message/messageSlice';
import { setSubscriptions, setLastPlan } from './subscriptionSlice';

const subscriptionAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Subscriptions of an user
    getAllSubscriptions: builder.query({
      query: () => '/api/v1/subscription/get-all',
      providesTags: ['subscriptions'],
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSubscriptions(data?.data));
        } catch (error) {
          dispatch(
            addMessage({
              message:
                error?.error?.data?.message || error.message || 'Failed to load subscription',
              type: 'error',
            })
          );
        }
      },
    }),

    // Create a Subscription
    createSubscription: builder.mutation({
      query: (data) => ({
        url: '/api/v1/subscription/create',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['subscriptions', 'subscriptionInvoice'],
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Subscription requesting...',
              type: 'info',
            })
          );

          await queryFulfilled;
          dispatch(
            addMessage({
              message: 'Subscription successful',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Subscription failed',
              type: 'error',
            })
          );
        }
      },
    }),

    // Make Payment to a subscription
    makePayment: builder.mutation({
      query: (data) => ({
        url: '/api/v1/subscription/make-payment',
        method: 'PUT',
        body: data,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Payment requesting...',
              type: 'info',
            })
          );

          const { data } = await queryFulfilled;
          dispatch(setLastPlan(data?.data));

          dispatch(
            addMessage({
              message: 'Payment successful',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Payment failed',
              type: 'error',
            })
          );
        }
      },
    }),

    // Cancel Subscription
    cancelSubscription: builder.mutation({
      query: (data) => ({
        url: '/api/v1/subscription/cancel',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['subscriptions'],
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Subscription cancel requesting...',
              type: 'info',
            })
          );

          await queryFulfilled;
          dispatch(
            addMessage({
              message: 'Subscription cancelled successfully',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message:
                error?.error?.data?.message || error.message || 'Subscription cancellation failed',
              type: 'error',
            })
          );
        }
      },
    }),
  }),
});

export const {
  useGetAllSubscriptionsQuery,
  useCreateSubscriptionMutation,
  useMakePaymentMutation,
  useCancelSubscriptionMutation,
} = subscriptionAPI;
