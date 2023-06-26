import { createSlice } from "@reduxjs/toolkit";

// user: {
//   id: 16,
//   username: "agngsptra._",
//   name: "Agung Saputra",
//   profile:
//     "https://firebasestorage.googleapis.com/v0/b/groak-f947e.appspot.com/o/assets%2F4d789760-c2c5-44bb-8eb5-92998cf6d683.jpeg?alt=media&token=cf3ba06e-4112-489c-b683-fce653532280",
//   followers: "601JT",
//   following: "1,231",
//   bio: `just a little boy who dont't know anything about love`
// },
const initialState = {
  user: null,
  token: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setLogin } = globalSlice.actions;
export default globalSlice.reducer;
