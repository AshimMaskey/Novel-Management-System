import type { AdminDashboardResponse } from "@/types/dashboard";
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
  }),
});

export const { useAdminDashboardQuery } = adminApi;
