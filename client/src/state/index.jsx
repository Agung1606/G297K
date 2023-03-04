import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { api } from './api';

const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    }).concat(api.middleware)
});
setupListeners(store.dispatch);