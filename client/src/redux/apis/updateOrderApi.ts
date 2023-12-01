import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UpdateOrderProps } from "../../interface/OrderData";

export const updateOrderApi = createApi({
  reducerPath: "updateOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_DOMAIN}`,
    credentials: "include",
  }),
  endpoints: (builder) => {
    return {
      updateOrder: builder.mutation<unknown, UpdateOrderProps>({
        query: (updateOrderProps: UpdateOrderProps) => {
          const newOrdersData = updateOrderProps.newOrdersData;
          return {
            url: "/admin/updateOrder",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "CSRF-Token": updateOrderProps.csrfToken,
            },
            body: { newOrdersData },
          };
        },
      }),
    };
  },
});

export const { useUpdateOrderMutation } = updateOrderApi;
