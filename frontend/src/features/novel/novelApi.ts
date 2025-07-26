import type { NovelType } from "@/types/novel";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const novelApi = createApi({
  reducerPath: "novelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/novel`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    fetchNovels: builder.query<NovelType[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    deleteNovel: builder.mutation<NovelType, string>({
      query: (novelId) => ({
        url: `/${novelId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useFetchNovelsQuery, useDeleteNovelMutation } = novelApi;
