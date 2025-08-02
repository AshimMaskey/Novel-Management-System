import type { NovelType } from "@/types/novel";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookmarkApi = createApi({
  reducerPath: "bookmarkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/bookmarks`,
    credentials: "include",
  }),
  tagTypes: ["Bookmark", "User"],
  endpoints: (builder) => ({
    getBookmarks: builder.query<NovelType[], void>({
      query: () => "/",
      providesTags: ["Bookmark"],
    }),

    toggleBookmark: builder.mutation<{ message: string }, string>({
      query: (novelId) => ({
        url: `/${novelId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Bookmark", "User"],
    }),
  }),
});

export const { useGetBookmarksQuery, useToggleBookmarkMutation } = bookmarkApi;
