import { createSlice } from '@reduxjs/toolkit';

// create initial state
const initialState = {
    message: null,
    type: 'success',
    skip: false,
};

// create a slice of state for the message feature
export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        // add a new message to the state
        addMessage: (state, { payload }) => {
            state.message = payload.message;
            state.type = payload.type;
            if (payload.skip) {
                state.skip = payload.skip;
            }
        },

        // clear the message from the state
        clearMessage: (state) => {
            state.message = null;
            state.skip = false;
        },
    },
});

// export the actions
export const { addMessage, clearMessage } = messageSlice.actions;

// select the message from the state
export const selectMessage = (state) => state.message;

// export the reducer
export default messageSlice.reducer;
