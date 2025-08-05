import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import cardImage from "../assets/images/choose-your-path.svg";
import { Box, IconButton, Stack } from "@mui/material";
import edit from "../assets/icons/edit.svg";
import view from "../assets/icons/view.svg";
import { useNavigate } from "react-router-dom";

const EventContentCard = ({ title, description, image }) => {
  const navigate = useNavigate();

  const handleClick = (id, click) => {
    if (click === "edit") {
      navigate(`/dashboard/calendar/create-content/1`);
    } else {
      navigate(`/dashboard/calendar/event-content/1`);
    }
  };
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: { sm: "350px", lg: "359px" },
        backgroundColor: "rgba(255, 255, 255, 0.48)",
        boxShadow: "5px 5px 45px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "11.88px",
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={image || cardImage}
        sx={{ objectFit: "fit" }}
        alt="card-img"
      />
      <CardContent sx={{ width: "100%", display: "flex", gap: 2 }}>
        <Stack width={"100%"} spacing={0.8}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 500, fontFamily: "Poppins", color: "#202224" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: 400, color: "#202224", opacity: "60%" }}
          >
            {description}
          </Typography>
        </Stack>
        <Box display={"flex"} flexDirection={"column"}>
          <IconButton
            size="small"
            onClick={() => handleClick(1, "edit")}
            sx={{
              width: "40px",
              height: "32px",
              border: "1px solid #E5E7EB",
              borderBottom: "0px",
              borderRadius: "8px",
              borderBottomRightRadius: "0px",
              borderBottomLeftRadius: "0px",
              padding: "4px",
            }}
          >
            <Box component={"img"} src={edit} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleClick(1, "view")}
            sx={{
              width: "40px",
              height: "32px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              borderTopRightRadius: "0px",
              borderTopLeftRadius: "0px",
              padding: "4px",
            }}
          >
            <Box component={"img"} src={view} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventContentCard;
