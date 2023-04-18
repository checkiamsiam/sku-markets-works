import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  MCBKsSkuSaved: [],
  marketplacesSearched: [
    {
      id: 1,
      title: 'Amazon',
      type: 'Marketplace',
    },
    {
      id: 2,
      title: 'Noon/KSA',
      type: 'Marketplace',
    },
    {
      id: 3,
      title: 'Jumia/KSA',
      type: 'Marketplace',
    },
  ],
  categorySearched: [
    {
      id: 4,
      title: 'cloths',
      type: 'Category',
    },
    {
      id: 5,
      title: 'electronics',
      type: 'Category',
    },
    {
      id: 6,
      title: 'baby products',
      type: 'Category',
    },
  ],
  brandSearched: [
    {
      id: 7,
      title: 'Apple',
      type: 'Brand',
    },
    {
      id: 8,
      title: 'Microsoft',
      type: 'Brand',
    },
    {
      id: 9,
      title: 'Havit',
      type: 'Brand',
    },
  ],
  keywordSearched: [
    {
      id: 10,
      title: 'Top Ranked',
      type: 'Keyword',
    },
    {
      id: 11,
      title: 'Gainers',
      type: 'Keyword',
    },
    {
      id: 12,
      title: 'Best Sellers',
      type: 'Keyword',
    },
  ],
  SKUSearched: [
    {
      id: 13,
      sku: 'N3633846',
      title: 'Apple iPhone 12',
      type: 'sku',
      category: 'phones',
      img: 'https://images-na.ssl-images-amazon.com/images/I/71MHTD3uL4L._AC_SL1500_.jpg',
    },
    {
      id: 14,
      sku: 'N6338468A',
      type: 'sku',
      title: 'Nokia 6.1B',
      category: 'phones',
      img: 'https://images-na.ssl-images-amazon.com/images/I/71MHTD3uL4L._AC_SL1500_.jpg',
    },
    {
      id: 15,
      sku: 'N3633848A',
      type: 'sku',
      title: 'Galaxy S20 128GB',
      category: 'phones',
      img: 'https://images-na.ssl-images-amazon.com/images/I/71MHTD3uL4L._AC_SL1500_.jpg',
    },
  ],
};

export const adboardSetTarget = createSlice({
  name: 'AdboardSetTarget',
  initialState,
  reducers: {
    selectMCBKSKU: (state, { payload }) => {
      if (payload.type === 'Marketplace') {
        state.marketplacesSearched = state.marketplacesSearched.filter(
          (item) => item.id !== payload.id
        );
      }
      if (payload.type === 'Category') {
        state.categorySearched = state.categorySearched.filter((item) => item.id !== payload.id);
      }
      if (payload.type === 'Brand') {
        state.brandSearched = state.brandSearched.filter((item) => item.id !== payload.id);
      }
      if (payload.type === 'Keyword') {
        state.keywordSearched = state.keywordSearched.filter((item) => item.id !== payload.id);
      }

      if (payload.type === 'sku') {
        state.SKUSearched = state.SKUSearched.filter((item) => item.id !== payload.id);
      }

      state.MCBKsSkuSaved.push(payload);
    },
    DeSelectMCBKSKU: (state, { payload }) => {
      if (payload.type === 'Marketplace') {
        state.marketplacesSearched.push(payload);
      }
      if (payload.type === 'Category') {
        state.categorySearched.push(payload);
      }
      if (payload.type === 'Brand') {
        state.brandSearched.push(payload);
      }
      if (payload.type === 'Keyword') {
        state.keywordSearched.push(payload);
      }

      if (payload.type === 'sku') {
        state.SKUSearched.push(payload);
      }

      state.MCBKsSkuSaved = state.MCBKsSkuSaved.filter((item) => item.id !== payload.id);
    },
  },
});

export const { selectMCBKSKU, DeSelectMCBKSKU } = adboardSetTarget.actions;

export default adboardSetTarget.reducer;
