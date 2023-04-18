import ApiBase from 'app/ApiBase';
// import { addMessage } from '../message/messageSlice';

const invoiceAPI = ApiBase.injectEndpoints({
  endpoints: (build) => ({
    getSubscriptionInvoice: build.query({
      query: () => `api/v1/invoice/subscription`,
      providesTags: ['subscriptionInvoice'],
    }),

    getInvoices: build.query({
      query: () => 'invoice',
    }),
  }),
});

export const { useGetSubscriptionInvoiceQuery } = invoiceAPI;
