// services/Service.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import {
  BookmarkResponse,
  OpportunitiesResponse,
  OpportunityResponseById,
} from "../types/ResponseTypes";

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  const session = await getSession();
  const token = session?.user?.accessToken;

  const rawBaseQuery = fetchBaseQuery({
    baseUrl: "https://akil-backend.onrender.com/",
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  return rawBaseQuery(args, api, extraOptions);
};

export const OppsApi = createApi({
  reducerPath: "allProducts",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getAllOpps: builder.query<OpportunitiesResponse, void>({
      query: () => "/opportunities/search",
    }),
    getOppById: builder.query<OpportunityResponseById, string>({
      query: (id: string) => `/opportunities/${id}`,
    }),
    getBookmark: builder.query<BookmarkResponse, void>({
      query: () => "/bookmarks",
    }),
    createBookmark: builder.mutation<any, string>({
      query: (eventID) => ({
        url: `/bookmarks/${eventID}`,
        method: "POST",
      }),
    }),
    removeBookmark: builder.mutation<any, string>({
      query: (eventID) => ({
        url: `/bookmarks/${eventID}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllOppsQuery,
  useGetOppByIdQuery,
  useGetBookmarkQuery,
  useCreateBookmarkMutation,
  useRemoveBookmarkMutation,
} = OppsApi;
