import { Box } from "@mui/material";
import EventForm from "../forms/EventForm";
import FormHeader from "../forms/FormHeader";
import ContentForm from "../forms/ContentForm";

const Calendar = () => {
  return (
    <Box>
      <FormHeader title={"Create Event"} />
      <EventForm />
      <ContentForm />
    </Box>
  );
};

export default Calendar;
