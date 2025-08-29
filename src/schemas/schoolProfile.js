import * as Yup from "yup";

export const schoolProfileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("School name is required")
    .max(50, "Maximum 50 characters allowed"),

  address: Yup.string()
    .required("Location is required")
    .max(30, "Maximum 30 characters allowed"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Must contain only digits")
    .min(7, "Must be at least 7 digits")
    .max(15, "Must be at most 15 digits"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  image: Yup.string().required("Image is required"),

  description: Yup.string()
    .required("Description is required")
    .max(300, "Maximum 300 characters allowed"),
});
