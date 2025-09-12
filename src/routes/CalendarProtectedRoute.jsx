import { useSelector } from "react-redux";
import { useGetAllSchoolsQuery } from "../services/school";
import { LinearProgress, Paper, Stack, Typography } from "@mui/material";

const CalendarProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state?.auth);

  const isSchoolRole = user?.role === "school";
  const isPaid = user?.school?.is_paid;
  const isTrust = user?.profile?.organization?.is_trust;
  const isTrustForSchool = user?.school?.organization?.is_trust;

  const { data: allSchools, isLoading: schoolsLoading } = useGetAllSchoolsQuery(
    undefined,
    { skip: isSchoolRole }
  );

  const isCalendarVisible =
    allSchools?.data?.some((school) => school?.is_paid) || false;

  if (schoolsLoading) return <LinearProgress />;

  let title = "";
  let description = "";

  // ---- School role ----
  if (isSchoolRole) {
    if (isTrustForSchool && !isPaid) {
      title = "Pay to unlock Calendar";
      description =
        "Please contact your trust to complete the payment first. Once the payment is made, the Calendar will be unlocked and available on the Calendar page.";
    } else if (isTrustForSchool && isPaid) {
      return children;
    }
  }

  // ---- Trust role ----
  if (!isSchoolRole && isTrust) {
    if (isCalendarVisible) {
      return children;
    }
    title = "Add school & pay to unlock Calendar";
    description =
      "Follow the steps below. Once you add at least one school and complete a payment, the Calendar will be unlocked and visible in the calendar page.";
  }

  // ---- Non-trust role ----
  if (!isSchoolRole && !isTrust) {
    if (isCalendarVisible) {
      return children;
    }
    title = "Add school & pay to unlock Calendar";
    description =
      "Follow the steps below. Once you add at least one school and complete a payment, the Calendar will be unlocked and visible in the calendar page.";
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
        <Stack spacing={2} maxWidth="450px">
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>

          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CalendarProtectedRoute;
