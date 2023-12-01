import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseAuthorizeProps } from "../../interface/ResponseData";

export const authorizeApi = createApi({
  reducerPath: "authorize",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_DOMAIN}`,
    credentials: "include",
  }),
  endpoints: (builder) => {
    return {
      authorizeUser: builder.query<ResponseAuthorizeProps, void>({
        query: () => ({
          url: "/admin/authorize",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },

        }),
      }),
    };
  },
});

export const { useAuthorizeUserQuery } = authorizeApi;
