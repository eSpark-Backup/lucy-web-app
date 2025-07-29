import { Box, Stack, Typography } from "@mui/material";

const Signup = () => {
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
          Create an Account
        </Typography>
        <Typography variant="h5" textAlign={"center"} color="textPrimary">
          Create a account to continue
        </Typography>
      </Stack>
    </Box>
  );
};

export default Signup;