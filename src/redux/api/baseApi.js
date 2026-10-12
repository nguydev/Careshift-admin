import { BASE_URL } from "../../../baseUrl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api/v1/`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth?.token || Cookies.get("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    "auth",
    "dashboard",
    "worker",
    "shift",
    "shift-appli",
    "user",
    "about",
    "privacy",
  ],
});
