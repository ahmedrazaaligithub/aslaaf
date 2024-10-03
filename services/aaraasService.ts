import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/constants/constant";

export const AaraasApi = createApi({
  reducerPath: "aaraas",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getAaraas: builder.query({
      query: (params) => ({
        url: `/api/aaraas`,
        method: "GET",
        params,
      }),
    }),
  }),
});
export const { useGetAaraasQuery, useLazyGetAaraasQuery } = AaraasApi;
