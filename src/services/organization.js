import { api } from "./rtk";

export const organizationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrganization: builder.query({
      query: (credentials) => ({
        url: "/organizations/me",
        method: "GET",
        body: credentials,
        credentials: "include",
      }),
      providesTags: ["organizations"],
    }),
    createOrganization: builder.mutation({
      query: (credentials) => ({
        url: "/organizations/create",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["organizations"],
    }),
  }),
});

export const { useGetMyOrganizationQuery, useCreateOrganizationMutation } =
  organizationApi;
