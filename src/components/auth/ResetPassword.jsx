import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import { RESETPASSWORD } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { resetPasswordSchema } from "../../schemas/changePassword";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/auth";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [resetData, { isLoading }] = useResetPasswordMutation();

  const navigate = useNavigate();

  const { title, description, fields, buttonText } = RESETPASSWORD || {};

  const {
    authFormStyle,
    authInputStyle,
    authTitleStyle,
    authLableStyle,
    authDescriptionStyle,
    authButtonStyle,
    authButtonTypoStyle,
  } = componentStyles || {};

  const formik = useFormik({
    initialValues: {
      new_password: "",
      confirm_password: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values, { resetForm }) => {
      resetData({ newPassword: values.new_password, token }).then((res) => {
        if (res?.data) {
          toast.success(res?.data?.message);
          navigate("/auth/login");
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
          return;
        }
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
      });
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  if (!token) {
    return <Navigate to={"/not-found"} />;
  }
  return (
    <Box component="form" onSubmit={formik?.handleSubmit} sx={authFormStyle}>
      <Stack spacing={2} pb={2} alignItems="center" justifyContent="center">
        <Typography variant="h2" sx={authTitleStyle}>
          {title}
        </Typography>
        <Typography variant="h5" sx={authDescriptionStyle}>
          {description}
        </Typography>
      </Stack>
      {fields?.map((field, index) => {
        if (field?.isRow && Array?.isArray(field.fields)) {
          return (
            <Stack width="100%" maxWidth={516} direction="row" gap={2}>
              {field.fields.map((subField, subIndex) => (
                <Stack width="100%" spacing={1} key={subIndex}>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography variant="h5" sx={authLableStyle}>
                      {subField?.label}
                    </Typography>
                  </Stack>
                  <TextField
                    type={subField.type}
                    fullWidth
                    name={subField.key}
                    sx={authInputStyle}
                    placeholder={subField.placeholder}
                    value={formik?.values?.[subField.key]}
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    error={
                      formik?.touched?.[subField.key] &&
                      Boolean(formik?.errors?.[subField.key])
                    }
                    helperText={
                      formik?.touched?.[subField?.key] &&
                      formik?.errors?.[subField?.key]
                    }
                  />
                </Stack>
              ))}
            </Stack>
          );
        }

        // Normal single field
        const { label, type, placeholder, key } = field;
        return (
          <Stack width="100%" maxWidth={516} spacing={1} key={index}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="h5" sx={authLableStyle}>
                {label}
              </Typography>
            </Stack>
            <TextField
              fullWidth
              name={key}
              sx={authInputStyle}
              placeholder={placeholder}
              value={formik?.values?.[key]}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              error={formik?.touched?.[key] && Boolean(formik?.errors?.[key])}
              helperText={formik?.touched?.[key] && formik?.errors?.[key]}
              type={
                type === "password"
                  ? key === "confirm_password"
                    ? showConfirmPassword
                      ? "text"
                      : "password"
                    : showPassword
                      ? "text"
                      : "password"
                  : type
              }
              InputProps={
                type === "password" && {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          key === "confirm_password"
                            ? showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                            : showPassword
                              ? "Hide password"
                              : "Show password"
                        }
                        onClick={
                          key === "confirm_password"
                            ? handleClickShowConfirmPassword
                            : handleClickShowPassword
                        }
                        edge="end"
                      >
                        {key === "confirm_password" ? (
                          showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )
                        ) : showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }
            />
          </Stack>
        );
      })}
      <Stack width="100%" maxWidth={418} pt={1} spacing={2}>
        <Button
          type="submit"
          fullWidth
          sx={authButtonStyle}
          loading={isLoading}
          disabled={isLoading}
        >
          <Typography variant="h5" sx={authButtonTypoStyle}>
            {buttonText}
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};

export default ResetPassword;
