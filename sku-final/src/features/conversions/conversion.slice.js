import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  activeConversation: null,
  conversations: [],
};

const slice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setActiveConversation(state, action) {
      state.activeConversation = action.payload;
    },
  },
});

export const { setActiveConversation } = slice.actions;

export default slice.reducer;

export const selectConversation = (state) => state.conversations;
