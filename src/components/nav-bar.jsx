import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { logo } from "../assets";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const [activeItem, setActiveItem] = useState("home");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        borderBottom: "0.3px solid #726E6E",
        backgroundColor: "#FFF",
      }}
    >
      <Container maxWidth="xl">
        <AppBar
          position="static"
          sx={{
            color: "black",
            boxShadow: "none",

            backgroundColor: "inherit",
            py: "10px",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <img src={logo} alt="Logo" />
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "21px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: activeItem === "home" ? "#3A3535" : "#94969E",
                    cursor: "pointer",
                    fontFamily: '"Aoboshi One", serif',
                  }}
                >
                  <Link
                    to="home"
                    smooth={true}
                    onClick={() => setActiveItem("home")}
                  >
                    Home
                  </Link>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: activeItem === "edu" ? "#3A3535" : "#94969E",
                    cursor: "pointer",
                    fontFamily: '"Aoboshi One", serif',
                  }}
                >
                  <Link
                    to="edu"
                    smooth={true}
                    onClick={() => setActiveItem("edu")}
                  >
                    Edupulse
                  </Link>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: activeItem === "wait" ? "#3A3535" : "#94969E",
                    cursor: "pointer",
                    fontFamily: '"Aoboshi One", serif',
                  }}
                >
                  <Link
                    to="wait"
                    smooth={true}
                    offset={-70}
                    onClick={() => setActiveItem("wait")}
                  >
                    Waitlist
                  </Link>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: activeItem === "services" ? "#3A3535" : "#94969E",
                    cursor: "pointer",
                    fontFamily: '"Aoboshi One", serif',
                  }}
                >
                  <Link
                    to="services"
                    smooth={true}
                    onClick={() => setActiveItem("services")}
                  >
                    Services
                  </Link>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: activeItem === "about" ? "#3A3535" : "#94969E",
                    cursor: "pointer",
                    fontFamily: '"Aoboshi One", serif',
                  }}
                >
                  <Link
                    to="about"
                    smooth={true}
                    onClick={() => setActiveItem("about")}
                  >
                    About
                  </Link>
                </Typography>
                {/* <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color:
                      activeItem === "testimonials" ? "#3A3535" : "#94969E",
                    cursor: "pointer",
                    fontFamily: '"Aoboshi One", serif',
                  }}
                >
                  <Link
                    to="testimonials"
                    smooth={true}
                    onClick={() => setActiveItem("testimonials")}
                  >
                    Testimonials
                  </Link>
                </Typography> */}
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {isMobile ? (
                <>
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuOpen}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem
                      onClick={handleMenuClose}
                      sx={{ fontFamily: '"Aoboshi One", serif' }}
                    >
                      <Link
                        to="home"
                        smooth={true}
                        onClick={() => {
                          setActiveItem("home");
                          handleMenuClose();
                        }}
                      >
                        Home
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={handleMenuClose}
                      sx={{ fontFamily: '"Aoboshi One", serif' }}
                    >
                      <Link
                        to="edu"
                        smooth={true}
                        onClick={() => {
                          setActiveItem("edu");
                          handleMenuClose();
                        }}
                      >
                        Edupulse
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={handleMenuClose}
                      sx={{ fontFamily: '"Aoboshi One", serif' }}
                    >
                      <Link
                        to="wait"
                        smooth={true}
                        offset={-70}
                        onClick={() => {
                          setActiveItem("wait");
                          handleMenuClose();
                        }}
                      >
                        Waitlist
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={handleMenuClose}
                      sx={{ fontFamily: '"Aoboshi One", serif' }}
                    >
                      <Link
                        to="services"
                        smooth={true}
                        onClick={() => {
                          setActiveItem("services");
                          handleMenuClose();
                        }}
                      >
                        Services
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={handleMenuClose}
                      sx={{ fontFamily: '"Aoboshi One", serif' }}
                    >
                      <Link
                        to="about"
                        smooth={true}
                        onClick={() => {
                          setActiveItem("about");
                          handleMenuClose();
                        }}
                      >
                        About
                      </Link>
                    </MenuItem>
                    {/* <MenuItem
                      onClick={handleMenuClose}
                      sx={{ fontFamily: '"Aoboshi One", serif' }}
                    >
                      <Link
                        to="testimonials"
                        smooth={true}
                        onClick={() => {
                          setActiveItem("testimonials");
                          handleMenuClose();
                        }}
                      >
                        Testimonials
                      </Link>
                    </MenuItem> */}
                    <MenuItem
                      onClick={() => {
                        navigate("/?open=true&step=1");
                        handleMenuClose();
                      }}
                    >
                      <Button
                        variant="primary"
                        disableRipple
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          fontFamily: '"Aoboshi One", serif',
                        }}
                      >
                        Join Wait List
                      </Button>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={() => navigate("/?open=true&step=1")}
                  variant="primary"
                  disableRipple
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    fontFamily: '"Aoboshi One", serif',
                  }}
                >
                  Join Wait List
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
    </Box>
  );
};

export default Navbar;
