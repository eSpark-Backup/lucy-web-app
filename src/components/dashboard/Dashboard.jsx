import { Box, Typography, Stack } from "@mui/material";
import congrats from "../../assets/images/congrats.png";
import logo from "../../assets/images/logo.png";
import { componentStyles } from "../../style/componentStyles";
import { DASHBOARD_DATA } from "../../constant";

const Dashboard = () => {
  const { text } = DASHBOARD_DATA || {};
  const { DashboardScreenStyle } = componentStyles || {};
  const { mainBoxStyle, imageStyle, textStyle, logoImageStyle } =
    DashboardScreenStyle || {};

  return (
    <Box sx={mainBoxStyle}>
      <Stack spacing={2} justifyContent={"center"} alignItems={"center"}>
        <Box component={"img"} src={congrats} sx={imageStyle} />
        <Typography sx={textStyle}>{text}</Typography>
        <Box component={"img"} src={logo} sx={logoImageStyle} />
      </Stack>
    </Box>
  );
};

export default Dashboard;
