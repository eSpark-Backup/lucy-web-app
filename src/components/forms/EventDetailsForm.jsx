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
import { useNavigate } from "react-router-dom";

const initialEventData = {
  event_name: "",
  event_type: "",
  duration: "",
  description: "",
};

const EventDetailsForm = ({ data = initialEventData, onSubmit = () => {} }) => {
  const { fields } = EVENTFORM || {};
  const { EventDetailsFormStyles } = componentStyles || {};
  const navigate = useNavigate();

  const {
    paperStyle,
    inputLabelStyle,
    inputStyle,
    buttonTypoStyle,
    buttonStyle,
    seeContentbuttonStyle,
  } = EventDetailsFormStyles || {};

  const formik = useFormik({
    initialValues: data,
    validationSchema: eventValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values, "values");
      resetForm();
      onSubmit(values);
    },
  });

  const handleClick = () => {
    navigate("#");
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
              justifyContent={"space-between"}
            >
              <Button type="submit" variant="contained" sx={buttonStyle}>
                <Typography variant="h5" sx={buttonTypoStyle}>
                  {"Add"}
                </Typography>
              </Button>
              <Button
                variant="contained"
                sx={seeContentbuttonStyle}
                onClick={handleClick}
              >
                <Typography variant="h5" sx={buttonTypoStyle}>
                  {"See Content"}
                </Typography>
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EventDetailsForm;
