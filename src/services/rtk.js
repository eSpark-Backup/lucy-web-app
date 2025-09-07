import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl, prepareHeaders } from "./_utils";
import { logout, setRedirectToLogin } from "../store/slices/auth";

// ✅ Create the raw baseQuery with config
const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders,
});

// ✅ Wrap it
const customBaseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  const status = result?.error?.status;
  if (status === 401) {
    api.dispatch(logout());
    api.dispatch(setRedirectToLogin(true));
  }
  return result;
};

// ✅ Use only the custom one here
export const api = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: ["auth", "content", "event", "organizations", "schools", "payment"],
  endpoints: () => ({}),
});
