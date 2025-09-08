import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 * Props:
 * - label?: string        // Button text (default: "Back")
 * - fallback?: string     // Route to go if no history (default: "/")
 * - iconOnly?: boolean    // Show only icon
 * - confirm?: string      // Optional confirm message before navigating
 * - buttonSx?: object     // sx styles for Button
 * - iconButtonSx?: object // sx styles for IconButton
 */
export default function BackButton({
  label = "Back",
  fallback = "/",
  iconOnly = false,
  confirm,
  buttonSx,
  iconButtonSx,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (confirm && !window.confirm(confirm)) return;

    const idx = window.history.state?.idx ?? 0;
    const canGoBack = window.history.length > 1 && idx > 0;

    if (canGoBack) {
      navigate(-1);
    } else {
      navigate(fallback, { replace: true });
    }
  };

  if (iconOnly) {
    return (
      <Tooltip title={label}>
        <IconButton disableRipple onClick={handleClick} sx={iconButtonSx}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Button
      onClick={handleClick}
      startIcon={<ArrowBackIcon />}
      disableRipple
      sx={{
        mb: 1.5,
        width: "fit-content",
        textTransform: "none",
        color: "#4880FF",
        backgroundColor: "transparent",
        boxShadow: "none",
        opacity: "90%",
        ...buttonSx,
      }}
    >
      <Typography variant="h5" fontWeight={500}>
        {label}
      </Typography>
    </Button>
  );
}
