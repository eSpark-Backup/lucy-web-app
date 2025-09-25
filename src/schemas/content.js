import * as Yup from "yup";

export const contentFormSchema = Yup.object({
  content_types: Yup.array()
    .min(1, "Please select content type")
    .required("Please select content type"),

  description: Yup.string(),

  image: Yup.string(),

  post_method: Yup.string().required("Post method is required"),

  recipients: Yup.array()
    .min(1, "Select at least one recipient")
    .required("Recipients are required"),
});
