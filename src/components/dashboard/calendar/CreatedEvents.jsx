import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  Avatar,
  AvatarGroup,
  Modal,
  TextField,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Dummy data example
const events = [
  {
    title: "Team Meeting",
    time: "10:00 AM",
    date: "2025-08-01",
    duration: "1 hour",
    attendees: ["/avatar1.png", "/avatar2.png", "/avatar3.png"],
    more: "3 +",
  },
  {
    title: "Client Call",
    time: "2:00 PM",
    date: "2025-08-02",
    duration: "45 min",
    attendees: ["/avatar4.png", "/avatar5.png"],
    more: "1 +",
  },
  {
    title: "Planning Session",
    time: "9:00 AM",
    date: "2025-08-03",
    duration: "2 hours",
    attendees: ["/avatar6.png", "/avatar7.png"],
    more: "2 +",
  },
  {
    title: "Design Review",
    time: "3:00 PM",
    date: "2025-08-04",
    duration: "1 hour",
    attendees: ["/avatar8.png", "/avatar9.png"],
    more: "1 +",
  },
  {
    title: "Backend Sync",
    time: "11:00 AM",
    date: "2025-08-05",
    duration: "30 min",
    attendees: ["/avatar10.png", "/avatar11.png"],
    more: "1 +",
  },
];

export default function CreatedEvents() {
  const [showAll, setShowAll] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const visibleEvents = showAll ? events : events.slice(0, 4);

  return (
    <Paper
            sx={{
              borderRadius: 4,
              p: 2,
              bgcolor: "white",
              height: "100%",
              width: "100%",
              overflow: "hidden",
              boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.1)",
            }}
          >
      {/* Add New Event Button */}
      <Button
        variant="contained"
        fullWidth
        startIcon={<AddIcon />}
        onClick={() => setOpenModal(true)}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          mb: 2,
          bgcolor: "#4880FF57",
        }}
      >
        Add New Event
      </Button>

      {/* Heading */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Created Events
      </Typography>
      <Divider />

      {/* Events List */}
      <Stack spacing={3} mt={2} maxHeight={showAll ? 500 : "auto"} overflow="auto">
        {visibleEvents.map((event, index) => (
          <Box key={index}>
            <Stack direction="row" spacing={1} alignItems="start">
              <Avatar src={event.attendees[0]} />
              <Box>
                <Typography fontWeight={600}>{event.title}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {event.time}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Date: {event.date}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  Duration: {event.duration}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} mt={1}>
                  <AvatarGroup
                    max={3}
                    sx={{ "& .MuiAvatar-root": { width: 24, height: 24 } }}
                  >
                    {event.attendees.map((src, idx) => (
                      <Avatar key={idx} src={src} />
                    ))}
                  </AvatarGroup>
                  <Typography color="#4880FF">{event.more}</Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>

      {/* See More Button */}
      {!showAll && events.length > 4 && (
        <Box textAlign="center" mt={3}>
          <Button
            variant="outlined"
            onClick={() => setShowAll(true)}
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            See More
          </Button>
        </Box>
      )}

      {/* Modal for Adding New Event */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          p={4}
          bgcolor="background.paper"
          borderRadius={2}
          boxShadow={4}
          width={400}
          mx="auto"
          mt={10}
        >
          <Typography variant="h6" mb={2}>
            Add New Event
          </Typography>
          <Stack spacing={2}>
            <TextField label="Title" fullWidth />
            <TextField label="Date" fullWidth type="date" InputLabelProps={{ shrink: true }} />
            <TextField label="Time" fullWidth type="time" InputLabelProps={{ shrink: true }} />
            <TextField label="Duration" fullWidth />
            <Button variant="contained" onClick={() => setOpenModal(false)}>
              Save Event
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Paper>
  );
}
