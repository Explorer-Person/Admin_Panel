import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseProps } from "../../interface/ResponseData";
import { DeleteOrderProps } from "../../interface/OrderData";

export const deleteOrderApi = createApi({
  reducerPath: "deleteOrder",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_DOMAIN}`,
    credentials: "include",
  }),
  endpoints: (builder) => {
    return {
      deleteOrder: builder.mutation<ResponseProps, DeleteOrderProps>({
        query: (deleteOrderProps: DeleteOrderProps) => 
        {
          const rootId = deleteOrderProps.rootId;
          return {
            url: "/admin/deleteOrder",
            method: "DELETE",
            headers: {
              "CSRF-Token": deleteOrderProps.csrfToken,
            },
            body: {rootId},
          }
          
        },
      }),
    };
  },
});

export const { useDeleteOrderMutation } = deleteOrderApi;
