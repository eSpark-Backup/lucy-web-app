import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
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
import {
  q1Options,
  q2Options,
  q3Options,
  q4Options,
  q5Options,
  q6Options,
  q7Options,
} from "../constant";
import CustomSelect from "./select";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

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
            } else toast.error("Please enter correct email");
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
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q2Other: "",
    q3: "",
    q3Other: "",
    q4: "",
    q4Other: "",
    q5: "",
    q6: "",
    q7: "",
  });

  const SendHandler = async (data) => {
    try {
      // const res = await axios.post("https://eduplusemail.esparkconsultants.com/start-survey", data);
      const res = await axios.post(
        "https://luccy-landing-be.stg.esparkconsultants.com/questions",
        data
      );
      setIsLoading(false);
      navigate("/?open=true&step=3");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = () => {
    const { q1, q2, q3, q4, q5, q6, q7, q2Other, q3Other, q4Other } = answers;
    if ([q1, q2, q3, q4, q5, q6, q7].includes("")) {
      toast.error("Please answer the following questions");
      return;
    }
    if (
      (q2 === "Other (please specify)" && answers?.q2Other.trim() === "") ||
      (q3 === "Other (please specify)" && answers?.q3Other.trim() === "") ||
      (q4 === "Other (please specify)" && answers?.q4Other.trim() === "")
    ) {
      toast.error("Please answer the following questions");
      return;
    }

    const index1 = q1Options.findIndex((item) => item?.label === q1);
    const index2 = q2Options.findIndex((item) => item?.label === q2);
    const index3 = q3Options.findIndex((item) => item?.label === q3);
    const index4 = q4Options.findIndex((item) => item?.label === q4);
    const index5 = q5Options.findIndex((item) => item?.label === q5);
    const index6 = q6Options.findIndex((item) => item?.label === q6);
    const index7 = q7Options.findIndex((item) => item?.label === q7);

    setIsLoading(true);

    const response = {
      email,
      responses: [
        { questionId: "q1", selectedIndexes: [index1] },
        {
          questionId: "q2",
          selectedIndexes: [index2],
          ...(q2Other !== "" && { otherText: q2Other }),
        },
        {
          questionId: "q3",
          selectedIndexes: [index3],
          ...(q3Other !== "" && { otherText: q3Other }),
        },
        {
          questionId: "q4",
          selectedIndexes: [index4],
          ...(q4Other !== "" && { otherText: q4Other }),
        },
        { questionId: "q5", selectedIndexes: [index5] },
        { questionId: "q6", selectedIndexes: [index6] },
        { questionId: "q7", selectedIndexes: [index7] },
      ],
    };

    SendHandler(response);
  };

  const handleChange = (key) => (e) =>
    setAnswers((prev) => ({ ...prev, [key]: e.target.value }));
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
      <CustomSelect
        label={
          "How does your school currently handle marketing and communications?"
        }
        value={answers?.q1}
        onChange={handleChange("q1")}
        options={q1Options}
      />
      <CustomSelect
        label={"What marketing channels does your school currently use?"}
        value={answers?.q2}
        onChange={handleChange("q2")}
        options={q2Options}
        showOther
        onOtherChange={handleChange("q2Other")}
        otherValue={answers?.q2Other}
      />
      <CustomSelect
        label={"What are your biggest marketing challenges?"}
        value={answers?.q3}
        onChange={handleChange("q3")}
        options={q3Options}
        showOther
        onOtherChange={handleChange("q3Other")}
        otherValue={answers?.q3Other}
      />
      <CustomSelect
        label={"What EduPulse features are most appealing to you?"}
        value={answers?.q4}
        onChange={handleChange("q4")}
        options={q4Options}
        showOther
        onOtherChange={handleChange("q4Other")}
        otherValue={answers?.q4Other}
      />
      <CustomSelect
        label={"Would your school be interested in a Trust-wide discount?"}
        value={answers?.q5}
        onChange={handleChange("q5")}
        options={q5Options}
      />
      <CustomSelect
        label={"Would you be open to a short call/demo to discuss your needs?"}
        value={answers?.q6}
        onChange={handleChange("q6")}
        options={q6Options}
      />
      <CustomSelect
        label={
          "Would you like to receive early access updates and marketing tips for schools?"
        }
        value={answers?.q7}
        onChange={handleChange("q7")}
        options={q7Options}
      />
      <Stack
        mt="16px"
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <LoadingButton
          onClick={handleSubmit}
          sx={{
            width: "63px",
            height: "35px",
            fontSize: "12px",
            fontWeight: 400,
          }}
          loadingIndicator={
            <CircularProgress
              size={12}
              color="inherit"
              sx={{ color: "#FFFFFF" }}
            />
          }
          variant="primary"
          disableRipple
          loading={isLoading}
        >
          Submit
        </LoadingButton>
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
            <Typography
              fontSize={{ xs: "20px", md: "44px" }}
              fontStyle="italic"
              fontWeight={400}
              component="span"
            >
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
