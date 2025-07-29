import { Box, Stack, Typography } from "@mui/material";

const Lost = () => {
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
          Looks like you’ve got lost….
        </Typography>
      </Stack>
    </Box>
  );
};

export default Lost;
