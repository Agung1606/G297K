import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: 16,
    username: "agngsptra._",
    name: "agung saputra",
    followers: 1000,
    following: 231
  }
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {}
});

export default globalSlice.reducer;