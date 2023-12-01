import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetOrderProps } from "../../interface/OrderData";
import { ResponseGetOrderProps } from "../../interface/ResponseData";


export const getOrderApi = createApi({
  reducerPath: "getOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_DOMAIN}`,
    credentials: "include"
  }),
  endpoints: (builder) => {  
    return {
      getOrder: builder.query<ResponseGetOrderProps, GetOrderProps>({
        query: (getOrderProps) => {
          const { rootId, csrfToken } = getOrderProps;
          return {
            url: "/admin/getOrder",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "CSRF-Token": csrfToken,
            },
            body: {rootId} ,
          }  
        },
      }),
    };
  },
});

export const { useGetOrderQuery } = getOrderApi;
