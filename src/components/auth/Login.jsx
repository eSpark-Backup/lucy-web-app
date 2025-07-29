import { Box, Stack, Typography } from "@mui/material";

const Login = () => {
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
      <Stack spacing={2} alignItems={"center"} justifyContent={"center"}>
        <Typography
          variant="h2"
          fontWeight={700}
          textAlign={"center"}
          color="textPrimary"
        >
          Login to Account
        </Typography>
        <Typography variant="h5" textAlign={"center"} color="textPrimary">
          Please enter your email and password to continue
        </Typography>
      </Stack>
    </Box>
  );
};

export default Login;
