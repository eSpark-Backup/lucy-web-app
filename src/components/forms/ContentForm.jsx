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
} from "@mui/material";
import { useFormik } from "formik";
import { CONTENTFORM } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import { contentFormSchema } from "../../schemas/content";
import ImageUploader from "../ImageUploader";
import { useRef, useState } from "react";

const initialEventData = {
  content_type: "",
  description: "",
  image: null,
  post_method: "",
  recipients: "",
};

const ContentForm = ({
  isEdit = false,
  data = initialEventData,
  onSubmit = () => {},
}) => {
  const {
    fields,
    radioButtons,
    aiButtonText,
    uploadButtonText,
    methodText,
    methodRadioButton,
    radioButtonsLable,
  } = CONTENTFORM;
  const { ContentFormStyles } = componentStyles;
  const {
    paperStyle,
    inputLabelStyle,
    inputStyle,
    buttonTypoStyle,
    buttonStyle,
    aiButtonStyle,
    radioButtonsLableStyle,
  } = ContentFormStyles;
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);

  const formik = useFormik({
    initialValues: data,
    validationSchema: contentFormSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values, "values");
      resetForm();
      setImage(null);
      if (inputRef?.current) inputRef.current.value = null;
      onSubmit(values);
    },
  });

  return (
    <Paper elevation={0} sx={paperStyle}>
      <form onSubmit={formik?.handleSubmit}>
        <Typography variant="h6" sx={radioButtonsLableStyle}>
          {radioButtonsLable}
        </Typography>
        <RadioGroup
          row
          name="content_type"
          value={formik?.values?.content_type}
          onChange={formik?.handleChange}
          sx={{
            gap: 5,
            px: 1.2,
            py: 2.5,
          }}
        >
          {radioButtons?.map((item, index) => (
            <FormControlLabel
              value={item}
              key={index}
              sx={{
                gap: "8px",
                marginRight: "16px",
                alignItems: "center",
              }}
              control={
                <Radio
                  sx={{
                    width: 24,
                    height: 24,
                    color: "#666666",
                    "&.Mui-checked": {
                      color: "#5088FF",
                    },
                    "& .MuiSvgIcon-root": {
                      width: 24,
                      height: 24,
                    },
                  }}
                />
              }
              label={item}
            />
          ))}
        </RadioGroup>
        {formik.touched.content_type && formik?.errors?.content_type && (
          <Typography color="error" fontSize={12} m={"-5px 14px 20px 14px"}>
            {formik.errors.content_type}
          </Typography>
        )}
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
                  rows={name === "description" ? 4 : 0}
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
                {name === "description" && (
                  <>
                    <Grid size={12} pt={1.5}>
                      <Button variant="contained" sx={aiButtonStyle}>
                        <Typography variant="h6" sx={buttonTypoStyle}>
                          {aiButtonText}
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid size={12} pt={1.5}>
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
                    </Grid>
                    <Grid size={12} pt={1.5}>
                      <Button
                        variant="contained"
                        sx={buttonStyle}
                        onClick={() => !image && inputRef?.current?.click()}
                      >
                        <Typography variant="h6" sx={buttonTypoStyle}>
                          {uploadButtonText}
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid size={12} pt={1.5}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontFamily: "Nunito Sans",
                          color: "#606060",
                        }}
                      >
                        {methodText}
                      </Typography>
                      <RadioGroup
                        name="post_method"
                        value={formik?.values?.post_method}
                        onChange={formik?.handleChange}
                      >
                        <FormControlLabel
                          value={methodRadioButton}
                          sx={{
                            gap: "8px",
                            marginRight: "16px",
                            alignItems: "center",
                            px: 1.2,
                            py: 2.5,
                          }}
                          control={
                            <Radio
                              sx={{
                                width: 24,
                                height: 24,
                                color: "#666666",
                                "&.Mui-checked": {
                                  color: "#5088FF",
                                },
                                "& .MuiSvgIcon-root": {
                                  width: 24,
                                  height: 24,
                                },
                              }}
                            />
                          }
                          label={methodRadioButton}
                        />
                        {formik?.touched?.post_method &&
                          formik?.errors?.post_method && (
                            <Typography
                              color="error"
                              fontSize={12}
                              mb={2}
                              mt={-0.5}
                            >
                              {formik?.errors?.post_method}
                            </Typography>
                          )}
                      </RadioGroup>
                    </Grid>
                  </>
                )}
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Grid size={12} pt={3}>
          <Button type="submit" variant="contained" sx={buttonStyle}>
            <Typography variant="h6" sx={buttonTypoStyle}>
              {isEdit ? "Save" : "Add"}
            </Typography>
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContentForm;
