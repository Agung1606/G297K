import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  token: null,
  userSearchHistory: [],
};

/*
  user = {
    id: string,
    email: string,
    username: string,
    name: string,
    profile: string,
    followers: string,
    following: string,
    bio: string,
  }
*/

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
    setUpdateUser: (state, action) => {
      state.user.name = action.payload.name;
      state.user.username = action.payload.username;
      state.user.bio = action.payload.bio;
      if(action.payload.newProfile) {
        state.user.profile = action.payload.newProfile
      }
    },
  },
});

export const { setLogin, setLogout, setUserSearchHistory, setUpdateUser } =
  globalSlice.actions;
export default globalSlice.reducer;
