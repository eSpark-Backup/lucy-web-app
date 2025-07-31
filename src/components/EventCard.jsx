import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import edit from "../assets/icons/edit.svg";
import view from "../assets/icons/view.svg";
import { componentStyles } from "../style/componentStyles";

const EventCard = ({ title, todayTime, duration, id }) => {
  const { EventListStyles } = componentStyles || {};
  const {
    cardStyle,
    titleAndButtonBoxStyle,
    titleStyle,
    editIconStyle,
    viewIconStyle,
    todayTimeBoxStyle,
    todayTimeTypoStyle,
    durationBoxStyle,
    durationTypoStyle,
  } = EventListStyles || {};
  const navigate = useNavigate();

  const handleClick = (id, click) => {
    if (click === "edit") {
      navigate(`/dashboard/calendar/create-event`);
    } else {
      navigate(`/dashboard/calendar/create-event`);
    }
  };

  return (
    <Box sx={cardStyle}>
      <Box sx={titleAndButtonBoxStyle}>
        <Typography variant="h4" sx={titleStyle}>
          {title}
        </Typography>
        <Box display={"flex"}>
          <IconButton
            size="small"
            onClick={() => handleClick(id, "edit")}
            sx={editIconStyle}
          >
            <Box component={"img"} src={edit} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClick(id, "view")}
            sx={viewIconStyle}
          >
            <Box component={"img"} src={view} />
          </IconButton>
        </Box>
      </Box>
      <Stack direction="row" spacing={1} mt={1}>
        <Box sx={todayTimeBoxStyle}>
          <Typography variant="h6" sx={todayTimeTypoStyle}>
            {todayTime}
          </Typography>
        </Box>
        <Box sx={durationBoxStyle}>
          <Typography variant="h6" sx={durationTypoStyle}>
            {duration}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default EventCard;
