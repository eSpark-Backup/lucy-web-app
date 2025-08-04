import { Box, Typography } from "@mui/material";
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
    <Box sx={{ mb: "30px", mt: "20px" }}>
      <Typography
        sx={{ color: "#2B2C2C", fontSize: "25px", textAlign: "center" }}
      >
        Get your school featured in top publications.
      </Typography>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        slidesPerView={"auto"}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        style={{
          marginTop: "30px",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          boxSizing: "border-box",
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
