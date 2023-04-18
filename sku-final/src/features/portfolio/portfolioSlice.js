import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  portfolios: [],
  isHideDetails: false,
  selectedPortfolio: {},
  target: {},
  IsSkuTransactionModeOn: false,
  targetedForTransaction: {},
  IsBrandDetailMode: false,
  targetedBrandForBrandDetail: '',
  IsCategoryDetailMode: false,
  targetCategoryForDetailView: '',
};

export const portfolioSlice = createSlice({
  name: 'Portfolio',
  initialState,
  reducers: {
    setPortfolio: (state, { payload }) => {
      state.portfolios = payload;
    },

    createNewPortfolio: (state, { payload }) => {
      state.portfolios.push(payload);
    },
    toggleDetailVisible: (state) => {
      state.isHideDetails = !state.isHideDetails;
    },
    setSelectedPortfolio: (state, { payload }) => {
      state.selectedPortfolio = payload;
    },
    setTargetPortfolioForAction: (state, { payload }) => {
      state.target = payload;
    },
    renamePortfolio: (state, { payload }) => {
      const find = state.portfolios.find((p) => p.name === payload.name);
      find.name = payload.newName;
    },
    deletePortfolio: (state, { payload }) => {
      const find = state.portfolios.find((p) => p.name === payload.name);
      const index = state.portfolios.indexOf(find);
      if (index > -1) {
        state.portfolios.splice(index, 1);
      }
    },
    toggleSkuTransactionMode: (state) => {
      state.IsSkuTransactionModeOn = !state.IsSkuTransactionModeOn;
    },
    targetSkuForTransaction: (state, { payload }) => {
      state.targetedForTransaction = payload;
    },
    toggleIsBrandDetailMode: (state) => {
      state.IsBrandDetailMode = !state.IsBrandDetailMode;
    },
    targetBrandForDetailView: (state, { payload }) => {
      state.targetedBrandForBrandDetail = payload;
    },
    toggleIsCategoryDetailMode: (state, { payload }) => {
      state.IsCategoryDetailMode = !state.IsCategoryDetailMode;
    },
    targetCategoryForDetailView: (state, { payload }) => {
      state.targetCategoryForDetailView = payload;
    },
  },
});

export const {
  createNewPortfolio,
  toggleDetailVisible,
  setSelectedPortfolio,
  setTargetPortfolioForAction,
  renamePortfolio,
  deletePortfolio,
  setPortfolio,
  toggleSkuTransactionMode,
  targetSkuForTransaction,
  toggleIsBrandDetailMode,
  targetBrandForDetailView,
  toggleIsCategoryDetailMode,
  targetCategoryForDetailView,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;

export const selectPortfolio = (state) => state.portfolios;
