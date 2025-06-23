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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { logo } from "../assets";

const Navbar = () => {
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "0.3px solid #726E6E",
        backgroundColor: "#FBFCFD",
      }}
    >
      <AppBar
        position="static"
        sx={{
          color: "black",
          boxShadow: "none",
          width: { xs: "100%", md: "90%" },
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
                  <MenuItem onClick={handleMenuClose}>Home</MenuItem>
                  <MenuItem onClick={handleMenuClose}>About</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Podcast</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Our Offer</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Publication</MenuItem>
                  <MenuItem onClick={handleMenuClose}>Blog</MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Button variant="primary" disableRipple>
                      Join Wait List
                    </Button>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="primary" disableRipple>
                Join Wait List
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
