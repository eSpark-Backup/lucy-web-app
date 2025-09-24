import { forwardRef } from "react";
import { Box, Paper, Typography, Stack, Divider, Popper } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const PopperCard = forwardRef(function PopperCard(
  { type, anchorEl, onClose, eventId },
  ref
) {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <Popper
      ref={ref}
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      sx={{ zIndex: 1000 }}
    >
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
              onClick={() => handleNavigate("/dashboard/calendar/events/add")}
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
                onClick={() =>
                  handleNavigate(`/dashboard/calendar/events/${eventId}`)
                }
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
                onClick={() =>
                  handleNavigate(
                    `/dashboard/calendar/events/${eventId}/contents/add`
                  )
                }
              >
                <SettingsIcon sx={{ color: "#4880FF" }} />
                <Box>
                  <Typography fontWeight="600">Create Content</Typography>
                  <Typography fontSize={12} color="gray">
                    Add new content or update
                  </Typography>
                </Box>
              </Stack>
            </>
          )}
        </Stack>
      </Paper>
    </Popper>
  );
});

export default PopperCard;
