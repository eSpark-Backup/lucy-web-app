import { toast } from "react-toastify";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Stack, Typography, Button } from "@mui/material";
import { VERIFY_EMAIL } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import { useResendEmailMutation } from "../../services/auth";

const VerifyEmail = () => {
  const { title, description, buttonText, backToLogin, loginLink } =
    VERIFY_EMAIL || {};

  const {
    authFormStyle,
    authTitleStyle,
    authDescriptionStyle,
    authButtonStyle,
    authButtonTypoStyle,
    authSignupLinkTextStyle,
  } = componentStyles || {};

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [resendEmail, { isLoading }] = useResendEmailMutation();

  const handleResend = () => {
    resendEmail({ email }).then((res) => {
      if (res?.data) {
        toast.success("Email send successfuly");
      }
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    });
  };

  return (
    <Box component="form" sx={authFormStyle}>
      <Stack spacing={2} pb={2} alignItems="center" justifyContent="center">
        <Typography variant="h2" sx={authTitleStyle}>
          {title}
        </Typography>
        <Typography variant="h5" sx={authDescriptionStyle}>
          {description}
        </Typography>
      </Stack>
      <Stack width="100%" maxWidth={418} pt={1} spacing={2}>
        <Button
          loading={isLoading}
          disabled={isLoading}
          onClick={handleResend}
          fullWidth
          sx={authButtonStyle}
        >
          <Typography variant="h5" sx={authButtonTypoStyle}>
            {buttonText}
          </Typography>
        </Button>
        <Link to={`${loginLink}`} style={{ color: "#5A8CFF" }}>
          <Typography component={"span"} sx={authSignupLinkTextStyle}>
            {backToLogin}
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
};

export default VerifyEmail;
