// src/Store.js
import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from './Slice/AuthSlice';   // named import
import { apiSlice } from './Slice/apiSlice';     // named import
// If you have a user reducer, keep it; otherwise remove this line
// import userReducer from './Slice/userSlice';

export const store = configureStore({
  reducer: {
    [AuthSlice.reducerPath]: AuthSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    // user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthSlice.middleware, apiSlice.middleware),
});
