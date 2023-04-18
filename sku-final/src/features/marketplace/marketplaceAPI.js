import ApiBase from 'app/ApiBase';

export const marketplaceAPI = ApiBase.injectEndpoints({
    endpoints: (builder) => ({
        analyticsByMarketplace: builder.query({
            query: (mp) => `/api/v1/marketplace/${mp}/analytics`,
            transformResponse: (response) => response.data,
        }),
        marketplaceAnalytics: builder.query({
            query: (q) => `/api/v1/marketplace/analytics?${q}`,
        }),
    }),
});

export const { useAnalyticsByMarketplaceQuery, useMarketplaceAnalyticsQuery } = marketplaceAPI;
