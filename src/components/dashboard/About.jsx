import * as React from "react";
import {
  Alert,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { motion } from "framer-motion";
import { ABOUT_DATA } from "../../constant";
import { useInView } from "framer-motion";

function GradualSpacing({ text, variant, ...props }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const MotionTypography = motion(Typography);

  return (
    <Box display="inline-flex" gap={0.2} mx={1}>
      {text.split("").map((char, i) => (
        <MotionTypography
          ref={ref}
          key={i}
          variant={variant}
          initial={{ opacity: 0, x: -18 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          sx={{ lineHeight: 1.2 }}
          {...props}
        >
          {char === " " ? "\u00A0" : char}
        </MotionTypography>
      ))}
    </Box>
  );
}

const About = () => {
  const { title, description, highlightText, services, founderText } =
    ABOUT_DATA || {};
  const MotionBox = motion(Box);

  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          maxWidth: "1000px",
          borderRadius: "14px",
          backgroundColor: "rgba(255, 255, 255, 0.48)",
          boxShadow: "6px 6px 45px 0px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Alert severity="warning" sx={{ borderRadius: 2, mb: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary" }}
            fontWeight={500}
          >
            {highlightText}
          </Typography>
        </Alert>
        <Stack spacing={2} justifyContent="center" minHeight="100%" p={3}>
          <Stack spacing={2}>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
          </Stack>

          <Stack spacing={2} width={"100%"}>
            <List sx={{ width: "100%" }}>
              {services?.map((service, i) => {
                const IconComponent = MuiIcons[service.icon];
                return (
                  <MotionBox
                    key={i}
                    custom={i}
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <ListItem
                      sx={{
                        mb: 2,
                        bgcolor: "white",
                        borderRadius: 2,
                        "&:hover": {
                          boxShadow: "6px 6px 45px 0px rgba(0, 0, 0, 0.05)",
                        },
                      }}
                    >
                      <MotionBox
                        animate={{ scale: [1, 1.3, 1], rotate: [0, 5, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <ListItemIcon>
                          {IconComponent && (
                            <IconComponent sx={{ color: service.color }} />
                          )}
                        </ListItemIcon>
                      </MotionBox>
                      <ListItemText
                        primary={
                          <Typography variant="h6" fontWeight="bold">
                            {service.title}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            {service.desc}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </MotionBox>
                );
              })}
            </List>
          </Stack>

          <Stack spacing={2}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {founderText}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
              }}
            >
              This powerful, tailor-made solution was created by a school
              governor and former BBC journalist,
              <GradualSpacing
                text="Lucy Hood"
                variant="h6"
                sx={{ color: "#000", fontWeight: "bold" }}
              />
              who understands exactly what schools need to stand out.
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default About;
