import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import cardImage from "../assets/images/choose-your-path.svg";
import edit from "../assets/icons/edit.svg";
import view from "../assets/icons/view.svg";
import bin from "../assets/icons/bin.svg";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export default function RecipeReviewCard({
  school = {},
  handleOpenDeleteModal = () => {},
}) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 325 },
        backgroundColor: "rgba(255, 255, 255, 0.48)",
        boxShadow: "5px 5px 45px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "11.88px",
      }}
    >
      <CardHeader
        title={
          school?.name
            ? school.name.split(" ").slice(0, 2).join(" ") +
              (school.name.split(" ").length > 2 ? "..." : "")
            : "No Name"
        }
        subheader={
          school?.created_at
            ? dayjs(school.created_at).tz(dayjs.tz.guess()).format("L LT")
            : ""
        }
        titleTypographyProps={{
          sx: {
            color: "#202224",
            opacity: 0.9,
            fontWeight: 500,
            fontFamily: "Poppins",
            mb: 1,
            pr: 1.5,
          },
          variant: "h5",
        }}
        subheaderTypographyProps={{
          variant: "body2",
          sx: {
            fontFamily: "Poppins",
          },
        }}
        action={
          <Box
            sx={{
              bgcolor: school?.is_paid ? "#4caf50" : "#f44336",
              color: "white",
              px: 1.5,
              py: 0.5,
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: 600,
              fontFamily: "Poppins",
              textTransform: "uppercase",
            }}
          >
            {school?.is_paid ? "Paid" : "Unpaid"}
          </Box>
        }
      />

      <CardMedia
        component="img"
        height="194"
        image={school?.image || cardImage}
        alt={school?.name}
      />
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            color: "#202224",
            opacity: "60%",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {school?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton disableRipple onClick={handleOpenDeleteModal}>
          <Box component="img" src={bin} sx={{ width: "60%" }} />
        </IconButton>
        <IconButton
          disableRipple
          onClick={() =>
            navigate(`/dashboard/school-overview/preview/${school?.id}`)
          }
        >
          <Box component="img" src={view} />
        </IconButton>
        <IconButton
          disableRipple
          onClick={() =>
            navigate(`/dashboard/school-overview/edit/${school?.id}`)
          }
        >
          <Box component="img" src={edit} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
