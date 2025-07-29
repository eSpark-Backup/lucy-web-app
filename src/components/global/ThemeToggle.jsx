"use client";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";
import { useThemeMode } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeMode();
  return (
    <IconButton
      sx={{ position: "absolute", top: 10, right: 10 }}
      onClick={toggleTheme}
      color="inherit"
    >
      {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
