// import { useSelector } from "react-redux";
// import { useGetAllSchoolsQuery } from "../services/school";
// import { LinearProgress, Paper, Stack, Typography } from "@mui/material";

// const CalendarProtectedRoute = ({ children }) => {
//   const { data: allSchools, isLoading: schoolsLoading } =
//     useGetAllSchoolsQuery();
//   const { user } = useSelector((state) => state?.auth);
//   const role = user?.role === "school";

//   const isCalendarVisible =
//     allSchools?.data?.length > 0 &&
//     allSchools?.data?.every((school) => school?.is_paid === true);

//   if (schoolsLoading) {
//     return <LinearProgress />;
//   }

//   return (
//     <>
//       {isCalendarVisible ? (
//         children
//       ) : (
//         <Paper
//           elevation={0}
//           sx={{
//             borderRadius: "14px",
//             backgroundColor: "rgba(255, 255, 255, 0.48)",
//             boxShadow: "6px 6px 45px 0px rgba(0, 0, 0, 0.05)",
//           }}
//         >
//           <Stack
//             justifyContent={"center"}
//             alignItems={"center"}
//             textAlign={"center"}
//             minHeight={"100%"}
//             p={2}
//           >
//             <Stack spacing={2} direction="column" maxWidth={"450px"}>
//               <Typography variant="h3" sx={{ fontWeight: 700 }}>
//                 Add school & pay to unlock Calendar
//               </Typography>

//               <Typography variant="h6" sx={{ color: "text.secondary" }}>
//                 Follow the steps below. Once you add at least one school and
//                 complete a payment, the Calendar will be unlocked and visible in
//                 the calendar page
//               </Typography>
//             </Stack>
//           </Stack>
//         </Paper>
//       )}
//     </>
//   );
// };

// export default CalendarProtectedRoute;

import { useSelector } from "react-redux";
import { useGetAllSchoolsQuery } from "../services/school";
import { LinearProgress, Paper, Stack, Typography } from "@mui/material";

const CalendarProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state?.auth);
  const isSchoolRole = user?.role === "school";
  const { data: allSchools, isLoading: schoolsLoading } = useGetAllSchoolsQuery(
    undefined,
    {
      skip: isSchoolRole,
    }
  );

  const isCalendarVisible =
    allSchools?.data?.length > 0 &&
    allSchools?.data?.some((school) => school?.is_paid);

  if (schoolsLoading) {
    return <LinearProgress />;
  }

  if (isSchoolRole || isCalendarVisible) {
    return children;
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
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
        minHeight={"100%"}
        p={2}
      >
        <Stack spacing={2} direction="column" maxWidth={"450px"}>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {isSchoolRole
              ? "Pay to unlock Calendar"
              : "Add school & pay to unlock Calendar"}
          </Typography>

          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            {isSchoolRole
              ? "Please contact your trust to complete the payment first. Once the payment is made, the Calendar will be unlocked and available on the Calendar page."
              : "Follow the steps below. Once you add at least one school and complete a payment, the Calendar will be unlocked and visible in the calendar page."}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CalendarProtectedRoute;
