import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import { SIGNIN } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { signupSchema } from "../../schemas/signup";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    title,
    description,
    fields,
    checkboxText,
    buttonText,
    haveAnAccountText,
    signUpText,
  } = SIGNIN || {};

  const {
    authFormStyle,
    authInputStyle,
    authTitleStyle,
    authLableStyle,
    authDescriptionStyle,
    authCheckBoxStyle,
    authCheckBoxIconStyle,
    authCheckBoxSpanStyle,
    authCheckBoxLableStyle,
    authButtonStyle,
    authButtonTypoStyle,
    authHaveAnAccountTextStyle,
    authSignupLinkTextStyle,
  } = componentStyles || {};

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      remember: false,
    },
    validationSchema: signupSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Form values", values);
      resetForm();
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);
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
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        spacing={1}
        maxWidth={516}
        sx={{ mt: 0.5 }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="remember"
              checked={formik?.values?.remember}
              onChange={formik?.handleChange}
              icon={<Box sx={authCheckBoxStyle} />}
              checkedIcon={
                <Box sx={authCheckBoxIconStyle}>
                  <Box component="span" sx={authCheckBoxSpanStyle} />
                </Box>
              }
              disableRipple
              sx={{ padding: 0 }}
            />
          }
          label={
            <Typography variant="h5" sx={authCheckBoxLableStyle}>
              {checkboxText}
            </Typography>
          }
        />
      </Stack>
      <Stack width="100%" maxWidth={418} pt={1} spacing={2}>
        <Button type="submit" fullWidth sx={authButtonStyle}>
          <Typography variant="h5" sx={authButtonTypoStyle}>
            {buttonText}
          </Typography>
        </Button>
        <Typography variant="h5" sx={authHaveAnAccountTextStyle}>
          {haveAnAccountText}
          <Link to={`${signUpText?.link}`} style={{ color: "#5A8CFF" }}>
            <Typography component={"span"} sx={authSignupLinkTextStyle}>
              {signUpText?.text}
            </Typography>
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Signup;
