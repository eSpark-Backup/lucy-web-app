import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import edit from "../assets/icons/edit.svg";
import view from "../assets/icons/view.svg";
import { componentStyles } from "../style/componentStyles";

const EventCard = ({ title, duration, id, is_public = false }) => {
  const { EventListStyles } = componentStyles || {};
  const {
    cardStyle,
    titleAndButtonBoxStyle,
    titleStyle,
    editIconStyle,
    viewIconStyle,
    durationBoxStyle,
    durationTypoStyle,
  } = EventListStyles || {};
  const navigate = useNavigate();

  const handleClick = (id, click) => {
    if (click === "edit") {
      navigate(`/dashboard/calendar/events/${id}`);
    } else {
      navigate({
        pathname: `/dashboard/calendar/events/${id}`,
        search: "?mode=preview",
      });
    }
  };

  return (
    <Box sx={cardStyle}>
      {is_public && (
        <Box
          component="span"
          sx={{
            px: 1,
            py: 0.3,
            fontSize: "0.7rem",
            fontWeight: 600,
            backgroundColor: "error.main",
            color: "#fff",
            borderRadius: "4px",
            position: "absolute",
            letterSpacing: 0.5,
            left: 0,
            top: 0,
          }}
        >
          Awareness Event
        </Box>
      )}
      <Box sx={titleAndButtonBoxStyle}>
        <Typography variant="h5" sx={titleStyle}>
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
      <Stack
        direction={"row"}
        gap={1}
        sx={{
          "@media(max-width: 400px)": {
            flexDirection: "column",
            gap: 1,
          },
        }}
        mt={1}
      >
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
