import React from "react";
import { Box, Typography } from "@mui/material";
import { bannerVideo } from "../assets";

const HeroSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        px: { xs: 2, md: 6, lg: 12 },
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0) 6.25%, #FFFFFF 100%)",
      }}
    >
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
          sx={{
            fontWeight: 600,
            fontSize: { xs: "24px", md: "40px", lg: "71px" },
            fontFamily: `"Poppins", sans-serif`,
            color: "#020202",
          }}
        >
          Attract More Students <br />
          Just £10* per month <br />
          Boost Your School’s Visibility <br />
          Edupulse App
        </Typography>

        <Typography
          sx={{
            color: "#8E8F92",
            mx: "auto",
            fontSize: { xs: "14px", md: "28px" },
            fontWeight: "400",
            mt: "20px",
          }}
        >
          Schools That Market Themselves Win. Don’t Get Left Behind! <br /> Let
          the Edupulse App create your marketing content.
        </Typography>
      </Box>

      {/* Foreground AI Image */}
      <Box
        component="video"
        src={bannerVideo}
        autoPlay
        loop
        muted
        playsInline
        sx={{
          display: "block",
          mt: { xs: 6, md: 8 },
          mx: "auto",
          width: "75%",
          height: "auto",
          zIndex: 1,
          position: "relative",
        }}
      />
    </Box>
  );
};

export default HeroSection;
