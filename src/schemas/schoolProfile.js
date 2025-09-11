import * as Yup from "yup";

export const schoolProfileValidationSchema = (is_trust) =>
  Yup.object().shape({
    name: Yup.string()
      .trim()
      .required("School name is required")
      .max(150, "School name can be up to 150 characters")
      .matches(
        /^[A-Za-z0-9\s'’-]+$/,
        "School name can only contain letters, numbers, spaces, apostrophes, and hyphens"
      ),

    address: Yup.string()
      .trim()
      .required("Address is required")
      .max(500, "Address must not exceed 500 characters"),

    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Must contain only digits")
      .min(7, "Must be at least 7 digits")
      .max(15, "Must be at most 15 digits"),

    email: Yup.string()
      .trim()
      .email("Enter a valid email")
      .lowercase()
      .required("Email is required"),

    ...(is_trust && {
      password: Yup.string()
        .trim()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[\S]{8,}$/,
          "Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character, and have no spaces"
        ),
      confirm_password: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),

    image: Yup.string().required("Image is required"),

    description: Yup.string()
      .trim()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description can be up to 500 characters"),
  });
