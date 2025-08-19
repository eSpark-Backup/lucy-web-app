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
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignupMutation } from "../../services/auth";

const Account = ({ role, data, styles, schema }) => {
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
  } = data || {};

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
  } = styles || {};

  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const initialValues = fields?.reduce((acc, field) => {
    if (field.isRow) {
      field?.fields?.forEach((subField) => {
        acc[subField.key] = "";
      });
    } else {
      acc[field.key] = field?.type === "checkbox" ? false : "";
    }
    return acc;
  }, {});
  console.log(initialValues, "initialValues");
  const formik = useFormik({
    initialValues: {
      ...initialValues,
      ...(role === "Trust" && { school_count: "1" }),
      terms_and_conditions: false,
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      const objToSend = { ...values, role: role };
      signup(objToSend).then((res) => {
        if (
          res?.data &&
          res?.data?.message ===
            "Registration successful! Please check your email to verify your account."
        ) {
          navigate(`/auth/email-verification?email=${values?.email}`);
          return;
        }
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
        resetForm();
      });
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
        if (field?.isRow && Array?.isArray(field?.fields)) {
          return (
            <Stack
              width="100%"
              maxWidth={516}
              direction={{ xs: "column", sm: "row" }}
              key={index}
              gap={2}
            >
              {field.fields.map((subField, subIndex) => (
                <Stack width="100%" spacing={1} key={subIndex}>
                  <Typography variant="h5" sx={authLableStyle}>
                    {subField?.label}
                  </Typography>
                  <TextField
                    fullWidth
                    type={subField.type}
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

        const { label, type, placeholder, key, options } = field;
        return (
          <Stack width="100%" maxWidth={516} spacing={1} key={index}>
            <Typography variant="h5" sx={authLableStyle}>
              {label}
            </Typography>
            <TextField
              fullWidth
              name={key}
              select={type === "select"}
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
            >
              {type === "select" &&
                (options || [])?.map((opt) => (
                  <MenuItem key={opt?.value} value={opt?.value}>
                    {opt?.label}
                  </MenuItem>
                ))}
            </TextField>
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
              name="terms_and_conditions"
              checked={formik?.values?.terms_and_conditions}
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
          disabled={isLoading || !formik?.values?.terms_and_conditions}
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

export default Account;
