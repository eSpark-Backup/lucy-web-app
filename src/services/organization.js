import { api } from "./rtk";

export const organizationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // getMyEvents: builder.query({
    //   query: (credentials) => ({
    //     url: "/events/me",
    //     method: "GET",
    //     body: credentials,
    //     credentials: "include",
    //   }),
    //   providesTags: ["event"],
    // }),
    createOrganization: builder.mutation({
      query: (credentials) => ({
        url: "/organizations/create",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["event"],
    }),
    // getEventById: builder.query({
    //   query: (id) => ({
    //     url: `/events/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["event"],
    // }),
    // editEvent: builder.mutation({
    //   query: ({ id, credentials }) => ({
    //     url: `/events/${id}`,
    //     method: "PUT",
    //     body: credentials,
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["event"],
    // }),
    // deleteEvent: builder.mutation({
    //   query: (id) => ({
    //     url: `/events/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["event"],
    // }),
  }),
});

export const {
  // useGetMyEventsQuery,
  useCreateOrganizationMutation,
  // useGetEventByIdQuery,
  // useEditEventMutation,
  // useDeleteEventMutation,
} = organizationApi;
