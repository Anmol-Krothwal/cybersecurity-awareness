// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURL = 'http://localhost:5000/api/v1/';

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: 'my_api',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: builder => ({
    getTours: builder.query({
      query: () => '/tours'
    }),
    getTopTours: builder.query({
      query: () => '/tours/top5-cheapTours'
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetToursQuery, useGetTopToursQuery } = apiSlice