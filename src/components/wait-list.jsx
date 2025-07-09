import { Box, Button, Typography } from "@mui/material";
import { letterBox } from "../assets";
import { useNavigate } from "react-router-dom";

const WaitList = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        pl: { xs: "15px", md: "20px", lg: "35px" },
        background: "linear-gradient(90deg, #4976E7 0%, #294281 100%)",
        // height: "550px",
        mt: "150px",
        display: "flex",
        alignItems: "center",
        pr: { xs: "15px", md: "20px", lg: "140px" },
        position: "relative",
        flexDirection: { xs: "column", lg: "row" },
        pb: { xs: "15px", lg: "0px" },
        rowGap: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // width: "300px",
        }}
      >
        <Box
          component={"img"}
          src={letterBox}
          sx={{
            width: "90%",
            position: "relative",
            top: { xs: "0px", lg: "-220px" },
            "@media (min-width: 1280px) and (max-width: 1880px)": {
              top: "-170px",
            },
          }}
          alt="Letter box"
        ></Box>

        <Box
          sx={{
            backgroundColor: "#152A7D6E",
            backdropFilter: "blur(54.6px)",
            height: "19px",
            width: { xs: "100%", sm: "347px" },
            position: "relative",
            top: { xs: "0px", lg: "-210px" },
            borderRadius: "50%",
            right: { xs: "10px", sm: "40px" },
            "@media (min-width: 1280px) and (max-width: 1850px)": {
              top: "-165px",
            },
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          rowGap: "25px",
          flexDirection: "column",
          // maxWidth: "800px",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "24px", md: "40px", lg: "50px" }, // fallback breakpoints
            lineHeight: { xs: "30px", md: "50px", lg: "60px" },
            color: "#ffffff",
            wordBreak: "break-word",
            "@media (min-width: 1850px)": {
              fontSize: "71px",
              lineHeight: "80px",
            },
            fontFamily: '"Aoboshi One", serif',
          }}
        >
          {/* Join our wait List to get Earlier <br /> Access in our AI platform */}
          Exclusive Waitlist Offer
        </Typography>

        <Box sx={{ width: { xs: "100%", sm: "270px" } }}>
          <Button
            onClick={() => navigate("/?open=true&step=1")}
            variant="secondary"
            disableRipple
            sx={{ fontFamily: '"Roboto", sans-serif' }}
          >
            Wait List
          </Button>
        </Box>
        <Typography
          sx={{
            fontSize: { xs: "18.88px", md: "22.88px", lg: "26.88px" },
            color: "#ffffff",
            fontFamily: '"Plus Jakarta Sans", sans-serif',
          }}
        >
          {/* Stay ahead with the latest updates, insights, and events from Macat{" "}
          <br /> Megatrons. */}
          Be part of our community! Join the waitlist today and get 10% off your
          subscription at app launch.
          <br />
          Just £10 per school per month if the whole Trust signs up, or £50 per
          month for a standalone school subscription.
          <br />
          {/* Your competition is already marketing—are you? Join the waitlist now
          and take control of your school’s success. */}
        </Typography>
      </Box>
    </Box>
  );
};

export default WaitList;
