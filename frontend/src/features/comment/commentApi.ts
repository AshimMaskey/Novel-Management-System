import type {
  Comment,
  CreateCommentPayload,
  UpdateCommentPayload,
} from "@/types/comment";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/comment`,
    credentials: "include",
  }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    createComment: builder.mutation<Comment, CreateCommentPayload>({
      query: (newComment) => ({
        url: "/",
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comment"],
    }),

    getCommentsByChapter: builder.query<Comment[], string>({
      query: (chapterId) => `/chapter/${chapterId}`,
      providesTags: ["Comment"],
    }),

    getCommentsByNovel: builder.query<Comment[], string>({
      query: (novelId) => `/novel/${novelId}`,
      providesTags: ["Comment"],
    }),

    updateComment: builder.mutation<Comment, UpdateCommentPayload>({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),

    deleteComment: builder.mutation<Comment, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsByChapterQuery,
  useGetCommentsByNovelQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
