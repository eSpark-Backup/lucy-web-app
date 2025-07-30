import {
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useFormik } from "formik";
import { eventValidationSchema } from "../../schemas/event";
import { EVENTFORM } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import { contentFormSchema } from "../../schemas/content";

const initialEventData = {
  content_type: "",
  description: "",
  image: null,
  post_method: false,
  recipients: "",
};

const ContentForm = ({
  isEdit = false,
  data = initialEventData,
  onSubmit = () => {},
}) => {
  const { fields } = EVENTFORM || {};
  const { EventFormStyles } = componentStyles || {};
  const {
    paperStyle,
    // inputLabelStyle,
    // inputStyle,
    // buttonTypoStyle,
    // buttonStyle,
  } = EventFormStyles || {};

  const formik = useFormik({
    initialValues: data,
    validationSchema: contentFormSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values, "values");
      resetForm();
      onSubmit(values);
    },
  });

  // const contentOptions = [
  //   "Press Release",
  //   "Instagram Post",
  //   "Facebook Post",
  //   "Newsletter Inclusion",
  // ];

  return (
    <Paper elevation={0} sx={paperStyle}>
      <form onSubmit={formik?.handleSubmit}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            name="content_type"
            value={formik?.values?.content_type}
            onChange={formik?.handleChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Press Release"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Press Release"
            />
          </RadioGroup>
        </FormControl>
        {formik.touched.content_type && formik?.errors?.content_type && (
          <Typography color="error" fontSize={13} mb={2}>
            {formik.errors.content_type}
          </Typography>
        )}
        {/* <Grid container columnGap={8} rowGap={2}>
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
                  multiline
                  rows={name === "description" ? 4 : 0}
                  id={
                    name === "description"
                      ? "outlined-multiline-static"
                      : `${index}`
                  }
                  sx={inputStyle(name)}
                  error={
                    formik?.touched?.[name] && Boolean(formik?.errors?.[name])
                  }
                  helperText={formik?.touched?.[name] && formik?.errors?.[name]}
                />
              </Stack>
            </Grid>
          ))}
          <Grid size={12} pt={2.5}>
            <Button type="submit" variant="contained" sx={buttonStyle}>
              <Typography variant="h5" sx={buttonTypoStyle}>
                {isEdit ? "Save" : "Add"}
              </Typography>
            </Button>
          </Grid>
        </Grid> */}
      </form>
    </Paper>
  );
};

export default ContentForm;
