import {
  type LogoutResponse,
  type LoginData,
  type User,
  type SignUpData,
  type GetUser,
} from "@/types/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<User, LoginData>({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    signup: builder.mutation<User, SignUpData>({
      query: (signupData) => ({
        url: "/signup",
        method: "POST",
        body: signupData,
      }),
    }),
    getUser: builder.query<GetUser, void>({
      query: () => ({
        url: "/getUser",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
} = authApi;
