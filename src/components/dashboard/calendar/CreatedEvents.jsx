import { useState } from "react";
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
import { Link } from "react-router-dom";
import { componentStyles } from "../../../style/componentStyles.js";
import { CALENDAR_DATA } from "../../../constant/index.js";

export default function CreatedEvents({ events }) {
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
  const { createEventText, eventsLink, noEventsText } =
    CREATEDEVENTS_DATA || {};
  const [showAll, setShowAll] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme?.breakpoints?.down("sm"));
  const visibleEvents = showAll ? events : events?.slice(0, 4);

  return (
    <Paper sx={paperStyle}>
      <Box sx={typoAndButtonBoxStyle(isMobile)}>
        <Typography variant="h5" sx={createEventTypoStyle}>
          {createEventText}
        </Typography>
      </Box>
      <Divider sx={dividerStyle} />

      {/* Events List */}
      <Stack spacing={3} sx={eventListBoxStyle}>
        {visibleEvents?.length > 0 ? (
          visibleEvents?.map((event, index) => (
            <Box key={index}>
              <Stack
                spacing={1}
                alignItems={"start"}
                direction={isMobile ? "column" : "row"}
              >
                <Avatar src={event?.image} sx={avatarStyle(isMobile)} />
                <Box>
                  <Link
                    to={`${eventsLink}${event?.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
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
                          ? event.title.split(" ").slice(0, 2).join(" ") +
                            " ..."
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
                        ? event.school_name.split(" ").slice(0, 3).join(" ") +
                          " ..."
                        : event.school_name)}
                  </Typography>
                  <Typography
                    display="block"
                    variant="caption"
                    color="text.secondary"
                  >
                    Date: {event?.date}
                  </Typography>
                  <Typography
                    display="block"
                    variant="caption"
                    color="text.secondary"
                  >
                    Duration: {event?.duration}
                  </Typography>
                  <Stack
                    mt={1}
                    spacing={0.5}
                    direction="row"
                    alignItems="center"
                  >
                    <AvatarGroup max={3} sx={avatarGroupStyle}>
                      {event?.attendees?.slice(0, 3)?.map((src, idx) => (
                        <Link to={`/members${src.split(".")[0]}`}>
                          <Avatar
                            key={idx}
                            src={src}
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                          />
                        </Link>
                      ))}
                    </AvatarGroup>
                    {event?.more && (
                      <Avatar sx={moreAvatarStyle}>{event?.more}</Avatar>
                    )}
                  </Stack>
                </Box>
              </Stack>
            </Box>
          ))
        ) : (
          <Typography variant={"body1"} textAlign="center">
            {noEventsText}
          </Typography>
        )}
      </Stack>
      {events?.length > 4 && (
        <Box my={3} textAlign="center" sx={showMoreButtonBoxStyle}>
          <Button onClick={() => setShowAll(!showAll)} sx={showMoreButtonStyle}>
            <Typography fontWeight="bold">
              {showAll
                ? "Show Less"
                : `Show More (${events?.length - visibleEvents?.length})`}
            </Typography>
          </Button>
        </Box>
      )}
    </Paper>
  );
}
