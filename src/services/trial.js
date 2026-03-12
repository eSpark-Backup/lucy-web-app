import { api } from "./rtk";

export const trialApi = api.injectEndpoints({
  endpoints: (builder) => ({
    startTrial: builder.mutation({
      query: (schoolId) => ({
        url: `/schools/${schoolId}/trial/start`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["schools"],
    }),

    cancelTrial: builder.mutation({
      query: (schoolId) => ({
        url: `/schools/${schoolId}/trial/cancel`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["schools"],
    }),
  }),
});

export const { useStartTrialMutation, useCancelTrialMutation } = trialApi;
