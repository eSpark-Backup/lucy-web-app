export const componentStyles = {
  //  ... all components styles write here ...

  authInputStyle: {
    "& .MuiInputBase-root": {
      height: { xs: "46px", md: "56px" },
      border: "1px solid #D8D8D8",
      backgroundColor: "#F1F4F9",
      borderRadius: "8px",
      padding: "15px",
    },
    "& input": {
      fontSize: "18px",
      backgroundColor: "#F1F4F9",
      color: "#000",
      "&::placeholder": {
        color: "#A6A6A6",
        opacity: 1,
      },
    },
  },
  authTitleStyle: {
    textAlign: "center",
    fontFamily: "Nunito Sans",
    color: "#202224",
  },
  authDescriptionStyle: {
    textAlign: "center",
    opacity: "80%",
    fontFamily: "Nunito Sans",
    color: "#202224",
    fontWeight: 500,
  },
  authFormStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  authLableStyle: {
    opacity: "80%",
    fontFamily: "Nunito Sans",
    color: "#202224",
    fontWeight: 500,
  },
  authForgetTextStyle: {
    opacity: "80%",
    fontFamily: "Nunito Sans",
    color: "#202224",
    fontWeight: 500,
  },
  authCheckBoxStyle: {
    width: 24,
    height: 24,
    border: "1.5px solid #9B9B9B",
    borderRadius: "6px",
    backgroundColor: "#fff",
  },
  authCheckBoxIconStyle: {
    width: 24,
    height: 24,
    border: "1.5px solid #9B9B9B",
    borderRadius: "6px",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  authCheckBoxSpanStyle: {
    width: 15,
    height: 15,
    backgroundColor: "#5C5C5C",
    maskImage: `url("data:image/svg+xml,%3Csvg fill='none' viewBox='0 0 24 24' stroke='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M5 13l4 4L19 7' /%3E%3C/svg%3E")`,
    WebkitMaskImage: `url("data:image/svg+xml,%3Csvg fill='none' viewBox='0 0 24 24' stroke='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M5 13l4 4L19 7' /%3E%3C/svg%3E")`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
  },
  authCheckBoxLableStyle: {
    textAlign: "center",
    opacity: "80%",
    fontFamily: "Nunito Sans",
    color: "#202224",
    fontWeight: 500,
    ml: 1.5,
  },
  authButtonStyle: {
    color: "#fff",
    height: { xs: "46px", md: "56px" },
    borderRadius: "8px",
    backgroundColor: "#4880FF",
    "&:hover": {
      backgroundColor: "#3a6edc",
    },
  },
  authButtonTypoStyle: {
    fontWeight: 500,
    fontFamily: "Nunito Sans",
  },
  authHaveAnAccountTextStyle: {
    fontWeight: 500,
    opacity: "80%",
    fontFamily: "Nunito Sans",
    color: "#202224",
    textAlign: "center",
  },
  authSignupLinkTextStyle: {
    fontWeight: 700,
    fontFamily: "Nunito Sans",
    ml: 0.5,
  },
};
