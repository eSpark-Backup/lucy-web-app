import * as Yup from "yup";

export const signupSchema = Yup?.object({
  email: Yup?.string()
    ?.email("Invalid email address")
    ?.required("Email is required"),
  user_name: Yup?.string()
    ?.required("User name is required"),
  password: Yup?.string()
    ?.min(6, "Password must be at least 6 characters")
    ?.required("Password is required"),
});
