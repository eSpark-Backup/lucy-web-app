import { Box } from "@mui/material";
import EventForm from "../forms/EventForm";
import FormHeader from "../forms/FormHeader";

const Calendar = () => {
  return (
    <Box>
      <FormHeader title={"Create Event"} />
      <EventForm />
    </Box>
  );
};

export default Calendar;
