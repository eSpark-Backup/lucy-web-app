import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { slides } from "../constant";

const Services = () => {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        background: "#D9D9D980",
        pt: "30px",
      }}
    >
      <Box
        sx={{
          px: { xs: "30px", md: "50px", lg: "90px" },
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
        }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(270deg, rgba(77, 118, 255, 0) 10.66%, #1A4FFF 63.32%)",
            p: "20px 25px",
            width: "298px",
          }}
        >
          <Typography
            sx={{ lineHeight: "10px", color: "#FFFFFF", fontSize: "20.47px" }}
          >
            Services
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: { xs: "20.41px", md: "28.41px", lg: "48.41px" } }}
        >
          Our Core Services
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "10%",
            zIndex: 2,
          },
          "&::before": {
            left: 0,
          },
          "&::after": {
            right: 0,
          },
        }}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={6}
          centeredSlides={false}
          spaceBetween={10}
          loop={true}
          initialSlide={0} // Ensures starting from first slide
          slidesOffsetBefore={0} // Removes initial left offset
          slidesOffsetAfter={0} // Removes right offset
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1900: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          style={{
            marginTop: "30px",
            padding: "0 5%",
            paddingBottom: "40px",
          }}
        >
          {slides.map((item, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  backgroundImage: `url(${item?.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "450px",
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: "white",
                    background:
                      "linear-gradient(0deg, #003164 22.35%, rgba(0, 49, 100, 0) 100%)",
                    padding: "12px 24px",
                    backdropFilter: "blur(8px)",
                    height: {
                      xs: "170px",
                      sm: "190px",
                      md: "180px",
                    },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%", // Ensure full width
                    boxSizing: "border-box", // Include padding in width calculation
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "16px", md: "18px", lg: "20px" },
                      color: "#FFFFFF",
                    }}
                  >
                    {item?.heading}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "14px", md: "16px", lg: "18px" },
                      color: "#FFFFFF",
                    }}
                  >
                    {item?.description}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default Services;
