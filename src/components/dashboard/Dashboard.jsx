import { Box, Typography, Stack } from "@mui/material";
import congrats from "../../assets/images/congrats.png";
import logo from "../../assets/images/logo.png";

const Dashboard = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={2} justifyContent={"center"} alignItems={"center"}>
        <Box
          component={"img"}
          src={congrats}
          sx={{
            mx: "auto",
            maxWidth: "398px",
            width: { xs: "50%", lg: "100%" },
          }}
        />
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "clamp(22px, 6.5vw, 44px)",
            color: "#000000",
          }}
        >
          Welcome To
        </Typography>
        <Box
          component={"img"}
          src={logo}
          sx={{
            mx: "auto",
            maxWidth: "621px",
            width: { xs: "60%", lg: "100%" },
          }}
        />
      </Stack>
    </Box>
  );
};

export default Dashboard;
