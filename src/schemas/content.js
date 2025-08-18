import * as Yup from "yup";

export const contentFormSchema = Yup.object({
  content_type: Yup.string().required("Please select content type"),

  description: Yup.string()
    .required("Description is required")
    .when("content_type", (ct, schema) => {
      const v = String(ct || "").toLowerCase();
      const isNewsletter = v.includes("newsletter");

      if (isNewsletter) {
        return schema.test(
          "newsletter-word-count",
          "Newsletter must be at least 200 words",
          (value) => {
            if (!value) return false;
            const words = value.trim().split(/\s+/).filter(Boolean).length;
            return words >= 200;
          }
        );
      }

      return schema
        .test(
          "pressrelease-word-count",
          "Press release must be at least 600 words",
          (value) => {
            if (!value) return false;
            const words = value.trim().split(/\s+/).filter(Boolean).length;
            return words >= 600;
          }
        )
        .test(
          "pressrelease-paragraph-count",
          "Press release must contain at least 3 paragraphs",
          (value) => {
            if (!value) return false;
            const paragraphs = value
              // blank line OR HTML <p> separators supported
              .split(/\n\s*\n|<\/p>\s*<p>/i)
              .filter((p) => p.trim()).length;
            return paragraphs >= 3;
          }
        );
    }),

  image: Yup.string(),

  post_method: Yup.string().required("Post method is required"),

  recipients: Yup.array()
    .min(1, "Select at least one recipient")
    .required("Recipients are required"),
});
