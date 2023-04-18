import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { config } from 'config';
import { logout } from 'features/auth/authSlice';
import { removeInfo } from 'features/billingInfo/billingInfoSlice';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://sku-markets.herokuapp.com'
    : 'https://node-vercel-sooty.vercel.app';

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// create a new mutex
const mutex = new Mutex();

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // const refreshResult = await baseQuery('/refreshToken', api, extraOptions);
        // if (refreshResult.data) {
        //     api.dispatch(tokenReceived(refreshResult.data));
        //     // retry the initial query
        //     result = await baseQuery(args, api, extraOptions);
        // } else {
        //     api.dispatch(loggedOut());
        // }

        api.dispatch(logout());
        api.dispatch(removeInfo());
      } catch (e) {
        console.log(e);
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

const ApiBase = createApi({
  tagTypes: ['WatchList', 'PortFolio'],
  baseQuery: baseQueryWithReauth,
  reducerPath: 'API',
  endpoints: () => ({}),
});

export default ApiBase;
