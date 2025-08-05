import { Box } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import { useParams } from "react-router-dom";
import EventForm from "../forms/EventForm";

const CreateEvent = () => {
  const { id } = useParams();
  return (
    <Box>
      <FormHeader title={id ? "Edit Event" : "Create Event"} />
      <EventForm />
    </Box>
  );
};

export default CreateEvent;
