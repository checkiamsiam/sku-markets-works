import { createSlice } from '@reduxjs/toolkit';

// create initial state
const initialState = {
  flow: null,
};

// create a slice of state for the sellerBoardFlowSetup feature
export const sellerBoardFlowSetupSlice = createSlice({
  name: 'sellerBoardFlowSetup',
  initialState,
  reducers: {
    // add a new sellerBoardFlowSetup to the state
    addFlow: (state, { payload }) => {
      state.flow = payload.data;
    },
  },
});

// export the actions
export const { addFlow } = sellerBoardFlowSetupSlice.actions;

// select the sellerBoardFlowSetup from the state
export const selectSellerBoardFlow = (state) => state.sellerBoardFlowSetup;

// export the reducer
export default sellerBoardFlowSetupSlice.reducer;
