import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AllEventsCard from "../AllEventsCard";
import ContentPreview from "../ContentPreview";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllContentQuery,
  useGetSingleContentQuery,
} from "../../services/content";
import dayjs from "dayjs";
import BackButton from "../BackButton";

const contentTypeOptions = {
  "Press Release": "press_release",
  "Instagram Post": "instagram_post",
  "Facebook Post": "facebook_post",
  "Newsletter Inclusion": "newsletter",
  "Governor Report Summary": "governor_summary",
};

const EventContents = () => {
  const { eventId, contentId } = useParams();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [previewData, setPreviewData] = useState({});

  const isPreview = location.pathname.includes("/preview");
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetAllContentQuery(
    { eventId },
    { skip: isPreview }
  );

  const {
    data: viewContentData,
    isLoading: viewContentLoading,
    isSuccess: viewContentSuccess,
    isFetching,
  } = useGetSingleContentQuery(
    { eventId, contentId },
    { skip: !isPreview, refetchOnMountOrArgChange: true }
  );

  const handleClick = () => {
    navigate("/dashboard/calendar/events/67/contents/add");
  };

  useEffect(() => {
    if (data) {
      const myEvents = data?.map((item) => {
        const titles = item?.content_types?.map((ct) =>
          Object.keys(contentTypeOptions).find(
            (k) => contentTypeOptions[k] === ct
          )
        );

        return {
          title: titles, // array of titles
          description: item?.text_content, // array of texts
          image: item?.attachment,
          id: item?.id,
        };
      });
      setEvents(myEvents);
    }
  }, [data]);

  useEffect(() => {
    if (viewContentData && viewContentSuccess) {
      const body = {
        title: viewContentData?.content_types?.map((ct) =>
          Object.keys(contentTypeOptions).find(
            (k) => contentTypeOptions[k] === ct
          )
        ),
        date: dayjs(viewContentData?.updated_at).format("YYYY-MM-DD"),
        image: viewContentData?.attachment,
        description: viewContentData?.text_content,
        recipients: viewContentData?.content_recipients?.map(
          (item) => item?.recipient
        ),
        contentType: viewContentData?.content_types,
      };
      setPreviewData(body);
    }
  }, [viewContentData, viewContentSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
      return;
    }
  }, [isError, error]);

  if (isLoading || viewContentLoading || isFetching) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <BackButton fallback={"/dashboard/calendar"} />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={0.5}
        mb={2}
      >
        <FormHeader title={isPreview ? "Content Preview" : "Event Content"} />
        <Button
          loading={isLoading}
          disabled={isLoading}
          onClick={handleClick}
          variant="contained"
          sx={{
            color: "#fff",
            maxWidth: { xs: "100%", sm: "120px" },
            height: { xs: "42px", md: "46px" },
            borderRadius: "12px",
            backgroundColor: "#4880FF",
            opacity: "90%",
            "&:hover": {
              backgroundColor: "#4880FF",
            },
            marginLeft: "0px",
            width: "121px",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 500, fontFamily: "Nunito Sans" }}
          >
            {events?.length > 0 ? "Add" : "Create"}
          </Typography>
        </Button>
      </Stack>
      {isPreview ? (
        <ContentPreview
          title={previewData?.title}
          date={previewData?.date}
          description={previewData?.description}
          image={previewData?.image}
          recipients={previewData?.recipients}
          contentType={previewData?.contentType}
        />
      ) : (
        <AllEventsCard data={events} isLoading={isLoading} />
      )}
    </Box>
  );
};

export default EventContents;
