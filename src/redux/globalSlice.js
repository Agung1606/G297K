import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: null,
  userSearchHistory: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.token = null;
    },
    setUserSearchHistory: (state, action) => {
      state.userSearchHistory = action.payload;
    },
  },
});

export const { setLogin, setLogout, setUserSearchHistory } =
  globalSlice.actions;
export default globalSlice.reducer;
