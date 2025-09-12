import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DatePicker } from "@mui/lab";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { eventValidationSchema } from "../../schemas/event";
import { EVENTFORM } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import ImageUploader from "../ImageUploader";
import { useEffect, useRef, useState } from "react";
import { useGetAllSchoolsQuery } from "../../services/school";
import { useSelector } from "react-redux";

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
  const { id } = useParams();
  const [image, setImage] = useState(data?.image);
  const { user } = useSelector((state) => state?.auth);
  const isSchoolRole = user?.role === "school";
  const isUserRole = user?.role === "User";
  const is_trust = user?.profile?.organization?.is_trust;
  const { data: allSchools } = useGetAllSchoolsQuery(undefined, {
    skip: isSchoolRole,
  });
  const [selectedSchoolEmail, setSelectedSchoolEmail] = useState(
    allSchools?.data[0].email
  );

  console.log(is_trust, "trust");
  console.log(isSchoolRole, "isSchoolRole");
  console.log(isUserRole, "isUserRole");
  console.log(selectedSchoolEmail, "selectedSchoolEmail");

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
    initialValues: date
      ? {
          ...data,
          date,
          ...(is_trust &&
            !isSchoolRole && {
              school_email: data?.school_email || selectedSchoolEmail,
              show_email: data?.school_email || selectedSchoolEmail,
            }),
        }
      : {
          ...data,
          ...(is_trust &&
            !isSchoolRole && {
              school_email: data?.school_email,
              show_email: data?.school_email,
            }),
        },
    validationSchema: eventValidationSchema(is_trust),
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const { show_email, ...filteredValues } = values;

      if (inputRef?.current) {
        inputRef.current.value = null;
      }

      onSubmit(filteredValues, () => {
        resetForm();
        setImage(null);
      });
    },
  });

  return (
    <Paper elevation={0} sx={paperStyle}>
      <form onSubmit={formik?.handleSubmit}>
        <Grid container columnGap={8} rowGap={2}>
          {fields(date, is_trust, isSchoolRole)?.map(
            (
              { label, name, placeholder, type, size, disabled, is_editable },
              index
            ) => (
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
                      disabled={(isEdit && !is_editable) || disabled}
                      placeholder={placeholder}
                      select={is_trust && type === "select"}
                      value={formik?.values?.[name] || ""}
                      onChange={(e) => {
                        formik.handleChange(e);
                        if (name === "school_email") {
                          return setSelectedSchoolEmail(e.target.value);
                        }
                      }}
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
                    >
                      {is_trust &&
                        type === "select" &&
                        (allSchools?.data || [])?.map((opt) => (
                          <MenuItem key={opt?.email} value={opt?.email}>
                            {opt?.name}
                          </MenuItem>
                        ))}
                    </TextField>
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
