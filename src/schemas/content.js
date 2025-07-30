import * as Yup from "yup";

export const contentFormSchema = Yup.object({
  content_type: Yup.string().required("Content type is required"),
  description: Yup.string()
    .min(50, "Minimum 50 characters required")
    .required("Description is required"),
  recipients: Yup.string().when("postMethod", {
    is: true,
    then: Yup.string()
      .email("Enter a valid email")
      .required("Recipient email is required"),
    otherwise: Yup.string(),
  }),
});
