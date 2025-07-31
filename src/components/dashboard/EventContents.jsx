import { Box } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import EventDetailsForm from "../forms/EventDetailsForm";
import { useParams } from "react-router-dom";

const EventContents = () => {
  const { id } = useParams();
  return (
    <Box>
      <FormHeader title={id ? `Event Contents : ${id}` : "Event Contents"} />
    </Box>
  );
};

export default EventContents;
