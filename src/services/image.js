import { api } from "./rtk";

export const imageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addImage: builder.mutation({
      query: ({ body }) => ({
        url: `/events/upload`,
        method: "POST",
        credentials: "include",
        body,
      }),
    }),
  }),
});

export const { useAddImageMutation } = imageApi;
