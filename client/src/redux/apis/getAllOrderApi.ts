import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ResponseGetAllOrderProps } from "../../interface/ResponseData";

export const getAllOrderApi = createApi({
  reducerPath: "getAllOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_DOMAIN}`,
    credentials: "include",
  }),
  endpoints: (builder) => {
    return {
      getAllOrder: builder.query<ResponseGetAllOrderProps, string>({
        query: (csrfToken: string) => ({
          url: "/admin/getAllOrder",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "CSRF-Token": csrfToken,
          },
        }),
      }),
    };
  },
});

export const { useGetAllOrderQuery } = getAllOrderApi;
