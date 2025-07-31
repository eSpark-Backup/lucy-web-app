import { Box } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import EventDetailsForm from "../forms/EventDetailsForm";

const CreateEvent = () => {
  return (
    <Box>
      <FormHeader title={"Create Event"} />
      <EventDetailsForm />
    </Box>
  );
};

export default CreateEvent;
