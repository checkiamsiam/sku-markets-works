import { combineReducers, configureStore } from '@reduxjs/toolkit';
import adboardSlice from 'features/adboard/adboardSlice';
import adboardTargetSlice from 'features/adboard/AdsTarget/AdsTargetSlice';
import alertSlice from 'features/alert/alertSlice';
import authSlice from 'features/auth/authSlice';
import billingInfoSlice from 'features/billingInfo/billingInfoSlice';
import chat from 'features/chat/chat';
import messageSlice from 'features/message/messageSlice';
import planSlice from 'features/plan/planSlice';
import portfolioSlice from 'features/portfolio/portfolioSlice';
import pricingSlice from 'features/pricing/pricingSlice';
import sellerBoardFlowSetupSlice from 'features/sellerBoardFlowSetup/sellerBoardFlowSetupSlice';
import shipmentSlice from 'features/shipment/shipmentSlice';
import subscriptionSlice from 'features/subscription/subscriptionSlice';
import watchListSlice from 'features/watchList/watchListSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import ApiBase from './ApiBase';

const rootReducer = combineReducers({
  user: authSlice,
  message: messageSlice,
  billingInfo: billingInfoSlice,
  pricing: pricingSlice,
  watchList: watchListSlice,
  portfolios: portfolioSlice,
  alertState: alertSlice,
  plan: planSlice,
  chat: chat,
  adboard: adboardSlice,
  adBoardControl: adboardTargetSlice,
  sellerBoardFlowSetup: sellerBoardFlowSetupSlice,
  shipment: shipmentSlice,
  subscription: subscriptionSlice,
  [ApiBase.reducerPath]: ApiBase.reducer,
});

const secretKey =
  process.env.REACT_APP_SECRET_KEY ||
  'my-super-secret-key-which-is-very-long-so-that-it-will-be-hard-for-anyone-to-guess-it';

const persistConfig = {
  key: 'sku-markets',
  version: 1,
  storage,
  whitelist: [
    'user',
    'auth',
    'menu',
    'plan',
    'chat',
    'degree',
    'contact',
    'address',
    'PortFolio',
    'billingInfo',
    'singleAlert',
    'Conversations',
    'PortFolioTableData',
    'subscription',
  ],
  transforms: [
    encryptTransform({
      secretKey,
      onError: (error) => {
        console.error(error);
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(ApiBase.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
