// src/Slice/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Use /api in prod; fallback to localhost only for local dev
const API_BASE =
  (import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE.trim()) ||
  '/api';

export const apiSlice = createApi({
  reducerPath: 'my_api',
  baseQuery: fetchBaseQuery({
    // becomes "/api/v1/tours" in production
    baseUrl: `${API_BASE}/v1/tours`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getTours: builder.query({
      query: (filter) => ({ url: '/', params: filter }),
    }),
    getTourById: builder.query({
      query: (id) => `/${id}`,
    }),
    getTopTours: builder.query({
      query: () => '/top5-cheapTours',
    }),
  }),
});

export const {
  useGetToursQuery,
  useGetTopToursQuery,
  useGetTourByIdQuery,
} = apiSlice;
