import { createTheme, responsiveFontSizes } from "@mui/material";
import { componentStyles } from "./style/componentStyles";

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1440,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#F2F8FD",
      light: "#FFFFFF",
      dark: "#000000",
    },
    secondary: {
      main: "#F2F8FD",
    },
  },
  typography: {
    fontFamily: ["Gilroy", "Nunito Sans", "Poppins", "sans-serif"].join(", "),
    gradientText: {
      background: "linear-gradient(180deg, #4D76FF 0%, #1A4FFF 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    h1: { fontSize: "46px", fontWeight: 700 },
    h2: { fontSize: "32px", fontWeight: 700 },
    h3: { fontSize: "24px", fontWeight: 600 },
    h4: { fontSize: "22px", fontWeight: 600 },
    h5: { fontSize: "18px", fontWeight: 600 },
    h6: { fontSize: "14px", fontWeight: 500 },
    body1: { fontSize: "16px", fontWeight: 500 },
    body2: { fontSize: "12px", fontWeight: 400 },
  },
  components: {
    MuiModal: {
      defaultProps: {
        closeAfterTransition: true,
        disableAutoFocus: true,
        slotProps: {
          backdrop: { timeout: 300 },
        },
      },
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          WebkitOverflowScrolling: "touch",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "#6D686891",
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: "100%",
          fontSize: "16px",
          fontWeight: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          lineHeight: "0px",
          textTransform: "none",
          columnGap: "10px",
        },
      },
      variants: [
        {
          props: { variant: "primary" },
          style: {
            background:
              "linear-gradient(0deg, #194FFF, #194FFF), linear-gradient(180deg, #4D76FF 0%, #1A4FFF 100%)",
            height: "54px",
            color: "#FFFFFF",
            borderRadius: "10.36px",
            "&:hover": {
              background:
                "linear-gradient(0deg, #194FFF, #194FFF), linear-gradient(180deg, #4D76FF 0%, #1A4FFF 100%)",
              color: "#FFF",
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            background: "#FFFFFF",
            height: "54px",
            color: "#3352A1",
            borderRadius: "13.29px",
            border: "none",
            "&:hover": {
              background: "#FFFFFF",
            },
          },
        },
      ],
    },
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
            WebkitBoxShadow: `0 0 0 1000px ${"#F1F4F9"} inset !important`,
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
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     input: {
    //       "&::placeholder": {
    //         color: "#1A4FFF",
    //         fontWeight: "400",
    //         opacity: 1,
    //         fontSize: "14px",
    //       },
    //     },
    //     root: {
    //       opacity: 1,
    //       border: "1px solid #E2DBFA",
    //       width: "100%",
    //       outline: "none",
    //       padding: "0px 20px",
    //       fontSize: "14px",
    //       color: "#1A4FFF",
    //       fontWeight: 400,
    //       borderRadius: "10.66px",
    //       backgroundColor: "#F4F1FD",
    //       height: "50px",
    //       ":focus": {
    //         border: "none",
    //       },
    //       fieldset: {
    //         border: 0,
    //       },
    //     },
    //   },
    // },
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          maxWidth: "1596px",
        },
      },
    },
    customComponents: {
      ...componentStyles,
    },
  },
});

theme = responsiveFontSizes(theme);

export { theme };
