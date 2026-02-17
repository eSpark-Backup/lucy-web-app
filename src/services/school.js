import { api } from "./rtk";

export const schoolApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSchools: builder.query({
      query: (params) => ({
        url: "/schools",
        method: "GET",
        params,
        credentials: "include",
      }),
      providesTags: ["schools"],
    }),

    createSchool: builder.mutation({
      query: (credentials) => ({
        url: "/schools/create",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["schools"],
    }),

    getSchoolById: builder.query({
      query: (id) => ({
        url: `/schools/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, id) => [{ type: "schools", id }],
    }),

    editSchool: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/schools/${id}`,
        method: "PATCH",
        body: credentials, // FormData is passed directly
        credentials: "include",
        // Do NOT set 'Content-Type': browser will set multipart/form-data automatically
      }),
      invalidatesTags: (result, error, { id }) => [
        "schools",
        { type: "schools", id },
      ],
    }),

    deleteSchool: builder.mutation({
      query: (id) => ({
        url: `/schools/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["schools"],
    }),
  }),
});

export const {
  useGetAllSchoolsQuery,
  useCreateSchoolMutation,
  useEditSchoolMutation,
  useGetSchoolByIdQuery,
  useDeleteSchoolMutation,
} = schoolApi;
