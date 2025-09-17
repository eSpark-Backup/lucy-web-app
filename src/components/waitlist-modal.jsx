import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { isValidEmail, useQuery } from "../utils";
import { formIcon, logo, modalBg, tick } from "../assets";
import {
  q10Options,
  q11Options,
  q12Options,
  q2Options,
  q6Options,
  q7Options,
  q8Options,
  q9Options,
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
          sx={{
            width: { xs: "100%", md: "300px" },

            // Style the outer root
            "& .MuiOutlinedInput-root": {
              border: "1px solid #E2DBFA",
              borderRadius: "10.66px",
              padding: "0px 20px",
              backgroundColor: "#F4F1FD",
              height: "50px",
              outline: "none",
              opacity: 1,

              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
              "& fieldset": {
                border: 0,
              },
            },

            // Style the input element
            "& .MuiOutlinedInput-input": {
              padding: 0,
              height: "100%",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
              fontWeight: 400,
              color: "#1A4FFF",

              "&::placeholder": {
                color: "#1A4FFF",
                fontWeight: 400,
                fontSize: "14px",
                opacity: 1,
              },

              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #F4F1FD inset !important",
                WebkitTextFillColor: "#1A4FFF",
                transition: "background-color 5000s ease-in-out 0s",
                fontSize: "14px",
              },
            },
          }}
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
    q4: "",
    q5: "",
    q6: [],
    q7: [],
    q7Other: "",
    q8: [],
    q8Other: "",
    q9: [],
    q9Other: "",
    q10: "",
    q11: "",
    q12: "",
  });

  const SendHandler = async (data) => {
    try {
      const res = await axios.post(
        "https://luccy-landing-be.stg.esparkconsultants.com/start-survey",
        data
      );
      console.log("Survey response:", res.data);
      setIsLoading(false);
      navigate("/?open=true&step=3");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleSubmit = () => {
    const {
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
      q8,
      q9,
      q10,
      q11,
      q12,
      q2Other,
      q7Other,
      q8Other,
      q9Other,
    } = answers;

    const requiredAnswers = [q1, q2, q3, q4, q5, q10, q11, q12];
    const requiredArrays = [q6, q7, q8, q9];

    const isEmpty =
      requiredAnswers.some((a) => a === "") ||
      requiredArrays.some((a) => a.length === 0);

    const isOtherMissing =
      (q2 === "Other (please specify)" && q2Other.trim() === "") ||
      (q7.includes("Other (please specify)") && q7Other.trim() === "") ||
      (q8.includes("Other (please specify)") && q8Other.trim() === "") ||
      (q9.includes("Other (please specify)") && q9Other.trim() === "");

    if (isEmpty || isOtherMissing) {
      toast.error("Please answer the following questions");
      return;
    }

    const index2 = q2Options.findIndex((item) => item?.label === q2);
    const index6 = (answers.q6 || [])
      .map((val) => q6Options?.findIndex((item) => item.value === val))
      .filter((index) => index !== -1);
    const index7 = (answers.q7 || [])
      .map((val) => q7Options?.findIndex((item) => item.value === val))
      .filter((index) => index !== -1);
    const index8 = (answers.q8 || [])
      .map((val) => q8Options?.findIndex((item) => item.value === val))
      .filter((index) => index !== -1);
    const index9 = (answers.q9 || [])
      .map((val) => q9Options?.findIndex((item) => item.value === val))
      .filter((index) => index !== -1);
    const index10 = q10Options.findIndex((item) => item.value === answers.q10);
    const index11 = q11Options.findIndex((item) => item.value === answers.q11);
    const index12 = q12Options.findIndex((item) => item.value === answers.q12);

    setIsLoading(true);

    const response = {
      email,
      responses: [
        { questionId: "q1", textAnswer: answers?.q1 },
        {
          questionId: "q2",
          selectedIndexes: [index2],
          ...(q2Other !== "" && { otherText: q2Other }),
        },
        {
          questionId: "q3",
          textAnswer: answers?.q3,
        },
        {
          questionId: "q4",
          textAnswer: answers?.q4,
        },
        { questionId: "q5", textAnswer: answers?.q5 },
        { questionId: "q6", selectedIndexes: index6 },
        {
          questionId: "q7",
          selectedIndexes: index7,
          ...(q7Other !== "" && { otherText: q7Other }),
        },
        {
          questionId: "q8",
          selectedIndexes: index8,
          ...(q8Other !== "" && { otherText: q8Other }),
        },
        {
          questionId: "q9",
          selectedIndexes: index9,
          ...(q9Other !== "" && { otherText: q9Other }),
        },
        { questionId: "q10", selectedIndexes: [index10] },
        { questionId: "q11", selectedIndexes: [index11] },
        { questionId: "q12", selectedIndexes: [index12] },
      ],
    };

    SendHandler(response);
  };

  const handleChange = (key) => (e) =>
    setAnswers((prev) => ({ ...prev, [key]: e.target.value }));

  const checkboxQuestions = [
    {
      name: "q6",
      label:
        "How does your school currently handle marketing and communications?",
      options: q6Options,
    },
    {
      name: "q7",
      label: "What marketing channels does your school currently use?",
      options: q7Options,
    },
    {
      name: "q8",
      label: "What are your biggest marketing challenges?",
      options: q8Options,
    },
    {
      name: "q9",
      label: "What EduPulse features are most appealing to you?",
      options: q9Options,
    },
  ];

  const radioQuestions = [
    {
      name: "q10",
      label: "Would your school be interested in a Trust-wide discount?",
      options: q10Options,
    },
    {
      name: "q11",
      label: "Would you be open to a short call/demo to discuss your needs?",
      options: q11Options,
    },
    {
      name: "q12",
      label:
        "Would you like to receive early access updates and marketing tips for schools?",
      options: q11Options,
    },
  ];

  return (
    <>
      <Typography
        color="#2B106A"
        fontSize="18px"
        fontWeight={700}
        textAlign="center"
      >
        Basic Information
      </Typography>
      <Stack spacing={1.5} pt={1.5}>
        <Stack spacing={1}>
          <Typography color="#2B106A" fontSize="14px" fontWeight={400}>
            School Name
          </Typography>
          <TextField
            name="q1"
            value={answers?.q1}
            onChange={handleChange("q1")}
            placeholder="Enter your School Name"
            sx={{
              width: { xs: "100%" },
              // Style the outer root
              "& .MuiOutlinedInput-root": {
                border: "1px solid #E2DBFA",
                borderRadius: "10.66px",
                padding: "0px 20px",
                backgroundColor: "#F4F1FD",
                height: "50px",
                outline: "none",
                opacity: 1,

                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
                "& fieldset": {
                  border: 0,
                },
              },

              // Style the input element
              "& .MuiOutlinedInput-input": {
                padding: 0,
                height: "100%",
                fontSize: "14px",
                fontFamily: "Nunito Sans",
                fontWeight: 400,
                color: "#1A4FFF",

                "&::placeholder": {
                  color: "#1A4FFF",
                  fontWeight: 400,
                  fontSize: "14px",
                  opacity: 1,
                },

                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px #F4F1FD inset !important",
                  WebkitTextFillColor: "#1A4FFF",
                  transition: "background-color 5000s ease-in-out 0s",
                  fontSize: "14px",
                },
              },
            }}
          />
        </Stack>
        <Stack spacing={0.2}>
          <Typography color="#2B106A" fontSize="14px" fontWeight={400}>
            School Type
          </Typography>
          <CustomSelect
            value={answers?.q2}
            onChange={handleChange("q2")}
            options={[
              { label: "Primary", value: "Primary" },
              { label: "Secondary", value: "Secondary" },
              { label: "Special Education", value: "Special Education" },
              { label: "Independent", value: "Independent" },
              { label: "Academy Trust", value: "Academy Trust" },
              {
                label: "Other (please specify)",
                value: "Other (please specify)",
              },
            ]}
            showOther
            onOtherChange={handleChange("q2Other")}
            otherValue={answers?.q2Other}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography color="#2B106A" fontSize="14px" fontWeight={400}>
            School Location
          </Typography>
          <TextField
            name="q3"
            value={answers?.q3}
            onChange={handleChange("q3")}
            placeholder="Enter your Location"
            sx={{
              width: { xs: "100%" },
              // Style the outer root
              "& .MuiOutlinedInput-root": {
                border: "1px solid #E2DBFA",
                borderRadius: "10.66px",
                padding: "0px 20px",
                backgroundColor: "#F4F1FD",
                height: "50px",
                outline: "none",
                opacity: 1,

                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
                "& fieldset": {
                  border: 0,
                },
              },

              // Style the input element
              "& .MuiOutlinedInput-input": {
                padding: 0,
                height: "100%",
                fontSize: "14px",
                fontFamily: "Nunito Sans",
                fontWeight: 400,
                color: "#1A4FFF",

                "&::placeholder": {
                  color: "#1A4FFF",
                  fontWeight: 400,
                  fontSize: "14px",
                  opacity: 1,
                },

                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px #F4F1FD inset !important",
                  WebkitTextFillColor: "#1A4FFF",
                  transition: "background-color 5000s ease-in-out 0s",
                  fontSize: "14px",
                },
              },
            }}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography color="#2B106A" fontSize="14px" fontWeight={400}>
            Name & Role in School
          </Typography>
          <TextField
            name="q4"
            value={answers?.q4}
            onChange={handleChange("q4")}
            placeholder="Enter your Role"
            sx={{
              width: { xs: "100%" },

              // Style the outer root
              "& .MuiOutlinedInput-root": {
                border: "1px solid #E2DBFA",
                borderRadius: "10.66px",
                padding: "0px 20px",
                backgroundColor: "#F4F1FD",
                height: "50px",
                outline: "none",
                opacity: 1,

                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
                "& fieldset": {
                  border: 0,
                },
              },

              // Style the input element
              "& .MuiOutlinedInput-input": {
                padding: 0,
                height: "100%",
                fontSize: "14px",
                fontFamily: "Nunito Sans",
                fontWeight: 400,
                color: "#1A4FFF",

                "&::placeholder": {
                  color: "#1A4FFF",
                  fontWeight: 400,
                  fontSize: "14px",
                  opacity: 1,
                },

                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px #F4F1FD inset !important",
                  WebkitTextFillColor: "#1A4FFF",
                  transition: "background-color 5000s ease-in-out 0s",
                  fontSize: "14px",
                },
              },
            }}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography color="#2B106A" fontSize="14px" fontWeight={400}>
            Email Address
          </Typography>
          <TextField
            name="q5"
            value={answers?.q5}
            onChange={handleChange("q5")}
            placeholder="Enter your Email"
            sx={{
              width: { xs: "100%" },

              // Style the outer root
              "& .MuiOutlinedInput-root": {
                border: "1px solid #E2DBFA",
                borderRadius: "10.66px",
                padding: "0px 20px",
                backgroundColor: "#F4F1FD",
                height: "50px",
                outline: "none",
                opacity: 1,

                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
                "& fieldset": {
                  border: 0,
                },
              },

              // Style the input element
              "& .MuiOutlinedInput-input": {
                padding: 0,
                height: "100%",
                fontSize: "14px",
                fontFamily: "Nunito Sans",
                fontWeight: 400,
                color: "#1A4FFF",

                "&::placeholder": {
                  color: "#1A4FFF",
                  fontWeight: 400,
                  fontSize: "14px",
                  opacity: 1,
                },

                "&:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 1000px #F4F1FD inset !important",
                  WebkitTextFillColor: "#1A4FFF",
                  transition: "background-color 5000s ease-in-out 0s",
                  fontSize: "14px",
                },
              },
            }}
          />
        </Stack>

        {checkboxQuestions.map(({ name, label, options }) => (
          <Stack spacing={1} key={name}>
            <Typography color="#2B106A" fontSize="14px" fontWeight={400}>
              {label}
            </Typography>
            {options?.map((option, index) => (
              <Box sx={{ px: 1 }}>
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      name={name}
                      value={option?.value}
                      checked={answers[name]?.includes(option?.value)}
                      onChange={(e) => {
                        const { checked, value } = e.target;
                        setAnswers((prev) => {
                          const currentValues = prev[name] || [];
                          return {
                            ...prev,
                            [name]: checked
                              ? [...currentValues, value]
                              : currentValues?.filter((v) => v !== value),
                          };
                        });
                      }}
                      icon={
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            border: "1.5px solid #9B9B9B",
                            borderRadius: "6px",
                            backgroundColor: "#fff",
                          }}
                        />
                      }
                      checkedIcon={
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            border: "1.5px solid #9B9B9B",
                            borderRadius: "6px",
                            backgroundColor: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              width: 15,
                              height: 15,
                              backgroundColor: "#5C5C5C",
                              maskImage: `url("data:image/svg+xml,%3Csvg fill='none' viewBox='0 0 24 24' stroke='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M5 13l4 4L19 7' /%3E%3C/svg%3E")`,
                              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg fill='none' viewBox='0 0 24 24' stroke='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M5 13l4 4L19 7' /%3E%3C/svg%3E")`,
                              maskRepeat: "no-repeat",
                              maskPosition: "center",
                            }}
                          />
                        </Box>
                      }
                      disableRipple
                      sx={{ padding: 0 }}
                    />
                  }
                  label={
                    <Typography
                      color="#1A4FFF"
                      fontSize="14px"
                      fontWeight={400}
                      sx={{ ml: 1.5, mt: 0.4 }}
                    >
                      {option?.label}
                    </Typography>
                  }
                />
                {option?.value === "Other (please specify)" &&
                  answers[name]?.includes(option?.value) && (
                    <TextField
                      value={answers[`${name}Other`] || ""}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [`${name}Other`]: e?.target?.value,
                        }))
                      }
                      placeholder="Please Specify"
                      sx={{
                        width: "100%",
                        mt: "10px",
                        // Style the outer root
                        "& .MuiOutlinedInput-root": {
                          border: "1px solid #E2DBFA",
                          borderRadius: "10.66px",
                          padding: "0px 20px",
                          backgroundColor: "#F4F1FD",
                          height: "50px",
                          outline: "none",
                          opacity: 1,

                          "&:hover fieldset": {
                            border: "none",
                          },
                          "&.Mui-focused fieldset": {
                            border: "none",
                          },
                          "& fieldset": {
                            border: 0,
                          },
                        },

                        // Style the input element
                        "& .MuiOutlinedInput-input": {
                          padding: 0,
                          height: "100%",
                          fontSize: "14px",
                          fontFamily: "Nunito Sans",
                          fontWeight: 400,
                          color: "#1A4FFF",

                          "&::placeholder": {
                            color: "#1A4FFF",
                            fontWeight: 400,
                            fontSize: "14px",
                            opacity: 1,
                          },

                          "&:-webkit-autofill": {
                            WebkitBoxShadow:
                              "0 0 0 1000px #F4F1FD inset !important",
                            WebkitTextFillColor: "#1A4FFF",
                            transition: "background-color 5000s ease-in-out 0s",
                            fontSize: "14px",
                          },
                        },
                      }}
                    />
                  )}
              </Box>
            ))}
          </Stack>
        ))}

        {radioQuestions?.map(({ name, label, options }) => (
          <Stack spacing={0} key={name}>
            <Typography color="#2B106A" fontSize="14px" fontWeight={400}>
              {label}
            </Typography>
            <RadioGroup
              row
              name={name}
              value={answers[name]}
              onChange={handleChange(name)}
              sx={{ gap: 5, px: 1.2, py: 2.5 }}
            >
              {options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option.value}
                  control={
                    <Radio
                      sx={{
                        width: 24,
                        height: 24,
                        color: "#666666",
                        "&.Mui-checked": {
                          color: "#5088FF",
                        },
                        "& .MuiSvgIcon-root": {
                          width: 24,
                          height: 24,
                        },
                      }}
                    />
                  }
                  label={option.label}
                  sx={{
                    gap: "8px",
                    marginRight: "16px",
                    alignItems: "center",
                  }}
                />
              ))}
            </RadioGroup>
          </Stack>
        ))}
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
          <Box
            component={"img"}
            sx={{
              mx: "auto",
              marginTop: "80px",
              width: { xs: "200px", sm: "227px" },
              height: "50px",
            }}
            src={logo}
            alt="logo"
          />
          <Box sx={{ px: 2.5 }}>
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
          </Box>
          <Box
            sx={{
              position: "relative",
              marginTop: "38px",
              width: { xs: "100%", md: "500px" },
              border: "5px solid #FFF",
              background:
                "linear-gradient(to bottom, #F8F6FE 0%, rgba(255, 255, 255, 1) 100%)",
              borderRadius: "16px",
              padding: { xs: "15px", sm: "30px" },
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
              <>
                <Step2 />
              </>
            ) : (
              <Step1 />
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default WaitlistModal;
