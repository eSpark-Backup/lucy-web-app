import * as Yup from "yup";

export const accountForSchoolSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  school_name: Yup.string().required("School name is required"),

  phone_number: Yup.number().required("Phone number is required"),

  location: Yup.string().required("Location is required"),

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
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  trust_name: Yup.string().required("Trust name is required"),

  phone_number: Yup.number().required("Phone number is required"),

  location: Yup.string().required("Location is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),

  school_count: Yup.string().required("School count is required"),

  terms_and_conditions: Yup.boolean().required(
    "Terms and conditions is required"
  ),
});
