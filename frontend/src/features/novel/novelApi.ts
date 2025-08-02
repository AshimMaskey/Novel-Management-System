import type { NovelType } from "@/types/novel";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const novelApi = createApi({
  reducerPath: "novelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/novel`,
    credentials: "include",
  }),
  tagTypes: ["Novel"],
  endpoints: (builder) => ({
    fetchNovels: builder.query<NovelType[], void>({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),

    fetchNovelById: builder.query<NovelType, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),

    fetchNovelsByAuthor: builder.query<NovelType[], string>({
      query: (authorId) => ({
        url: `/author/${authorId}`,
        method: "GET",
      }),
      providesTags: ["Novel"],
    }),

    fetchNovelsByGenre: builder.query<NovelType[], string>({
      query: (genreName) => ({
        url: `/genre/${genreName}`,
        method: "GET",
      }),
    }),

    fetchRandomNovels: builder.query<NovelType[], void>({
      query: () => ({
        url: "/randomNovels",
        method: "GET",
      }),
    }),

    searchNovels: builder.query<NovelType[], string>({
      query: (searchQuery) => ({
        url: `/search`,
        method: "GET",
        params: { search: searchQuery },
      }),
    }),

    createNovel: builder.mutation<NovelType, FormData>({
      query: (formData) => ({
        url: `/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Novel"],
    }),

    updateNovel: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Novel"],
    }),

    deleteNovel: builder.mutation<NovelType, string>({
      query: (novelId) => ({
        url: `/${novelId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Novel"],
    }),
  }),
});

export const {
  useFetchNovelsQuery,
  useFetchNovelByIdQuery,
  useFetchNovelsByAuthorQuery,
  useFetchNovelsByGenreQuery,
  useSearchNovelsQuery,
  useCreateNovelMutation,
  useUpdateNovelMutation,
  useDeleteNovelMutation,
  useFetchRandomNovelsQuery,
} = novelApi;
