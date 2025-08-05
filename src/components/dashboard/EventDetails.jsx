import { Box } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import EventDetailsForm from "../forms/EventDetailsForm";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  return (
    <Box>
      <FormHeader title={"Event Details"} />
      <EventDetailsForm id={id} />
    </Box>
  );
};

export default EventDetails;
