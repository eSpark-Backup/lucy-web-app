import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import cardImage from "../assets/images/choose-your-path.svg";
import { Box, IconButton, Stack } from "@mui/material";
import edit from "../assets/icons/edit.svg";
import view from "../assets/icons/view.svg";
import bin from "../assets/icons/bin.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import { useDeleteContentMutation } from "../services/content";
import { toast } from "react-toastify";

const EventContentCard = ({ title, description, image, id }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteData, { isLoading }] = useDeleteContentMutation();

  const handleClick = (id, click) => {
    if (click === "edit") {
      navigate(`/dashboard/calendar/events/${eventId}/contents/${id}`);
    } else {
      navigate(`/dashboard/calendar/events/${eventId}/contents/${id}/preview`);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteData({ eventId, contentId: id });
      if (res?.data) {
        toast.success("Content Deleted Successfully");
        setDeleteModal(false);
      }
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Card
      sx={{
        p: 2.5,
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        backgroundColor: "rgba(255, 255, 255, 0.48)",
        boxShadow: "5px 5px 45px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "11.88px",
        gap: 2,
      }}
    >
      <CardMedia
        component="img"
        image={image || cardImage}
        alt="card-img"
        sx={{
          objectFit: "cover",
          width: { xs: "100%", sm: "300px" },
          height: { xs: "170px", sm: "146px" },
          borderRadius: "11.88px",
        }}
      />

      <CardContent
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          p: 0,
        }}
      >
        <Stack spacing={0.8} flex={1} p={1}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, fontFamily: "Poppins", color: "#202224" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 400,
              color: "#202224",
              opacity: "60%",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </Typography>
        </Stack>

        <Box
          display="flex"
          flexDirection={{ xs: "row", sm: "column" }}
          alignSelf={{ xs: "flex-end", sm: "flex-start" }}
        >
          <IconButton
            size="small"
            onClick={() => handleClick(id, "edit")}
            sx={{
              width: "40px",
              height: "32px",
              border: "1px solid #E5E7EB",
              borderBottom: { xs: "1px solid #E5E7EB", sm: "0px" },
              borderRadius: { xs: "8px 0px 0px 8px", sm: "8px 8px 0 0" },
              borderRight: { xs: "0px", sm: "1px solid #E5E7EB" },
              p: "4px",
            }}
          >
            <Box component="img" src={edit} />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => setDeleteModal(id)}
            sx={{
              width: "40px",
              height: "32px",
              border: "1px solid #E5E7EB",
              borderRadius: 0,
              p: "4px",
            }}
          >
            <Box component="img" src={bin} sx={{ width: "60%" }} />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => handleClick(id, "view")}
            sx={{
              width: "40px",
              height: "32px",
              border: "1px solid #E5E7EB",
              borderTop: { xs: "1px solid #E5E7EB", sm: "0px" },
              borderRadius: { xs: "0px 8px 8px 0px", sm: "0 0 8px 8px" },
              borderLeft: { xs: "0px", sm: "1px solid #E5E7EB" },
              p: "4px",
            }}
          >
            <Box component="img" src={view} />
          </IconButton>
        </Box>
      </CardContent>
      <ConfirmModal
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
        description="Are you sure you want to delete?"
        handleCancel={() => setDeleteModal(false)}
        handleAccept={handleDelete}
        loading={isLoading}
        heading="Delete Content"
        button2Text="Delete"
      />
    </Card>
  );
};

export default EventContentCard;
