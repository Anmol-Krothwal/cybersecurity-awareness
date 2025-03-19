import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './Slice/apiSlice'
import { AuthSlice } from './Slice/AuthSlice'
import userReducer from "./Slice/userSlice"

// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [AuthSlice.reducerPath]: AuthSlice.reducer,
    user: userReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware,AuthSlice.middleware)
})

