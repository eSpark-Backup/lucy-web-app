import { Box, Button, Stack, Typography } from "@mui/material";
import NotFoundImage from "../assets/images/404.svg";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/images/dashboard-bg.svg";
import { componentStyles } from "../style/componentStyles";
import { GOTLOST } from "../constant";

const NotFound = () => {
  const { title, buttonText } = GOTLOST || {};
  const { authTitleStyle, authButtonStyle, authButtonTypoStyle } =
    componentStyles || {};
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${bgImage})`,
        backgroundColor: "#4880FF",
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "auto",
          maxWidth: "630px",
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, md: 5 },
          py: { xs: 3, md: 8 },
          my: { xs: 3, md: 5 },
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Stack alignItems="center" justifyContent="center">
            <Box
              component={"img"}
              src={NotFoundImage}
              sx={{ width: { xs: "85%", sm: "90%", md: "100%" } }}
            />
          </Stack>
          <Stack spacing={5} alignItems="center" justifyContent="center">
            <Typography variant="h2" sx={authTitleStyle}>
              {title}
            </Typography>
            <Button
              type="submit"
              fullWidth
              sx={authButtonStyle}
              onClick={handleClick}
            >
              <Typography variant="h5" sx={authButtonTypoStyle}>
                {buttonText}
              </Typography>
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
