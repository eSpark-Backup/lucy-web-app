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
import { LOGIN } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import { useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schemas/login";
import { useLoginMutation } from "../../services/auth";
import {
  clearSavedCredentials,
  getDecryptedCredentials,
  saveEncryptedCredentials,
} from "../../utils";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    title,
    description,
    fields,
    forgot,
    checkboxText,
    buttonText,
    haveAnAccountText,
    signUpText,
  } = LOGIN || {};

  const {
    authFormStyle,
    authInputStyle,
    authTitleStyle,
    authLableStyle,
    authDescriptionStyle,
    authForgetTextStyle,
    authCheckBoxStyle,
    authCheckBoxIconStyle,
    authCheckBoxSpanStyle,
    authCheckBoxLableStyle,
    authButtonStyle,
    authButtonTypoStyle,
    authHaveAnAccountTextStyle,
    authSignupLinkTextStyle,
  } = componentStyles || {};

  useEffect(() => {
    const saved = getDecryptedCredentials();
    if (saved) {
      formik.setValues({
        email: saved.email,
        password: saved.password,
        remember: true,
      });
    }
  }, []);

  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      const objToSend = {
        email: values?.email,
        password: values?.password,
      };
      login(objToSend).then((res) => {
        if (res?.data) {
          if (values.remember) {
            saveEncryptedCredentials(values.email, values.password);
          } else {
            clearSavedCredentials();
          }
          if (res?.data?.accessToken) {
            localStorage.setItem("token", res?.data?.accessToken);
            navigate("/dashboard");
            resetForm();
          } else {
            navigate(`/auth/email-verification?email=${values?.email}`);
            resetForm();
          }
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

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={authFormStyle}>
      <Stack spacing={2} pb={2} alignItems="center" justifyContent="center">
        <Typography variant="h2" sx={authTitleStyle}>
          {title}
        </Typography>
        <Typography variant="h5" sx={authDescriptionStyle}>
          {description}
        </Typography>
      </Stack>
      {fields?.map(({ label, type, placeholder, key }, index) => (
        <Stack width="100%" maxWidth={516} spacing={2} key={index}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h5" sx={authLableStyle}>
              {label}
            </Typography>
            {type === "password" && (
              <Link to={`${forgot?.link}`} style={{ textDecoration: "none" }}>
                <Typography variant="h5" sx={authForgetTextStyle}>
                  {forgot?.text}
                </Typography>
              </Link>
            )}
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
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            InputProps={
              type === "password" && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            }
          />
        </Stack>
      ))}
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        spacing={1}
        maxWidth={516}
        sx={{
          mt: 0.5,
        }}
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
        <Button
          loading={isLoading}
          disabled={isLoading}
          type="submit"
          fullWidth
          sx={authButtonStyle}
        >
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

export default Login;
