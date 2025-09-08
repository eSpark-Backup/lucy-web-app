import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetAllSchoolsQuery } from "../services/school";
import { LinearProgress, Paper, Stack, Typography } from "@mui/material";

const TrustProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state?.auth);
  const is_trust = user?.profile?.organization?.is_trust || false;
  const { data: allSchools, isLoading: schoolsLoading } =
    useGetAllSchoolsQuery();

  const isCalendarVisible =
    allSchools?.data?.length > 0 &&
    allSchools?.data?.every((school) => school?.is_paid === true);

  if (is_trust) {
    return <Navigate to="/dashboard" replace />;
  }

  if (schoolsLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      {isCalendarVisible ? (
        children
      ) : (
        <Paper
          elevation={0}
          sx={{
            borderRadius: "14px",
            backgroundColor: "rgba(255, 255, 255, 0.48)",
            boxShadow: "6px 6px 45px 0px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
            minHeight={"100%"}
            p={2}
          >
            <Stack spacing={2} direction="column" maxWidth={"450px"}>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Add school & pay to unlock Calendar
              </Typography>

              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                Follow the steps below. Once you add at least one school and
                complete a payment, the Calendar will be unlocked and visible in
                the calendar page
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      )}
    </>
  );
};

export default TrustProtectedRoute;
