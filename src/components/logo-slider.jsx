import { Box, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
  bbcNews,
  guardian,
  independent,
  itv,
  morning,
  reach,
  skyNews,
  tes,
} from "../assets";

const LogoSlider = () => {
  const slides = [
    morning,
    independent,
    itv,
    reach,
    tes,
    skyNews,
    bbcNews,
    guardian,
    morning,
    independent,
    itv,
    reach,
    tes,
    skyNews,
    bbcNews,
    guardian,
    morning,
    independent,
    itv,
    reach,
    tes,
    skyNews,
    bbcNews,
    guardian,
  ];
  return (
    <Box
      sx={{
        py: { xs: 3, lg: 2 },
        width: "85%",
        mx: "auto",
        maxWidth: { xs: "820px", lg: "930px" },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "18px", lg: "23px" },
          wordBreak: "break-word",
          color: "#2a4483",
          fontWeight: "bold",
          textAlign: "center",
          mb: 5,
        }}
      >
        Get your school featured in top publications.
      </Typography>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        slidesPerView={"auto"}
        spaceBetween={30}
        speed={1500} 
        autoplay={{
          delay: 0, 
          disableOnInteraction: false,
        }}
        style={{
          marginTop: "50px",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          boxSizing: "border-box",
          cursor: "pointer",
        }}
      >
        {slides.map((src, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: "120px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={src}
              alt={`Logo ${index}`}
              style={{
                maxHeight: "60px",
                objectFit: "contain",
                width: "100%",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default LogoSlider;
