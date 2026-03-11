import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import {
  bg,
  boostParentalEngagement,
  buildYourSchoolReputation,
  savesTeachersHours,
} from "../assets";
import { motion } from "framer-motion";

const items = [
  {
    text: `Optimize Teachers Productivity`,
    icon: savesTeachersHours,
  },
  {
    text: `Boost parental Engagement`,
    icon: boostParentalEngagement,
  },
  {
    text: `Build your school’s reputation`,
    icon: buildYourSchoolReputation,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, type: "spring", stiffness: 120, damping: 15 },
  },
};

const HeroSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: { xs: "auto", md: '400px', lg: "500px" },
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        mb: 4,
        px: 1.5,
      }}
    >
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          py: { xs: 5, md: 6 },
          px: { xs: 3, md: 6, lg: 12 },
        }}
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            sx={{
              fontSize: { xs: "24px", md: "30px", lg: "44px" },
              maxWidth: { xs: "525px", md: "725px", lg: "925px" },
              color: "#2a4483",
              fontWeight: 800,
              wordBreak: "break-word",
              mx: "auto",
            }}
          >
            <strong>
              AI Content Creation Tool for Schools That Saves Staff Hours — Just
              £15 per Month
            </strong>
          </Typography>
        </motion.div>

        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Typography
            sx={{
              color: "#2a4483",
              fontSize: { xs: "16px", sm: "20px", lg: "26px" },
              maxWidth: { xs: "525px", md: "725px", lg: "1100px" },
              wordBreak: "break-word",
              fontWeight: "400",
              mt: "20px",
              mx: "auto",
            }}
          >
            Turn your school’s news and achievements into ready made social
            media posts, newsletters, and press releases in minutes.
          </Typography>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            gap={{ xs: 1.5, md: 2.5 }}
            mt={3}
          >
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  width: "fit-content",
                  backgroundColor: "#2a4483",
                  color: "#fff",
                  fontSize: { xs: "12px", md: "16px", lg: "20px" },
                  fontWeight: "700",
                  borderRadius: "8px",
                  px: 1.5,
                  py: 2,
                }}
              >
                Book a Demo
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                disableElevation
                sx={{
                  width: "fit-content",
                  backgroundColor: "#fff",
                  color: "#2a4483",
                  fontSize: { xs: "12px", md: "16px", lg: "20px" },
                  fontWeight: "700",
                  borderRadius: "8px",
                  px: 1.5,
                  py: 2,
                }}
              >
                Start Free Trial
              </Button>
            </motion.div>
          </Stack>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid
            container
            maxWidth={930}
            sx={{
              width: "100%",
              position: { xs: "relative", md: "absolute" },
              left: "50%",
              transform: "translateX(-50%)",
              mx: "auto",
              justifyContent: "center",
              alignItems: "center",
              mt: 0,
              bottom: { xs: -60, md: -40 },
            }}
          >
            {items?.map((item, index) => {
              const isFirst = index === 0;
              const isMiddle = index === 1;
              const isLast = index === items?.length - 1;

              return (
                <Grid
                  key={index}
                  size={{ xs: 7.5, md: 4 }}
                  sx={{
                    backgroundColor: "#fff",
                    border: "1px solid #afafaf",

                    borderRight: {
                      xs: "1px solid #afafaf",
                      md: isFirst ? "0" : "1px solid #afafaf",
                    },
                    borderLeft: {
                      xs: "1px solid #afafaf",
                      md: isLast ? "0" : "1px solid #afafaf",
                    },

                    ...(isMiddle && {
                      borderLeft: "1px solid #afafaf",
                      borderRight: "1px solid #afafaf",
                      borderTop: { xs: "0", md: "1px solid #afafaf" },
                      borderBottom: { xs: "0", md: "1px solid #afafaf" },
                    }),

                    borderRadius: {
                      xs: isFirst ? "20px 0 0 0" : isLast ? "0 0 20px 0" : "0",
                      md: isFirst
                        ? "20px 0 0 20px"
                        : isLast
                          ? "0 20px 20px 0"
                          : "0",
                    },
                  }}
                >
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{
                      y: -8,
                      boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: { xs: "column", sm: "row" },
                        minHeight: { xs: "auto", md: "100px" },
                        height: "100%",
                        px: { xs: 2, lg: 2 },
                        py: { xs: 1.5, lg: 3 },
                        gap: 1.5,
                      }}
                    >
                      <Box
                        component={"img"}
                        src={item?.icon}
                        alt="Description"
                        sx={{
                          width: "auto",
                          height: { xs: "45px", md: "55px", lg: "75px" },
                        }}
                      />

                      <Typography
                        sx={{
                          width: "fit-content",
                          fontSize: { xs: "14px", lg: "18px" },
                          fontWeight: 700,
                          color: "#2a4483",
                          wordBreak: "break-word",
                        }}
                      >
                        {item?.text}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </motion.div>
      </Box>
    </Box>
  );
};

export default HeroSection;
