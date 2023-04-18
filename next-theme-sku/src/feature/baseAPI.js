import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://sku-markets.herokuapp.com'
    : 'http://localhost:3333';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://sku-markets.herokuapp.com',
  prepareHeaders: (headers, { getState }) => {
    const { token = {} } = getState().user;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseAPI = createApi({
  baseQuery,
  reducerPath: 'API',
  tagTypes: ['WatchList'],
  endpoints: (builder) => ({}),
});

export default baseAPI;
