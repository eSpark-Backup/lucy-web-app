import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Stack, Typography, Button } from "@mui/material";
import { EMAIL_VERIFICATION } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import { useVerifyEmailQuery } from "../../services/auth";
import ProgressionStatus from "../progressionStatus";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const { data, isSuccess, isError, error } = useVerifyEmailQuery(token, {
    skip: !token,
  });
  const { title, description, successMessage, failureMessage, buttonText } =
    EMAIL_VERIFICATION || {};

  const {
    authFormStyle,
    authTitleStyle,
    authDescriptionStyle,
    authButtonStyle,
    authButtonTypoStyle,
  } = componentStyles || {};

  useEffect(() => {
    if (isSuccess) {
      setStatus("success");
      localStorage.setItem("token", data?.accessToken);
    }
    if (isError) {
      setStatus("error");
    }
  }, [data, isSuccess, isError, error]);

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <Box sx={authFormStyle}>
      <Stack spacing={2} pb={2} alignItems="center" justifyContent="center">
        <Typography variant="h2" sx={authTitleStyle}>
          {title}
        </Typography>
        <Typography variant="h5" sx={authDescriptionStyle}>
          {status === "loading"
            ? description
            : status === "success"
            ? successMessage
            : failureMessage}
        </Typography>
      </Stack>
      <ProgressionStatus status={status} />
      <Stack width="100%" maxWidth={418} pt={1} spacing={2}>
        <Button
          disabled={status !== "success"}
          onClick={handleClick}
          type="submit"
          fullWidth
          sx={authButtonStyle}
        >
          <Typography variant="h5" sx={authButtonTypoStyle}>
            {buttonText}
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};

export default EmailVerification;
