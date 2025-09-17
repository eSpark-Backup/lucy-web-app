import { Box, Divider, Typography } from "@mui/material";

const FeatureCard = ({ heading, description, img }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
        width: "290px",
      }}
    >
      <img src={img} alt="Icon" style={{ width: "48px", height: "48px" }} />
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "15px" }}>
        <Typography sx={{ fontSize: "24.97px" }}>{heading}</Typography>
        <Divider />
        <Typography sx={{ fontSize: "16.12px" }}>{description}</Typography>
      </Box>
    </Box>
  );
};

export default FeatureCard;
