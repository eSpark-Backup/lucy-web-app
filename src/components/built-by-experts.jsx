import { Avatar, Box, Typography } from "@mui/material";
import { lucy } from "../assets";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: custom },
  }),
};

const BuiltByExperts = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e4f0ff",
        px: { xs: 2.5, md: 4 },
        py: { xs: 3.5, md: 5 },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%" },
          mx: "auto",
          maxWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          color: "#2a4483",
        }}
      >
        {/* About Us Badge */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          variants={fadeUp}
        >
          <Box
            sx={{
              backgroundColor: "#2a4483",
              borderRadius: "8px",
              p: "15px 25px",
              width: "fit-content",
              mb: 2,
            }}
          >
            <Typography
              sx={{
                lineHeight: "10px",
                color: "#FFFFFF",
                fontSize: { xs: "14px", sm: "16px", lg: "20px" },
                fontWeight: "bold",
                letterSpacing: "0.05em",
              }}
            >
              About Us
            </Typography>
          </Box>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          variants={fadeUp}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Avatar
              src={lucy || "/"}
              alt={"Lucy"}
              sx={{
                mx: "auto",
                width: { xs: "95px", lg: "132px" },
                height: { xs: "95px", lg: "132px" },
                border: "4px solid #2a4483",
                color: "#2a4483",
                mb: { xs: 1, lg: 2 },
              }}
            />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.4}
          variants={fadeUp}
        >
          <Typography
            sx={{
              fontSize: { xs: "18px", sm: "23px", lg: "31px" },
              fontWeight: "bold",
              mt: "20px",
            }}
          >
            Built by Experts Who Understand Schools
          </Typography>
        </motion.div>

        {/* Paragraphs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.6}
          variants={fadeUp}
        >
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "18px", lg: "23px" },
              fontWeight: "400",
              mt: "5px",
            }}
          >
            Every empty seat in your school means lost money and funding.
            EduPulse GPT is your very own school marketing department. It is a
            game-changing, inexpensive AI-based marketing app. This
            subscription-based app could cost your school as little as just £15*
            per month. It means busy, cash-strapped schools will be visible in
            their community. Parents have more choices than ever, and if you’re
            not actively promoting your school, you’re missing out. But we know
            how busy school staff are and how finances are stretched, that’s why
            we’ve built EduPulse GPT an AI-driven marketing tool to help your
            school.
          </Typography>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.8}
          variants={fadeUp}
        >
          <Typography
            sx={{
              fontSize: { xs: "14px", sm: "18px", lg: "23px" },
              mt: "20px",
              fontWeight: "400",
            }}
          >
            EduPulse GPT was created by a school governor, former BBC
            journalist, and director of Exposure PR, Lucy Hood, who understands
            exactly what schools need to stand out. This isn’t just another AI
            tool, it’s a tailor-made solution designed with insider knowledge to
            help schools like yours thrive.
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default BuiltByExperts;
