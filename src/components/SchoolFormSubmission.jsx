import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import SchoolProfileForm from "./forms/SchoolProfileForm";
import FormHeader from "./forms/FormHeader";
import { SCHOOL_FORM_SUBMISSION_TITLES } from "../constant";

const SchoolFormSubmission = () => {
  const { mode, schoolId } = useParams();

  const schoolData = {
    school_name: "Beaconhouse School",
    location: "Karachi",
    phone_number: "021-1234567",
    description: "This is a sample description",
    email: "info@beaconhouse.edu",
    image: "/assets/school.png",
  };

  return (
    <Box>
      <FormHeader title={SCHOOL_FORM_SUBMISSION_TITLES[mode]} />
      <SchoolProfileForm mode={mode} data={schoolData} id={schoolId} />
    </Box>
  );
};

export default SchoolFormSubmission;
