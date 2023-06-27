import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistReducer } from "redux-persist";

import globalSlice from "./globalSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
// };
// const persistedReducer = persistReducer(persistConfig, globalSlice);

export const store = configureStore({
  reducer: { global: globalSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
setupListeners(store.dispatch);
