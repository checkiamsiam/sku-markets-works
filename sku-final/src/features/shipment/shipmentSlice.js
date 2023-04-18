import { createSlice } from '@reduxjs/toolkit';

// create initial state
const initialState = {
  items: [],
};

// create a slice of state for the shipment feature
export const shipmentSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {
    // add a new shipment to the state
    addShipmentItems: (state, { payload }) => {
      state.items = payload.data;
    },
    reduceShipmentQuantity: (state, { payload }) => {
      const idx = state.items?.findIndex(({ orderNo }) => orderNo._id == payload.id);
      state.items[idx].deductedQty += 1;
    },
    removeShipmentItem: (state, { payload }) => {
      state.items = state.items?.filter(({ orderNo }) => orderNo._id != payload.id);
    },
  },
});

// export the actions
export const { addShipmentItems, reduceShipmentQuantity, removeShipmentItem } = shipmentSlice.actions;

// select the shipment from the state
export const selectShipment = (state) => state.shipment;

// export the reducer
export default shipmentSlice.reducer;
