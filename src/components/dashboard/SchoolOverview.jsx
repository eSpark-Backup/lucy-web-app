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
import PaymentsIcon from "@mui/icons-material/Payments";
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
import { useCreateCheckoutSessionMutation } from "../../services/payment";
import { stripePromise } from "../../constant";
import { useGetMyOrganizationQuery } from "../../services/organization";

const TEXT = {
  title: "School Profiles",
  addButton: "Add",
  paymentButton: "Payment",
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
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const [deleteSchool, { isLoading: deleteLoading }] =
    useDeleteSchoolMutation();
  const { data: organizationData } = useGetMyOrganizationQuery();

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

  const handleCreateCheckoutsession = async () => {
    const { id, is_trust } = organizationData || {};
    const res = await createCheckoutSession({
      plan: is_trust ? "trust" : "individual",
      organizationId: id,
    });

    if (res?.error) {
      toast.error(res?.error?.data?.message || "Something went wrong!");
      return;
    }
    if (res?.data?.data?.id) {
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: res?.data?.data?.id });
    }
  };

  if (schoolsLoading) return <LinearProgress />;

  return (
    <Box>
      <FormHeader title={TEXT?.title} />
      <Stack
        pb={3}
        direction={
          organizationData?.is_trust ||
          (!organizationData?.is_trust && allSchools?.data?.length < 1)
            ? "row"
            : "column"
        }
        spacing={
          organizationData?.is_trust ||
          (!organizationData?.is_trust && allSchools?.data?.length < 1)
            ? 1
            : 0
        }
      >
        {(organizationData?.is_trust ||
          (!organizationData?.is_trust && allSchools?.data?.length < 1)) && (
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
        )}
        {(organizationData?.is_trust || !organizationData?.is_trust) && (
          <Button
            disabled={allSchools?.data?.every(
              (school) => school?.is_paid === true
            )}
            onClick={() => handleCreateCheckoutsession()}
            endIcon={<PaymentsIcon />}
            fullWidth
            sx={addButton}
          >
            <Typography variant="h5" sx={addButtonText}>
              {TEXT?.paymentButton}
            </Typography>
          </Button>
        )}
      </Stack>
      <Grid container spacing={3}>
        {schoolsSuccess &&
          allSchools?.data?.map((school, index) => (
            <RecipeReviewCard
              key={index}
              school={school}
              handleOpenDeleteModal={() => {
                setOpenDeleteModal(true);
                setModalDate(school);
              }}
            />
          ))}

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
