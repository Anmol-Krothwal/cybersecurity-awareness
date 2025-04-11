// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURL = 'http://localhost:5000/api/v1/tours';

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: 'my_api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  endpoints: builder => ({
    getTours: builder.query({
      query: (filter) => ({
        url: '/',
        params: filter,
      })
    }),
    getTourById: builder.query({
      query: (id) => `/${id}`
    }),
    getTopTours: builder.query({
      query: () => '/top5-cheapTours'
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetToursQuery, useGetTopToursQuery, useGetTourByIdQuery } = apiSlice