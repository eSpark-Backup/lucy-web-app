import {
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { eventValidationSchema } from "../../schemas/event";
import { EVENTFORM } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import {
  createEvent,
  updateEvent as updateEventAPI,
  getEventById,
  deleteEvent,
} from "../../api/events";
import {
  setSelectedEvent,
  clearSelectedEvent,
} from "../../redux/slices/eventSlice";

const initialEventData = {
  event_name: "",
  event_type: "",
  duration: "",
  description: "",
};

const EventDetailsForm = ({
  id = null,
  isEdit = id? true : false,
  data = null,
  onSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { fields } = EVENTFORM || {};
  const { EventDetailsFormStyles } = componentStyles || {};
  const {
    paperStyle,
    inputLabelStyle,
    inputStyle,
    buttonTypoStyle,
    buttonStyle,
    seeContentbuttonStyle,
  } = EventDetailsFormStyles || {};

  const { data: fetchedEventData } = useQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
    enabled: isEdit && !data && Boolean(id),
  });

  const finalData = data || fetchedEventData || initialEventData;

  const addEvent = useMutation({
    mutationFn: (payload) => createEvent(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["events"]);
      dispatch(setSelectedEvent(response));
      toast.success("🎉 Event created successfully!");
    },
    onError: (error) => {
      console.error("Error creating event:", error.response?.data || error.message);
      toast.error("Failed to create event!");
    },
  });

  const updateEvent = useMutation({
    mutationFn: (payload) => updateEventAPI(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["events"]);
      dispatch(setSelectedEvent(response));
      toast.success("✅ Event updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating event:", error.response?.data || error.message);
      toast.error("Failed to update event!");
    },
  });

  const removeEvent = useMutation({
    mutationFn: () => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      dispatch(clearSelectedEvent());
      onSubmit(null);
      toast.success("🗑️ Event deleted!");
    },
    onError: (error) => {
      console.error("Error deleting event:", error.response?.data || error.message);
      toast.error("Failed to delete event!");
    },
  });

  const formik = useFormik({
    initialValues: finalData,
    enableReinitialize: true,
    validationSchema: eventValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        let response;
        if (isEdit && id) {
          response = await updateEvent.mutateAsync(values);
        } else {
          response = await addEvent.mutateAsync(values);
        }
        resetForm();
        dispatch(clearSelectedEvent());
        onSubmit(response || values);
      } catch (error) {
        console.error("Submit Error:", error);
        toast.error("Something went wrong while submitting!");
      }
    },
  });

  const handleSeeContentClick = () => {
    navigate("/dashboard/calendar/create-event/1/content");
  };

  return (
    <Paper elevation={0} sx={paperStyle}>
      <form onSubmit={formik?.handleSubmit}>
        <Grid container columnGap={8} rowGap={2}>
          {fields?.map(({ label, name, placeholder, type, size }, index) => (
            <Grid size={size} key={index}>
              <Stack width="100%" spacing={1.2}>
                <Typography variant="h6" sx={inputLabelStyle}>
                  {label}
                </Typography>
                <TextField
                  fullWidth
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={formik?.values?.[name]}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  multiline={name === "description"}
                  rows={name === "description" ? 6.7 : 0}
                  id={
                    name === "description"
                      ? "outlined-multiline-static"
                      : `${index}`
                  }
                  sx={inputStyle(name)}
                  inputProps={{
                    sx: {
                      fontSize: "14px",
                      fontFamily: "Nunito Sans",
                      fontWeight: 400,
                      "&::placeholder": {
                        fontSize: "14px",
                        fontFamily: "Nunito Sans",
                        fontWeight: 400,
                      },
                    },
                  }}
                  error={
                    formik?.touched?.[name] && Boolean(formik?.errors?.[name])
                  }
                  helperText={formik?.touched?.[name] && formik?.errors?.[name]}
                />
              </Stack>
            </Grid>
          ))}
          <Grid size={12} pt={2.5}>
            <Stack
              direction={{ xs: "row", sm: "row" }}
              spacing={1.5}
              justifyContent={id ? "space-between" : "flex-end"}
            >
              <Button type="submit" variant="contained" sx={buttonStyle}>
                <Typography variant="h5" sx={buttonTypoStyle}>
                  {isEdit ? "Save" : "Add"}
                </Typography>
              </Button>
              <Box sx={{ display: "flex", gap: "10px" }}>
                {isEdit && ( 
                  <Button variant="outlined" 
                  sx={{
                    width: "50px",
                  }}
                    color="error"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this event?")) {
                        removeEvent.mutate();
                      }
                    }}
                  >
                    <DeleteOutlineIcon/>
                  </Button>
                )} 
                {isEdit && ( 
                <Button
                  variant="contained"
                  sx={seeContentbuttonStyle}
                  onClick={handleSeeContentClick}
                >
                  <Typography variant="h5" sx={buttonTypoStyle}>
                    {"See Content"}
                  </Typography>
                </Button>)}
              </Box>
              
              
              
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EventDetailsForm;
