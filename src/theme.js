import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 601,
      md: 769,
      lg: 1281,
      xl: 1596,
    },
  },
  palette: {
    primary: {
      main: "#F2F8FD",
      light: "#FFFFFF",
      dark: "#000000",
    },
  },
  typography: {
    fontFamily: "'Gilroy', sans-serif",
    gradientText: {
      background: "linear-gradient(180deg, #4D76FF 0%, #1A4FFF 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },

  components: {
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

    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            color: "#1A4FFF",
            fontWeight: "400",
            opacity: 1,
            fontSize: "14px",
          },
        },
        root: {
          opacity: 1,
          border: "1px solid #E2DBFA",
          width: "100%",
          outline: "none",
          padding: "0px 20px",
          fontSize: "14px",
          color: "#1A4FFF",
          fontWeight: 400,
          borderRadius: "10.66px",
          backgroundColor: "#F4F1FD",
          height: "50px",
          ":focus": {
            border: "none",
          },
          fieldset: {
            border: 0,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          maxWidth: "1596px",
        },
      },
    },
  },
});
