import type { GenreType } from "@/types/genre";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const genreApi = createApi({
  reducerPath: "genreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/genre`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    fetchGenre: builder.query<GenreType[], void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    createGenre: builder.mutation({
      query: (genreName) => ({
        url: "/",
        method: "POST",
        body: genreName,
      }),
    }),
    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    editGenre: builder.mutation({
      query: ({ id, genreName }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: genreName,
      }),
    }),
  }),
});

export const {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useEditGenreMutation,
  useFetchGenreQuery,
} = genreApi;
