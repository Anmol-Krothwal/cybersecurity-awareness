// Import the RTK Query methods from the React-specific entry point 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ResetPassword from '../Pages/ResetPassword';

// ✅ Updated baseURL to match your backend route
const baseURL = 'http://localhost:5000/api/auth';

// Define our single API slice object
export const AuthSlice = createApi({
  reducerPath: 'authapi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  endpoints: builder => ({
    signupUser: builder.mutation({
      query: (newuser_data) => ({
        url: '/signup',
        method: 'POST',
        body: newuser_data,
      }),
    }),
    loginUser: builder.mutation({
      query: (login_data) => ({
        url: '/login',
        method: 'POST',
        body: login_data,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: '/forgotPassword',
        method: 'POST',
        body: email,
      }),
    }),
    ResetPassword: builder.mutation({
      query: ({ newPassword, confirmPassword, token }) => ({
        url: `/resetPassword/${token}`,
        method: 'POST',
        body: { newPassword, confirmPassword },
      }),
    }),
    editUser: builder.mutation({
      query: ({ userId, field, val }) => ({
        url: `/${userId}`,
        method: 'PATCH',
        body: { [field]: val },
      }),
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useEditUserMutation,
} = AuthSlice;
