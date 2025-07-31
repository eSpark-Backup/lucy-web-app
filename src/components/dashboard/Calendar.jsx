import { Box } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import EventDetailsForm from "../forms/EventDetailsForm";

const Calendar = () => {
  return (
    <Box>
      <FormHeader title={"Create Event"} />
      <EventDetailsForm />
    </Box>
  );
};

export default Calendar;
