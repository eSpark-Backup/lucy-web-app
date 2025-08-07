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
  const [showAll, setShowAll] = useState(events?.length < 4);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const visibleEvents = showAll ? events : events.slice(0, 4);

  return (
    <Paper
      sx={{
        borderRadius: 4,
        p: isMobile ? 1.5 : 2,
        boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Add New Event Button */}
      <Button
        variant="contained"
        fullWidth
        startIcon={<AddIcon />}
        onClick={() => navigate(`/dashboard/calendar/events/add`)}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          mb: 2,
          bgcolor: "#4880FF57",
          fontSize: isMobile ? "0.8rem" : "1rem",
          py: isMobile ? 0.8 : 1.2,
        }}
      >
        Add New Event
      </Button>

      {/* Heading */}
      <Typography
        variant={isMobile ? "subtitle1" : "h6"}
        fontWeight="bold"
        mb={2}
      >
        Created Events
      </Typography>
      <Divider />

      {/* Events List */}
      <Stack
        spacing={3}
        mt={2}
        maxHeight={showAll ? 550 : "auto"}
        overflow="auto"
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
          mt={3}
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
