import ApiBase from 'app/ApiBase';

export const paymentAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    initializePayment: builder.mutation({
      query: (data) => ({
        url: '/api/v1/payment/initialize',
        method: 'POST',
        body: data,
      }),

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          window.location.href = data.postUrl;
        } catch (error) {
          console.log(error);
        }
      },
    }),

    verifyPayment: builder.mutation({
      query: (data) => ({
        url: '/api/v1/payment/verify',
        method: 'POST',
        body: data,
      }),
    }),

    getPayment: builder.query({
      query: (query) => ({
        url: `/api/v1/payment?${query}`,
        method: 'GET',
      }),

      // transformResponse(baseQueryReturnValue, meta, arg) {
      //   return baseQueryReturnValue.data;
      // },
    }),

    paymentUpdate: builder.mutation({
      query: (data) => ({
        url: `/api/v1/payment/response`,
        method: 'PATCH',
        body: data,
      }),
    }),

    paymentCancel: builder.mutation({
      query: (id) => ({
        url: `/api/v1/payment/cancel/${id}`,
        method: 'PATCH',
      }),
    }),

    paymentRemoveOrder: builder.mutation({
      query: (data) => ({
        url: `/api/v1/payment/remove`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useInitializePaymentMutation,
  useVerifyPaymentMutation,
  useGetPaymentQuery,
  usePaymentUpdateMutation,
  usePaymentCancelMutation,
  usePaymentRemoveOrderMutation,
} = paymentAPI;
