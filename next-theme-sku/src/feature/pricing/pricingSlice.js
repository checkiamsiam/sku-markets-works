import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    package: '',
    monthly: true,
};

export const pricingSlice = createSlice({
    name: 'Pricing',
    initialState,
    reducers: {
        setPackage: (state, { payload }) => {
            state.package = payload.package;
        },
        setMonthly: (state, { payload }) => {
            state.monthly = payload.monthly;
        },
    },
});

export const { setUser, setPackage, setMonthly } = pricingSlice.actions;

export default pricingSlice.reducer;

export const selectPricing = (state) => state.pricing;
