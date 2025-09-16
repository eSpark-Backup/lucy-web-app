import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import bgLogo from "../../assets/images/background-logo.svg";
import { componentStyles } from "../../style/componentStyles";
import SideNav from "../SideNav";
import Navbar from "../Navbar";
import { motion } from "framer-motion";

export default function RootLayout() {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { DashboardLayoutStyle } = componentStyles || {};
  const { mainWrapper, pageWrapper, childrenStyle } =
    DashboardLayoutStyle || {};
  const { pathname } = useLocation();

  const MotionBox = motion(Box);

  return (
    <Box sx={mainWrapper} className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <SideNav
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <Box sx={pageWrapper}>
        {/* ------------------------------------------- */}
        {/* Header */}
        <Navbar openMobileSidebar={setMobileSidebarOpen} />
        {/* ------------------------------------------- */}
        {/* Page Route */}
        {/* ------------------------------------------- */}
        <MotionBox
          sx={childrenStyle(pathname, bgLogo)}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </MotionBox>
      </Box>
    </Box>
  );
}
