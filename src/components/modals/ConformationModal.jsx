import { Modal, Box, Typography, Button } from "@mui/material";
import { theme } from "../../theme";

const ConformationModal = ({
  open = false,
  onClose = () => {},
  title = "Are you sure you want to Delete ?",
  description = "",
  handleDelete = () => {},
  isLoading = false,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          p: "32px",
          minHeight: "244px",
          borderRadius: "10px",
          width: { xs: "80%", sm: "100%" },
          maxWidth: { xs: "450px", sm: "500px", lg: "640px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Box sx={{ fontFamily: theme.typography.fontFamily }}>
          <Typography variant="h3" sx={{ pb: "10px" }}>
            {title}
          </Typography>
          <Typography
            sx={{
              color: "darkslategray",
              maxWidth: { xs: "90%", sm: "385px" },
              fontSize: { xs: "14px", sm: "16px" },
            }}
          >
            {description}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: { xs: "10px", sm: "16px" } }}>
          <Button
            onClick={onClose}
            sx={{
              width: "280px",
              height: { xs: "40px", sm: "45px", md: "48px" },
              fontWeight: 400,
              borderRadius: "8px",
              border: "1px solid #000",
              px: "20px",
              py: "14px",
              fontSize: "16px",
              color: "#000",
              textTransform: "capitalize",
            }}
          >
            cancel
          </Button>
          <Button
            loading={isLoading}
            onClick={handleDelete}
            disabled={isLoading}
            variant="delete"
            sx={{
              width: "280px",
              height: { xs: "40px", sm: "45px", md: "48px" },
              borderRadius: "8px",
              border: "1px solid red",
              px: "20px",
              py: "14px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#FF0000",
              textTransform: "capitalize",
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConformationModal;
