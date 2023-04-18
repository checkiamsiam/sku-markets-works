import ApiBase from 'app/ApiBase';
import axios from 'axios';
import { addMessage } from 'features/message/messageSlice';
import { setPortfolio, setSelectedPortfolio } from './portfolioSlice';

export const userSkuAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    bulkUploadUPortfolioSku: builder.mutation({
      query: (data) => ({
        url: `/api/v1/portfolio/product/bulk`,
        method: 'POST',
        body: data,
      }),

      onQueryStarted: async (
        args,
        { dispatch, queryFulfilled, queryStarted, queryFailed, updateQueryData }
      ) => {
        try {
          await queryFulfilled;

          dispatch(
            addMessage({
              message:
                'Your SKU has been uploaded successfully All SKUs will be available in 72 hours',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error.message || 'Something went wrong',
              type: 'error',
            })
          );
        }
        // try {
        //   queryStarted(args);
        //   const response = await fetch(args.endpoint.query.url, {
        //     method: args.endpoint.query.method,
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(args.endpoint.query.body),
        //   });
        //   const data = await response.json();
        //   queryFulfilled(args, data);
        // } catch (error) {
        //   queryFailed(args, error);
        // }
      },
    }),

    createPortfolio: builder.mutation({
      query: (data) => ({
        url: `/api/v1/portfolio`,
        method: 'POST',
        body: data,
      }),

      invalidatesTags: ['PortFolio'],

      onQueryStarted: async (
        args,
        { dispatch, queryFulfilled, queryStarted, queryFailed, updateQueryData }
      ) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setSelectedPortfolio(data.data));

          dispatch(
            addMessage({
              message: 'Portfolio created successfully',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error.message || 'Something went wrong',
              type: 'error',
            })
          );
        }
      },
    }),

    getPortFolio: builder.query({
      query: () => ({
        url: `/api/v1/portfolio`,
        method: 'GET',
      }),

      providesTags: ['PortFolio'],

      transformResponse: (response) => {
        return response.data;
      },

      onQueryStarted: async (
        args,
        { dispatch, getState, queryFulfilled, queryStarted, queryFailed, updateQueryData }
      ) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setPortfolio(data));

          const selectedPortfolio = getState().portfolios.selectedPortfolio;
          const token = getState().user.token;

          if (!selectedPortfolio?.store_id && data.length) {
            const { data: detailData } = await axios.get(
              `https://sku-markets.herokuapp.com/api/v1/portfolio/${data[0]?.store_id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            dispatch(setSelectedPortfolio({ ...data[0], store_products: detailData?.data }));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getPortFolioById: builder.query({
      query: (id) => ({
        url: `/api/v1/portfolio/${id}`,
        method: 'GET',
      }),
    }),

    getPortFolioTableData: builder.query({
      query: (query) => ({
        url: `/api/v1/portfolio/${query}`,
        method: 'GET',
      }),

      providesTags: ['PortFolioTableData'],
    }),

    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `/api/v1/portfolio/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['PortFolio'],

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            addMessage({
              message: 'Portfolio deleted successfully',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Something went wrong',
              type: 'error',
            })
          );
        }
      },
    }),

    addProductToPortfolio: builder.mutation({
      query: (data) => ({
        url: '/api/v1/portfolio/product',
        method: 'POST',
        body: data,
      }),

      invalidatesTags: ['PortFolioTableData'],

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            addMessage({
              message: 'Product added to portfolio successfully',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Something went wrong',
              type: 'error',
            })
          );
        }
      },
    }),
    removeProductFromPortfolio: builder.mutation({
      query: (data) => ({
        url: '/api/v1/portfolio/product',
        method: 'DELETE',
        body: data,
      }),

      invalidatesTags: ['PortFolioTableData'],

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(
            addMessage({
              message: 'Product remove to portfolio successfully',
              type: 'success',
            })
          );
        } catch (error) {
          dispatch(
            addMessage({
              message: error?.error?.data?.message || error.message || 'Something went wrong',
              type: 'error',
            })
          );
        }
      },
    }),
  }),
});

export const {
  useGetPortFolioQuery,
  useGetPortFolioByIdQuery,
  useDeletePortfolioMutation,
  useCreatePortfolioMutation,
  useGetPortFolioTableDataQuery,
  useBulkUploadUPortfolioSkuMutation,
  useAddProductToPortfolioMutation,
  useRemoveProductFromPortfolioMutation,
} = userSkuAPI;
