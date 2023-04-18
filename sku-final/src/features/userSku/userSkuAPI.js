import ApiBase from 'app/ApiBase';
import { addMessage } from 'features/message/messageSlice';

export const userSkuAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    getUserSku: builder.query({
      query: (sku) => ({
        url: `/api/v1/userSku/${sku}`,
        method: 'GET',
      }),
    }),

    getUserSkus: builder.query({
      query: (query) => ({
        url: `/api/v1/userSku${query ? `?${query}` : ''}`,
        method: 'GET',
      }),
    }),

    storeCompetitors : builder.query({
      query: (query) => ({
        url: `/api/v1/userSku/competitors${query ? `?${query}` : ''}`,
        method: 'GET',
      }),
    }),

    getOpponentToBuyBox: builder.query({
      query: (query) => ({
        url: `/api/v1/userSku/opportunity${query ? `?${query}` : ''}`,
        method: 'GET',
      }),
    }),

    getTopBrandAndCategory: builder.query({
      query: (query) => ({
        url: `/api/v1/userSku/top${query ? `?${query}` : ''}`,
        method: 'GET',
      }),
    }),

    createUserSku: builder.mutation({
      query: (sku) => ({
        url: `/api/v1/userSku`,
        method: 'POST',
        body: sku,
      }),

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Updating...',
              type: 'info',
            })
          );

          await queryFulfilled;

          dispatch(
            addMessage({
              message: 'Update successful',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Login failed',
              type: 'error',
            })
          );
        }
      },
    }),

    updateUserSku: builder.mutation({
      query: (sku) => ({
        url: `/api/v1/userSku/${sku.sku}`,
        method: 'PUT',
        body: sku,
      }),
    }),

    deleteUserSku: builder.mutation({
      query: (sku) => ({
        url: `/api/v1/userSku/${sku.sku}`,
        method: 'DELETE',
      }),
    }),

    checkWatchlistForSku: builder.query({
      query: (id) => ({
        url: `/api/v1/userSku/isWatchListed/${id}`,
        method: 'GET',
      }),
      providesTags: ['WatchListDetail'],
    }),

    checkWatchlistForSkus: builder.query({
      query: (data) => ({
        url: `/api/v1/userSku/areWatchListed`,
        method: 'POST',
        body: data,
      }),
    }),

    checkAlertForSku: builder.query({
      query: (id) => ({
        url: `/api/v1/userSku/isAlerted/${id}`,
        method: 'GET',
      }),
      providesTags: ['Alert'],
    }),
  }),
});

export const {
  useCheckWatchlistForSkuQuery,
  useCheckWatchlistForSkusQuery,
  useGetUserSkuQuery,
  useGetUserSkusQuery,
  useCreateUserSkuMutation,
  useUpdateUserSkuMutation,
  useDeleteUserSkuMutation,
  useStoreCompetitorsQuery,
  useGetOpponentToBuyBoxQuery,
  useGetTopBrandAndCategoryQuery,
  useCheckAlertForSkuQuery
} = userSkuAPI;
