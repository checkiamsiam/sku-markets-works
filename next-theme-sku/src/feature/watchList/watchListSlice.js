import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    name: '',
};

export const watchListSlice = createSlice({
    name: 'watchList',
    initialState,
    reducers: {
        setWatchList: (state, { payload: { _id, name } }) => {
            state._id = _id;
            state.name = name;
        },
    },
});

export const { setWatchList, logout } = watchListSlice.actions;

export default watchListSlice.reducer;

export const selectWatchList = (state) => state.watchList;
