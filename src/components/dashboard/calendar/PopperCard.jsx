// PopperCard.js
import { Box, Paper, Typography, Stack, Divider, Popper } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

export default function PopperCard({ type, anchorEl, onClose, eventId }) {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-start" sx={{ zIndex: 1000 }}>
      <Paper
        sx={{
          width: 260,
          borderRadius: 3,
          p: 2,
          boxShadow: 6,
        }}
      >
        <Typography fontWeight="600" fontSize={14} mb={1}>
          Select Purpose
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Stack spacing={2}>
          {type === "date" && (
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={() => handleNavigate("/create-event")}
            >
              <CalendarMonthIcon sx={{ color: "#EA64D9" }} />
              <Box>
                <Typography fontWeight="600">Create Event</Typography>
                <Typography fontSize={12} color="gray">
                  Add Event Information
                </Typography>
              </Box>
            </Stack>
          )}

          {type === "event" && (
            <>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ cursor: "pointer" }}
                onClick={() => handleNavigate(`/edit-event/${eventId}`)}
              >
                <CalendarMonthIcon sx={{ color: "#EA64D9" }} />
                <Box>
                  <Typography fontWeight="600">Edit Event</Typography>
                  <Typography fontSize={12} color="gray">
                    Edit Event Information
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ cursor: "pointer" }}
                onClick={() => handleNavigate("/create-event")}
              >
                <SettingsIcon sx={{ color: "#4880FF" }} />
                <Box>
                  <Typography fontWeight="600">Add Content</Typography>
                  <Typography fontSize={12} color="gray">
                    Add new Content or update
                  </Typography>
                </Box>
              </Stack>
            </>
          )}
        </Stack>
      </Paper>
    </Popper>
  );
}
