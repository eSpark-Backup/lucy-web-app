import { api } from "./rtk";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/users/register",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    resendEmail: builder.mutation({
      query: (credentials) => ({
        url: "/auth/resend-verification",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    verifyEmail: builder.query({
      query: (token) => ({
        url: `/auth/verify-email?token=${token}`,
        method: "GET",
      }),
    }),
    getUserWithToken: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (credentials) => ({
        url: "/users/forgot-password",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    updateUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/me",
        method: "PATCH",
        body: credentials,
        credentials: "include",
      }),
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        body,
        method: "POST",
        // credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useResendEmailMutation,
  useVerifyEmailQuery,
  useLoginMutation,
  useGetUserWithTokenQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
  useForgetPasswordMutation,
  user,
} = authApi;
