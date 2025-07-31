import React, { useState } from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";

const profileStyles = {
  container: {
    width: "100%",
    height: "744px",
    margin: "auto",
    mt: 1,
    p: 4,
    borderRadius: "14px",
    bgcolor: "background.paper",
    border: "0.3px solid #B9B9B9",
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
    gap: { xs: 2, sm: 3, lg: 5 },
    mt: { xs: "10px", sm: "20px", lg: "55px" },
    flexWrap: "wrap",
  },
  input: {
    "& .MuiOutlinedInput-root": {
      width: "100%",
      height: "52px",
      borderRadius: "4px",
      backgroundColor: "#F5F6FA",
      border: "0.6px solid #D5D5D5",
      p: "10px",
    },
  },
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    if (isEditing) {
      console.log("Saving changes...");
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
        Profile
      </Typography>
      <Box sx={profileStyles.container}>
        <Box sx={profileStyles.formArea}>
          <Box sx={{ textAlign: "center", mb: "5px" }}>
            <Avatar
              src="/src/assets/icons/Profile.svg"
              alt="User Avatar"
              sx={{ width: 80, height: 80, margin: "auto" }}
            />
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                cursor: "pointer",
                color: "#4379EE",
                fontSize: "14px",
              }}
            >
              Edit Photo
            </Typography>
          </Box>

          <Box sx={profileStyles.row}>
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "100%", sm: "280px", md: "360px" },
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: 500, color: "#ADADAD", fontSize: "14px" }}
              >
                First Name
              </Typography>
              <TextField
                sx={profileStyles.input}
                fullWidth
                defaultValue="Kevin"
                disabled={!isEditing}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "100%", sm: "280px", md: "360px" },
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: 500, color: "#ADADAD", fontSize: "14px" }}
              >
                Last Name
              </Typography>
              <TextField
                sx={profileStyles.input}
                fullWidth
                defaultValue="Fleming"
                disabled={!isEditing}
              />
            </Box>
          </Box>

          <Box sx={profileStyles.row}>
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "100%", sm: "280px", md: "360px" },
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: 500, color: "#ADADAD", fontSize: "14px" }}
              >
                Your Email
              </Typography>
              <TextField
                sx={profileStyles.input}
                fullWidth
                defaultValue="jaskolski.brent@yahoo.com"
                disabled={!isEditing}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: "100%", sm: "280px", md: "360px" },
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: 500, color: "#ADADAD", fontSize: "14px" }}
              >
                Phone Number
              </Typography>
              <TextField
                sx={profileStyles.input}
                fullWidth
                defaultValue="546-933-2772"
                disabled={!isEditing}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ textAlign: "center", mb: "30px" }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleEditClick}
            sx={{
              width: { xs: "250px", sm: "300px", md: "274px" },
              maxWidth: "100%",
              height: "56px",
              bgcolor: "#4880FF",
              borderRadius: "12px",
              color: "#FFFFFF",
              fontSize: "18px",
              fontWeight: 500,
              opacity: "90%",
              boxShadow: "none",
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default Profile;
