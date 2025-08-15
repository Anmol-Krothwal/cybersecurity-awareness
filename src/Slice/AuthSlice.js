import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE =
  (import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE.trim()) || '/api';

export const AuthSlice = createApi({
  reducerPath: 'authapi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    credentials: 'include',
    prepareHeaders: (headers) => {
      if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (body) => ({ url: '/auth/signup', method: 'POST', body }),
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({ url: '/auth/forgotPassword', method: 'POST', body }),
    }),
    resetPassword: builder.mutation({
      query: ({ newPassword, confirmPassword, token }) => ({
        url: `/auth/resetPassword/${token}`,
        method: 'POST',
        body: { newPassword, confirmPassword },
      }),
    }),
    editUser: builder.mutation({
      query: ({ userId, field, val }) => ({
        url: `/auth/${userId}`,
        method: 'PATCH',
        body: { [field]: val },
      }),
    }),
  }),
});

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useEditUserMutation,
} = AuthSlice;
