import type {
  CreateReviewType,
  GetReviewType,
  ReviewType,
} from "@/types/review";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/review`,
    credentials: "include",
  }),
  tagTypes: ["review"],
  endpoints: (builder) => ({
    fetchReviewByNovelId: builder.query<GetReviewType[], string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    createReview: builder.mutation<
      ReviewType,
      { id: string; formData: CreateReviewType }
    >({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["review"],
    }),
    updateReview: builder.mutation<
      ReviewType,
      { id: string; updateData: CreateReviewType }
    >({
      query: ({ id, updateData }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["review"],
    }),
    deleteReview: builder.mutation<ReviewType, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useFetchReviewByNovelIdQuery,
} = reviewApi;
