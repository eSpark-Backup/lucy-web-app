import React from "react";
import { Box, Typography } from "@mui/material";
import { ai, dashed } from "../assets";

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        px: { xs: 2, md: 6, lg: 12 },
        py: { xs: 6, md: 10 },
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0) 6.25%, #FFFFFF 100%)",
      }}
    >
      {/* Background dashed path */}
      <Box
        component="img"
        src={dashed}
        alt="Dashed Path"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Text Content */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          zIndex: 1,
          //   maxWidth: "900px",
          //   mx: "auto",
        }}
      >
        <Typography
          variant="gradientText"
          sx={{
            fontWeight: 400,
            fontSize: { xs: "24px", md: "40px", lg: "71px" },
            // lineHeight: 1.4,
            // color: "#1A1A1A",
          }}
        >
          Connect & Engage Effortlessly With <br />
          <Box component="span" variant="gradientText">
            Others on Our AI School Marketing.
          </Box>
        </Typography>

        <Typography
          sx={{
            color: "#8E8F92",
            mx: "auto",
            fontSize: { xs: "14px", md: "22px" },
            fontWeight: "400",
          }}
        >
          Welcome to EduPulse – a brand new think tank that drives engagement
          through <br /> conversation and deep thinking about education.
        </Typography>
      </Box>

      {/* Foreground AI Image */}
      <Box
        component="img"
        src={ai}
        alt="AI Card"
        sx={{
          display: "block",
          mt: { xs: 6, md: 8 },
          mx: "auto",
          width: "75%",
          // maxWidth: "720px",
          height: "auto",
          zIndex: 1,
          position: "relative",
        }}
      />
    </Box>
  );
};

export default HeroSection;
