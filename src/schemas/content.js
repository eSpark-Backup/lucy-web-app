import * as Yup from "yup";

export const contentFormSchema = Yup?.object({
  content_type: Yup?.string()?.required("Please select content type"),
  description: Yup?.string()?.required("Description is required"),
  image: Yup?.string(),
  post_method: Yup?.string()?.required("Post method is required"),
  recipients: Yup?.string()?.required("Recipients are required"),
});
