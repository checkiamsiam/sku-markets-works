import ApiBase from 'app/ApiBase';
export const orderAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: `/api/v1/order/create`,
        method: 'POST',
        body: data,
      }),
    }),
    getAllOrders: builder.query({
      query: (query) => ({
        url: `/api/v1/order/getAll?${query}`,
        method: 'GET',
      }),
    }),
    getSellerOrBuyer: builder.query({
      query: (query) => ({
        url: `/api/v1/auth/user?${query}`,
        method: 'GET',
      }),
    }),
    updateOrder: builder.mutation({
      query: (data) => ({
        url: `api/v1/order/update/${data.id}`,
        method: 'PATCH',
        body: data.reviewOrder,
      }),
    }),
  getOrderById:builder.query({
    query:(id)=>({
      url:`api/v1/order/getOrder/${id}`,
      method:'GET'
    })
  })
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetSellerOrBuyerQuery,
  useUpdateOrderMutation,
  useGetOrderByIdQuery
} = orderAPI;
