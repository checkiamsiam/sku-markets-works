import ApiBase from 'app/ApiBase';
import { addMessage } from 'features/message/messageSlice';
import { addBillingInfo, setBillingInfo, updateBillingInfo, setDefaultAddress } from './billingInfoSlice';

export const billingInfoApi = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    addBillingAddress: builder.mutation({
      query: (data) => ({
        url: '/api/v1/billing-info/add',
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Adding Address...',
              type: 'info',
            })
          );

          const { data } = await queryFulfilled;
          dispatch(addBillingInfo(data.data));

          dispatch(
            addMessage({
              message: 'Address added successfully',
              type: 'success',
            })
          );
        } catch (error) {
          let message = error?.error?.data?.message || 'Address adding failed';
          dispatch(
            addMessage({
              message,
              type: 'error',
            })
          );
        }
      },
    }),

    getBillingInfo: builder.query({
      query: () => '/api/v1/billing-info/get',
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) dispatch(setBillingInfo(data.data));
        } catch (error) {
          let message = error?.error?.data?.message || 'Failed to get Address';
          // * Let login error message not be shown on public pages
          if (!message.includes('You are not logged in')) {
            dispatch(
              addMessage({
                message,
                type: 'error',
              })
            );
          }
        }
      },
    }),

    updateBillingAddress: builder.mutation({
      query: (data) => ({ url: '/api/v1/billing-info/update', method: 'PATCH', body: data }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Updating Billing Address...',
              type: 'info',
            })
          );

          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(
              addMessage({
                message: 'Billing Address updated',
                type: 'success',
              })
            );
            dispatch(updateBillingInfo(query))};

        } catch (error) {
          let message = error?.error?.data?.message || 'Billing info updating failed';
          dispatch(
            addMessage({
              message,
              type: 'error',
            })
          );
        }
      },
    }),

    updateDefaultAddress: builder.mutation({
      query: (data) => ({ url: '/api/v1/billing-info/update-default-address', method: 'PATCH', body: data }),
      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {

          await queryFulfilled;
          dispatch(setDefaultAddress(query?.addressId));
          
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || 'Failed to update Default address',
              type: 'error',
            })
          );
        }
      },
    }),

  }),
});

export const {
  useAddBillingAddressMutation,
  useGetBillingInfoQuery,
  useUpdateBillingAddressMutation,
  useUpdateDefaultAddressMutation,
} = billingInfoApi;
