import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create an API slice
const apiSlice = createApi({
  reducerPath: 'api',  // Name of the slice (can be anything)
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),  // Base URL of the API
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos',  
    }),
  }),
});

export const { useGetTodosQuery } = apiSlice; // Hook to use this API query in components
export default apiSlice;
