import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { darkColors, lightColors } from "./colors";
import { componentStyles } from "../style/componentStyles";

const getDesignTokens = (mode) => {
  const colors = mode === "dark" ? darkColors : lightColors;

  return {
    palette: {
      mode,
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      background: {
        default: colors.background,
        paper: colors.paper,
      },
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
      },
      border: {
        main: colors.border,
      },
    },
    typography: {
      fontFamily: "'Nunito Sans', 'Poppins', sans-serif",
      h1: { fontSize: "46px", fontWeight: 700 },
      h2: { fontSize: "32px", fontWeight: 700 },
      h3: { fontSize: "24px", fontWeight: 600 },
      h4: { fontSize: "22px", fontWeight: 600 },
      h5: { fontSize: "18px", fontWeight: 600 },
      h6: { fontSize: "14px", fontWeight: 500 },
      button: { textTransform: "none", fontWeight: 500 },
      body1: {
        fontSize: "16px",
        fontWeight: 500,
      },
      body2: {
        fontSize: "12px",
        fontWeight: 400,
      },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            border: "1px solid #ccc",
            borderRadius: 8,
            padding: 0,
          },
          input: {
            padding: 0,
            height: "100%",
            fontSize: "18px",
            "&:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 1000px ${
                mode === "dark" ? "#1e1e1e" : "#F1F4F9"
              } inset !important`,
              WebkitTextFillColor: mode === "dark" ? "#F1F4F9" : "#A6A6A6",
              transition: "background-color 5000s ease-in-out 0s",
              fontSize: "18px",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            padding: 0,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
          input: {
            padding: 0,
          },
          notchedOutline: {
            border: "none",
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
            transform: "none",
            position: "static",
            marginBottom: "4px",
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            height: "auto !important",
            "& .MuiDataGrid-cellCheckbox": {
              display: "none",
            },
            "& .MuiDataGrid-columnHeaderCheckbox": {
              display: "none",
            },
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              justifyContent: "space-between",
            },
            "& .MuiDataGrid-virtualScroller": {
              overflow: "auto",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
              backgroundColor: "red",
              borderRadius: "4px",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
            },
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: "none",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: colors.primary,
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "4px",
            },
          },
        },
      },
    },
    customComponents: {
      ...componentStyles,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1440,
        xl: 1920,
      },
    },
    transitions: {
      easing: {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      },
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    zIndex: {
      mobileStepper: 1000,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },
  };
};

const getTheme = (mode = "light") =>
  responsiveFontSizes(createTheme(getDesignTokens(mode)));

export default getTheme;
