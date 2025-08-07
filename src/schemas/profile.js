import * as Yup from "yup";

export const profileSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phone: Yup.string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, "Phone must be in XXX-XXX-XXXX format")
    .required("Phone Number is required"),
});
