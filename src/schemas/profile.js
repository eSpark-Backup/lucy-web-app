import * as Yup from "yup";
export const profileSchema = Yup?.object({
  firstName: Yup?.string()?.required("First Name is required"),
  lastName: Yup?.string()?.required("Last Name is required"),
  email: Yup?.string()?.email("Invalid email")?.required("Email is required"),
  phone: Yup?.string()
    ?.matches(
      /^(\+?\d{1,3}[- ]?)?\d{3}[- ]?\d{3}[- ]?\d{4}$/,
      "Phone must be a valid local or international number"
    )
    ?.required("Phone Number is required"),
});
