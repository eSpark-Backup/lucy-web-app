import * as Yup from "yup";

export const eventValidationSchema = Yup.object().shape({
  event_name: Yup.string()
    .required("Event Name is required")
    .max(50, "Maximum 50 characters allowed"),
  event_type: Yup.string()
    .required("Event Type is required")
    .max(30, "Maximum 30 characters allowed"),
  duration: Yup.number()
    .required("Duration is required")
    .typeError("Must be a number")
    .positive("Must be greater than zero")
    .integer("Must be a whole number"),
  description: Yup.string()
    .required("Description is required")
    .max(300, "Maximum 300 characters allowed"),
});
