import {
  Box,
  Container,
  Typography,
  Divider,
  Paper,
  Stack,
  Button,
  LinearProgress,
} from "@mui/material";
import bgLogo from "../../assets/images/background-logo.svg";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useAcceptTermsMutation,
  useGetAllTermsQuery,
} from "../../services/terms";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { isAuthenticated } from "../../utils";
import { componentStyles } from "../../style/componentStyles";
import halfClip from "../../assets/images/sidebar/half-clip.png";
import email from "../../assets/images/sidebar/email.png";
import website from "../../assets/images/sidebar/website.png";
import { CONTACT_DATA_FOR_TERMS } from "../../constant";
const MotionBox = motion(Box);
const MotionButton = motion(Button);

const TermsHeader = ({ title, description, titleStyle, dateStyle }) => {
  return (
    <Stack spacing={1} mb={3} px={2}>
      <Typography {...titleStyle}>{title}</Typography>
      <Typography {...dateStyle}>{description}</Typography>
    </Stack>
  );
};

const ContactInfoSection = ({
  isInView,
  listVariants,
  sectionTitle,
  sectionText,
  text,
  content,
  heading,
  info,
  emailIcon,
  websiteIcon,
}) => {
  return (
    <Stack mt={2}>
      <MotionBox
        variants={listVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        px={0.5}
      >
        <Divider sx={{ mb: 3 }} />

        <Stack spacing={0.5}>
          <Typography {...sectionTitle}>{text}</Typography>
          <Typography {...sectionText}>{content}</Typography>
        </Stack>

        <Stack sx={{ mt: 3.5 }} spacing={1}>
          <Typography variant="body2" letterSpacing={1}>
            <strong>{heading}</strong>
          </Typography>

          {/* ========== EMAIL ========== */}
          <Typography
            variant="body2"
            component="div"
            {...sectionText}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              "@media(max-width:400px)": {
                alignItems: "flex-start",
                flexDirection: "column",
              },
            }}
          >
            <Typography
              component="span"
              display="flex"
              alignItems="center"
              gap={1}
              {...sectionText}
            >
              <Box
                component="img"
                sx={{ width: 18 }}
                src={emailIcon}
                alt="email"
              />
              email:
            </Typography>

            <Link
              to={`mailto:${info?.email || "info@edupulsegpt.com"}`}
              style={{
                color: "#4880FF",
                textDecoration: "none",
                overflowWrap: "anywhere",
              }}
            >
              {info?.email || "info@edupulsegpt.com"}
            </Link>
          </Typography>

          {/* ========== WEBSITE ========== */}
          <Typography
            variant="body2"
            component="div"
            {...sectionText}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              "@media(max-width:400px)": {
                alignItems: "flex-start",
                flexDirection: "column",
              },
            }}
          >
            <Typography
              component="span"
              display="flex"
              alignItems="center"
              gap={1}
              {...sectionText}
            >
              <Box
                component="img"
                sx={{ width: 18 }}
                src={websiteIcon}
                alt="website"
              />
              website:
            </Typography>

            <Link
              to={info?.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#4880FF",
                textDecoration: "none",
                overflowWrap: "anywhere",
              }}
            >
              {info?.website}
            </Link>
          </Typography>
        </Stack>
      </MotionBox>
    </Stack>
  );
};

const TermsAndConditions = () => {
  const [acceptTerms] = useAcceptTermsMutation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { text, content, heading, info } = CONTACT_DATA_FOR_TERMS || {};
  const { termsScreenStyles } = componentStyles || {};
  const { paper, container, title, date, sectionTitle, sectionText } =
    termsScreenStyles || {};

  const {
    data: termsData,
    isLoading: termsLoading,
    isSuccess: termsSuccess,
    isError: termsError,
  } = useGetAllTermsQuery(undefined, {
    skip: !isAuthenticated(),
    refetchOnMountOrArgChange: false,
  });

  const effectiveDate = dayjs(termsData?.createdAt).format("DD/MM/YYYY");
  const lastUpdated = dayjs(termsData?.updatedAt).format("DD/MM/YYYY");

  const listVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: termsData?.data?.sections?.length * 0.1 + 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleClickAction = async (e) => {
    e.preventDefault();
    try {
      const response = await acceptTerms().unwrap();
      if (response) {
        localStorage.setItem("terms", String(true));
        navigate("/dashboard");
      }
    } catch ({ data }) {
      toast.error(data?.message || "Accept terms failed");
      navigate("/");
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        ...(pathname?.includes("dashboard")
          ? {}
          : {
              py: 6,
              display: "flex",
              alignItems: "center",
              minHeight: "100vh",
              backgroundSize: "90%",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${bgLogo})`,
            }),
      }}
    >
      <Paper
        elevation={0}
        sx={{
          ...paper,
          ...(pathname?.includes("dashboard") ? {} : { mx: "auto" }),
        }}
      >
        <Box
          component="img"
          src={halfClip}
          alt="clip"
          sx={{
            position: "absolute",
            top: "-10px",
            left: "89%",
            transform: "translateX(-50%) rotate(2deg)",
            width: { xs: 42, md: 50 },
            zIndex: 2,
          }}
        />
        {isAuthenticated() ? (
          <Container sx={container}>
            <TermsHeader
              title={"EduPulse GPT – Terms & Conditions"}
              description={`Effective Date: ${effectiveDate} | Last Updated: ${lastUpdated}`}
              titleStyle={title}
              dateStyle={date}
            />
            <Stack spacing={3}>
              {termsLoading && <LinearProgress />}
              {termsError && (
                <Typography color="error" textAlign="center" variant="body1">
                  {"📭 No Terms Found"}
                </Typography>
              )}
              {termsData?.data?.sections?.map((section, i) => (
                <MotionBox
                  key={i}
                  custom={i}
                  variants={listVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  px={0.5}
                >
                  <Stack spacing={0.5}>
                    <Typography {...sectionTitle}>{section.title}</Typography>
                    <Typography {...sectionText}>{section.content}</Typography>
                  </Stack>
                  {i !== termsData?.data?.sections?.length - 1 && (
                    <Divider sx={{ mt: 2 }} />
                  )}
                </MotionBox>
              ))}
            </Stack>

            <Stack mt={2}>
              <ContactInfoSection
                isInView={isInView}
                listVariants={listVariants}
                sectionTitle={sectionTitle}
                sectionText={sectionText}
                text={text}
                content={content}
                heading={heading}
                info={info}
                emailIcon={email}
                websiteIcon={website}
              />
            </Stack>

            {termsSuccess && isAuthenticated() && (
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
                mt={6}
                component={motion.div}
                variants={buttonVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {!pathname?.includes("dashboard") && (
                  <MotionButton
                    variant="contained"
                    disableElevation
                    loading={termsLoading && termsError}
                    disabled={termsLoading && termsError}
                    sx={{
                      color: "#fff",
                      maxWidth: { xs: "100%", sm: "165px" },
                      height: { xs: "42px", md: "46px" },
                      borderRadius: "8px",
                      backgroundColor: "#4880FF",
                      "&:hover": { backgroundColor: "#3a6edc" },
                    }}
                    onClick={(e) => handleClickAction(e)}
                  >
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontFamily: "Nunito Sans",
                        textTransform: "none",
                      }}
                    >
                      {"Accept"}
                    </Typography>
                  </MotionButton>
                )}
              </Stack>
            )}
          </Container>
        ) : (
          <Container sx={container}>
            <TermsHeader
              title={"EduPulse GPT – Terms & Conditions"}
              description={`To review and accept our terms & conditions, please log in to your account first`}
              titleStyle={title}
              dateStyle={date}
            />
            <Stack mt={2}>
              <ContactInfoSection
                isInView={isInView}
                listVariants={listVariants}
                sectionTitle={sectionTitle}
                sectionText={sectionText}
                text={text}
                content={content}
                heading={heading}
                info={info}
                emailIcon={email}
                websiteIcon={website}
              />
            </Stack>
          </Container>
        )}
      </Paper>
    </Box>
  );
};

export default TermsAndConditions;
