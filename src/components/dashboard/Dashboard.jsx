import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Stack,
} from "@mui/material";
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
            width: { xs: "80%", md: "100%" },
          }}
        />
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "clamp(20px, 5vw, 44px)",
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
            width: { xs: "65%", md: "100%" },
          }}
        />
      </Stack>
    </Box>
  );
};

export default Dashboard;
