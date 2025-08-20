import { useSearchParams } from "react-router-dom";
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
import { useEffect, useRef, useState } from "react";
import { SCHOOL_INFORMATION_FORM } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import ImageUploader from "../ImageUploader";
import { schoolProfileValidationSchema } from "../../schemas/schoolProfile";

const initialEventData = {
  school_name: "",
  location: "",
  phone_number: "",
  description: "",
  email: "",
};

const SchoolProfileForm = ({
  id = null,
  mode = "add", // "add" | "edit" | "preview"
  data = initialEventData,
  isLoading,
  onSubmit = () => {},
}) => {
  const [search] = useSearchParams();
  const date = search.get("date") || null;
  const inputRef = useRef(null);
  const [image, setImage] = useState(data?.image);

  useEffect(() => {
    setImage(data?.image);
  }, [data]);

  const { fields } = SCHOOL_INFORMATION_FORM || {};
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
    validationSchema: schoolProfileValidationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (inputRef?.current) inputRef.current.value = null;
      onSubmit(values, () => {
        resetForm();
        setImage(null);
      });
    },
  });

  const isPreview = mode === "preview";
  const isEdit = mode === "edit";
  const isAdd = mode === "add";

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
                    name !== "date" ? (
                      <TextField
                        fullWidth
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={formik?.values?.[name]}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        disabled={isPreview}
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
                    ) : (
                      <DatePicker
                        label="Basic date picker"
                        name={name}
                        value={formik?.values?.[name]}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        disabled={isPreview}
                        error={
                          formik?.touched?.[name] &&
                          Boolean(formik?.errors?.[name])
                        }
                        helperText={
                          formik?.touched?.[name] && formik?.errors?.[name]
                        }
                      />
                    )
                  ) : (
                    <>
                      <ImageUploader
                        ref={inputRef}
                        image={image}
                        setImage={setImage}
                        formik={formik}
                        disabled={isPreview}
                      />
                      {formik?.touched?.image && formik?.errors?.image && (
                        <Typography color="error" fontSize={12} m={"3px 14px"}>
                          {formik?.errors?.image}
                        </Typography>
                      )}
                      {!isPreview && (
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
                      )}
                    </>
                  )}
                </Stack>
              </Grid>
            )
          )}
          <Grid size={12} pt={2.5}>
            {isEdit && (
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
                  sx={{
                    ...buttonStyle,
                    marginLeft: "0px",
                    maxWidth: {
                      xs: "100%",
                      sm: "152px",
                      md: "182px",
                      lg: "191px",
                    },
                  }}
                >
                  <Typography variant="h5" sx={buttonTypoStyle}>
                    Save
                  </Typography>
                </Button>
              </Stack>
            )}
            {isAdd && (
              <Button
                fullWidth
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

export default SchoolProfileForm;
