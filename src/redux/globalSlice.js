import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: 16,
    username: "agngsptra._",
    name: "agung saputra",
    profile:
      "https://firebasestorage.googleapis.com/v0/b/groak-f947e.appspot.com/o/assets%2F4d789760-c2c5-44bb-8eb5-92998cf6d683.jpeg?alt=media&token=cf3ba06e-4112-489c-b683-fce653532280",
    followers: "16.3K",
    following: "1,231",
    bio: "Sed id congue urna, nec venenatis metus. Maecenas vel tincidunt ipsum. Curabitur lacinia nulla nec nibh venenatis elementum. Integer sed justo pulvinar, finibus metus id, auctor lacus. Vivamus sit amet orci in neque pharetra feugiat nec sit amet ex. Nunc volutpat metus ut ex suscipit, a lacinia mi faucibus. Curabitur maximus orci vel lectus mattis fermentum. Donec vitae nunc elit. Sed sed fermentum lacus. Nulla facilisi. Quisque suscipit nisl eget lacus bibendum aliquam.",
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {}
});

export default globalSlice.reducer;