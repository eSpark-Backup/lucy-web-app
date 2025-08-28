import * as Yup from "yup";

export const accountForSchoolSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),

  last_name: Yup.string().required("Last name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  name: Yup.string().required("School name is required"),

  phone: Yup.number().required("Phone number is required"),

  address: Yup.string().required("Location is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),

  terms_and_conditions: Yup.boolean().required(
    "Terms and conditions is required"
  ),
});

export const accountForTrustSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),

  last_name: Yup.string().required("Last name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  name: Yup.string().required("Trust name is required"),

  phone: Yup.number().required("Phone number is required"),

  address: Yup.string().required("Location is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),

  selected_school_count: Yup.string().required("School count is required"),

  terms_and_conditions: Yup.boolean().required(
    "Terms and conditions is required"
  ),
});
