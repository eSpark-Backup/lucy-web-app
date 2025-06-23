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
  ];
  return (
    <Box sx={{ mb: "30px", px: "20px" }}>
      <Typography
        sx={{ color: "#2B2C2C", fontSize: "25px", textAlign: "center" }}
      >
        Over 200+ Company work with eduplus
      </Typography>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={7}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 7 },
        }}
        style={{ marginTop: "30px" }}
      >
        {slides.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Logo ${index}`}
              style={{ maxHeight: "60px", objectFit: "contain", width: "100%" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default LogoSlider;
