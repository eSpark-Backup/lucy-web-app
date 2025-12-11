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
      invalidatesTags: ["content"],
    }),
    getAllContent: builder.query({
      query: ({ eventId }) => ({
        url: `/events/${eventId}/contents`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["content"],
    }),
    getAllRecipients: builder.query({
      query: () => ({
        url: `/events/content-recipients/me`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getSingleContent: builder.query({
      query: ({ eventId, contentId }) => ({
        url: `/events/${eventId}/contents/${contentId}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["content"],
    }),
    searchPhotos: builder.mutation({
      query: ({ query = "", per_page = 40 }) => ({
        url: `/events/images/search`,
        method: "GET",
        params: {
          query,
          per_page,
        },
        credentials: "include",
      }),
    }),
    updateContent: builder.mutation({
      query: ({ eventId, contentId, body }) => ({
        url: `/events/${eventId}/contents/${contentId}`,
        method: "PUT",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["content"],
    }),
    deleteContent: builder.mutation({
      query: ({ eventId, contentId }) => ({
        url: `/events/${eventId}/contents/${contentId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["content"],
    }),
    resendRecipientEmail: builder.mutation({
      query: ({ eventId, body }) => ({
        url: `/events/${eventId}/send-email`,
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useAddContentMutation,
  useGetAllContentQuery,
  useGetAllRecipientsQuery,
  useGetSingleContentQuery,
  useUpdateContentMutation,
  useDeleteContentMutation,
  useResendRecipientEmailMutation,
  useSearchPhotosMutation,
} = contentApi;
