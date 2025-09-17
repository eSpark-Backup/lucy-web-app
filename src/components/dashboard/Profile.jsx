import { useState, useRef } from "react";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import FormHeader from "../forms/FormHeader";
import { profileSchema } from "../../schemas/profile";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../services/auth";
import { toast } from "react-toastify";
import { componentStyles } from "../../style/componentStyles";
import { PROFILE_DATA } from "../../constant";

const getInitialValues = (user) => ({
  firstName: user?.profile?.first_name || "",
  lastName: user?.profile?.last_name || "",
  email: user?.email || "",
  phone: user?.profile?.phone || "",
});

const Profile = () => {
  const [update, { isLoading }] = useUpdateUserMutation();
  const { user } = useSelector((state) => state?.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();
  const { ProfileScreenStyle } = componentStyles || {};
  const { text, fields } = PROFILE_DATA || {};

  const {
    container,
    formArea,
    row,
    input,
    labelStyle,
    avatar,
    editPhotoText,
    submitBtn,
  } = ProfileScreenStyle || {};

  const formik = useFormik({
    initialValues: getInitialValues(user),
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formdata = new FormData();
      formdata.append("first_name", values?.firstName);
      formdata.append("last_name", values?.lastName);
      formdata.append("phone", values?.phone);
      if (image) formdata.append("profile_image", image);

      update(formdata).then((res) => {
        if (res?.error) {
          res?.error?.data?.message !== "Authorization token is missing" &&
            toast.error(res?.error?.data?.message);
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message);
          setIsEditing(false);
        }
      });
    },
  });

  const handleEditClick = () => {
    isEditing ? formik.handleSubmit() : setIsEditing(true);
  };

  const handlePhotoClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files[0];
    if (file) setImage(file);
  };

  return (
    <>
      <FormHeader title="Profile" />
      <Box component="form" onSubmit={formik.handleSubmit} sx={container}>
        <Box sx={formArea}>
          <Box sx={{ textAlign: "center", mb: "5px" }}>
            <Avatar
              src={
                image
                  ? URL.createObjectURL(image)
                  : user?.profile?.profile_image
              }
              alt={user?.profile?.first_name}
              sx={avatar(isEditing)}
              onClick={handlePhotoClick}
            />
            <Typography
              variant="body2"
              onClick={handlePhotoClick}
              sx={editPhotoText(isEditing)}
            >
              {text}
            </Typography>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Box>

          <Box sx={row} flexWrap="wrap">
            {fields(isEditing)?.map(({ label, name, disabled }) => (
              <Box
                key={name}
                sx={{
                  flex: 1,
                  minWidth: { xs: "100%", md: "280px" },
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography sx={labelStyle}>{label}</Typography>
                <TextField
                  name={name}
                  sx={input}
                  fullWidth
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={disabled}
                  error={formik.touched[name] && Boolean(formik.errors[name])}
                  helperText={formik.touched[name] && formik.errors[name]}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ textAlign: "center", mb: "30px" }}>
          <Button
            disabled={isLoading}
            variant="contained"
            size="large"
            onClick={handleEditClick}
            sx={submitBtn}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
