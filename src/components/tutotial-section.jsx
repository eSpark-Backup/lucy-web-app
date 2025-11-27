import { Box, Typography } from "@mui/material";
import { tutorialThumbnail, tutorialVideo } from "../assets";

const TutotialSection = () => {
  return (
    <Box
      sx={{
        pb: 3,
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          my: "60px",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(to right, #FAF5EB, #EBF5F7, #F0F0F0)",
            borderRadius: "35px",
            boxShadow:
              "8px 8px 15px rgba(174, 174, 192, 0.4), -8px -8px 15px rgba(255, 255, 255, 0.7)",
            p: { xs: "30px", md: "60px 60px 60px 60px" },
            width: "100%",
            maxWidth: "1300px",
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: { xs: 4, md: 6 },
            backdropFilter: "blur(11px)",
          }}
        >
          <Box
            sx={{
              flexBasis: { lg: "455px" },
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "30px", md: "48.41px" },
                fontWeight: 600,
                mb: 1,
                fontFamily: '"Aoboshi One", serif',
              }}
            >
              EduPulse GPT Tutorial
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Your guide through every step. <br /> Smart tips. Always
              supported.
            </Typography>
          </Box>
          <Box>
            <video
              width="100%"
              playsInline
              controls
              poster={tutorialThumbnail}
              style={{
                borderRadius: 12,
                outline: "none",
              }}
            >
              <source src={tutorialVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TutotialSection;
