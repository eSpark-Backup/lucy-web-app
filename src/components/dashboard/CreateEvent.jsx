import { Box, LinearProgress } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../forms/EventForm";
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useEditEventMutation,
  useGetEventByIdQuery,
} from "../../services/event";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import ConfirmModal from "../ConfirmModal";

dayjs.extend(utc);

const CreateEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState({});

  const { data, isLoading, isSuccess, isError, error } = useGetEventByIdQuery(
    id,
    {
      skip: !id,
    }
  );

  useEffect(() => {
    if (id) {
      if (isSuccess && data) {
        const localDateTime = dayjs.utc(data?.date_time).local();

        setEvent({
          event_name: data?.name,
          event_type: data?.type,
          duration: data?.time_span,
          date: localDateTime.format("YYYY-MM-DD"), // Local date
          start_time: localDateTime.format("HH:mm"), // Local time
          image: data?.image,
          description: data?.description,
        });
      }

      if (isError) {
        toast.error(error?.data?.message || "Event not found");
        navigate(-1);
      }
    }
  }, [data, isSuccess, isError, error]);

  const [createEvent, { isLoading: addLoading }] = useCreateEventMutation();

  const handleCreate = (formdata, resetForm) => {
    createEvent(formdata).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Somthing went wrong!");
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "Event created successfully");
        resetForm();
        navigate(`/dashboard/calendar/events/${res?.data?.id}`);
      }
    });
  };

  const [editEvent, { isLoading: editLoading }] = useEditEventMutation();

  const handleEdit = (formdata) => {
    editEvent({ id, credentials: formdata }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Somthing went wrong!");
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "Event edited successfully");
        navigate("/dashboard/calendar");
      }
    });
  };

  const handleSubmit = (values, resetForm) => {
    // Combine date & time in local timezone
    const localDateTime = dayjs(`${values.date}T${values.start_time}`);

    // Format with offset instead of "Z"
    const date_time = localDateTime.format("YYYY-MM-DDTHH:mm:ssZ");

    const formdata = new FormData();
    formdata.append("name", values?.event_name);
    formdata.append("type", values?.event_type);
    formdata.append("time_span", Number(values?.duration));
    formdata.append("description", values?.description);
    formdata.append("date_time", date_time);

    if (values?.image && typeof values?.image === "object") {
      formdata.append("image", values?.image);
    }

    if (id) {
      handleEdit(formdata, resetForm);
    } else {
      handleCreate(formdata, resetForm);
    }
  };

  const [openModal, setOpenModal] = useState(false);
  const [deleteEvent, { isLoading: deleteLoading }] = useDeleteEventMutation();

  const handleDelete = () => {
    deleteEvent(id).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something went wrong");
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "Event was deleted successfully");
        setOpenModal(false);
        navigate("/dashboard/calendar");
      }
    });
  };

  return (
    <Box>
      <FormHeader
        deleteLoading={deleteLoading}
        openModal={() => setOpenModal(true)}
        id={id}
        title={id ? "Event Details" : "Create Event"}
      />
      {isLoading ? (
        <LinearProgress sx={{ maxWidth: "862px" }} />
      ) : (
        <EventForm
          isEdit={id}
          data={event}
          isLoading={addLoading || editLoading}
          onSubmit={handleSubmit}
        />
      )}
      <ConfirmModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        description="Are you sure you want to delete?"
        handleCancel={() => setOpenModal(false)}
        handleAccept={handleDelete}
        loading={deleteLoading}
        heading="Delete Event"
        button2Text="Delete"
      />
    </Box>
  );
};

export default CreateEvent;
