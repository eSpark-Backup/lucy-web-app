import { Box, Typography } from "@mui/material";
import { about } from "../assets";

const About = () => {
  return (
    <Box
      sx={{
        pl: { xs: "30px", md: "50px", lg: "90px" },
        pr: { xs: "15px", md: "25px", lg: "45px" },
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
          Growth through Knowledge
        </Typography>
        <Typography sx={{ fontSize: "22px", mt: "15px", fontWeight: "400" }}>
          EduPulse was established in 2023 by Adam and Chris following two years
          of discussions about the need to enable more people to have a voice
          within the education sector and to better connect the brilliant minds
          working in Initial Teacher Education, universities and schools.
        </Typography>
        <Typography sx={{ fontSize: "22px", mt: "20px", fontWeight: "400" }}>
          With evidence engagement at the heart of all they do, EduPulse writes
          for publications, creates space for conversation through its podcast,
          reviews recent publications, provides talks and workshops for trusts,
          universities and schools and provides informal support for anyone who
          wants it in the education world. about the need to enable more people
          to have a voice within the education sector and to better connect the
          brilliant minds working in Initial Teacher Education, universities and
          schools.
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
