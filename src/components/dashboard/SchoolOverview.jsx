import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";

import FormHeader from "../forms/FormHeader";
import RecipeReviewCard from "../SchoolProfileCard";
import { componentStyles } from "../../style/componentStyles";

const TEXT = {
  title: "School Profiles",
  addButton: "Add",
};

const SchoolOverview = () => {
  const { schoolOverviewScreenStyles } = componentStyles || {};
  const { addButton, addButtonText } = schoolOverviewScreenStyles || {};
  const navigate = useNavigate();

  return (
    <Box>
      <FormHeader title={TEXT.title} />

      <Stack pb={3}>
        <Button
          onClick={() => navigate("/dashboard/school-overview/add")}
          endIcon={<SchoolIcon />}
          fullWidth
          sx={addButton}
        >
          <Typography variant="h5" sx={addButtonText}>
            {TEXT.addButton}
          </Typography>
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {Array?.from({ length: 12 })?.map((_, index) => (
          <Grid item xs={12} sm="auto" key={index}>
            <RecipeReviewCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SchoolOverview;
