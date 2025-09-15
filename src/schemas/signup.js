import * as Yup from "yup";

export const accountForSchoolSchema = Yup.object({
  first_name: Yup.string()
    .trim()
    .required("First name is required")
    .max(100, "First name can be up to 100 characters")
    .matches(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "First name must contain only alphabets"
    ),

  last_name: Yup.string()
    .trim()
    .required("Last name is required")
    .max(100, "Last name can be up to 100 characters")
    .matches(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "Last name must contain only alphabets"
    ),

  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .lowercase()
    .required("Email is required"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+?[0-9]+$/,
      "Must contain only digits (optionally starting with +)"
    )
    .min(7, "Must be at least 7 digits")
    .max(15, "Must be at most 15 digits"),

  address: Yup.string()
    .trim()
    .required("Address is required")
    .max(500, "Address must not exceed 500 characters"),

  password: Yup.string()
    .trim()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/,
      "Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character, and have no spaces"
    ),

  confirm_password: Yup.string()
    .trim()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),

  terms_and_conditions: Yup.boolean().required(
    "Terms and conditions is required"
  ),
});

export const accountForTrustSchema = Yup.object({
  first_name: Yup.string()
    .trim()
    .required("First name is required")
    .max(100, "First name can be up to 100 characters")
    .matches(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "First name must contain only alphabets"
    ),

  last_name: Yup.string()
    .trim()
    .required("Last name is required")
    .max(100, "Last name can be up to 100 characters")
    .matches(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "Last name must contain only alphabets"
    ),

  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .lowercase()
    .required("Email is required"),

  name: Yup.string()
    .trim()
    .required("School name is required")
    .max(150, "School name can be up to 150 characters")
    .matches(
      /^[A-Za-z0-9\s'’-]+$/,
      "School name can only contain letters, numbers, spaces, apostrophes, and hyphens"
    ),

  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must be digits only")
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long")
    .required("Phone number is required"),

  address: Yup.string()
    .trim()
    .required("Address is required")
    .max(500, "Address must not exceed 500 characters"),

  password: Yup.string()
    .trim()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/,
      "Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character, and have no spaces"
    ),

  confirm_password: Yup.string()
    .trim()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),

  selected_school_count: Yup.number()
    .typeError("School count must be a number")
    .required("School count is required")
    .min(1, "At least 1 school is required"),

  terms_and_conditions: Yup.boolean().required(
    "Terms and conditions is required"
  ),
});
