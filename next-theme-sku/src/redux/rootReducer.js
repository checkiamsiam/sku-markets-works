import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import authSlice from '../feature/auth/authSlice';
// slices

import baseAPI from '../feature/baseAPI';
import messageSlice from '../feature/message/messageSlice';
import pricingSlice from '../feature/pricing/pricingSlice';
import watchListSlice from '../feature/watchList/watchListSlice';
import calendarReducer from './slices/calendar';
import chatReducer from './slices/chat';
import kanbanReducer from './slices/kanban';
import mailReducer from './slices/mail';
import productReducer from './slices/product';

// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  user: authSlice,
  message: messageSlice,
  pricing: pricingSlice,
  watchList: watchListSlice,
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  [baseAPI.reducerPath]: baseAPI.reducer,
});

export default rootReducer;
