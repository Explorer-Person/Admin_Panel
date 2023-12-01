import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseProps } from "../../interface/ResponseData";
import { AddOrderProps } from "../../interface/OrderData";

export const addOrderApi = createApi({
  reducerPath: "addOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_DOMAIN}`,
    credentials: "include",
  }),
  endpoints: (builder) => {
    return {
      addOrder: builder.mutation<ResponseProps, AddOrderProps>({
        query: (addOrderProps: AddOrderProps) => ({
          url: "/admin/addOrder",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "CSRF-Token": addOrderProps.csrfToken,
          },
          body: addOrderProps.ordersData,  
        }),
      }),
    };
  },
});

export const { useAddOrderMutation } = addOrderApi;
