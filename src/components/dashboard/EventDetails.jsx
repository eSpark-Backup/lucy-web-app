import { Box } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import EventDetailsForm from "../forms/EventDetailsForm";

const EventDetails = () => {
  return (
    <Box>
      <FormHeader title={"Event Details"} />
      <EventDetailsForm />
    </Box>
  );
};

export default EventDetails;
