import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { isValidEmail, useQuery } from "../utils";
import { formIcon, logo, modalBg, tick } from "../assets";

const Step1 = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  return (
    <>
      <Typography
        color="#200C50"
        fontSize="18px"
        fontWeight={700}
        textAlign="center"
      >
        Join the waitlist
      </Typography>
      <Typography
        color="#1A4FFF"
        fontSize="14px"
        fontWeight={400}
        textAlign="center"
      >
        Sign up now for early notification upon launch.
      </Typography>
      <Stack
        mt="20px"
        gap="12px"
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          sx={{ width: { xs: "100%", md: "300px" }, div: { padding: 0 } }}
        />
        <Button
          onClick={() => {
            if (isValidEmail(email)) {
              navigate(`/?open=true&step=2&email=${email}`);
            } else alert("Please enter correct email");
          }}
          sx={{
            width: { xs: "100%", md: "127px" },
            fontSize: "14px",
            fontWeight: 700,
          }}
          variant="primary"
          disableRipple
        >
          Join Wait List
        </Button>
      </Stack>
    </>
  );
};

const Step2 = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const email = query.get("email");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");

  const handleSubmit = () => {
    if (q1 === "" || q2 === "") {
      alert("Please answer the following questions");
    } else {
      const payload = {
        email,
        q1,
        q2,
      };
      console.log(payload, "payload");
      navigate("/?open=true&step=3");
    }
  };
  return (
    <>
      <Typography
        color="#2B106A"
        fontSize="18px"
        fontWeight={700}
        textAlign="center"
      >
        Few Questions for better to know
      </Typography>
      <FormControl sx={{ width: "100%", mt: "22px" }}>
        <Typography fontSize={14} fontWeight={400} color="#2B106A" mb={1}>
          What is the purpose of Joining?{" "}
        </Typography>
        <Select
          sx={{
            ".MuiTypography-root": {
              fontSize: "14px",
              fontWeight: 400,
              color: "#1A4FFF7D",
            },
          }}
          MenuProps={{
            slotProps: {
              root: { hideBackdrop: true },
              backdrop: { invisible: true },
            },
          }}
          value={q1}
          onChange={(e) => setQ1(e.target.value)}
          displayEmpty
          renderValue={(selected) =>
            selected === "" ? (
              <Typography sx={{ color: "#9e9e9e" }}>
                Select an option (option)
              </Typography>
            ) : (
              selected
            )
          }
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: "100%", mt: "17px" }}>
        <Typography fontSize={14} fontWeight={400} color="#2B106A" mb={1}>
          What is the purpose of Joining?{" "}
        </Typography>
        <Select
          sx={{
            ".MuiTypography-root": {
              fontSize: "14px",
              fontWeight: 400,
              color: "#1A4FFF7D",
            },
          }}
          MenuProps={{
            slotProps: {
              root: { hideBackdrop: true },
              backdrop: { invisible: true },
            },
          }}
          value={q2}
          onChange={(e) => setQ2(e.target.value)}
          displayEmpty
          renderValue={(selected) =>
            selected === "" ? (
              <Typography sx={{ color: "#9e9e9e" }}>
                Select an option (option)
              </Typography>
            ) : (
              selected
            )
          }
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Stack
        mt="16px"
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          onClick={handleSubmit}
          sx={{
            width: "63px",
            height: "35px",
            fontSize: "12px",
            fontWeight: 400,
          }}
          variant="primary"
          disableRipple
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};

const Step3 = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={tick} alt="tick" />
    </Box>
  );
};

const WaitlistModal = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const open = query.get("open");
  const step = query.get("step");

  const handleClose = () => {
    navigate("/");
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          background: "linear-gradient(to bottom, #F8F6FE, #fff)",
          width: { xs: "90%", xl: "1440px" },
          maxHeight: "90vh",
          overflowY: "auto",
          padding: { xs: "12px 20px", md: "32px 40px" },
          borderRadius: "59px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderRadius: "60px",
            border: "6px solid #FFF",
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 1) 100%), url(${modalBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <img
            style={{ marginTop: "80px", width: "227px", height: "50px" }}
            src={logo}
            alt="logo"
          />
          <Typography
            fontSize={{ xs: "20px", md: "44px" }}
            fontWeight={700}
            textAlign="center"
          >
            Be the First to get update <br></br> by Joining Our{" "}
            <Typography fontStyle="italic" fontWeight={400} component="span">
              Waitlist!
            </Typography>
          </Typography>
          <Typography
            color="#2B106A"
            fontSize="14px"
            fontWeight={400}
            textAlign="center"
          >
            Be first to experience Replex. Join our waitlist for exclusive
            benefits and revolutionary <br></br> automation solutions.
          </Typography>
          <Box
            sx={{
              position: "relative",
              marginTop: "38px",
              width: { xs: "100%", md: "500px" },
              border: "5px solid #FFF",
              background:
                "linear-gradient(to bottom, #F8F6FE 0%, rgba(255, 255, 255, 1) 100%)",
              borderRadius: "16px",
              padding: "30px",
            }}
          >
            <Box sx={{ position: "absolute", left: "30px", top: "-32px" }}>
              <img src={formIcon} alt="icon" />
              <Box
                sx={{
                  position: "absolute",
                  left: "10px",
                  width: "15px",
                  height: "61px",
                  background:
                    "linear-gradient(180deg, rgba(26, 79, 255, 0.3) 0%, rgba(26, 79, 255, 0.084) 76.31%)",
                  filter: "blur(6px)",
                }}
              ></Box>
            </Box>
            <Box sx={{ position: "absolute", right: "30px", top: "-32px" }}>
              <img src={formIcon} alt="icon" />
              <Box
                sx={{
                  position: "absolute",
                  right: "10px",
                  width: "15px",
                  height: "61px",
                  background:
                    "linear-gradient(180deg, rgba(26, 79, 255, 0.3) 0%, rgba(26, 79, 255, 0.084) 76.31%)",
                  filter: "blur(6px)",
                }}
              ></Box>
            </Box>
            {Number(step) === 3 ? (
              <Step3 />
            ) : Number(step) === 2 ? (
              <Step2 />
            ) : (
              <Step1 />
            )}
          </Box>
          <Stack
            mt="20px"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
            sx={{ width: { xs: "100%", md: "500px" }, padding: "0px 30px" }}
          >
            {["Step 01", "Step 02", "Step 03"].map((item, ind) => (
              <Typography
                color={ind + 1 <= Number(step) ? "#000000" : "#00000091"}
                fontSize={12}
                fontWeight={400}
                key={item}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default WaitlistModal;
