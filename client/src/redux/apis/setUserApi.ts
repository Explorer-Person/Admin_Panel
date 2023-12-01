import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { AddUserApiProps } from "../../interface/UserData";
import { ResponseProps } from "../../interface/ResponseData";

export const setUserApi = createApi({
  reducerPath: "addUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_DOMAIN}`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    setUser: builder.mutation<ResponseProps, AddUserApiProps>({
      query: (addUserProps: AddUserApiProps) => ({
        url: "/admin/management/setUser",
        method: "POST",
        headers: {
          "CSRF-Token": addUserProps.csrfData,
          "User-Type": "User",
        },
        body: addUserProps.users,
      }),
    }),
    setSuperUser: builder.mutation<ResponseProps, AddUserApiProps>({
      query: (addUserProps: AddUserApiProps) => ({
        url: "/admin/management/setSuperUser",
        method: "POST",
        headers: {
          "CSRF-Token": addUserProps.csrfData,
          "User-Type": "Super_User",
        },
        body: addUserProps.users,
      }),
    }),
  }),
});

export const { useSetSuperUserMutation, useSetUserMutation } = setUserApi;
