import { api } from "./rtk";

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (credentials) => ({
        url: "/payment/create-checkout-session",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["payment"],
    }),
    createPayment: builder.mutation({
      query: (credentials) => ({
        url: "/payment/success",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["payment"],
    }),
    cancelSubscription: builder.mutation({
      query: ({ body }) => ({
        url: "/payment/cancel-subscription",
        method: "POST",
        body: body,
        credentials: "include",
      }),
      invalidatesTags: ["schools"],
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useCreatePaymentMutation,
  useCancelSubscriptionMutation,
} = paymentApi;
