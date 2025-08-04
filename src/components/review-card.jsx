import { Avatar, Box, Stack, Typography } from "@mui/material";

const ReviewCard = ({ image, name, userName, tweet }) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: "16.51px",
        p: "15px",
        boxShadow: `
      0px 25.8px 90.3px -12.9px rgba(36, 42, 66, 0.08),
      0px 12.9px 30.96px -10.32px rgba(36, 42, 66, 0.04),
      0px 1.29px 5.16px -1.29px rgba(36, 42, 66, 0.06)
    `,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="flex-start"
      >
        <Avatar
          alt={name}
          src={image}
          sx={{ width: "61.92px", height: "61.92px" }}
        />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              columnGap: "10px",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: "18.7px" }}>
              {name}
            </Typography>
            <Typography sx={{ color: "#354450", fontSize: "18.32px" }}>
              {userName}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", columnGap: "10px" }}>
            <Typography
              sx={{ fontWeight: 400, fontSize: "18.7px" }}
              dangerouslySetInnerHTML={{ __html: tweet }}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ReviewCard;
