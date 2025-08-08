import { Box, LinearProgress } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import { useLocation, useParams } from "react-router-dom";
import AllEventsCard from "../AllEventsCard";
import ContentPreview from "../ContentPreview";
import { useGetAllEventsQuery } from "../../services/content";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const contentTypeOptions = {
  "Press Release": "press_release",
  "Instagram Post": "instagram_post",
  "Facebook Post": "facebook_post",
  "Newsletter Inclusion": "newsletter",
  Summary: "summary",
};

const EventContents = () => {
  const { eventId, contentId } = useParams();
  const location = useLocation();
  const [events, setEvents] = useState([]);

  const isPreview = location.pathname.includes("/preview");

  const { data, isLoading, isError, error } = useGetAllEventsQuery(
    { eventId },
    { skip: isPreview }
  );

  useEffect(() => {
    if (data) {
      const myEvents = data?.map((item) => {
        const title = item?.content_type;
        const key = Object.keys(contentTypeOptions).find(
          (k) => contentTypeOptions[k] === title
        );
        return {
          title: key,
          description: item?.text_content,
          image: item?.attachment,
          id: item?.id,
        };
      });
      console.log(myEvents);
      setEvents(myEvents);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
      return;
    }
  }, [isError, error]);

  if (isLoading) {
    return <LinearProgress />;
  }

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
        <AllEventsCard data={events} />
      )}
    </Box>
  );
};

export default EventContents;
