import { Box, Typography } from "@mui/material";
import Logo from "../assets/images/lucy-logo.png";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR } from "../constant";
const Sidebar = () => {
  const { sidebarLink, sibarButtons } = SIDEBAR || {};
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "70px",
            px: 4,
          }}
        >
          <Box component={"img"} src={Logo} sx={{ width: "auto" }} />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {sidebarLink?.map(({ text, link, icon }, index) => {
            const isActive =
              pathname === link ||
              pathname === `${link}/` ||
              (link !== "/dashboard" && pathname.startsWith(link));
            return (
              <Link to={link} key={index} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "5px",
                          height: "100%",
                          backgroundColor: "#4880FF",
                          borderTopRightRadius: "4px",
                          borderBottomRightRadius: "4px",
                        }
                      : undefined,
                  }}
                >
                  <Box
                    sx={{
                      mx: "auto",
                      width: "100%",
                      maxWidth: "192px",
                      height: "50px",
                      backgroundColor: isActive ? "#4880FF" : "transparent",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      px: 2.5,
                    }}
                  >
                    <Box
                      component={"img"}
                      src={icon}
                      sx={{
                        filter: isActive
                          ? "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(1%) hue-rotate(86deg) brightness(103%) contrast(101%)"
                          : "none",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 500,
                        fontFamily: "Poppins",
                        color: isActive ? "#fff" : "#000000",
                      }}
                    >
                      {text}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          borderTop: "1px solid #E0E0E0",
          gap: 2,
          py: 4,
        }}
      >
        {sibarButtons?.map(({ text, link, icon }, index) => (
          <Link to={`${link}`} key={index} style={{ textDecoration: "none" }}>
            <Box
              sx={{
                width: "100%",
                position: "relative",
                overflow: "hidden",
                "&:hover::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "5px",
                  height: "100%",
                  backgroundColor: "#4880FF",
                  borderTopRightRadius: "4px",
                  borderBottomRightRadius: "4px",
                },
              }}
            >
              <Box
                sx={{
                  mx: "auto",
                  width: "100%",
                  maxWidth: "192px",
                  height: "50px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: 2.5,
                  "&:hover": {
                    backgroundColor: "#4880FF",
                    transition: "background 0.1s ease", // smooth hover effect
                  },
                  "&:hover img": {
                    filter:
                      "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(1%) hue-rotate(86deg) brightness(103%) contrast(101%)",
                  },
                  "&:hover h6": {
                    color: "#fff",
                  },
                }}
              >
                <Box src={icon} component={"img"} />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: "#000000",
                    fontFamily: "Poppins",
                  }}
                >
                  {text}
                </Typography>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
