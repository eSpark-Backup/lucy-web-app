import * as Yup from "yup";

export const forgetSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .lowercase()
    .required("Email is required"),
});
