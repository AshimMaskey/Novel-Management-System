import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/chapter`,
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
