import {
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { eventValidationSchema } from "../../schemas/event";
import { EVENTFORM } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import apiClient from "../../api/apiClient";

const initialEventData = {
  event_name: "",
  event_type: "",
  duration: "",
  description: "",
};

const EventForm = ({
  isEdit = false,
  data = initialEventData,
  onSubmit = () => {},
  id = null,
}) => {
  const { fields } = EVENTFORM || {};
  const { EventFormStyles } = componentStyles || {};
  const {
    paperStyle,
    inputLabelStyle,
    inputStyle,
    buttonTypoStyle,
    buttonStyle,
  } = EventFormStyles || {};

  const queryClient = useQueryClient();
  const addEvent = useMutation({
    mutationFn: (payload) => apiClient.post("/events", payload),
    onError: (error) => {
      console.error("Add Event Error:", error.response?.data || error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  const updateEvent = useMutation({
    mutationFn: (payload) => apiClient.put(`/events/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validationSchema: eventValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log("Form submitting:", values);
        if (isEdit && id) {
          await updateEvent.mutateAsync(values);
        } else {
          await addEvent.mutateAsync(values);
        }
        resetForm();
        onSubmit(values);
      } catch (error) {
        console.error("Event submit error:", error);
      }
    },
  });

  return (
    <Paper elevation={0} sx={paperStyle}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container columnGap={8} rowGap={2}>
          {fields?.map(({ label, name, placeholder, type, size }, index) => (
            <Grid key={index} item xs={size || 12}>
              <Stack width="100%" spacing={1.2}>
                <Typography variant="h6" sx={inputLabelStyle}>
                  {label}
                </Typography>
                <TextField
                  fullWidth
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  multiline={name === "description"}
                  rows={name === "description" ? 4 : 0}
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
                  error={formik.touched[name] && Boolean(formik.errors[name])}
                  helperText={formik.touched[name] && formik.errors[name]}
                />
              </Stack>
            </Grid>
          ))}
          <Grid item xs={12} pt={2.5}>
            <Button
              type="submit"
              variant="contained"
              sx={buttonStyle}
              disabled={addEvent.isLoading || updateEvent.isLoading}
            >
              <Typography variant="h5" sx={buttonTypoStyle}>
                {isEdit ? "Save" : "Add"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EventForm;
