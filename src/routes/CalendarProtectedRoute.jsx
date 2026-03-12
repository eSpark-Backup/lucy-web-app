import { useSelector } from "react-redux";
import { useGetAllSchoolsQuery } from "../services/school";
import {
  LinearProgress,
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CalendarProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.auth);

  const isSchoolRole = user?.role === "school";
  const isPaid = user?.school?.is_paid;
  const isTrust = user?.profile?.organization?.is_trust;
  const isTrustForSchool = user?.school?.organization?.is_trust;

  const { data: allSchools, isLoading: schoolsLoading } = useGetAllSchoolsQuery(
    undefined,
    { skip: isSchoolRole },
  );

  const isCalendarVisible =
    allSchools?.data?.some((school) => school?.is_paid) || false;

  const isTrial = allSchools?.data?.length
    ? allSchools.data.some((school) => school?.is_trial)
    : undefined;

  if (schoolsLoading) return <LinearProgress />;

  let title = "";
  let description = "";
  let showOverviewButton = false;

  // ---- School role ----
  if (isSchoolRole) {
    if (isTrustForSchool && !isPaid && !isTrial) {
      title = "Pay to unlock Calendar";
      description =
        "Please contact your trust to complete the payment or start a 24-hour free trial. Once activated, the Calendar will be unlocked and available on the Calendar page.";
    } else if (isTrustForSchool && isPaid) {
      return children;
    } else {
      return children;
    }
  }

  // ---- Trust role ----
  if (!isSchoolRole && isTrust) {
    if (isCalendarVisible || isTrial) {
      return children;
    }
    title = "Add school & pay to unlock Calendar";
    description =
      "Open Schools to add a school and complete the payment or start a 24-hour free trial to unlock the Calendar.";
    showOverviewButton = true;
  }

  // ---- Non-trust role ----
  if (!isSchoolRole && !isTrust) {
    if (isCalendarVisible || isTrial) {
      return children;
    }
    title = "Add school & pay to unlock Calendar";
    description =
      "Open Schools to add a school and complete the payment or start a 24-hour free trial to unlock the Calendar.";
    showOverviewButton = true;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "14px",
        backgroundColor: "rgba(255, 255, 255, 0.48)",
        boxShadow: "6px 6px 45px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        minHeight="100%"
        p={2}
      >
        <Stack spacing={2} maxWidth="450px" sx={{ alignItems: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>

          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>

          {showOverviewButton && (
            <Button
              variant="contained"
              disableElevation
              sx={{
                color: "#fff",
                maxWidth: { xs: "100%", sm: "165px" },
                height: { xs: "42px", md: "46px" },
                borderRadius: "8px",
                backgroundColor: "#4880FF",
                "&:hover": {
                  backgroundColor: "#3a6edc",
                },
                "&.Mui-disabled": {
                  color: "#fff",
                  backgroundColor: "#999",
                },
              }}
              onClick={() => navigate("/dashboard/school-overview")}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontFamily: "Nunito Sans",
                  textTransform: "none",
                }}
              >
                Schools
              </Typography>
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CalendarProtectedRoute;
