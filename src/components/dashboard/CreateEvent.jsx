import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import FormHeader from "../forms/FormHeader";
import EventForm from "../forms/EventForm";
import ConfirmModal from "../ConfirmModal";
import BackButton from "../BackButton";

import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useEditEventMutation,
  useGetEventByIdQuery,
} from "../../services/event";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../services/rtk";

dayjs.extend(utc);

const CreateEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState({});
  const [isDeleted, setIsDeleted] = useState(false);

  const { data, isLoading, isSuccess, isError, error } = useGetEventByIdQuery(
    id,
    {
      skip: !id || isDeleted,
    }
  );

  const { user } = useSelector((state) => state?.auth);
  const isSchoolRole = user?.role === "school";
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      if (isSuccess && data) {
        const localDateTime = dayjs.utc(data?.date_time).local();

        setEvent({
          event_name: data?.name,
          event_type: data?.type,
          ...(!isSchoolRole && {
            school_email: data?.school?.email,
          }),
          date: localDateTime.format("YYYY-MM-DD"),
          image: data?.image,
          description: data?.description,
        });
      }

      if (isError) {
        toast.error(error?.data?.message || "Event not found");
        navigate("/dashboard/calendar");
      }
    }
  }, [data, isSuccess, isError, error, id, navigate]);

  const [createEvent, { isLoading: addLoading }] = useCreateEventMutation();
  const [editEvent, { isLoading: editLoading }] = useEditEventMutation();
  const [deleteEvent, { isLoading: deleteLoading }] = useDeleteEventMutation();

  const handleCreate = (formdata, resetForm) => {
    createEvent(formdata).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Somthing went wrong!");
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "Event created successfully");
        resetForm();
        dispatch(api.util.invalidateTags(["schools"]));
        navigate("/dashboard/calendar");
      }
    });
  };

  const handleEdit = (formdata) => {
    editEvent({ id, credentials: formdata }).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Somthing went wrong!");
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "Event edited successfully");
        dispatch(api.util.invalidateTags(["schools"]));
        navigate("/dashboard/calendar");
      }
    });
  };

  const handleSubmit = (values, resetForm) => {
    const date_time = dayjs(values?.date)
      // .add(2, "minute")
      // .utc()
      .format("YYYY-MM-DDTHH:mm:ss[Z]");

    const formdata = new FormData();
    formdata.append("name", values?.event_name);
    formdata.append("type", values?.event_type);
    formdata.append("description", values?.description);
    formdata.append("date_time", date_time);

    if (isSchoolRole === false && !id) {
      formdata.append("school_email", values?.school_email);
    }
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

  const handleDelete = () => {
    deleteEvent(id)?.then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something went wrong");
        return;
      }
      if (res?.data) {
        toast.success(res?.data?.message || "Event was deleted successfully");
        setIsDeleted(true);
        setOpenModal(false);
        dispatch(api.util.invalidateTags(["schools"]));
        navigate("/dashboard/calendar");
      }
    });
  };

  return (
    <Box>
      <BackButton fallback={"/dashboard/calendar"} />
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
