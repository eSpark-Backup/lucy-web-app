import { Box, Button, Typography } from "@mui/material";
import { arrow, woman } from "../assets";
import FeatureCard from "./feature-card";
import { features } from "../constant";

const SolutionSection = () => {
  return (
    <Box
      sx={{
        paddingTop: { xs: "40px", md: "60px" },
        pb: 3,
        position: "relative",
      }}
    >
      {/* Background Image */}
      {/* <Box
        component="img"
        src={woman}
        alt="Image"
        sx={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
        }}
      /> */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: "60px",
          // mt: { xs: -12, md: "-305px", xl: "-380px" },
          // mr: { xs: "0px", lg: "20px" },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#CCD7FF47",
            borderRadius: "35px",
            boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.25)",
            p: { xs: "30px", md: "30px 60px 60px 60px" },
            width: "100%",
            maxWidth: "1300px",
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: { xs: 4, md: 6 },
            backdropFilter: "blur(11px)",
          }}
        >
          <Box
            sx={{
              flexBasis: { lg: "455px" },
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "30px", md: "48.41px" },
                fontWeight: 600,
                mb: 1,
                fontFamily: '"Aoboshi One", serif',
              }}
            >
              EduPulse GPT Difference
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Expert Guidance. Custom Solutions. <br /> Efficient Setup. Ongoing
              Support.
            </Typography>
            <Box sx={{ width: "220px" }}>
              <Button
                variant="primary"
                sx={{
                  textTransform: "none",
                  width: "100%",
                  fontFamily: `"Aoboshi One", serif`,
                }}
                disableRipple
              >
                All Solutions
                <img src={arrow} alt="Icon" />
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "space-between" },
              gap: { xs: 3, md: 4 },
              width: "100%",
              maxWidth: { lg: "calc(100% - 500px)" },
            }}
          >
            {features?.map((item, index) => (
              <FeatureCard
                key={index}
                heading={item?.heading}
                description={item?.description}
                img={item?.img}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SolutionSection;
