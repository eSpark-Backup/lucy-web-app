import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import SchoolProfileForm from "./forms/SchoolProfileForm";
import FormHeader from "./forms/FormHeader";

const SchoolFormSubmission = () => {
  const { mode, schoolId } = useParams();

  return (
    <Box>
      <FormHeader title={schoolId ? "Edit School Information" : "Add School"} />
      <SchoolProfileForm />
    </Box>
  );
};

export default SchoolFormSubmission;
