import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import SchoolProfileForm from "./forms/SchoolProfileForm";
import FormHeader from "./forms/FormHeader";
import { SCHOOL_FORM_SUBMISSION_TITLES } from "../constant";
import { useGetSchoolByIdQuery } from "../services/school";
import BackButton from "./BackButton";

const SchoolFormSubmission = () => {
  const { mode, schoolId } = useParams();

  const { data: singleSchoolData, isSuccess: schoolDataSuccess } =
    useGetSchoolByIdQuery(schoolId, {
      skip: !schoolId,
    });

  const cleanedData =
    schoolDataSuccess && singleSchoolData?.data
      ? {
          id: singleSchoolData?.data?.id,
          name: singleSchoolData?.data?.name || "",
          address: singleSchoolData?.data?.address || "",
          phone: singleSchoolData?.data?.phone || "",
          description: singleSchoolData?.data?.description || "",
          email: singleSchoolData?.data?.email || "",
          image: singleSchoolData?.data?.image || "",
          organization_id: singleSchoolData?.data?.organization_id || "",
        }
      : null;

  return (
    <Box>
      <BackButton />
      <FormHeader title={SCHOOL_FORM_SUBMISSION_TITLES[mode]} />
      <SchoolProfileForm mode={mode} data={cleanedData} />
    </Box>
  );
};

export default SchoolFormSubmission;
