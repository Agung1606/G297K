import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: 16,
    username: "agngsptra._",
    name: "agung saputra",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/groak-f947e.appspot.com/o/assets%2F4d789760-c2c5-44bb-8eb5-92998cf6d683.jpeg?alt=media&token=cf3ba06e-4112-489c-b683-fce653532280",
    followers: "1,573",
    following: "231",
    bio: "🇮🇩Secukupnya🌻",
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {}
});

export default globalSlice.reducer;