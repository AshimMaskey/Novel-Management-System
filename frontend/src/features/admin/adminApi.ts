import type {
  AdminDashboardResponse,
  AuthorDashboardResponse,
} from "@/types/dashboard";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/dashboard`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    adminDashboard: builder.query<AdminDashboardResponse, void>({
      query: () => ({
        url: "/adminDashboard",
        method: "GET",
      }),
    }),
    authorDashboard: builder.query<AuthorDashboardResponse, void>({
      query: () => ({
        url: "/authorDashboard",
        method: "GET",
      }),
    }),
  }),
});

export const { useAdminDashboardQuery, useAuthorDashboardQuery } = adminApi;
