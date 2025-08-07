import * as Yup from "yup";

export const resetPasswordSchema = Yup.object({
  new_password: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
