import { Box, Typography, Stack } from "@mui/material";
import congrats from "../../assets/images/congrats.png";
import logo from "../../assets/images/logo.png";
import { componentStyles } from "../../style/componentStyles";
import { DASHBOARD_DATA } from "../../constant";
import { motion } from "framer-motion";

const Dashboard = () => {
  const MotionBox = motion(Box);
  const { text } = DASHBOARD_DATA || {};
  const { DashboardScreenStyle } = componentStyles || {};
  const { mainBoxStyle, imageStyle, textStyle, logoImageStyle } =
    DashboardScreenStyle || {};

  return (
    <Box sx={mainBoxStyle}>
      <Stack spacing={2} justifyContent={"center"} alignItems={"center"}>
        <MotionBox
          component={"img"}
          src={congrats}
          sx={imageStyle}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <Typography sx={textStyle}>{text}</Typography>
        <Box component={"img"} src={logo} sx={logoImageStyle} />
      </Stack>
    </Box>
  );
};

export default Dashboard;
