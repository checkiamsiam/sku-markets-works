import ApiBase from 'app/ApiBase';

export const storeAPI = ApiBase.injectEndpoints({
    endpoints: (builder) => ({
        getAllStores: builder.query({
            query: (query) => ({
                url: `/api/v1/store/product/${query}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetAllStoresQuery } = storeAPI;
