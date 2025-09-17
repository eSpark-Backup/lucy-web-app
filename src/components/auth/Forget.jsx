import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { FORGET } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import { Link } from "react-router-dom";
import { forgetSchema } from "../../schemas/forget";
import { useForgetPasswordMutation } from "../../services/auth";
import { toast } from "react-toastify";

const Forget = () => {
  const {
    title,
    description,
    fields,
    buttonText,
    haveAnAccountText,
    signUpText,
  } = FORGET || {};

  const [forgetData, { isLoading }] = useForgetPasswordMutation();

  const {
    authFormStyle,
    authInputStyle,
    authTitleStyle,
    authLableStyle,
    authDescriptionStyle,
    authButtonStyle,
    authButtonTypoStyle,
    authHaveAnAccountTextStyle,
    authSignupLinkTextStyle,
  } = componentStyles || {};

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetSchema,
    onSubmit: async (values) => {
      forgetData({ email: values?.email }).then((res) => {
        if (res?.data) {
          toast.success(res?.data?.message);
          localStorage.removeItem("token");
          return;
        }
        if (res?.error) {
          toast.error(res?.error?.data?.message);
          return;
        }
      });
    },
  });

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
      <Stack width="100%" maxWidth={516} spacing={2}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h5" sx={authLableStyle}>
            {fields?.label}
          </Typography>
        </Stack>
        <TextField
          fullWidth
          name={fields?.key}
          sx={authInputStyle}
          placeholder={fields?.placeholder}
          value={formik?.values?.[fields?.key]}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          error={
            formik?.touched?.[fields?.key] &&
            Boolean(formik?.errors?.[fields?.key])
          }
          helperText={
            formik?.touched?.[fields?.key] && formik?.errors?.[fields?.key]
          }
        />
      </Stack>
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

export default Forget;
