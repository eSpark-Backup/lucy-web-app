import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import bgImage from "../../assets/images/dashboard-bg.svg";

const AuthLayout = () => {
  // const location = useLocation();
  // const isSignupPage = location?.pathname === "/auth/signup";

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
          px: { xs: 4, md: 5 },
          py: { xs: 5, sm: 6, md: 8 },
          my: { xs: 3, md: 5 },
          // minHeight: isSignupPage
          //   ? { xs: "750px", md: "825px" }
          //   : { xs: "680px", md: "735px" },
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
