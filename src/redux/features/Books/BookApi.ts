/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from "../../api/apiSlice";

const BookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ["reviews", "books"],
    }),
    giveReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),

    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: ({ id, user }) => ({
        url: `/book?id=${id}&user=${user}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  useGiveReviewMutation,
  useUpdateBookMutation,
  useAddBookMutation,
  useDeleteBookMutation,
} = BookApi;
