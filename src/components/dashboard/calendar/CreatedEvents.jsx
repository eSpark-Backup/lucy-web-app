import { useMemo } from "react";
import {
  Paper,
  Button,
  Typography,
  Divider,
  Stack,
  Box,
  Avatar,
  AvatarGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { componentStyles } from "../../../style/componentStyles.js";
import { CALENDAR_DATA } from "../../../constant/index.js";
import dayjs from "dayjs";

export default function CreatedEvents({ events = [] }) {
  const { CalendarScreenStyle } = componentStyles || {};
  const { CreatedEventsStyle } = CalendarScreenStyle || {};
  const {
    paperStyle,
    typoAndButtonBoxStyle,
    createEventTypoStyle,
    dividerStyle,
    eventListBoxStyle,
    avatarStyle,
    avatarGroupStyle,
    moreAvatarStyle,
    showMoreButtonBoxStyle,
    showMoreButtonStyle,
  } = CreatedEventsStyle || {};

  const { CREATEDEVENTS_DATA } = CALENDAR_DATA || {};
  const { createEventText, eventsLink } = CREATEDEVENTS_DATA || {};

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme?.breakpoints?.down("sm"));

  const publicEvents = useMemo(() => {
    return events?.filter((event) => event?.is_public === true);
  }, [events]);

  return (
    <Paper sx={paperStyle}>
      <Box sx={typoAndButtonBoxStyle(isMobile)}>
        <Typography variant="h5" sx={createEventTypoStyle}>
          {createEventText}
        </Typography>
      </Box>

      <Divider sx={dividerStyle} />

      <Stack spacing={{ xs: 2.5, md: 3 }} sx={eventListBoxStyle}>
        {publicEvents?.length > 0 && (
          <>
            <Typography
              variant="h6"
              sx={{
                ...createEventTypoStyle,
                bgcolor: "#e9e9ff",
                pl: 2,
                pr: 1,
                py: 0.6,
                borderLeft: "5px solid #918bff",
                fontWeight: 700,
                letterSpacing: 0.5,
                fontSize: { xs: "14px", md: "16px" },
                fontFamily: "Nunito Sans, sans-serif",
                display: "inline-block",
              }}
            >
              Public Events
            </Typography>

            {publicEvents?.map((event) => (
              <EventItem
                key={`public-${event?.id}`}
                event={event}
                isMobile={isMobile}
                avatarStyle={avatarStyle}
                avatarGroupStyle={avatarGroupStyle}
                moreAvatarStyle={moreAvatarStyle}
                eventsLink={eventsLink}
              />
            ))}
          </>
        )}

        {publicEvents?.length === 0 && (
          <Typography variant="body1" textAlign="center">
            {"No Public Events Yet!"}
          </Typography>
        )}
      </Stack>

      {events?.length > 4 && (
        <Box
          mt={publicEvents?.length > 0 ? 3 : 0}
          mb={3}
          textAlign="center"
          sx={showMoreButtonBoxStyle}
        >
          <Button
            onClick={() => navigate("/dashboard/calendar/event-list")}
            sx={showMoreButtonStyle}
          >
            <Typography fontSize={{ xs: "14px", md: "16px" }}>
              {"Show All Events"}
            </Typography>
          </Button>
        </Box>
      )}
    </Paper>
  );
}

/* =========================
   Reusable Event Item
========================= */

const EventItem = ({
  event,
  isMobile,
  avatarStyle,
  avatarGroupStyle,
  moreAvatarStyle,
  eventsLink,
}) => {
  return (
    <Box>
      <Stack
        spacing={1}
        mt={0}
        alignItems="start"
        direction={isMobile ? "row" : "row"}
      >
        <Avatar src={event?.image} sx={avatarStyle(isMobile)} />

        <Box>
          <Link
            to={`${eventsLink}${event?.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "inline-block",
            }}
          >
            <Typography
              fontWeight={600}
              fontSize={isMobile ? "0.9rem" : "1rem"}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "150px",
              }}
            >
              {event?.title &&
                (event.title.split(" ").length > 3
                  ? event.title.split(" ").slice(0, 2).join(" ") + " ..."
                  : event.title)}
            </Typography>
          </Link>

          <Typography
            display="block"
            variant="caption"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "120px",
            }}
          >
            {event?.school_name &&
              (event.school_name.split(" ").length > 3
                ? event.school_name.split(" ").slice(0, 3).join(" ") + " ..."
                : event.school_name)}
          </Typography>

          <Typography display="block" variant="caption" color="text.secondary">
            {dayjs(event?.start)?.format("MMM D, YYYY")} -{" "}
            {dayjs(event?.end)?.format("MMM D, YYYY")}
          </Typography>

          <Stack mt={1} spacing={0.5} direction="row" alignItems="center">
            <AvatarGroup max={3} sx={avatarGroupStyle}>
              {event?.attendees?.slice(0, 3)?.map((src, idx) => (
                <Link key={idx} to={`/members${src.split(".")[0]}`}>
                  <Avatar
                    src={src}
                    sx={{
                      "&:hover": { cursor: "pointer" },
                    }}
                  />
                </Link>
              ))}
            </AvatarGroup>

            {event?.more && <Avatar sx={moreAvatarStyle}>{event?.more}</Avatar>}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
