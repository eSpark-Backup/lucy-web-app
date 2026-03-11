import { Box, Card, Typography } from "@mui/material";
import { motion } from "framer-motion";

const FlexiblePlans = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    float: {
      y: [0, -8, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
    },
  };

  const floatVariants = {
    float: {
      scale: [1, 1.2, 1, 1.2, 1.1],
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        pt: 2,
        pb: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "18px", lg: "23px" },
          color: "#2a4483",
          fontWeight: "bold",
          textAlign: "center",
          mb: 4,
        }}
      >
        Flexible Plans for Every School
      </Typography>

      <motion.div
        initial="hidden"
        animate={["visible", "float"]}
        variants={cardVariants}
        whileHover={{ scale: 1.05, rotate: 1 }}
        style={{ width: "100%", maxWidth: 271 }}
      >
        <Card
          elevation={0}
          sx={{
            borderRadius: "15px 15px 0px 0px",
            display: "flex",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            color: "#2a4483",
            backgroundColor: "#e9f3ff",
            minHeight: { xs: 200, lg: 258 },
            gap: 2,
            p: 2,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              background: "rgb(133 165 242)",
              px: { xs: 1.5, md: 2 },
              py: { xs: 1.2, md: 1.5 },
              borderRadius: "15px 15px 0 0",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: { xs: "19px", md: "22px", lg: "24px" },
              }}
            >
              Standard Plan
            </Typography>
          </Box>
          <motion.div variants={floatVariants}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "38px", md: "46px", lg: "56px" },
              }}
            >
              💷 15
            </Typography>
          </motion.div>
        </Card>
      </motion.div>
    </Box>
  );
};

export default FlexiblePlans;
