import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addCampaignMode: false,
  addGroupMode: false,
  adsSettingsMode: false,
};

export const adboardSlice = createSlice({
  name: 'Adboard',
  initialState,
  reducers: {
    toggleCampaignMode: (state) => {
      state.addCampaignMode = !state.addCampaignMode;
      state.addGroupMode = false;
      state.adsSettingsMode = false;
    },
    toggleGroupMode: (state) => {
      state.addGroupMode = !state.addGroupMode;
      state.addCampaignMode = false;
      state.adsSettingsMode = false;
    },
    toggleAdsSettingsMode: (state) => {
      state.adsSettingsMode = !state.adsSettingsMode;
      state.addCampaignMode = false;
      state.addGroupMode = false;
    },
  },
});

export const { toggleCampaignMode, toggleGroupMode, toggleAdsSettingsMode } = adboardSlice.actions;

export default adboardSlice.reducer;
