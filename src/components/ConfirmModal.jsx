import { Box, Button, Modal, Stack, Typography } from "@mui/material";

const ConfirmModal = ({
  open,
  handleClose,
  sx,
  children,
  handleCancel,
  handleAccept,
  heading,
  description,
  button2Text,
  loading,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {
            xs: "95%",
            md: "70%",
            lg: "40%",
          },
          maxHeight: "90vh",
          background: "#FFF",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: "420px",
          "&:focus-visible": { border: "none", outline: "none" },
          ...sx,
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: "calc(100% - 130px)",
            overflowY: "auto",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
            width: { xs: "100%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Stack spacing={1}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "600",
                textAlign: "left",
              }}
            >
              {heading}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "400",
                textAlign: "left",
                color: "#ADADAD",
              }}
            >
              {description}
            </Typography>
          </Stack>
          {children}
        </Box>

        <Stack direction={"row"} spacing={{ xs: 1.5, sm: 2.5 }} mt={2}>
          <Button
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              height: "44px",
              color: "#454545",
              border: "1px solid #373838",
              fontSize: "16px",
              my: "0px",
              textTransform: "none",
            }}
            disableRipple
            onClick={handleCancel}
          >
            {"Cancel"}
          </Button>
          <Button
            loading={loading}
            disabled={loading}
            variant="delete"
            disableRipple
            onClick={handleAccept}
          >
            {button2Text}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
