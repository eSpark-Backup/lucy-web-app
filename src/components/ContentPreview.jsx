import { Box, Typography, Stack } from "@mui/material";
import cardImage from "../assets/images/choose-your-path.svg";

const ContentPreview = ({ title, date, image, description }) => {
  return (
    <Box
      sx={{
        maxWidth: "900px",
        p: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(255, 255, 255, 0.48)",
        boxShadow: "5px 5px 45px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "11.88px",
        gap: 3,
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        sx={{ fontWeight: 600, fontFamily: "Poppins", lineHeight: 1.3 }}
      >
        {title}
      </Typography>

      {/* Date */}
      <Typography variant="body2" sx={{ color: "#6b7280", fontSize: "14px" }}>
        {new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>

      {/* Image */}
      <Box
        component="img"
        src={image || cardImage}
        alt={title}
        sx={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: "12px",
          boxShadow: 2,
        }}
      />

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          fontSize: "16px",
          lineHeight: 1.7,
          color: "#202224",
          opacity: 0.9,
          fontWeight: 400,
          fontFamily: "Nunito Sans",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ContentPreview;
