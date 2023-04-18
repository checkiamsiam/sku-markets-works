import ApiBase from 'app/ApiBase';

export const searchHistoryAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    addKeywordAnalytics: builder.mutation({
      query: (data) => ({
        url: '/api/v1/keyword-search-analytics/',
        method: 'POST',
        body: data,
      }),
    }),

    addUserHistory: builder.mutation({
      query: (data) => ({
        url: '/api/v1/user-history/',
        method: 'POST',
        body: data,
      }),
    }),

    getUserHistory: builder.query({
      query: (query) => ({
        url: `/api/v1/user-history?${query}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useAddKeywordAnalyticsMutation, useAddUserHistoryMutation, useGetUserHistoryQuery } =
  searchHistoryAPI;
