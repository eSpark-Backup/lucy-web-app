import { Box, Button, Typography } from "@mui/material";
import { letterBox } from "../assets";

const WaitList = () => {
  return (
    <Box
      sx={{
        pl: "20px",
        background: "linear-gradient(90deg, #4976E7 0%, #294281 100%)",
        // height: "550px",
        mt: "150px",
        display: "flex",
        alignItems: "center",
        pr: { xs: "5px", md: "20px", lg: "140px" },
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
            top: { xs: "0px", lg: "-220px" },
            borderRadius: "50%",
            right: { xs: "10px", sm: "40px" },
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
            fontSize: { xs: "24px", md: "40px", lg: "71px" },
            lineHeight: { xs: "30px", md: "50px", lg: "80px" },
            color: "#ffffff",
            wordBreak: "break-word",
          }}
        >
          Join our wait List to get Earlier <br /> Access in our AI platform
        </Typography>
        <Box sx={{ width: "270px" }}>
          <Button variant="secondary" disableRipple>
            Wait List
          </Button>
        </Box>
        <Typography
          sx={{
            fontSize: { xs: "18.88px", md: "22.88px", lg: "26.88px" },
            color: "#ffffff",
          }}
        >
          Stay ahead with the latest updates, insights, and events from Macat{" "}
          <br /> Megatrons.
        </Typography>
      </Box>
    </Box>
  );
};

export default WaitList;
