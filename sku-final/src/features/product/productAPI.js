import ApiBase from 'app/ApiBase';

export const productAPI = ApiBase.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (query) => ({
                url: `/api/v1/product?${query}`,
                method: 'GET',
            }),
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

        searchProduct: builder.query({
            query: (query) => ({
                url: `/api/v1/product/search?${query}`,
                method: 'GET',
            }),

            transformResponse(baseQueryReturnValue, meta, arg) {
                return baseQueryReturnValue.data;
            },
        }),

        getSellerProduct: builder.query({
            query: (id) => ({
              url: `/api/v1/sellerproduct/${id}`,
              method: 'GET',
            }),
            transformResponse(baseQueryReturnValue, meta, arg) {
              return baseQueryReturnValue.data;
            },
          }),
          
        getAllSellerProducts: builder.query({
            query: (query) => ({
              url: `/api/v1/product/allSellerProducts?${query}`,
              method: 'GET',
            }),
          }),

        getAllProductSellers: builder.query({
            query: (id) => ({
              url: `/api/v1/product/allProductSellers/${id}`,
              method: 'GET',
            }),
          }),

        getAllCategoriesWithProducts: builder.query({
            query: (query) => ({
              url: `/api/v1/product/allCategoriesWithProducts?${query}`,
              method: 'GET',
            }),
          }),

        getAllCategoryTypesWithProducts: builder.query({
            query: (query) => ({
              url: `/api/v1/product/allCategoryTypesWithProducts?${query}`,
              method: 'GET',
            }),
          }),

        getAllCategories: builder.query({
            query: () => ({
              url: `/api/v1/product/allCategories`,
              method: 'GET',
            }),
          }),          

        allSpecifiedProducts: builder.query({
            query: (data) => ({
              url: `/api/v1/product/allSpecifiedProducts`,
              method: 'POST',
              body: data
            }),
          }), 

        allSearchedProducts: builder.query({
            query: (query) => ({
              url: `/api/v1/product/allSearchedProducts?${query}`,
              method: 'GET',
            }),
          }), 

        getPartnerSkuById: builder.query({
          query: (id) => ({
            url: `/api/v1/product/partnerSKU/${id}`,
            method: 'GET',
          }),          
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

        productSummary: builder.query({
            query: () => ({
                url: `/api/v1/product/summary`,
                method: 'GET',
            }),

            transformResponse: (res) => res.data,
        }),
    }),
});

export const {
    useAllSpecifiedProductsQuery,
    useGetAllProductsQuery,
    useGetProductDetailQuery,
    useGetPriceQuery,
    useSearchProductQuery,
    useGetSellerProductQuery,
    useGetAllSellerProductsQuery,
    useGetAllProductSellersQuery,
    useGetAllCategoriesWithProductsQuery,
    useGetAllCategoryTypesWithProductsQuery,
    useGetAllCategoriesQuery,
    useGetPartnerSkuByIdQuery,
    useAllSearchedProductsQuery,
    useProductSummaryQuery,
} = productAPI;
