import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Typewriter } from "react-simple-typewriter";

const AiGenerate = ({ open, onClose, enhancedContent, onEdit, onKeep }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { minWidth: { xs: "90%", sm: "70%", md: 1024 } },
      }}
    >
      <DialogTitle>AI Enhanced Content</DialogTitle>
      <DialogContent>
        <Box sx={{ position: "relative", minHeight: "200px", mb: 2 }}>
          <Typography
            component="div"
            sx={{
              visibility: "visible",
              opacity: 1,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <Typewriter words={[enhancedContent]} typeSpeed={10} loop={1} />
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          onClick={onClose}
          variant="delete"
          sx={{ width: "fit-content", px: "10px", height: "50px" }}
        >
          Cancel
        </Button>
        {/* <Button
          onClick={() => onEdit(enhancedContent)}
          variant="secondary"
          sx={{ width: "fit-content", px: "10px", height: "50px" }}
        >
          Edit
        </Button> */}
        <Button
          onClick={() => onKeep(enhancedContent)}
          variant="primary"
          sx={{ width: "fit-content", px: "10px", height: "50px" }}
        >
          Keep
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AiGenerate;
