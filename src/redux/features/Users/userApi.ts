/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "../../api/apiSlice";

const UserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: (email) => `/wishlist/${email}`,
      providesTags: ["wishlist"],
    }),
    postWishlist: builder.mutation({
      query: (data) => ({
        url: `/wishlist`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const { useGetWishlistQuery, usePostWishlistMutation } = UserApi;
