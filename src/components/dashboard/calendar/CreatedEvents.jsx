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
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";

// Helpers
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB");
const formatTime = (dateStr) =>
  new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
const calculateDuration = (start, end) => {
  const diffMs = new Date(end) - new Date(start);
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${diffHours} ${diffHours > 1 ? "hours" : "hour"} ${diffMinutes} min `;
};

export default function CreatedEvents({ events }) {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const processedEvents = events.map((event) => ({
    ...event,
    startDate: formatDate(event.start),
    startTime: formatTime(event.start),
    endDate: formatDate(event.end),
    endTime: formatTime(event.end),
    duration: calculateDuration(event.start, event.end),
    more: event.attendees?.length > 3 ? `+${event.attendees?.length - 3}` : "",
  }));

  const visibleEvents = showAll ? processedEvents : processedEvents.slice(0, 3);

  return (
    <Paper
      sx={{
        borderRadius: 4,
        boxShadow: "none",
        border: "0.3px solid rgba(185, 185, 185, 0.4)",
      }}
    >
      <Box sx={{ p: isMobile ? 2 : 3, pb: 0 }}>
        {/* Add New Event Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate(`/dashboard/calendar/events/add`)}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            mb: 2,
            bgcolor: "rgba(72, 128, 255, 0.34)",
            height: { xs: "38px", md: "43px" },
            boxShadow: "none",
            opacity: "90%",
            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              color: "#FFFFFF",
              fontFamily: "Nunito Sans",
              letterSpacing: "-0.05px",
            }}
          >
            + Add New Event
          </Typography>
        </Button>

        {/* Heading */}
        <Typography
          variant="h5"
          sx={{
            mt: 3,
            fontWeight: 700,
            color: "#202224",
            fontFamily: "Poppins",
          }}
        >
          Created Events
        </Typography>
      </Box>
      <Divider
        sx={{
          mt: 2,
          borderWidth: "0",
          border: "0.3px solid rgba(185, 185, 185, 0.1)",
        }}
      />

      {/* Events List */}
      <Stack
        my={1}
        spacing={3}
        minWidth={{ xs: 200, md: 286 }}
        maxHeight={showAll ? "100%" : 452}
        overflow="auto"
        sx={{
          p: isMobile ? 2 : 3,
        }}
      >
        {visibleEvents.map((event, index) => (
          <Box key={index}>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={1.8}
              alignItems={"start"}
              sx={{
                pb: { xs: 2, md: 3 },
                borderBottom: "0.3px solid rgba(185, 185, 185, 0.2)",
              }}
            >
              <Link
                to={`/dashboard/calendar/events/${event.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Avatar
                  src={event.attendees?.[0]}
                  sx={{ width: isMobile ? 32 : 38, height: isMobile ? 32 : 38 }}
                />
              </Link>
              <Box>
                <Link
                  to={`/dashboard/calendar/events/${event.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      fontFamily: "Poppins",
                      color: "#202224",
                      mb: 0.5,
                    }}
                  >
                    {event.title}
                  </Typography>
                </Link>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Poppins",
                    color: "#202224",
                    opacity: "60%",
                    mb: 0.5,
                  }}
                >
                  Date:{" "}
                  {event.startDate === event.endDate
                    ? event.startDate
                    : `${event.startDate} - ${event.endDate}`}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Poppins",
                    color: "#202224",
                    opacity: "60%",
                    mb: 0.5,
                  }}
                >
                  Time: {event.startTime} - {event.endTime}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Poppins",
                    color: "#202224",
                    opacity: "60%",
                    mb: 0.5,
                  }}
                >
                  Duration: {event.duration}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} mt={1}>
                  <AvatarGroup
                    max={3}
                    sx={{ "& .MuiAvatar-root": { width: 24, height: 24 } }}
                  >
                    {event.attendees.slice(0, 3)?.map((src, idx) => (
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
                  {event.more && (
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        bgcolor: "#DFE9FF5E",
                        fontSize: "0.75rem",
                        border: " 1px solid #4880FF",
                        color: "#4880FF",
                      }}
                    >
                      {event.more}
                    </Avatar>
                  )}
                </Stack>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
      <Box
        my={2}
        textAlign="center"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          onClick={() => setShowAll(!showAll)}
          sx={{
            width: 126,
            height: 38,
            borderRadius: "12px",
            fontFamily: "Nunito Sans",
            background: "#E2EAF8",
            opacity: "70%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontFamily: "Nunito Sans",
              color: "#202224",
            }}
          >
            {showAll
              ? "Show Less"
              : `Show More (${events.length - visibleEvents.length})`}
          </Typography>
        </Button>
      </Box>
    </Paper>
  );
}
