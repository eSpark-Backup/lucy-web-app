import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import SchoolProfileForm from "./forms/SchoolProfileForm";
import FormHeader from "./forms/FormHeader";
import { SCHOOL_FORM_SUBMISSION_TITLES } from "../constant";
import { useGetSchoolByIdQuery } from "../services/school";

const SchoolFormSubmission = () => {
  const { mode, schoolId } = useParams();

  const { data: singleSchoolData, isSuccess: schoolDataSuccess } =
    useGetSchoolByIdQuery(schoolId, {
      skip: !schoolId,
    });

  return (
    <Box>
      <FormHeader title={SCHOOL_FORM_SUBMISSION_TITLES[mode]} />
      <SchoolProfileForm
        mode={mode}
        data={schoolDataSuccess && singleSchoolData}
      />
    </Box>
  );
};

export default SchoolFormSubmission;
