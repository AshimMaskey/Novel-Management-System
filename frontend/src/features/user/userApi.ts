import type { GetUser } from "@/types/auth";
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
    fetchUsers: builder.query<GetUser[], void>({
      query: () => ({
        url: "/profiles",
        method: "GET",
      }),
    }),
    fetchUser: builder.query<GetUser, string>({
      query: (username) => ({
        url: `/profile/${username}`,
        method: "GET",
      }),
    }),
    fetcchAuthor: builder.query<GetUser, void>({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useFetchUsersQuery,
  useFetchUserQuery,
  useFetcchAuthorQuery,
} = userApi;
