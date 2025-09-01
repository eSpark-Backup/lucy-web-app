import { api } from "./rtk";

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (credentials) => ({
        url: "/stripe/create-checkout-session",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["payment"],
    }),
    createPayment: builder.mutation({
      query: (credentials) => ({
        url: "/stripe/success",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["payment"],
    }),
  }),
});

export const { useCreateCheckoutSessionMutation, useCreatePaymentMutation } =
  paymentApi;
