import { api } from "./rtk";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMyEvents: builder.query({
      query: (credentials) => ({
        url: "/events/me",
        method: "GET",
        body: credentials,
        credentials: "include",
      }),
    }),
    createEvent: builder.mutation({
      query: (credentials) => ({
        url: "/events",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    getEventById: builder.query({
      query: (id) => ({
        url: `/events/${id}`,
        method: "GET",
      }),
    }),
    editEvent: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/events/${id}`,
        method: "PUT",
        body: credentials,
        credentials: "include",
      }),
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMyEventsQuery,
  useCreateEventMutation,
  useGetEventByIdQuery,
  useEditEventMutation,
  useDeleteEventMutation,
} = authApi;
