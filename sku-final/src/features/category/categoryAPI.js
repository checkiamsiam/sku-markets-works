import ApiBase from 'app/ApiBase';

export const categoryAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    categoryAnalytics: builder.query({
      query: (query) => ({
        url: `/api/v1/category/analytics?${query}`,
        method: 'GET',
      }),
    }),

    analyticsByCategory: builder.query({
      query: (category) => ({
        url: `/api/v1/category/${category}`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),

    categoryAnalyticsByMP: builder.query({
      query: (query) => ({
        url: `/api/v1/category?${query}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCategoryAnalyticsByMPQuery,
  useAnalyticsByCategoryQuery,
  useCategoryAnalyticsQuery,
} = categoryAPI;
