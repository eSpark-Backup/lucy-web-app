import { api } from "./rtk";

export const aiApi = api.injectEndpoints({
  endpoints: (builder) => ({
    aiContent: builder.mutation({
      query: ({ body }) => ({
        url: `/ai/generate`,
        method: "POST",
        credentials: "include",
        body,
      }),
    }),
  }),
});

export const { useAiContentMutation } = aiApi;
