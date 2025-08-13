import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import bgImage from "../../assets/images/dashboard-bg.svg";
import { componentStyles } from "../../style/componentStyles";

const AuthLayout = () => {
  const { AuthLayoutStyle } = componentStyles || {};
  const { mainBoxStyle, innerBoxStyle } = AuthLayoutStyle || {};
  return (
    <Box sx={mainBoxStyle(bgImage)}>
      <Box sx={innerBoxStyle}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
