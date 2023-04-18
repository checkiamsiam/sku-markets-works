const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  plan: '',
  title: '',
  currency: 'SAR',
  price: 0,
  qty: 1,
  vatTax: 0,
  subTotal: 0,
  total: 0,
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    selectPlan: (state, { payload }) => {
      state.plan = payload.plan;
      state.title = payload.title;
      state.currency = payload.currency;
      state.price = payload.price;
      state.qty = payload.qty;
      state.subTotal = payload.price * payload.qty;
      state.vatTax = payload.price * payload.qty * 0.15;
      state.total = payload.price * payload.qty + payload.price * payload.qty * 0.15;
    },

    clearPlan: (state) => {
      state.plan = '';
      state.title = '';
      state.currency = 'SAR';
      state.price = 0;
      state.qty = 1;
      state.subTotal = 0;
      state.vatTax = 0;
      state.total = 0;
      state.cryptoChargeId = "";
    },

    updateCryptoChargeId: (state, { payload }) => {
      state.cryptoChargeId = payload.chargeId;
    },
  },
});

export const { selectPlan, clearPlan, updateCryptoChargeId } =
  planSlice.actions;

export default planSlice.reducer;

export const selectCurrentPlan = (state) => state.plan;
