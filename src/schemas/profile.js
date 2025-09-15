import * as Yup from "yup";

export const profileSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("First name is required")
    .max(100, "First name can be up to 100 characters")
    .matches(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "First name must contain only alphabets"
    ),
  lastName: Yup.string()
    .trim()
    .required("Last name is required")
    .max(100, "Last name can be up to 100 characters")
    .matches(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "Last name must contain only alphabets"
    ),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+?[0-9]+$/,
      "Must contain only digits (optionally starting with +)"
    )
    .min(7, "Must be at least 7 digits")
    .max(15, "Must be at most 15 digits"),
});
