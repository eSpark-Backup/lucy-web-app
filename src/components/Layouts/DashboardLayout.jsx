import { styled, Box } from "@mui/material";
import { useState } from "react";
import SideNav from "../SideNav";
import Navbar from "../Navbar";
import { Outlet, useLocation } from "react-router-dom";
import bgLogo from "../../assets/images/background-logo.svg";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  overflow: "hidden",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  overflow: "hidden",
  backgroundColor: "rgba(245, 246, 250, 1)",
  paddingTop: "70px",
}));

export default function RootLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <SideNav
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper>
        {/* ------------------------------------------- */}
        {/* Header */}
        <Navbar
          isSidebarOpen={isSidebarOpen}
          openMobileSidebar={setMobileSidebarOpen}
        />
        {/* ------------------------------------------- */}
        {/* Page Route */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            height: "calc(100vh - 70px)", // 70px = navbar height
            overflowY: "auto", // vertical scroll
            background: `url(${pathname === "/dashboard" ? null : bgLogo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "80%",
            backgroundPosition: "center",
          }}
        >
          <Outlet />
        </Box>
        {/* ------------------------------------------- */}
        {/* End Page */}
        {/* ------------------------------------------- */}
      </PageWrapper>
    </MainWrapper>
  );
}
