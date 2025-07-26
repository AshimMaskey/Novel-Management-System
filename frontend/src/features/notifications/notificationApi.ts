import type { DeleteNotification, Notification } from "@/types/notification";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/notification`,
    credentials: "include",
  }),
  tagTypes: ["Notifications"],
  endpoints: (builder) => ({
    fetchAllNotifications: builder.query<Notification[], void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Notifications"],
    }),

    deleteAllNotifications: builder.mutation<DeleteNotification, void>({
      query: () => ({
        url: "/",
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),

    deleteSingleNotification: builder.mutation<Notification, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useFetchAllNotificationsQuery,
  useDeleteAllNotificationsMutation,
  useDeleteSingleNotificationMutation,
} = notificationApi;
