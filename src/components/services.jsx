import { Box, Container, Typography } from "@mui/material";
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
      <Container
        sx={{
          // px: { xs: "30px", md: "50px", lg: "90px" },
          display: "flex",
          flexDirection: "column",
          rowGap: "15px",
          maxWidth: '1610px',
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
            sx={{
              lineHeight: "10px",
              color: "#FFFFFF",
              fontSize: "20.47px",
              fontFamily: '"Aoboshi One", serif',
            }}
          >
            Services
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: { xs: "20.41px", md: "28.41px", lg: "48.41px" },
            fontFamily: '"Aoboshi One", serif',
          }}
        >
          Our Core Services
        </Typography>
      </Container>

      <Box
        sx={{
          position: "relative",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "50px",
            zIndex: 2,
            pointerEvents: "none",
          },
          "&::before": {
            left: 0,
            background: "linear-gradient(to right, #D9D9D980, transparent)",
          },
          "&::after": {
            right: 0,
            background: "linear-gradient(to left, #D9D9D980, transparent)",
          },
        }}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          centeredSlides={true}
          spaceBetween={20}
          slidesPerView="auto"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          style={{
            marginTop: "30px",
            paddingBottom: "40px",
          }}
        >
          {slides.map((item, index) => (
            <SwiperSlide
              key={index}
              style={{
                width: "350px",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${item?.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
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
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "16px", md: "18px", lg: "20px" },
                      color: "#FFFFFF",
                      fontFamily: '"Open Sans", sans-serif',
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
