import {
  Box,
  Paper,
  Typography,
  Stack,
  Divider,
  Popper,
  Modal,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useNavigate } from "react-router-dom";

const ModalCard = ({ openModal, setOpenModal }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="date-modal-title"
      aria-describedby="date-modal-description"
    >
      <Paper
        sx={{
          width: 260,
          borderRadius: 3,
          p: 2,
        }}
      >
        <Typography fontWeight="600" fontSize={14} mb={1}>
          Select Purpose
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Stack spacing={2}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => handleNavigate(`/dashboard/calendar/events/add?date=${openModal}`)}
          >
            <CalendarMonthIcon sx={{ color: "#EA64D9" }} />
            <Box>
              <Typography fontWeight="600">Create Event</Typography>
              <Typography fontSize={12} color="gray">
                Add Event Information
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
};
export default ModalCard;
