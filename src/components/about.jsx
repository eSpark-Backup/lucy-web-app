import { Box, Typography } from "@mui/material";
import { about } from "../assets";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Box
      sx={{
        // pl: { xs: "30px", md: "50px", lg: "90px" },
        // pr: { xs: "15px", md: "25px", lg: "45px" },
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        my: "30px",
        flexDirection: { xs: "column", lg: "row" },
        rowGap: "15px",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", lg: "50%" },
          display: "flex",
          flexDirection: "column",
          pt: "15px",
        }}
      >
        <Box
          sx={{
            background:
              "linear-gradient(270deg, rgba(77, 118, 255, 0) 10.66%, #1A4FFF 63.32%)",
            p: "15px 25px",
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
            About Us
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "50.99px",
            mt: "15px",
            fontFamily: '"Aoboshi One", serif',
          }}
        >
          Built by Experts Who Understand Schools
        </Typography>
        <Typography sx={{ fontSize: "22px", mt: "15px", fontWeight: "400" }}>
          Every empty seat in your school means lost money and funding. Edupulsegpt
          is your very own school marketing department. It is a game-changing,
          inexpensive AI-based marketing app. This subscription-based app could
          cost your school as little as just £10* per month. It means busy,
          cash-strapped schools will be visible in their community. Parents have
          more choices than ever, and if you’re not actively promoting your
          school, you’re missing out. But we know how busy school staff are and
          how finances are stretched, that’s why we’ve built Edupulsegpt an
          AI-driven marketing tool to help your school.
        </Typography>
        <Typography sx={{ fontSize: "22px", mt: "20px", fontWeight: "400" }}>
          Edupulsegpt was created by a school governor, former BBC journalist, and
          director of{" "}
          <a
            href="https://www.exposure-pr.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#000000" }}
          >
            Exposure PR
          </a>
          , Lucy Hood, who understands exactly what schools need to stand out.
          This isn’t just another AI tool, it’s a tailor-made solution designed
          with insider knowledge to help schools like yours thrive.
        </Typography>
      </Box>
      <Box
        component={"img"}
        src={about}
        sx={{ width: { xs: "100%", lg: "auto" } }}
      ></Box>
    </Box>
  );
};

export default About;
