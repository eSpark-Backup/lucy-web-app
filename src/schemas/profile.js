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
    .matches(/^\d+$/, "Phone number must be digits only")
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long")
    .required("Phone number is required"),
});
