import { Box } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import EventDetailsForm from "../forms/EventDetailsForm";
import { useParams } from "react-router-dom";

const CreateEvent = () => {
  const { id } = useParams();
  return (
    <Box>
      <FormHeader title={id ? "Edit Event" : "Create Event"} />
      <EventDetailsForm />
    </Box>
  );
};

export default CreateEvent;
