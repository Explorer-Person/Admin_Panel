import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseGetAllUserProps } from "../../interface/ResponseData";

export const getAllUserApi = createApi({
    reducerPath: "getAllUserApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_DOMAIN}`,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getAllUser: builder.query<ResponseGetAllUserProps, void>({
            query: () =>({
                url: "/admin/management/getAllUser",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "User-Type": "User"
                },
            })
        }),
        getAllSuperUser: builder.query<ResponseGetAllUserProps, void>({
            query: () =>({
                url: "/admin/management/getAllSuperUser",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "User-Type": "Super_User"
                },
            })
        })
    })
});

export const {useGetAllUserQuery, useGetAllSuperUserQuery} = getAllUserApi;