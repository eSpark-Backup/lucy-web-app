import { api } from "./rtk";

export const schoolApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSchools: builder.query({
      query: (credentials) => ({
        url: "/schools",
        method: "GET",
        body: credentials,
        credentials: "include",
      }),
      providesTags: ["school"],
    }),
    createSchool: builder.mutation({
      query: (credentials) => ({
        url: "/schools/create",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["school"],
    }),
    getSchoolById: builder.query({
      query: (id) => ({
        url: `/schools/${id}`,
        method: "GET",
      }),
      providesTags: ["school"],
    }),
    editSchool: builder.mutation({
      query: ({ id, credentials }) => ({
        url: `/schools/${id}`,
        method: "PUT",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["school"],
    }),
    deleteSchool: builder.mutation({
      query: (id) => ({
        url: `/school/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["school"],
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
