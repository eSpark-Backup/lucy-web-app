import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../../assets/images/dashboard-bg.svg";
import { componentStyles } from "../../style/componentStyles";

const MotionBox = motion(Box);

const AuthLayout = () => {
  const { AuthLayoutStyle } = componentStyles || {};
  const { mainBoxStyle, innerBoxStyle } = AuthLayoutStyle || {};

  return (
    <MotionBox
      sx={mainBoxStyle(bgImage)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      <MotionBox
        sx={innerBoxStyle}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Outlet />
      </MotionBox>
    </MotionBox>
  );
};

export default AuthLayout;
