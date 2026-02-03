import { Box, Grid, Stack, Typography } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

const WhoIsThisFor = () => {
  const items = [
    "Primary & Secondary Schools",
    "Governors & Admin Staff",
    "Trust / MAT Leaders",
    "PTA & Comms Teams",
  ];

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.5,
        duration: 0.5,
      },
    }),
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Stack spacing={3} alignItems="center" sx={{ py: { xs: 4, md: 5 } }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "18px", lg: "23px" },
            maxWidth: { xs: "525px", md: "725px", lg: "925px" },
            color: "#2a4483",
            fontWeight: "bold",
            wordBreak: "break-word",
            mx: "auto",
          }}
        >
          Who Is This For?
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr auto",
            },
            columnGap: 4,
            mx: "auto",
            backgroundColor: "#e9f3ff",
            px: 4,
            py: 2,
          }}
        >
          {items.map((item, index) => (
            <ListItem
              key={index}
              disableGutters
              sx={{ py: 0 }}
              component={motion.div}
              variants={itemVariant}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <CheckCircleIcon sx={{ color: "#2a4483" }} />
              </ListItemIcon>

              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  color: "#2a4483",
                }}
              />
            </ListItem>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default WhoIsThisFor;
