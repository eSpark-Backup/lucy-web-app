import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import notification from "../assets/images/sidebar/notification.svg";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const Navbar = ({ isSidebarOpen, openMobileSidebar }) => {
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  const [anchorNotifMenu, setAnchorNotifMenu] = useState(null);

  const openUserMenu = Boolean(anchorUserMenu);
  const openNotifMenu = Boolean(anchorNotifMenu);

  const handleUserMenuOpen = (e) => setAnchorUserMenu(e.currentTarget);
  const handleUserMenuClose = () => setAnchorUserMenu(null);

  const handleNotifMenuOpen = (e) => setAnchorNotifMenu(e.currentTarget);
  const handleNotifMenuClose = () => setAnchorNotifMenu(null);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e0e0e0",
        px: 2,
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: "flex-end" }}>
        <IconButton
          onClick={() => openMobileSidebar(true)}
          edge="start"
          sx={{
            color: "#000",
            fontSize: "24px",
            mr: 2,
          }}
        >
          <MenuOpenIcon />
        </IconButton>

        <Box display="flex" alignItems="center" gap={2}>
          <Badge
            color="error"
            badgeContent={3}
            overlap="circular"
            onClick={handleNotifMenuOpen}
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "10px",
                minWidth: "18px",
                height: "18px",
                padding: "0 4px",
                backgroundColor: "rgba(249, 60, 101, 0.91)",
              },
            }}
          >
            <Box src={notification} component={"img"} />
          </Badge>

          {/* 👤 User Profile */}
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar
              src="https://i.ibb.co/6B7bK6b/moni.jpg"
              alt="Moni Roy"
              sx={{ width: 40, height: 40 }}
            />
            <Box textAlign="left">
              <Typography variant="subtitle1" fontWeight={600}>
                Moni Roy
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Admin
              </Typography>
            </Box>
            <IconButton
              disableRipple
              size="small"
              sx={{
                width: "25px",
                height: "25px",
                border: "0.2px solid #5C5C5C",
                opacity: "50%",
              }}
              onClick={handleUserMenuOpen}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>

        {/* 📜 User Menu */}
        <Menu
          anchorEl={anchorUserMenu}
          open={openUserMenu}
          onClose={handleUserMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          disableScrollLock
          slotProps={{
            paper: {
              sx: {
                backdropFilter: "none !important",
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 3,
              },
            },
          }}
        >
          <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
        </Menu>

        {/* 📩 Notification Menu */}
        <Menu
          anchorEl={anchorNotifMenu}
          open={openNotifMenu}
          onClose={handleNotifMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          disableScrollLock
          slotProps={{
            paper: {
              sx: {
                backdropFilter: "none !important",
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 3,
              },
            },
          }}
        >
          <MenuItem onClick={handleNotifMenuClose}>
            📩 New message received
          </MenuItem>
          <MenuItem onClick={handleNotifMenuClose}>
            ⚙️ System update available
          </MenuItem>
          <MenuItem onClick={handleNotifMenuClose}>
            🛎️ Alert: Action required
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
