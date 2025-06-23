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
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        borderBottom: "0.3px solid #726E6E",
        backgroundColor: "#FBFCFD",
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
                  onClick={() => setActiveItem("home")}
                >
                  Home
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: activeItem === "about" ? "#3A3535" : "#94969E",
                    cursor: "pointer",
                    fontFamily: '"Aoboshi One", serif',
                  }}
                  onClick={() => setActiveItem("about")}
                >
                  About
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: activeItem === "podcast" ? "#3A3535" : "#94969E",
                    cursor: "pointer",
                    fontFamily: '"Aoboshi One", serif',
                  }}
                  onClick={() => setActiveItem("podcast")}
                >
                  Podcast
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: activeItem === "offer" ? "#3A3535" : "#94969E",
                    cursor: "pointer",
                    fontFamily: '"Aoboshi One", serif',
                  }}
                  onClick={() => setActiveItem("offer")}
                >
                  Our Offer
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: activeItem === "publication" ? "#3A3535" : "#94969E",
                    cursor: "pointer",
                    fontFamily: '"Aoboshi One", serif',
                  }}
                  onClick={() => setActiveItem("publication")}
                >
                  Publication
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "400",
                    color: activeItem === "blog" ? "#3A3535" : "#94969E",
                    cursor: "pointer",
                    fontFamily: '"Aoboshi One", serif',
                  }}
                  onClick={() => setActiveItem("blog")}
                >
                  Blog
                </Typography>
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
                      Home
                    </MenuItem>
                    <MenuItem
                      onClick={handleMenuClose}
                      sx={{ fontFamily: '"Aoboshi One", serif' }}
                    >
                      About
                    </MenuItem>
                    <MenuItem
                      onClick={handleMenuClose}
                      sx={{ fontFamily: '"Aoboshi One", serif' }}
                    >
                      Podcast
                    </MenuItem>
                    <MenuItem
                      onClick={handleMenuClose}
                      sx={{ fontFamily: '"Aoboshi One", serif' }}
                    >
                      Our Offer
                    </MenuItem>
                    <MenuItem
                      onClick={handleMenuClose}
                      sx={{ fontFamily: '"Aoboshi One", serif' }}
                    >
                      Publication
                    </MenuItem>
                    <MenuItem
                      onClick={handleMenuClose}
                      sx={{ fontFamily: '"Aoboshi One", serif' }}
                    >
                      Blog
                    </MenuItem>
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
