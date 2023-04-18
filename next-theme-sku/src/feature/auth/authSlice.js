import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    name: '',
    email: '',
    role: '',
    avatar: '',
    token: '',
    createdAt: '',
};

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload: { user } }) => {
            state._id = user._id;
            state.name = user.name;
            state.email = user.email;
            state.role = user.role;
            state.avatar = user.avatar;
            state.createdAt = user.createdAt;

            if (user.token) {
                state.token = user.token;
                localStorage.setItem('token', user.token);
            }
        },
        logout: (state) => {
            state.id = '';
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.role = '';
            state.avatar = '';
            state.token = '';
            localStorage.removeItem('token');
        },
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state) => state.user;
