import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import bgImage from "../../assets/images/dashboard-bg.svg";

const AuthLayout = () => {
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
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${bgImage})`,
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
          minHeight: { xs: "680px", md: "735px" },
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
