import { api } from "./rtk";

export const termsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllTerms: builder.query({
      query: () => ({
        url: "/terms-and-conditions",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["terms"],
    }),

    editTerms: builder.mutation({
      query: ({ body }) => ({
        url: `/terms-and-conditions`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [
        "terms",
        { type: "terms", id },
      ],
    }),

    // This is for the future.
    // createTerms: builder.mutation({
    //   query: (body) => ({
    //     url: "/terms-and-conditions",
    //     method: "POST",
    //     body,
    //     credentials: "include",
    //   }),
    //   invalidatesTags: ["terms"],
    // }),

    acceptTerms: builder.mutation({
      query: () => ({
        url: `/users/accept-terms`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["terms"],
    }),
  }),
});

export const {
  useGetAllTermsQuery,
  useGetTermsByIdQuery,
  useCreateTermsMutation,
  useEditTermsMutation,
  useAcceptTermsMutation,
} = termsApi;
