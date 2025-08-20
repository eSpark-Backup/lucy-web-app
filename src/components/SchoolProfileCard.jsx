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

export default function RecipeReviewCard() {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: { xs: "100%", sm: 325 },
        backgroundColor: "rgba(255, 255, 255, 0.48)",
        boxShadow: "5px 5px 45px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "11.88px",
      }}
    >
      <CardHeader
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        titleTypographyProps={{
          sx: {
            color: "#202224",
            opacity: 0.9,
            fontWeight: 500,
            fontFamily: "Poppins",
          },
          variant: "h5",
        }}
        subheaderTypographyProps={{
          variant: "body2",
          sx: {
            fontFamily: "Poppins",
          },
        }}
      />
      <CardMedia
        component="img"
        height="194"
        image={cardImage}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "#202224", opacity: "60%" }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton disableRipple>
          <Box component="img" src={bin} sx={{ width: "60%" }} />
        </IconButton>
        <IconButton
          disableRipple
          onClick={() => navigate(`/dashboard/school-overview/preview/${1}`)}
        >
          <Box component="img" src={view} />
        </IconButton>
        <IconButton
          disableRipple
          onClick={() => navigate(`/dashboard/school-overview/edit/${1}`)}
        >
          <Box component="img" src={edit} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
