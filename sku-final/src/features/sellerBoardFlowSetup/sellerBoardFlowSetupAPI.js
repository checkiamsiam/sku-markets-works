import ApiBase from 'app/ApiBase';
import { addFlow } from './sellerBoardFlowSetupSlice';

export const sellerBoardFlowSetupAPI = ApiBase.injectEndpoints({
  endpoints: (builder) => ({
    getSellerBoardFlowSetup: builder.query({
      query: () => ({
        url: `/api/v1/sellerboard-flow-setup/`,
        method: 'GET',
      }),

      async onQueryStarted(query, { queryFulfilled, dispatch }) {
        try {
          const data = await queryFulfilled;
          dispatch(addFlow({ data: data?.data }));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetSellerBoardFlowSetupQuery } = sellerBoardFlowSetupAPI;
