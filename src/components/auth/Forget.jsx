import { Box, Button, Stack, Typography } from "@mui/material";
import { componentStyles } from "../../style/componentStyles";
import { FORGET } from "../../constant";
import NotFoundImage from "../../assets/images/404.svg";
import { useNavigate } from "react-router-dom";

const Forget = () => {
  const { title, buttonText } = FORGET || {};
  const { authTitleStyle, authButtonStyle, authButtonTypoStyle } =
    componentStyles || {};
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Stack alignItems="center" justifyContent="center">
        <Box
          component={"img"}
          src={NotFoundImage}
          sx={{ width: { xs: "85%", sm: "90%", md: "100%" } }}
        />
      </Stack>
      <Stack spacing={5} alignItems="center" justifyContent="center">
        <Typography variant="h2" sx={authTitleStyle}>
          {title}
        </Typography>
        <Button
          type="submit"
          fullWidth
          sx={authButtonStyle}
          onClick={handleClick}
        >
          <Typography variant="h5" sx={authButtonTypoStyle}>
            {buttonText}
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
};

export default Forget;
