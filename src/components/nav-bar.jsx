import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { logo } from "../assets";
import { Button, Container, Drawer } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useState } from "react";
import { motion } from "framer-motion";

export default function MenuAppBar() {
  const [open, setOpen] = useState(false);
  const MotionIconButton = motion(IconButton);

  const navLinks = [
    { label: "Features", section: "features" },
    { label: "How it Works", section: "howItWorks" },
    { label: "Testimonials", section: "testimonials" },
    { label: "Pricing", section: "pricing" },
    { label: "Login", path: "https://app.edupulsegpt.com/auth/login" },
  ];
  
  const toggleDrawer = () => setOpen(!open);

  const lineStyle = {
    width: "24px",
    height: "2px",
    background: "#2a4483",
    borderRadius: "2px",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          backgroundColor: "#2a4483",
          minHeight: "20px",
        }}
      />

      <AppBar
        position="static"
        elevation={0}
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          border: "1px solid #d1d1d1",
          padding: { xs: "6px 0", md: "8px 0" },
        }}
      >
        <Container sx={{ maxWidth: { xs: "920px", lg: "1170px" } }}>
          <Toolbar sx={{ padding: "0 !important" }}>
            {/* LOGO */}
            <Box sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  width: "auto",
                  height: { xs: "24px", sm: "26px", lg: "32px" },
                }}
                component={"img"}
                src={logo}
                alt="Logo"
              />
            </Box>

            {/* NAV LINKS */}
            <Box
              display={{ xs: "none", md: "flex" }}
              alignItems="center"
              gap={{ xs: 2.8, sm: 2.5, lg: 6 }}
            >
              {navLinks?.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "12px", md: "13.5px", lg: "16px" },
                      textWrap: "nowrap",
                      fontWeight: "500",
                      cursor: "pointer",
                      "&:hover": {
                        color: "#2a4483",
                      },
                    }}
                  >
                    {item.path ? (
                      <RouterLink
                        to={item.path}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {item.label}
                      </RouterLink>
                    ) : (
                      <ScrollLink
                        to={item.section}
                        smooth
                        duration={800}
                        offset={-80}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {item.label}
                      </ScrollLink>
                    )}
                  </Typography>
                </motion.div>
              ))}

              {/* BOOK DEMO BUTTON */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    backgroundColor: "#2a4483",
                    color: "#fff",
                    fontSize: { xs: "14px", lg: "16px" },
                    fontWeight: "700",
                    borderRadius: "8px",
                    px: 2,
                    py: 1.8,
                  }}
                >
                  Book a Demo
                </Button>
              </motion.div>
            </Box>

            {/* MOBILE MENU */}
            <IconButton
              onClick={toggleDrawer}
              disableRipple
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <Box
                sx={{
                  width: 26,
                  height: 16,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <motion.span
                  style={lineStyle}
                  animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.span
                  style={lineStyle}
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />

                <motion.span
                  style={lineStyle}
                  animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Box>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        elevation={0}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        BackdropProps={{
          sx: {
            backdropFilter: "blur(0)",
          },
        }}
      >
        <Box
          sx={{
            width: 260,
            p: 3,
          }}
        >
          {navLinks?.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
            >
              <Typography
                sx={{
                  py: 1.5,
                  width: "fit-content",
                  fontSize: "16px",
                  fontWeight: 500,
                  cursor: "pointer",
                  "&:hover": {
                    color: "#2a4483",
                  },
                }}
              >
                {item?.path ? (
                  <RouterLink
                    to={item.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={toggleDrawer}
                  >
                    {item.label}
                  </RouterLink>
                ) : (
                  <ScrollLink
                    to={item.section}
                    smooth
                    duration={800}
                    offset={-80}
                    onClick={toggleDrawer}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item.label}
                  </ScrollLink>
                )}
              </Typography>
            </motion.div>
          ))}

          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              disableElevation
              sx={{
                mt: 2,
                backgroundColor: "#2a4483",
                color: "#fff",
                fontSize: { xs: "14px", lg: "16px" },
                fontWeight: "700",
                borderRadius: "8px",
                px: 2,
                py: 1.8,
              }}
            >
              Book a Demo
            </Button>
          </motion.div>
        </Box>
      </Drawer>
    </Box>
  );
}
