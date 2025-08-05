import { Box } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import EventDetailsForm from "../forms/EventDetailsForm";
import { useParams } from "react-router-dom";
import AllEventsCard from "../AllEventsCard";

const EventContents = () => {
  const { id } = useParams();
  return (
    <Box>
      <FormHeader title={id ? `Content Preview` : "Event Content"} />
      {id ? `` : <AllEventsCard />}
    </Box>
  );
};

export default EventContents;
