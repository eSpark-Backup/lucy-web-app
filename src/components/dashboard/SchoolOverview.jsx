import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import SchoolInformationForm from "../forms/SchoolProfileForm";
import EventContentCard from "../EventContentCard";
import RecipeReviewCard from "../SchoolProfileCard";
import { useNavigate } from "react-router-dom";

const SchoolOverview = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <FormHeader title={"School Profiles"} />
      {/* <SchoolInformationForm /> */}
      <Stack py={3}>
        <Button
          // loading={isLoading}
          // disabled={isLoading}
          onClick={() => navigate("/dashboard/school-overview/add")}
          fullWidth
          sx={{
            color: "#fff",
            maxWidth: "165px",
            height: { xs: "46px" },
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
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              fontFamily: "Nunito Sans",
            }}
          >
            {"Add school"}
          </Typography>
        </Button>
      </Stack>
      <Grid container columnGap={3} rowGap={4}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((item, index) => (
          <Grid size={{ xs: 12, sm: "auto" }} key={index}>
            <RecipeReviewCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SchoolOverview;
