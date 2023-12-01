import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { UserLoginApiProps } from "../../interface/UserData";
import { ResponseProps } from "../../interface/ResponseData";


export const authAdminApi = createApi({
    reducerPath: "loginAdminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_DOMAIN}`,
        credentials: "include",
    }),
    endpoints: (builder)=>({
        loginAdminPanel: builder.mutation<ResponseProps , UserLoginApiProps>({
            query: (loginDatas: UserLoginApiProps)=>({
               url: "/admin/login",
               method: "POST",
               headers: {
                "Content-Type": "application/json",
                "CSRF-Token": loginDatas.csrfToken,
               },
               body: loginDatas.userDatas
            }), 
        }),
        logoutAdminPanel: builder.mutation<ResponseProps , string>({
            query: (csrfToken: string)=>({
               url: "/admin/logout",
               method: "POST",
               headers: {
                "Content-Type": "application/json",
                "CSRF-Token": csrfToken,
               },
            }), 
        }),
    })
});

export const {useLoginAdminPanelMutation, useLogoutAdminPanelMutation} = authAdminApi;