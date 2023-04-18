import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  IsTransactionModeOn: false,
  targetedSKUForTransaction: {},
};

export const alertSlice = createSlice({
  name: 'Alert',
  initialState,
  reducers: {
    toggleTransInAlert: (state) => {
      state.IsTransactionModeOn = !state.IsTransactionModeOn;
    },
    targetSkuForTransaction: (state, { payload }) => {
      state.targetedSKUForTransaction = payload;
    }
  },
});

export const {targetSkuForTransaction , toggleTransInAlert} = alertSlice.actions;

export default alertSlice.reducer;
