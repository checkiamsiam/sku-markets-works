const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  addresses: [],
  activeAddress: {},
  defaultAddress: '',
};

const billingInfoSlice = createSlice({
  name: 'billingInfo',
  initialState,
  reducers: {
    addBillingInfo: (state, { payload }) => {
      state.addresses.push(payload.address);
      state.defaultAddress = payload.defaultAddress;
      state.activeAddress = {};
    },
    setBillingInfo: (state, { payload }) => {
      state.addresses = payload.addresses;
      state.defaultAddress = payload.defaultAddress;
      state.activeAddress = {};
    },
    setActiveAddress: (state, { payload }) => {
      state.activeAddress = payload;
    },
    updateBillingInfo: (state, { payload }) => {
      const item = state.addresses.find((address) => address._id === payload._id);
      const newDefault = payload._id === state.defaultAddress ? "" : state.defaultAddress;
      item.title = payload.title;
      item.email = payload.email;
      item.phone = payload.phone;
      item.address = payload.address;
      item.city = payload.city;
      item.state = payload.state;
      item.country = payload.country;
      item.zipCode = payload.zipCode;
      item.location = payload?.location;
      item.isApproved = payload?.isApproved || false;
      state.defaultAddress = newDefault;
    },
    removeInfo : (state) => {
      state.addresses = [];
      state.defaultAddress = "";
      state.activeAddress = {};
    },
    setDefaultAddress : (state, {payload}) => {
      state.defaultAddress = payload;
    },

  },
});

export const {
  addBillingInfo,
  setBillingInfo,
  setActiveAddress,
  updateBillingInfo,
  removeInfo,
  setDefaultAddress,
} = billingInfoSlice.actions;

export default billingInfoSlice.reducer;
