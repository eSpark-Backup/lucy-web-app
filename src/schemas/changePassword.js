import * as Yup from "yup";

export const resetPasswordSchema = Yup.object({
  new_password: Yup.string()
    .trim()
    .required("New password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/,
      "New password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character, and have no spaces"
    )
    .notOneOf(
      [Yup.ref("password")],
      "New password must be different from current password"
    ),
  confirm_password: Yup.string()
    .trim()
    .required("Confirm password is required")
    .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
});
