import React, { useState } from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import FormHeader from "../forms/FormHeader";
import { profileSchema } from "../../schemas/profile";

const profileStyles = {
  container: {
    width: "100%",
    height: "744px",
    margin: "auto",
    mt: 1,
    p: 4,
    borderRadius: "14px",
    bgcolor: "#FFFFFF",
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
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "Kevin",
      lastName: "Fleming",
      email: "jaskolski.brent@yahoo.com",
      phone: "546-933-2772",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      setIsEditing(false);
    },
    enableReinitialize: true,
  });

  const handleEditClick = () => {
    if (isEditing) {
      formik?.handleSubmit();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <>
      <FormHeader title={"Profile"} />
      <Box
        component="form"
        onSubmit={formik?.handleSubmit}
        sx={profileStyles?.container}
      >
        <Box sx={profileStyles?.formArea}>
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

          <Box sx={profileStyles?.row}>
            {/* First Name */}
            <Box
              sx={{
                flex: 1,
                minWidth: "280px",
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
                name="firstName"
                sx={profileStyles.input}
                fullWidth
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                error={
                  formik?.touched?.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Box>

            {/* Last Name */}
            <Box
              sx={{
                flex: 1,
                minWidth: "280px",
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
                name="lastName"
                sx={profileStyles.input}
                fullWidth
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Box>
          </Box>

          <Box sx={profileStyles.row}>
            {/* Email */}
            <Box
              sx={{
                flex: 1,
                minWidth: "280px",
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
                name="email"
                sx={profileStyles.input}
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={!isEditing}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>

            {/* Phone */}
            <Box
              sx={{
                flex: 1,
                minWidth: "280px",
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
                name="phone"
                sx={profileStyles.input}
                fullWidth
                value={formik?.values?.phone}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                disabled={!isEditing}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
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
              height: { xs: "46px", md: "56px" },
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
