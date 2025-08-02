import type { ChapterType, GetChapterResponse } from "@/types/chapter";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chapterApi = createApi({
  reducerPath: "chapterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/chapter`,
    credentials: "include",
  }),
  tagTypes: ["Chapter"],
  endpoints: (builder) => ({
    getChapter: builder.query<
      GetChapterResponse,
      { novelId: string; chapterNumber: number }
    >({
      query: ({ novelId, chapterNumber }) => ({
        url: `/${novelId}/${chapterNumber}`,
        method: "GET",
      }),
      providesTags: ["Chapter"],
    }),
    getChapterCount: builder.query<{ chapterCount: number }, string>({
      query: (novelId) => ({
        url: `/chapCount/${novelId}`,
        method: "GET",
      }),
      providesTags: ["Chapter"],
    }),

    getAllChapters: builder.query<ChapterType[], string>({
      query: (novelId) => `/${novelId}`,
      providesTags: ["Chapter"],
    }),

    createChapter: builder.mutation<
      ChapterType,
      Partial<ChapterType> & { novelId: string }
    >({
      query: (chapter) => ({
        url: `/`,
        method: "POST",
        body: chapter,
      }),
      invalidatesTags: ["Chapter"],
    }),

    updateChapter: builder.mutation<
      ChapterType,
      { chapterId: string } & Partial<ChapterType>
    >({
      query: ({ chapterId, ...body }) => ({
        url: `/${chapterId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Chapter"],
    }),

    deleteChapter: builder.mutation<ChapterType, string>({
      query: (chapterId) => ({
        url: `/${chapterId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chapter"],
    }),
  }),
});

export const {
  useGetChapterQuery,
  useGetAllChaptersQuery,
  useCreateChapterMutation,
  useUpdateChapterMutation,
  useDeleteChapterMutation,
  useGetChapterCountQuery,
} = chapterApi;
