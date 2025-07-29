"use client";
import { createContext, useEffect, useMemo, useState, useContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import getTheme from "../../theme/theme";

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(null);

  useEffect(() => {
    const savedMode = localStorage?.getItem("themeMode") || "light";
    setMode(savedMode);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    localStorage?.setItem("themeMode", newMode);
    setMode(newMode);
  };

  const theme = useMemo(() => getTheme(mode || "light"), [mode]);

  if (!mode) return null;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
