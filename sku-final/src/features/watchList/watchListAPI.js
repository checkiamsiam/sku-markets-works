import ApiBase from 'app/ApiBase';
import { addMessage } from 'features/message/messageSlice';

export const watchListAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    getAllWatchLists: builder.query({
      query: (query) => ({
        url: `/api/v1/watchList`,
        method: 'GET',
      }),

      // providesTags: (result, error, arg) => [
      //     { type: 'WatchList', id: 'LIST' },
      // ],

      providesTags: ['WatchList'],

      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.data;
      },
    }),

    getWatchListDetail: builder.query({
      query: (q) => ({
        url: `/api/v1/watchList/${q}`,
        method: 'GET',
      }),

      // providesTags: (result, error, arg) => [{ type: 'WatchListDetail', id: arg.id }],
      providesTags: ['WatchListDetail'],
    }),

    createWatchList: builder.mutation({
      query: (body) => ({
        url: `/api/v1/watchList`,
        method: 'POST',
        body,
      }),

      // invalidatesTags: ['WatchList'],

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            addMessage({
              message: 'Create watch list successful',
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

      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.watchList;
      },
    }),

    deleteWatchList: builder.mutation({
      query: (id) => ({
        url: `/api/v1/watchList/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['WatchList', 'WatchListDetail'],

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            addMessage({
              message: 'Delete watch list successful',
              type: 'success',
            })
          );
        } catch (error) {
          let message = error?.error?.data?.message || 'Delete failed';

          dispatch(
            addMessage({
              message,
              type: 'error',
            })
          );
        }
      },
    }),

    addProductInWatchList: builder.mutation({
      query: (body) => ({
        url: `/api/v1/watchList/${body.watchList}/product/${body.product}`,
        method: 'PUT',
      }),

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
              message: 'SKU added to watchlist successfully',
              type: 'success',
            })
          );
        } catch (error) {
          let message = error?.error?.data?.message || 'Update watch list failed';

          // error start with Duplicate field value set message to email already exists
          if (message.startsWith('Duplicate')) {
            message = 'watch list name already exists';
          }

          dispatch(
            addMessage({
              message,
              type: 'error',
            })
          );
        }
      },

      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.watchList;
      },

      // transformRequest(body, meta) {
      //     return {
      //         ...body,
      //     };
      // },

      invalidatesTags: ['WatchListDetail'],

      // providesTags: (result, error, arg) => [
      //     { type: 'WatchList', id: arg.id },
      // ],

      // onCacheEntryAdded: (
      //     arg,
      //     { cacheDataLoaded, cacheEntryRemoved }
      // ) => {
      //     if (cacheDataLoaded) {
      //         cacheEntryRemoved();
      //     }
      // },

      // onCacheEntryRemoved: (arg, { cacheDataLoaded }) => {
      //     if (cacheDataLoaded) {
      //         cacheDataLoaded();
      //     }
      // },

      // onCacheEntryModified: (arg, { cacheDataLoaded }) => {
      //     if (cacheDataLoaded) {
      //         cacheDataLoaded();
      //     }
      // },
    }),

    removeProductInWatchList: builder.mutation({
      query: (query) => ({
        url: `/api/v1/watchList/${query}`,
        method: 'DELETE',
      }),

      // invalidatesTags: (result, error, arg) => [
      //     { type: 'WatchList', id: arg.watchList },
      //     { type: 'WatchListDetail', id: arg.watchList },
      // ],

      invalidatesTags: ['WatchListDetail'],

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          dispatch(
            addMessage({
              message: 'Deleting watch list item...',
              type: 'info',
            })
          );

          await queryFulfilled;

          dispatch(
            addMessage({
              message: 'Update watch list successful',
              type: 'success',
            })
          );
        } catch (error) {
          let message = error?.error?.data?.message || 'Update watch list failed';

          // error start with Duplicate field value set message to email already exists
          if (message.startsWith('Duplicate')) {
            message = 'watch list name already exists';
          }

          dispatch(
            addMessage({
              message,
              type: 'error',
            })
          );
        }
      },
    }),

    updateWatchListName: builder.mutation({
      query: (body) => ({
        url: `/api/v1/watchList/${body.id}`,
        method: 'PUT',
        body,
      }),

      invalidatesTags: ['WatchList'],

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(
            addMessage({
              message: 'Update watch list successful',
              type: 'success',
            })
          );
        } catch (error) {
          let message = error?.error?.data?.message || 'Update watch list failed';

          // error start with Duplicate field value set message to email already exists
          if (message.startsWith('Duplicate')) {
            message = 'watch list name already exists';
          }

          dispatch(
            addMessage({
              message,
              type: 'error',
            })
          );
        }
      },

      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.watchList;
      },
    }),
  }),
});

export const {
  useGetAllWatchListsQuery,
  useGetWatchListDetailQuery,
  useCreateWatchListMutation,
  useDeleteWatchListMutation,
  useAddProductInWatchListMutation,
  useRemoveProductInWatchListMutation,
  useUpdateWatchListNameMutation,
} = watchListAPI;

export const watchListReducer = watchListAPI.reducer;

export const watchListMiddleware = watchListAPI.middleware;

export const watchListReducerPath = watchListAPI.reducerPath;

export const watchListQueryHooks = watchListAPI.queryHooks;

export const watchListMutationHooks = watchListAPI.mutationHooks;

export const watchListQuerySelectors = watchListAPI.querySelectors;

export const watchListMutationSelectors = watchListAPI.mutationSelectors;
