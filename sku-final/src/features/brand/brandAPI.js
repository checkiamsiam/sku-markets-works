import ApiBase from 'app/ApiBase';

export const brandAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    brandAnalytics: builder.query({
      query: (brand) => ({
        url: `/api/v1/brand/${brand}`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        return response.data;
      },
    }),

    topBrands: builder.query({
      query: (query) => ({
        url: `/api/v1/brand/top?${query}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useBrandAnalyticsQuery, useTopBrandsQuery } = brandAPI;
