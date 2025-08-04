import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ openMobileSidebar }) => {
  const user = useSelector((state) => state.auth.profile); 
  console.log("User in Navbar:", user); // Debugging line to check user data
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
      <Toolbar
        disableGutters
        sx={{ justifyContent: { xs: "space-between", md: "flex-end" } }}
      >
        <IconButton
          onClick={() => openMobileSidebar(true)}
          edge="start"
          sx={{
            display: { xs: "flex", md: "none" },
            color: "#000",
            mr: 2,
          }}
        >
          <MenuOpenIcon style={{ fontSize: "35px" }} />
        </IconButton>
        <Box display="flex" alignItems="center" gap={2}>
          <Link to={"/dashboard/profile"} style={{ textDecoration: "none" }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={user?.profileImage || "/src/assets/icons/Profile.svg"}
                alt={user?.fistName || "User Avatar"}
                sx={{ width: { sm: 37, md: 40 }, height: { sm: 37, md: 40 } }}
              />
              <Box
                textAlign="left"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 700,
                    color: "#404040",
                  }}
                >
                  {user?.fistName || "Syed Hasni"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    color: "#404040",
                  }}
                >
                  {user?.email || "test@test.com"}
                </Typography>
              </Box>
              <IconButton
                disableRipple
                size="small"
                sx={{
                  width: { xs: "23px", md: "25px" },
                  height: { xs: "23px", md: "25px" },
                  border: "0.2px solid #5C5C5C",
                  opacity: "50%",
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
