import * as Yup from "yup";
import dayjs from "dayjs";

export const eventValidationSchema = (isSchoolRole, is_public) =>
  Yup.object().shape({
    event_name: Yup.string()
      .required("Event Name is required")
      .max(50, "Maximum 50 characters allowed"),

    ...(!is_public && {
      event_type: Yup.string()
        .required("Event Type is required")
        .max(30, "Maximum 30 characters allowed"),
    }),

    ...(!isSchoolRole && {
      school_email: Yup.string().required("School email is required"),
    }),

    start_date: Yup.string()
      .nullable()
      .typeError("Start date is invalid")
      .required("Start date is required")
      .test(
        "is-today-or-future",
        "Start date cannot be in the past",
        function (value) {
          if (!value) return false;
          const selectedDate = dayjs(value).startOf("day");
          const today = dayjs().startOf("day");
          return selectedDate.isSame(today) || selectedDate.isAfter(today);
        },
      ),

    end_date: Yup.string()
      .nullable()
      .typeError("End date is invalid")
      .required("End date is required")
      .test(
        "is-after-start-date",
        "End date must be same or after start date",
        function (value) {
          const { start_date } = this.parent;
          if (!value || !start_date) return false;

          const start = dayjs(start_date).startOf("day");
          const end = dayjs(value).startOf("day");

          return end.isSame(start) || end.isAfter(start);
        },
      ),

    images: Yup.array()
      .min(1, "Please upload at least one image")
      .required("At least one image is required"),

    description: Yup.string().required("Description is required"),
  });
