import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DatePicker } from "@mui/lab";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import { eventValidationSchema } from "../../schemas/event";
import { EVENTFORM } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import ImageUploader from "../ImageUploader";
import { useEffect, useRef, useState } from "react";

const initialEventData = {
  event_name: "",
  event_type: "",
  duration: "",
  start_time: "",
  image: null,
  description: "",
};

const EventForm = ({
  isEdit = false,
  data = initialEventData,
  isLoading,
  onSubmit = () => {},
}) => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const date = search.get("date") || null;
  const inputRef = useRef(null);
  const [image, setImage] = useState(data?.image);
  const { id } = useParams();
  useEffect(() => {
    setImage(data?.image);
  }, [data]);
  const { fields } = EVENTFORM || {};
  const { EventFormStyles } = componentStyles || {};
  const {
    paperStyle,
    inputLabelStyle,
    inputStyle,
    buttonTypoStyle,
    buttonStyle,
    uploadButtonStyle,
  } = EventFormStyles || {};

  const formik = useFormik({
    initialValues: date ? { ...data, date } : data,
    validationSchema: eventValidationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (inputRef?.current) inputRef.current.value = null;
      onSubmit(values, () => {
        resetForm();
        setImage(null);
      });
    },
  });

  return (
    <Paper elevation={0} sx={paperStyle}>
      <form onSubmit={formik?.handleSubmit}>
        <Grid container columnGap={8} rowGap={2}>
          {fields(date)?.map(
            ({ label, name, placeholder, type, size }, index) => (
              <Grid size={size} key={index}>
                <Stack width="100%" spacing={1.2}>
                  <Typography variant="h6" sx={inputLabelStyle}>
                    {label}
                  </Typography>
                  {name !== "image" ? (
                    <TextField
                      fullWidth
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      value={formik?.values?.[name] || ""}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      multiline={name === "description"}
                      rows={name === "description" ? 4 : 0}
                      id={
                        name === "description"
                          ? "outlined-multiline-static"
                          : `${index}`
                      }
                      sx={inputStyle(name)}
                      error={
                        formik?.touched?.[name] &&
                        Boolean(formik?.errors?.[name])
                      }
                      helperText={
                        formik?.touched?.[name] && formik?.errors?.[name]
                      }
                    />
                  ) : name === "date" ? (
                    <DatePicker
                      label="Basic date picker"
                      name={name}
                      value={formik?.values?.[name] || ""}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      error={
                        formik?.touched?.[name] &&
                        Boolean(formik?.errors?.[name])
                      }
                      helperText={
                        formik?.touched?.[name] && formik?.errors?.[name]
                      }
                    />
                  ) : (
                    <>
                      <ImageUploader
                        ref={inputRef}
                        image={image}
                        setImage={setImage}
                        formik={formik}
                      />
                      {formik?.touched?.image && formik?.errors?.image && (
                        <Typography color="error" fontSize={12} m={"3px 14px"}>
                          {formik?.errors?.image}
                        </Typography>
                      )}
                      <Stack pt={1}>
                        <Button
                          onClick={() => inputRef?.current?.click()}
                          variant="contained"
                          sx={uploadButtonStyle}
                        >
                          <Typography variant="h6" sx={buttonTypoStyle}>
                            {"Upload Image"}
                          </Typography>
                        </Button>
                      </Stack>
                    </>
                  )}
                </Stack>
              </Grid>
            )
          )}
          <Grid size={12} pt={2.5}>
            {isEdit ? (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <Button
                  loading={isLoading}
                  disabled={isLoading}
                  type="submit"
                  variant="contained"
                  sx={{ ...buttonStyle, marginLeft: "0px", width: "191px" }}
                >
                  <Typography variant="h5" sx={buttonTypoStyle}>
                    Save
                  </Typography>
                </Button>
                <Button
                  onClick={() =>
                    navigate(`/dashboard/calendar/events/${id}/contents`)
                  }
                  variant="contained"
                  sx={{
                    ...buttonStyle,
                    marginLeft: "0px",
                    width: "191px",
                    background: "#9C27B0",
                  }}
                >
                  <Typography variant="h5" sx={buttonTypoStyle}>
                    See Content
                  </Typography>
                </Button>
              </Stack>
            ) : (
              <Button
                loading={isLoading}
                disabled={isLoading}
                type="submit"
                variant="contained"
                sx={buttonStyle}
              >
                <Typography variant="h5" sx={buttonTypoStyle}>
                  Add
                </Typography>
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EventForm;
