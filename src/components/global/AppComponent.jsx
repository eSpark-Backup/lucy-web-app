"use client";
import { StyleContext } from "@/app/context/StyleContext";
import { useTheme } from "@mui/material";

const AppComponent = ({ name = "", children = null }) => {
  const theme = useTheme();
  const styles = theme?.customComponents?.[name] || {};

  return (
    <StyleContext.Provider value={styles}>{children}</StyleContext.Provider>
  );
};

export default AppComponent;
