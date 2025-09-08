import * as Yup from "yup";

export const contentFormSchema = Yup.object({
  content_type: Yup.string().required("Please select content type"),

  description: Yup.string()
    .required("Description is required")
    .when("content_type", (ct, schema) => {
      const v = String(ct || "").toLowerCase();
      const isNewsletter = v.includes("newsletter");

      if (isNewsletter) {
        // ✅ Newsletter: no word/paragraph limit
        return schema;
      }

      // ✅ Press Release: max 3 paragraphs allowed
      return schema.test(
        "pressrelease-paragraph-count",
        "Press release must not exceed 3 paragraphs",
        (value) => {
          if (!value) return false;
          const paragraphs = value
            .split(/\n\s*\n|<\/p>\s*<p>/i) // blank line OR <p> tag
            .filter((p) => p.trim()).length;
          return paragraphs <= 3;
        }
      );
    }),

  image: Yup.string(),

  post_method: Yup.string().required("Post method is required"),

  recipients: Yup.array()
    .min(1, "Select at least one recipient")
    .required("Recipients are required"),
});
