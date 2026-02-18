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
      providesTags: ["events", "event"],
    }),
    createEvent: builder.mutation({
      query: (credentials) => ({
        url: "/events",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["event"],
    }),
    getEventById: builder.query({
      query: (id) => ({
        url: `/events/${id}`,
        method: "GET",
      }),
      providesTags: ["event"],
    }),
    editEvent: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/events/${id}`,
        method: "PUT",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["event", "content"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["events"],
    }),
    getPublicEvents: builder.query({
      query: (credentials) => ({
        url: "/events/public",
        method: "GET",
        body: credentials,
        credentials: "include",
      }),
      providesTags: ["public-events"],
    }),
  }),
});

export const {
  useGetMyEventsQuery,
  useGetPublicEventsQuery,
  useCreateEventMutation,
  useGetEventByIdQuery,
  useEditEventMutation,
  useDeleteEventMutation,
} = authApi;
