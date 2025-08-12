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

export default function CreatedEvents({ events }) {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(events);

  const visibleEvents = showAll ? events : events.slice(0, 4);

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
        maxHeight={452}
        overflow="auto"
        sx={{
          p: isMobile ? 2 : 3,
        }}
      >
        {visibleEvents?.length > 0 ? (
          visibleEvents?.map((event, index) => (
            <Box key={index}>
              <Stack
                direction={isMobile ? "column" : "row"}
                spacing={1}
                alignItems={"start"}
              >
                <Avatar
                  src={event.image}
                  sx={{ width: isMobile ? 32 : 40, height: isMobile ? 32 : 40 }}
                />
                <Box>
                  <Link
                    to={`/dashboard/calendar/events/${event.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography
                      fontWeight={600}
                      fontSize={isMobile ? "0.9rem" : "1rem"}
                    >
                      {event.title}
                    </Typography>
                  </Link>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Date: {event.date}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    Duration: {event.duration}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    mt={1}
                  >
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
          ))
        ) : (
          <Typography textAlign="center">No Events Available</Typography>
        )}
      </Stack>
      {events?.length > 4 && (
        <Box
          textAlign="center"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          my={3}
        >
          <Button
            // variant="primary"
            onClick={() => setShowAll(!showAll)}
            sx={{
              width: 126,
              height: 38,
              borderRadius: "12px",
              border: "2px solid #E2EAF8",
              color: "#202224",
              fontFamily: "Nunito Sans",
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "28px",
              background: "#E2EAF8",
              opacity: 0.7,
            }}
          >
            <Typography fontWeight="bold">
              {showAll
                ? "Show Less"
                : `Show More (${events.length - visibleEvents.length})`}
            </Typography>
          </Button>
        </Box>
      )}
    </Paper>
  );
}
