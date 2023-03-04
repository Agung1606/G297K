import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    darkMode: true,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setDarkMode: (state) => {
            state.darkMode = state.darkMode ? false : true;
        },
        updateUserProfile: (state, action) => {
            state.user.profilePicturePath = action.payload.data
        },
        deleteUserProfile: (state) => {
            state.user.profilePicturePath = '';
        },
        updateUser: (state, action) => {
            state.user = action.payload.user;
        },
    },
});

export const { 
    setLogin,
    setLogout,
    setDarkMode,
    updateUserProfile,
    deleteUserProfile,
    updateUser
} = authSlice.actions;

export default authSlice.reducer;