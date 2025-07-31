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
  Popper,
  ClickAwayListener,
  IconButton,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import { CONTENTFORM } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import { contentFormSchema } from "../../schemas/content";
import ImageUploader from "../ImageUploader";
import { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

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

  // Pexels search
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPopper, setShowPopper] = useState(false);

  const searchImages = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${query}`,
        {
          headers: {
            Authorization:
              "E4AB8hPKj3zShBgIuY1U3ZsNz7JFIeYyqmdOeJoYAENQLBhyBaPjnjUD", // For production, use process.env
          },
        }
      );
      const data = await res.json();
      setResults(data.photos || []);
    } catch (err) {
      console.error("Pexels fetch error:", err);
    }
    setLoading(false);
  };

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
          sx={{ gap: 5, px: 1.2, py: 2.5 }}
        >
          {radioButtons?.map((item, index) => (
            <FormControlLabel
              value={item}
              key={index}
              sx={{ gap: "8px", marginRight: "16px", alignItems: "center" }}
              control={
                <Radio
                  sx={{
                    width: 24,
                    height: 24,
                    color: "#666666",
                    "&.Mui-checked": { color: "#5088FF" },
                    "& .MuiSvgIcon-root": { width: 24, height: 24 },
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
                      <Box display="flex" justifyContent={"end"} gap={2}>
                        <Button
                          variant="contained"
                          // sx={buttonStyle}
                          sx={{
                            // ml: "auto",
                            color: "#fff",
                            maxWidth: "148px",
                            // height: { xs: "46px" },
                            // borderRadius: "12px",
                            backgroundColor: "#9C27B0",
                            opacity: "90%",
                            "&:hover": {
                              backgroundColor: "#9C27B0",
                            },
                          }}
                          onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                            setShowPopper((prev) => !prev);
                          }}
                        >
                          <Typography variant="h6" sx={buttonTypoStyle}>
                            {"Search Images"}
                          </Typography>
                        </Button>

                        <Button
                          variant="contained"
                          sx={{
                            // ml: "auto",
                            color: "#fff",
                            maxWidth: "148px",
                            // height: { xs: "46px" },
                            // borderRadius: "12px",
                            backgroundColor: "#4880FF",
                            opacity: "90%",
                            "&:hover": {
                              backgroundColor: "#4880FF",
                            },
                          }}
                          onClick={() => !image && inputRef?.current?.click()}
                        >
                          <Typography variant="h6" sx={buttonTypoStyle}>
                            {uploadButtonText}
                          </Typography>
                        </Button>
                      </Box>

                      <Popper
                        open={showPopper}
                        anchorEl={anchorEl}
                        placement="bottom-start"
                        style={{ zIndex: 1200 }}
                      >
                        <ClickAwayListener
                          onClickAway={() => setShowPopper(false)}
                        >
                          <Paper sx={{ p: 2, width: 400 }}>
                            <Stack spacing={2}>
                              <Box display="flex" alignItems="center" width="100%" gap={1}>
  <TextField
    placeholder="Search images..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && searchImages()}
    sx={{
      width: "70%",
      "& .MuiInputBase-root": {
        height: "40px",
        borderRadius: "8px",
        paddingX: 1, // outer padding inside input root
      },
      "& input": {
        padding: "8px 12px", // inner padding for text and placeholder
      },
    }}
  />
  <Button
    onClick={searchImages}
    variant="contained"
    disabled={loading}
    sx={{
      width: "30%",
      height: "40px",
      borderRadius: "8px",
      backgroundColor: "#9C27B0",
      color: "#fff",
      opacity: 0.9,
      fontWeight: 500,
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#8e24aa",
      },
    }}
  >
    {loading ? "Searching..." : "Search"}
  </Button>
</Box>


                              <Stack
                                direction="row"
                                flexWrap="wrap"
                                gap={1}
                                maxHeight={200}
                                overflow="auto"
                              >
                                {results.map((img) => (
                                  <img
                                    key={img.id}
                                    src={img.src.medium}
                                    alt={img.alt}
                                    width={100}
                                    style={{
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      setImage(img.src.medium);
                                      formik.setFieldValue(
                                        "image",
                                        img.src.medium
                                      );
                                      setShowPopper(false);
                                    }}
                                  />
                                ))}
                              </Stack>
                            </Stack>
                          </Paper>
                        </ClickAwayListener>
                      </Popper>
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
                                "&.Mui-checked": { color: "#5088FF" },
                                "& .MuiSvgIcon-root": { width: 24, height: 24 },
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
