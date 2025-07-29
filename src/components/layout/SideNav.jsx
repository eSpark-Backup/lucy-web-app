import { Backdrop, Box, Drawer, useMediaQuery } from "@mui/material";

export const SideNav = ({ open, onClose }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  if (lgUp) {
    return (
      <>
        <Drawer
          anchor="left"
          open
          PaperProps={
            {
              // sx: drawerPropsStyles,
            }
          }
          variant="permanent"
        >
          <Box sx={{ width: "280px" }}>Sidebar</Box>
        </Drawer>
      </>
    );
  }

  return (
    <Drawer
      disableScrollLock
      disableEnforceFocus
      disableRestoreFocus
      disableAutoFocus
      anchor="left"
      onClose={onClose}
      open={open}
      ModalProps={{ keepMounted: true }}
      BackdropComponent={(props) => <Backdrop {...props} />}
      PaperProps={
        {
          // sx: drawerPropsStyles,
        }
      }
      // sx={mobileDrawerStyles}
      variant="temporary"
    >
      <Box sx={{ width: "280px" }}>Res Sidebar</Box>
    </Drawer>
  );
};
