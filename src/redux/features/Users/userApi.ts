/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "../../api/apiSlice";

const UserApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: (email: string) => `/wishlist/${email}`,
    }),
    postWishlist: builder.mutation({
      query: (data) => ({
        url: `/wishlist`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetWishlistQuery, usePostWishlistMutation } = UserApi;
