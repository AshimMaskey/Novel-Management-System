import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/users`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (updateData) => ({
        url: "/updateProfile",
        method: "PATCH",
        body: updateData,
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;
