import { api } from "./rtk";

export const contentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addContent: builder.mutation({
      query: ({ eventId, body }) => ({
        url: `/events/${eventId}/contents`,
        method: "POST",
        credentials: "include",
        body,
      }),
    }),
    getAllEvents: builder.query({
      query: ({ eventId }) => ({
        url: `/events/${eventId}/contents`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useAddContentMutation, useGetAllEventsQuery } = contentApi;
