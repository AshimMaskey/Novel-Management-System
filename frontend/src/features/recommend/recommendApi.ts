import type { NovelType } from "@/types/novel";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recommendApi = createApi({
  reducerPath: "recommendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/recommend`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    fetchRecommendedNovels: builder.query<Partial<NovelType>[], void>({
      query: () => ({
        method: "GET",
        url: "/",
      }),
    }),
  }),
});

export const { useFetchRecommendedNovelsQuery } = recommendApi;
