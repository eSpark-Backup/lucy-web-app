import { Box } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import SchoolInformationForm from "../forms/SchoolProfileForm";

const SchoolOverview = () => {
  return (
    <Box>
      <FormHeader title={"School Profiles"} />
      <SchoolInformationForm />
    </Box>
  );
};

export default SchoolOverview;
