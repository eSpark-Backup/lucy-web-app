import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../assets/images/lucy-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SIDEBAR } from "../constant";
import { logout } from "../store/slices/auth";
import ConfirmModal from "./ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const { sidebarLink, profileLink, LogoutButton } = SIDEBAR || {};
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state?.auth);
  const is_trust = user?.profile?.organization?.is_trust ?? true;

  const isActive =
    pathname === profileLink?.link ||
    pathname === `${profileLink?.link}/` ||
    pathname.startsWith(profileLink?.link);

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
          {sidebarLink
            ?.filter((item) => !(item?.text === "Calendar" && is_trust))
            ?.map(({ text, link, icon }, index) => {
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
        <Link to={profileLink?.link} style={{ textDecoration: "none" }}>
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
                src={profileLink?.icon}
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
                {profileLink?.text}
              </Typography>
            </Box>
          </Box>
        </Link>
        <Box
          sx={{
            width: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            onClick={() => setOpenLogoutModal(true)}
            sx={{
              mx: "auto",
              // width: "fit-content",
              maxWidth: "192px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 2,
              px: 2.5,
              mt: 1,
            }}
          >
            <Box src={LogoutButton?.icon} component={"img"} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: "#000000",
                fontFamily: "Poppins",
              }}
            >
              {LogoutButton?.text}
            </Typography>
          </Box>
        </Box>
      </Box>
      <ConfirmModal
        open={openLogoutModal}
        handleClose={() => setOpenLogoutModal(false)}
        description="Are you sure you want to logout?"
        handleCancel={() => setOpenLogoutModal(false)}
        handleAccept={() => {
          dispatch(logout());
          navigate("/auth/login");
        }}
        heading="Logout"
        button2Text="Logout"
      />
    </Box>
  );
};

export default Sidebar;
