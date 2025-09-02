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
import { useCreateOrganizationMutation } from "../../services/organization";
import { addListener } from "@reduxjs/toolkit";

const Account = ({ is_trust = false, data, styles, schema }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [options, setOptions] = useState([
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ]);

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
  const [createOrganization, { isLoading: createLoading }] =
    useCreateOrganizationMutation();

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

  const handleCreateOrganization = (formdata, resetForm, email) => {
    createOrganization(formdata).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something went wrong!");
        return;
      }
      if (res?.data) {
        toast.success(
          res?.data?.message || "Organization created successfully"
        );
        resetForm();
        navigate(`/auth/email-verification?email=${email}`);
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      ...(is_trust && { selected_school_count: "2" }),
      terms_and_conditions: false,
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      const {
        email,
        password,
        first_name,
        last_name,
        name,
        address,
        phone,
        selected_school_count,
      } = values;
      const objToSend = {
        email,
        password,
        first_name,
        last_name,
        phone,
        role: "User",
      };
      const obj_for_organization = {
        name: name,
        address,
        ...(is_trust && {
          is_trust: true,
          selected_school_count: Number(selected_school_count),
        }),
      };
      signup(objToSend).then((res) => {
        const { data } = res || {};
        if (!data) return;

        const { message, token } = data;

        if (token) {
          localStorage.setItem("token", token);
        }

        if (
          message ===
            "Registration successful! Please check your email to verify your account." &&
          token
        ) {
          handleCreateOrganization(
            obj_for_organization,
            resetForm,
            email,
            is_trust
          );
        }
      });
    },
  });

  const handleAddSchool = () => {
    const nextValue = String(options.length + 2);
    setOptions([...options, { value: nextValue, label: nextValue }]);
  };

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

        const { label, type, placeholder, key } = field;
        return (
          <Stack
            width="100%"
            maxWidth={516}
            spacing={type === "select" ? 2 : 1}
            key={index}
          >
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
            {type === "select" && (
              <Button
                variant="outlined"
                sx={{
                  height: { xs: "46px", md: "54px", lg: "56px" },
                  border: "1px solid #D8D8D8",
                  backgroundColor: "#F1F4F9",
                  borderRadius: "8px",
                  fontSize: "18px",
                  color: "#000",
                }}
                onClick={handleAddSchool}
              >
                + Add School
              </Button>
            )}
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
          loading={isLoading || createLoading}
          disabled={
            isLoading || createLoading || !formik?.values?.terms_and_conditions
          }
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
