import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  plans: [],
  lastPlan: {},
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscriptions: (state, { payload }) => {
      state.plans = payload.prev_plans;
      state.lastPlan = payload.lastPlan;
    },

    setLastPlan: (state, { payload }) => {
      state.lastPlan = {...payload, isCurrent: true };
    }

  },
});


export const { setSubscriptions, setLastPlan } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
