import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { ResponseGetCsrfTokenProps } from "../../interface/ResponseData";


export const getCsrfTokenApi = createApi({
    reducerPath: "getCsrfToken",
    baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_SERVER_DOMAIN}`,
    }),
    endpoints: (builder)=>({
        getCsrfToken: builder.query<ResponseGetCsrfTokenProps, void>({
            query: () => ({
              url: "/api/csrf-token",
              method: "GET",
            }),
          }),
    })
});

export const {useGetCsrfTokenQuery} = getCsrfTokenApi;