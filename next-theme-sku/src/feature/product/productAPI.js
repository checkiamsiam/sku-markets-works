import baseAPI from '../baseAPI';

export const productAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (query) => ({
        url: `/api/v1/product?${query}`,
        method: 'GET',
      }),

      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),

    getProductDetail: builder.query({
      query: (id) => ({
        url: `/api/v1/product/${id}`,
        method: 'GET',
      }),

      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.product;
      },
    }),

    getPrice: builder.query({
      query: (id) => ({
        url: `/api/v1/product/updatePrice/${id}`,
        method: 'GET',
      }),

      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.priceHistory;
      },
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductDetailQuery, useGetPriceQuery } = productAPI;
