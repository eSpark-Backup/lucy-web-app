import { Box } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import { useLocation, useParams } from "react-router-dom";
import AllEventsCard from "../AllEventsCard";
import ContentPreview from "../ContentPreview";

const EventContents = () => {
  const { eventId, contentId } = useParams();
  const location = useLocation();

  const isPreview = location.pathname.includes("/preview");

  return (
    <Box>
      <FormHeader title={isPreview ? "Content Preview" : "Event Content"} />

      {isPreview ? (
        <ContentPreview
          title="Docusaurus: The Modern Framework for Building Documentation That Doesn’t Suck"
          date="2025-06-25"
          description="Docusaurus is a modern static site generator (SSG) built by Meta to help developers quickly create beautiful, versioned documentation websites..."
        />
      ) : (
        <AllEventsCard />
      )}
    </Box>
  );
};

export default EventContents;
