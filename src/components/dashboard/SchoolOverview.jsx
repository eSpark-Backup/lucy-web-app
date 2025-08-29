import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";

import FormHeader from "../forms/FormHeader";
import RecipeReviewCard from "../SchoolProfileCard";
import { componentStyles } from "../../style/componentStyles";
import {
  useDeleteSchoolMutation,
  useGetAllSchoolsQuery,
} from "../../services/school";
import ConformationModal from "../modals/ConformationModal";
import { useState } from "react";
import { toast } from "react-toastify";

const TEXT = {
  title: "School Profiles",
  addButton: "Add",
};

const SchoolOverview = () => {
  const [modalData, setModalDate] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { schoolOverviewScreenStyles } = componentStyles || {};
  const { addButton, addButtonText } = schoolOverviewScreenStyles || {};
  const {
    data: allSchools,
    isLoading: schoolsLoading,
    isSuccess: schoolsSuccess,
  } = useGetAllSchoolsQuery();
  const navigate = useNavigate();

  const [deleteSchool, { isLoading: deleteLoading }] =
    useDeleteSchoolMutation();

  const handleDelete = () => {
    deleteSchool(modalData?.id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something went wrong");
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "School was deleted successfully");
        setOpenDeleteModal(false);
      }
    });
  };

  if (schoolsLoading) return <LinearProgress />;

  return (
    <Box>
      <FormHeader title={TEXT?.title} />
      <Stack pb={3}>
        <Button
          onClick={() => navigate("/dashboard/school-overview/add")}
          endIcon={<SchoolIcon />}
          fullWidth
          sx={addButton}
        >
          <Typography variant="h5" sx={addButtonText}>
            {TEXT?.addButton}
          </Typography>
        </Button>
      </Stack>
      <Grid container spacing={3}>
        {schoolsSuccess &&
          allSchools?.map((item) =>
            item?.organization?.schools?.map((school) => (
              <Grid item xs={12} sm="auto" key={school?.id}>
                <RecipeReviewCard
                  school={school}
                  handleOpenDeleteModal={() => {
                    setOpenDeleteModal(true);
                    setModalDate(school);
                  }}
                />
              </Grid>
            ))
          )}
        <ConformationModal
          open={openDeleteModal}
          isLoading={deleteLoading}
          handleDelete={handleDelete}
          description={`The school "${modalData?.name}" and its details will be permanently removed. Please confirm to proceed.`}
          onClose={() => {
            setOpenDeleteModal(false);
            setModalDate({});
          }}
        />
      </Grid>
    </Box>
  );
};

export default SchoolOverview;
