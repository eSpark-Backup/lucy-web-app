import { Box, Card, Typography, Avatar } from "@mui/material";
import { testimonialImg1 } from "../assets";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    img: testimonialImg1,
    para1:
      "I can sit down for a couple of hours once a month and block in a whole load of things… and then I just know it’s there and it’s done. I haven’t got to think about it again.",
    name: "Ali Gillings",
    school: "Blundeston Church of England Primary School",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
  }),
};

const TestimonialSection = () => {
  return (
    <Box
      sx={{
        py: 3.5,
        width: "100%",
        maxWidth: "1000px",
        px: { xs: 2, md: "auto" },
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "18px", lg: "23px" },
          color: "#2a4483",
          fontWeight: "bold",
          textAlign: "center",
          mb: { xs: 4 },
        }}
      >
        Trusted by School Leaders
      </Typography>

      <Swiper
        modules={[Autoplay]}
        loop={true}
        spaceBetween={30}
        autoplay={{
          delay: 2800,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          600: { slidesPerView: 1 },
          900: { slidesPerView: testimonials?.length > 1 ? 2 : 1 },
        }}
      >
        {testimonials?.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <motion.div
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <Card
                sx={{
                  mx: "auto",
                  width: "100%",
                  maxWidth: { xs: "400px", md: "500px" },
                  minHeight: 160,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  p: 2,
                  gap: 2,
                  color: "#2a4483",
                  backgroundColor: "#e9f3ff",
                }}
              >
                <Avatar
                  src={item?.img || "/"}
                  alt={item?.name}
                  sx={{
                    width: { xs: "85px", lg: "100px" },
                    height: { xs: "85px", lg: "100px" },
                    border: "4px solid #2a4483",
                    color: "#2a4483",
                  }}
                />

                <Box>
                  <Typography
                    sx={{
                      mb: 1,
                      fontSize: { xs: "13px" },
                    }}
                  >
                    {item.para1}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: "bold",
                      mt: 1,
                      fontSize: { xs: "13px" },
                    }}
                  >
                    — {item.name}, {item.school}
                  </Typography>
                </Box>
              </Card>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TestimonialSection;
