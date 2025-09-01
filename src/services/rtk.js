import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, prepareHeaders } from "./_utils";
import { logout, setRedirectToLogin } from "../store/slices/auth";

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders,
});

const customBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  const status = result?.error?.status;
  if (status === 401) {
    api.dispatch(logout());
    api.dispatch(setRedirectToLogin(true));
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders,
  }),
  baseQuery: customBaseQuery,
  tagTypes: ["auth", "content", "event", "organizations", "school"],
  endpoints: () => ({}),
});
