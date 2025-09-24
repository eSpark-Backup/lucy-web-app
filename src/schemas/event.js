import * as Yup from "yup";
import dayjs from "dayjs";

export const eventValidationSchema = (isSchoolRole) =>
  Yup.object().shape({
    event_name: Yup.string()
      .required("Event Name is required")
      .max(50, "Maximum 50 characters allowed"),

    event_type: Yup.string()
      .required("Event Type is required")
      .max(30, "Maximum 30 characters allowed"),

    ...(!isSchoolRole && {
      school_email: Yup.string().required("School email is required"),
    }),

    duration: Yup.number()
      .required("Duration is required")
      .typeError("Must be a number")
      .positive("Must be greater than zero")
      .integer("Must be a whole number"),

    date: Yup.string()
      .nullable()
      .typeError("Date is invalid")
      .required("Date is required")
      .test(
        "is-today-or-future",
        "Date cannot be in the past",
        function (value) {
          if (!value) return false;
          const selectedDate = dayjs(value).startOf("day");
          const today = dayjs().startOf("day");
          return selectedDate.isSame(today) || selectedDate.isAfter(today);
        }
      ),

    image: Yup.string().required("Image is required"),

    description: Yup.string()
      .required("Description is required")
      .max(300, "Maximum 300 characters allowed"),
  });
