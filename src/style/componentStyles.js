export const componentStyles = {
  //  ... all components styles write here ...

  authInputStyle: {
    "& .MuiInputBase-root": {
      height: { xs: "46px", md: "56px" },
      border: "1px solid #D8D8D8",
      backgroundColor: "#F1F4F9",
      borderRadius: "8px",
      paddingLeft: "15px",
      paddingRight: "15px",
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
    fontWeight: 600,
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
    gap: 1.5,
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
    "&.Mui-disabled": {
      color: "#fff",
      backgroundColor: "#999",
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
    ml: 1,
  },

  EventFormStyles: {
    paperStyle: {
      maxWidth: 862,
      p: { xs: 2, sm: 4 },
      borderRadius: "14px",
      backgroundColor: "rgba(255, 255, 255, 0.48)",
      boxShadow: "6px 6px 45px 0px rgba(0, 0, 0, 0.05)",
    },
    inputLabelStyle: {
      fontFamily: "Nunito Sans",
      color: "#606060",
      fontWeight: 600,
    },
    inputStyle: (name) => ({
      "& .MuiInputBase-root":
        name !== "description"
          ? {
              minHeight: { xs: "42px", md: "52px" },
              border: "1px solid #D5D5D5",
              borderColor: "#D5D5D5",
              backgroundColor: "#F5F6FA",
              borderRadius: "4px",
              paddingLeft: "15px",
              paddingRight: "15px",
            }
          : {
              borderRadius: "4px",
              padding: "15px",
              border: "1px solid #D5D5D5",
              backgroundColor: "#F5F6FA",
            },
      "& input": {
        fontSize: "14px",
        fontWeight: 400,
        fontFamily: "Nunito Sans",
        backgroundColor: "#F5F6FA",
        color: "#000",
        "&::placeholder": {
          fontSize: "14px",
          fontWeight: 400,
          color: "#A6A6A6",
          opacity: 1,
          fontFamily: "Nunito Sans",
        },
      },
    }),
    buttonStyle: {
      ml: "auto",
      color: "#fff",
      maxWidth: { xs: "100%", sm: "274px" },
      height: { xs: "42px", md: "52px", lg: "56px" },
      borderRadius: "12px",
      backgroundColor: "#4880FF",
      opacity: "90%",
      "&:hover": {
        backgroundColor: "#4880FF",
      },
    },
    uploadButtonStyle: {
      ml: "auto",
      color: "#fff",
      maxWidth: { xs: "100%", sm: "148px" },
      height: { xs: "42px", md: "46px" },
      borderRadius: "9px",
      backgroundColor: "#4880FF",
      opacity: "90%",
      "&:hover": {
        backgroundColor: "#4880FF",
      },
    },
    buttonTypoStyle: {
      fontWeight: 500,
      fontFamily: "Nunito Sans",
    },
  },
  ContentFormStyles: {
    paperStyle: {
      maxWidth: 862,
      p: { xs: 2, sm: 4 },
      borderRadius: "14px",
      backgroundColor: "rgba(255, 255, 255, 0.48)",
      boxShadow: "6px 6px 45px 0px rgba(0, 0, 0, 0.05)",
    },
    inputLabelStyle: {
      fontFamily: "Nunito Sans",
      color: "#606060",
      fontWeight: 600,
    },
    inputStyle: (name) => ({
      "& .MuiInputBase-root":
        name !== "description" &&
        name !== "press_release" &&
        name !== "instagram_post" &&
        name !== "facebook_post" &&
        name !== "newsletter" &&
        name !== "governor_summary"
          ? {
              minHeight: { xs: "42px", md: "52px" },
              border: "1px solid #D5D5D5",
              borderColor: "#D5D5D5",
              backgroundColor: "#F5F6FA",
              borderRadius: "4px",
              paddingLeft: "15px",
              paddingRight: "15px",
            }
          : {
              borderRadius: "4px",
              padding: "15px",
              border: "1px solid #D5D5D5",
              backgroundColor: "#F5F6FA",
            },
      "& input": {
        fontSize: "14px",
        fontWeight: 400,
        fontFamily: "Nunito Sans",
        backgroundColor: "#F5F6FA",
        color: "#000",
        "&::placeholder": {
          fontSize: "14px",
          fontWeight: 400,
          color: "#A6A6A6",
          opacity: 1,
          fontFamily: "Nunito Sans",
        },
      },
    }),
    buttonStyle: {
      ml: "auto",
      color: "#fff",
      maxWidth: "148px",
      height: { xs: "46px" },
      borderRadius: "12px",
      backgroundColor: "#4880FF",
      opacity: "90%",
      "&:hover": {
        backgroundColor: "#4880FF",
      },
    },
    aiButtonStyle: {
      ml: "auto",
      color: "#fff",
      maxWidth: "148px",
      height: { xs: "46px" },
      borderRadius: "12px",
      backgroundColor: "#9C27B0",
      opacity: "90%",
      "&:hover": {
        backgroundColor: "#9C27B0",
      },
    },
    buttonTypoStyle: {
      fontWeight: 500,
      fontFamily: "Nunito Sans",
    },
    radioButtonsLableStyle: {
      fontWeight: 600,
      fontFamily: "Nunito Sans",
      color: "#606060",
    },
    radioStyle: {
      width: 24,
      height: 24,
      color: "#666666",
      "&.Mui-checked": { color: "#5088FF" },
      "& .MuiSvgIcon-root": { width: 24, height: 24 },
    },
    recipientsFielStyle: {
      sx: {
        fontSize: "14px",
        fontFamily: "Nunito Sans",
        fontWeight: 400,
        "&::placeholder": {
          fontSize: "14px",
          fontFamily: "Nunito Sans",
          fontWeight: 400,
        },
      },
    },
    searchButtonStyle: {
      color: "#fff",
      maxWidth: "148px",
      backgroundColor: "#9C27B0",
      opacity: "90%",
      textWrap: "nowrap",
      "&:hover": {
        backgroundColor: "#9C27B0",
      },
    },
    uploadButtonStyle: {
      color: "#fff",
      maxWidth: "148px",
      backgroundColor: "#4880FF",
      opacity: "90%",
      textWrap: "nowrap",
      "&:hover": {
        backgroundColor: "#4880FF",
      },
    },
    poperBackgroundStyle: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.05)",
      backdropFilter: "blur(1px)", // blur effect
      zIndex: 1199, // popper ke neeche
    },
    popperStyle: {
      zIndex: 1200,
      top: "50%",
      left: "50%",
      position: "fixed",
      transform: "translate(-50%, -50%)", // perfect center
    },
    searchPaperStyle: {
      p: 2,
      width: { xs: "280px", sm: "400px" },
      backgroundColor: "rgba(255, 255, 255)",
      boxShadow: "6px 6px 45px 0px rgba(0, 0, 0, 0.05)",
    },
    searchTextFieldStyle: {
      "& .MuiInputBase-root": {
        height: { xs: "40px", md: "40px" },
        border: "1px solid #D8D8D8",
        backgroundColor: "#F1F4F9",
        borderRadius: "4px",
        paddingLeft: "15px",
        paddingRight: "15px",
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
    imageSearchButtonStyle: {
      maxWidth: { xs: "100%", sm: "100px" },
      height: "40px",
      borderRadius: "8px",
      backgroundColor: "#9C27B0",
      color: "#fff",
      opacity: 0.9,
      fontWeight: 500,
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#8e24aa",
      },
    },
    imageListStyle: {
      width: "100%",
      maxHeight: 250,
      overflowY: "auto",
    },
    lazyImageStyle: {
      cursor: "pointer",
      borderRadius: "6px",
    },
    methodTypoStyle: {
      fontWeight: 600,
      fontFamily: "Nunito Sans",
      color: "#606060",
    },
    formControlStyle: {
      gap: "8px",
      marginRight: "16px",
      alignItems: "center",
      width: "fit-content",
      px: 1.2,
      pt: 2.5,
    },
  },
  EventDetailsFormStyles: {
    paperStyle: {
      maxWidth: 862,
      p: { xs: 2, sm: 4 },
      borderRadius: "14px",
      backgroundColor: "rgba(255, 255, 255, 0.48)",
      boxShadow: "6px 6px 45px 0px rgba(0, 0, 0, 0.05)",
    },
    inputLabelStyle: {
      fontFamily: "Nunito Sans",
      color: "#606060",
      fontWeight: 600,
    },
    inputStyle: (name) => ({
      "& .MuiInputBase-root":
        name !== "description"
          ? {
              minHeight: { xs: "42px", md: "52px" },
              border: "1px solid #D5D5D5",
              borderColor: "#D5D5D5",
              backgroundColor: "#F5F6FA",
              borderRadius: "4px",
              paddingLeft: "15px",
              paddingRight: "15px",
            }
          : {
              borderRadius: "4px",
              padding: "15px",
              border: "1px solid #D5D5D5",
              backgroundColor: "#F5F6FA",
            },
      "& input": {
        fontSize: "14px",
        fontWeight: 400,
        fontFamily: "Nunito Sans",
        backgroundColor: "#F5F6FA",
        color: "#000",
        "&::placeholder": {
          fontSize: "14px",
          fontWeight: 400,
          color: "#A6A6A6",
          opacity: 1,
          fontFamily: "Nunito Sans",
        },
      },
    }),
    buttonStyle: {
      color: "#fff",
      maxWidth: { xs: "100%", sm: "191px" },
      height: { xs: "46px", md: "56px" },
      borderRadius: "12px",
      backgroundColor: "#4880FF",
      opacity: "90%",
      "&:hover": {
        backgroundColor: "#4880FF",
      },
    },
    uploadButtonStyle: {
      ml: "auto",
      color: "#fff",
      maxWidth: { xs: "100%", sm: "148px" },
      height: { xs: "42px", md: "46px" },
      borderRadius: "9px",
      backgroundColor: "#4880FF",
      opacity: "90%",
      "&:hover": {
        backgroundColor: "#4880FF",
      },
    },
    seeContentbuttonStyle: {
      color: "#fff",
      maxWidth: "191px",
      height: { xs: "46px", md: "56px" },
      borderRadius: "12px",
      backgroundColor: "#9C27B0",
      opacity: "90%",
      "&:hover": {
        backgroundColor: "#9C27B0",
      },
    },
    buttonTypoStyle: {
      fontWeight: 500,
      fontFamily: "Nunito Sans",
      textWrap: "noWrap",
    },
  },
  EventListStyles: {
    addMoreEventsButtonStyle: {
      color: "#fff",
      maxWidth: "274px",
      height: { xs: "46px", md: "56px" },
      borderRadius: "12px",
      backgroundColor: "#4880FF",
      opacity: "90%",
      "&:hover": {
        backgroundColor: "#4880FF",
      },
    },
    addMoreEventsButtonTypoStyle: {
      fontWeight: 500,
      fontFamily: "Nunito Sans",
      textWrap: "noWrap",
    },
    cardStyle: {
      backgroundColor: "#F9FAFB",
      borderRadius: "16px",
      padding: 2,
      display: "flex",
      flexDirection: "column",
      gap: 1,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      width: "95%",
      maxWidth: 423,
      minHeight: 115,
    },
    titleAndButtonBoxStyle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    titleStyle: {
      fontWeight: 500,
      color: "#111827",
      fontFamily: "Poppins",
    },
    editIconStyle: {
      width: "48px",
      height: "32px",
      border: "1px solid #E5E7EB",
      borderTopLeftRadius: "8px",
      borderBottomLeftRadius: "8px",
      borderTopRightRadius: "0px",
      borderBottomRightRadius: "0px",
      padding: "4px",
    },
    viewIconStyle: {
      width: "48px",
      height: "32px",
      border: "1px solid #E5E7EB",
      borderLeft: "0px",
      borderTopRightRadius: "8px",
      borderBottomRightRadius: "8px",
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
      padding: "4px",
    },
    todayTimeBoxStyle: {
      backgroundColor: "#DAE5FF",
      color: "#1E40AF",
      borderRadius: "8px",
      padding: "4px 12px",
      fontSize: "14px",
      fontWeight: 500,
    },
    todayTimeTypoStyle: {
      color: "#202224",
      fontFamily: "Poppins",
      fontWeight: 400,
      opacity: "60%",
    },
    durationBoxStyle: {
      backgroundColor: "#E0E7FF",
      color: "#1E40AF",
      borderRadius: "8px",
      padding: "4px 12px",
      fontSize: "14px",
      fontWeight: 500,
    },
    durationTypoStyle: {
      color: "#202224",
      fontFamily: "Poppins",
      fontWeight: 400,
      opacity: "60%",
    },
  },
  FormHeaderStyle: {
    boxStyle: {
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "862px",
      gap: 2,
      mb: 2,
    },
    titleStyle: {
      fontWeight: 700,
      color: "#202224",
      fontFamily: "Poppins",
      fontStyle: "bold",
    },
  },

  // AuthLayout component styles
  AuthLayoutStyle: {
    mainBoxStyle: (bgImage) => ({
      margin: 0,
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      overflow: "hidden",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${bgImage})`,
      backgroundColor: "#4880FF",
    }),
    innerBoxStyle: {
      width: "90%",
      height: "auto",
      maxWidth: "630px",
      backgroundColor: "#FFFFFF",
      borderRadius: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      p: { xs: 3.5, sm: 4.5 },
      my: { xs: 3, md: 5 },
      overflow: "auto",
    },
  },

  // DashboardLayout component styles
  DashboardLayoutStyle: {
    mainWrapper: {
      display: "flex",
      minHeight: "100vh",
      width: "100%",
      overflow: "hidden",
    },
    pageWrapper: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      zIndex: 1,
      overflow: "hidden",
      backgroundColor: "rgba(245, 246, 250, 1)",
      paddingTop: "70px",
    },
    childrenStyle: (pathname, bgLogo) => ({
      p: 3,
      flexGrow: 1,
      overflowY: "auto",
      backgroundSize: "80%",
      height: "calc(100vh - 70px)",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      ...(pathname !== "/dashboard" && { backgroundImage: `url(${bgLogo})` }),
    }),
  },

  // Dashboard screen component styles
  DashboardScreenStyle: {
    mainBoxStyle: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imageStyle: {
      mx: "auto",
      maxWidth: "298px",
      width: { xs: "50%", lg: "100%" },
    },
    textStyle: {
      fontWeight: 400,
      fontSize: "clamp(22px, 6.5vw, 44px)",
      color: "#000000",
    },
    logoImageStyle: {
      mx: "auto",
      maxWidth: "521px",
      width: { xs: "60%", md: "75%", lg: "100%" },
    },
  },

  // Calendar screen component styles
  CalendarScreenStyle: {
    mainBoxStyle: {
      display: "flex",
      flexDirection: { xs: "column", lg: "row" },
      gap: 2,
    },
    paperStyle: {
      p: 2,
      borderRadius: 4,
      bgcolor: "white",
      height: "100%",
      width: "100%",
      overflow: "hidden",
      boxShadow: "none",
      border: "0.3px solid rgba(185, 185, 185, 0.4)",
    },
    CreatedEventsStyle: {
      paperStyle: {
        borderRadius: 4,
        boxShadow: "none",
        border: "0.3px solid rgba(185, 185, 185, 0.4)",
      },
      typoAndButtonBoxStyle: (isMobile) => ({ p: isMobile ? 2 : 3, pb: 0 }),
      buttonStyle: {
        borderRadius: 2,
        textTransform: "none",
        mb: 2,
        bgcolor: "rgba(72, 128, 255, 0.34)",
        height: { xs: "38px", md: "43px" },
        boxShadow: "none",
        opacity: "90%",
        "&:hover": {
          boxShadow: "none",
        },
      },
      newEventTypoStyle: {
        fontWeight: 500,
        color: "#FFFFFF",
        fontFamily: "Nunito Sans",
        letterSpacing: "-0.05px",
      },
      createEventTypoStyle: {
        fontWeight: 700,
        color: "#202224",
        fontFamily: "Poppins",
      },
      dividerStyle: {
        mt: 2,
        borderWidth: "0",
        border: "0.3px solid rgba(185, 185, 185, 0.1)",
      },
      eventListBoxStyle: (isMobile) => ({
        my: 1,
        maxHeight: 452,
        overflow: "auto",
        p: isMobile ? 2 : 3,
        minWidth: { xs: 200, md: 286 },
      }),
      avatarStyle: (isMobile) => ({
        width: isMobile ? 32 : 40,
        height: isMobile ? 32 : 40,
      }),
      avatarGroupStyle: { "& .MuiAvatar-root": { width: 24, height: 24 } },
      moreAvatarStyle: {
        width: 24,
        height: 24,
        bgcolor: "#DFE9FF5E",
        fontSize: "0.75rem",
        border: " 1px solid #4880FF",
        color: "#4880FF",
      },
      showMoreButtonBoxStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      showMoreButtonStyle: {
        width: 126,
        height: 38,
        borderRadius: "12px",
        border: "2px solid #E2EAF8",
        color: "#202224",
        fontFamily: "Nunito Sans",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "28px",
        background: "#E2EAF8",
        opacity: 0.7,
      },
    },
  },

  // Profile screen component styles
  ProfileScreenStyle: {
    container: {
      width: "100%",
      height: "744px",
      margin: "auto",
      mt: 1,
      py: 4,
      px: { xs: 2.5, md: 4 },
      borderRadius: "14px",
      bgcolor: "#FFFFFF",
      border: "0.3px solid rgba(185, 185, 185, 0.4)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    formArea: {
      width: "100%",
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    row: {
      display: "flex",
      gap: { xs: 2, sm: 4, md: 5 },
      mt: { xs: "10px", sm: "20px", md: "55px" },
      flexWrap: "wrap",
    },
    input: {
      "& .MuiOutlinedInput-root": {
        width: "100%",
        height: { xs: "42px", md: "52px" },
        borderRadius: "4px",
        backgroundColor: "#F5F6FA",
        border: "0.6px solid #D5D5D5",
        p: "10px",
      },
    },
    labelStyle: {
      fontWeight: 500,
      color: "#ADADAD",
      fontSize: "14px",
    },
    avatar: (isEditing) => ({
      width: 80,
      height: 80,
      margin: "auto",
      cursor: isEditing ? "pointer" : "default",
    }),
    editPhotoText: (isEditing) => ({
      mt: 1,
      cursor: isEditing ? "pointer" : "default",
      color: "#4379EE",
      fontSize: "14px",
    }),
    submitBtn: {
      width: { xs: "200px", sm: "300px", md: "274px" },
      height: { xs: "46px", md: "56px" },
      bgcolor: "#4880FF",
      borderRadius: "12px",
      color: "#FFFFFF",
      fontSize: "18px",
      fontWeight: 500,
      opacity: "90%",
      boxShadow: "none",
    },
  },

  // Subscripiton Plan screen component styles
  SubscriptionCardStyle: {
    headingStyle: {
      fontWeight: "bold",
      fontFamily: "Nunito Sans",
      mb: 3,
    },
    container: {
      display: "flex",
      justifyContent: { xs: "center", sm: "center", md: "flex-start" },
      gap: 3,
      flexWrap: "wrap",
      mt: 2,
    },
    card: {
      width: "350px",
      height: "460px",
      borderRadius: "24px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
      textAlign: "center",
      p: 2,
      display: "flex",
      flexDirection: "column",
    },
    cardContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontWeight: 700,
      mb: 1,
      color: "#202224",
      fontFamily: "Nunito Sans",
    },
    description: {
      mb: 2,
      color: "#212121",
      fontFamily: "Nunito Sans",
    },
    price: {
      fontWeight: 800,
      color: "#4880FF",
      mb: 1,
      fontFamily: "Nunito Sans",
    },
    subText: {
      color: "#212121",
      fontFamily: "Nunito Sans",
    },
    buttonWrapper: {
      textAlign: "center",
      mb: 2,
    },
    buttonStyle: {
      width: "180px",
      height: "60px",
      borderColor: "#4880FF",
      color: "#4880FF",
      fontWeight: "bold",
      borderRadius: "30px",
      margin: "auto",
      "&:hover": {
        backgroundColor: "#FFFFFF",
        borderColor: "#4880FF",
      },
    },
    buttonText: {
      color: "#4880FF",
      fontFamily: "Nunito Sans",
      fontWeight: 700,
    },
  },

  // Global subscripiton Plan screen component styles
  subscriptionPlanScreenStyles: {
    containerBoxStyle: (bgImage) => ({
      margin: 0,
      padding: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      overflow: "hidden",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${bgImage})`,
      backgroundColor: "#FFF",
    }),
    innerBoxStyle: {
      mx: "auto",
      width: "100%",
      maxWidth: "1200px",
      height: "100%",
      p: 4,
    },
    titleStyle: {
      fontFamily: "Nunito Sans",
      fontWeight: 700,
      color: "#5088FF",
      fontSize: "clamp(35px, 4vw, 64px)",
    },
    skipLinkStyle: {
      fontFamily: "Nunito Sans",
      fontWeight: 700,
    },
    cardBoxStyle: {
      mt: 6,
      display: "flex",
      p: { xs: 2, sm: 4, md: 6 },
      justifyContent: "space-evenly",
      border: "1px solid #979797",
      backgroundColor: "#E9EDFE",
      borderRadius: { xs: "30px", md: "40px" },
      flexDirection: { xs: "column", sm: "row" },
      gap: { xs: 2.5, sm: 4 },
    },
    cardStyle: {
      width: "100%",
      mx: "auto",
      maxWidth: "350px",
      minHeight: "460px",
      borderRadius: "24px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
      textAlign: "center",
      p: 2,
      display: "flex",
      flexDirection: "column",
    },
    cardContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 1.2,
    },
    title: {
      fontWeight: 700,
      mb: 1,
      color: "#202224",
      fontFamily: "Nunito Sans",
    },
    description: {
      mb: 2,
      color: "#212121",
      fontFamily: "Nunito Sans",
    },
    price: {
      fontWeight: 800,
      color: "#4880FF",
      mb: 1,
      fontFamily: "Nunito Sans",
    },
    subText: {
      color: "#212121",
      fontFamily: "Nunito Sans",
    },
    buttonWrapper: {
      textAlign: "center",
      mb: 2,
    },
    buttonStyle: {
      width: "180px",
      height: "60px",
      borderColor: "#4880FF",
      color: "#4880FF",
      fontWeight: "bold",
      borderRadius: "30px",
      margin: "auto",
      "&:hover": {
        backgroundColor: "#FFFFFF",
        borderColor: "#4880FF",
      },
    },
    buttonText: {
      color: "#4880FF",
      fontFamily: "Nunito Sans",
      fontWeight: 700,
    },
  },

  // School overview screen components styles
  schoolOverviewScreenStyles: {
    addButton: {
      color: "#fff",
      maxWidth: { xs: "100%", sm: "132px" },
      height: { xs: "42px", md: "46px" },
      borderRadius: "8px",
      backgroundColor: "#4880FF",
      "&:hover": {
        backgroundColor: "#3a6edc",
      },
      "&.Mui-disabled": {
        color: "#fff",
        backgroundColor: "#999",
      },
    },
    addButtonText: {
      fontWeight: 500,
      fontFamily: "Nunito Sans",
    },
  },

  // Payment Method screen components styles
  paymentMethodScreenStyles: {
    mainBoxStyle: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      flexDirection: { xs: "column", sm: "row" },
      gap: { xs: 2, sm: 0 },
      p: 2,
    },
    paymentSectionStyle: {
      containerBoxStyle: {
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6F6F6",
      },
      paymentBoxStyle: {
        mx: { xs: "auto", sm: 0 },
        width: "100%",
        minHeight: "100%",
        maxWidth: { sm: "545px", md: "742px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: { xs: "24px", sm: "24px 0px 0px 24px" },
        p: { xs: 3, md: 4 },
      },
      billingBoxStyle: {
        width: "100%",
        borderRadius: "5px",
        alignItems: "center",
        p: { xs: 1, md: 1.5 },
        justifyContent: "space-between",
        border: "1px solid rgba(151, 151, 151, 0.5)",
      },
      billingTextStyle: {
        fontWeight: 600,
        fontSize: { xs: "16px", md: "20px" },
        fontFamily: "Nunito Sans",
      },
      switchStyle: {
        width: { xs: 64, lg: 74 },
        height: { xs: 28, lg: 38 },
        padding: 0,
        "& .MuiSwitch-switchBase": {
          padding: { xs: 0.4, lg: 0.5 },
          "&.Mui-checked": {
            transform: "translateX(34px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor: "#5088FF",
              opacity: 1,
            },
          },
        },
        "& .MuiSwitch-thumb": {
          width: { xs: 22, lg: 30 },
          height: { xs: 22, lg: 30 },
        },
        "& .MuiSwitch-track": {
          borderRadius: 20,
          backgroundColor: "#ccc",
          opacity: 1,
        },
      },
      paymentTextStyle: { fontWeight: 600, fontFamily: "Nunito Sans" },
      paymentDescriptionStyle: {
        fontWeight: 500,
        color: "#979797",
        fontFamily: "Nunito Sans",
      },
      paymentMethodBoxStyle: (method, item) => ({
        p: { xs: 1 },
        px: { xs: 2 },
        borderRadius: "5px",
        border:
          method === item.value
            ? "1.5px solid #5088FF"
            : "1px solid rgba(151,151,151,0.5)",
        backgroundColor:
          method === item.value ? "rgba(80, 136, 255, 0.22)" : "transparent",
        transition: "all 0.3s ease",
      }),
      radioStyle: {
        color: "#979797",
        "&.Mui-checked": { color: "#5088FF" },
      },
      radioLabelStyle: {
        fontWeight: 500,
        fontSize: { xs: "16px", md: "20px" },
      },
      inputStyle: {
        "& .MuiInputBase-root": {
          height: { xs: "46px", lg: "56px" },
          border: "1px solid #D8D8D8",
          backgroundColor: "#fff",
          borderRadius: "8px",
          px: "15px",
        },
        "& input": {
          fontSize: "16px",
          backgroundColor: "#fff",
          color: "#000",
          "&::placeholder": {
            color: "#A6A6A6",
            opacity: 1,
          },
          "&:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 1000px #fff inset !important`,
            transition: "background-color 5000s ease-in-out 0s",
          },
          // Chrome, Safari, Edge
          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
            {
              display: "none",
            },
          "& input[type=number]": {
            MozAppearance: "textfield", // Firefox
          },
        },
      },
    },
    planSectionStyle: {
      containerBoxStyle: {
        mx: { xs: "auto", sm: 0 },
        width: "100%",
        minHeight: "100%",
        maxWidth: { sm: "545px" },
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#5088FF5C",
        p: { xs: 3, md: 4 },
        borderRadius: { xs: "24px", sm: "0px 24px 24px 0px" },
      },
      planBoxStyle: {
        width: "100%",
        borderRadius: "13px",
        backgroundColor: "#FFFFFF",
        maxWidth: { sm: "485px" },
        maxHeight: { sm: "707px" },
        p: 2.5,
      },
      qontoStepIconStyle: (active, completed) => ({
        width: 25,
        height: 25,
        borderRadius: "50%",
        border: `4px solid ${
          active && completed
            ? "rgba(80, 136, 255, 1)"
            : "rgba(151, 151, 151, 1)"
        }`,
      }),
      planSummaryStyle: {
        justifyContent: "space-between",
        "@media(max-width: 424px)": {
          flexDirection: "column",
          gap: 1,
        },
      },
      billingCycleStyle: {
        justifyContent: "space-between",
        "@media(max-width: 424px)": {
          flexDirection: "column",
          gap: 1,
        },
      },
      steperLableStyle: {
        justifyContent: "space-between",
        alignItems: "center",
        pr: 1,
        "@media(max-width: 424px)": {
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0.5,
        },
      },
      stepContentStyle: {
        justifyContent: "space-between",
        alignItems: "center",
        pl: 1.5,
        pt: 1,
        "@media(max-width: 424px)": {
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0.5,
        },
      },
      accountSummaryStyle: {
        justifyContent: "space-between",
        alignItems: "center",
        pt: 1,
        "@media(max-width: 424px)": {
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0.5,
        },
      },
      buttonStyle: {
        color: "#fff",
        height: { xs: "46px", md: "56px" },
        borderRadius: "8px",
        backgroundColor: "#4880FF",
        "&:hover": {
          backgroundColor: "#3a6edc",
        },
        "&.Mui-disabled": {
          color: "#fff",
          backgroundColor: "#999",
        },
      },
      buttonTypoStyle: {
        fontWeight: 500,
        fontFamily: "Nunito Sans",
      },
    },
  },
};
