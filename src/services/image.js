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

    singleImageDownload: builder.mutation({
      query: ({ fileUrl }) => ({
        url: `/events/download?fileUrl=${encodeURIComponent(fileUrl)}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
    }),

    multipleImagesDownload: builder.mutation({
      query: ({ fileUrls }) => ({
        url: `/events/download-multiple`,
        method: "POST",
        body: { fileUrls },
        responseHandler: async (response) => response.blob(),
      }),
      async onQueryStarted({ fileUrls }, { queryFulfilled }) {
        try {
          const { data: blob } = await queryFulfilled;

          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = "images.zip";
          document.body.appendChild(link);
          link.click();
          link.remove();

          window.URL.revokeObjectURL(downloadUrl);
        } catch (err) {
          console.error("Multiple images download failed:", err);
        }
      },
    }),
  }),
});

export const {
  useAddImageMutation,
  useSingleImageDownloadMutation,
  useMultipleImagesDownloadMutation,
} = imageApi;
