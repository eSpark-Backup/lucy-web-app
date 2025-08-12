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
  ImageListItem,
  ImageList,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import { CONTENTFORM } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import { contentFormSchema } from "../../schemas/content";
import ImageUploader from "../ImageUploader";
import { useRef, useState } from "react";
import EmailsInput from "../EmailsInput";

const initialEventData = {
  content_type: "",
  description: "",
  image: null,
  post_method: "",
  recipients: [],
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
  const [emails, setEmails] = useState([]);

  // Pexels search
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopper, setShowPopper] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const cols = isXs ? 2 : 3; // set cols dynamically

  const searchImages = async () => {
    if (!query) return;
    setHasSearched(true);
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
      setEmails([]);
      if (inputRef?.current) inputRef.current.value = null;
      onSubmit(values);
    },
  });

  const handleClosePopper = () => {
    setShowPopper(false);
    setQuery("");
    setResults([]);
    setHasSearched(false); // reset search state
  };

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
                {name !== "recipients" ? (
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
                    helperText={
                      formik?.touched?.[name] && formik?.errors?.[name]
                    }
                  />
                ) : (
                  <EmailsInput
                    name={name}
                    emails={emails}
                    setEmails={setEmails}
                    placeholder={placeholder}
                    formik={formik}
                  />
                )}
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
                          sx={{
                            color: "#fff",
                            maxWidth: "148px",
                            backgroundColor: "#9C27B0",
                            opacity: "90%",
                            textWrap: "nowrap",
                            "&:hover": {
                              backgroundColor: "#9C27B0",
                            },
                          }}
                          onClick={() => {
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
                            color: "#fff",
                            maxWidth: "148px",
                            backgroundColor: "#4880FF",
                            opacity: "90%",
                            textWrap: "nowrap",
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
                      {showPopper && (
                        <Box
                          sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgba(0,0,0,0.05)",
                            backdropFilter: "blur(1px)", // blur effect
                            zIndex: 1199, // popper ke neeche
                          }}
                          onClick={handleClosePopper}
                        />
                      )}
                      <Popper
                        open={showPopper}
                        anchorEl={null} // anchor remove
                        style={{
                          zIndex: 1200,
                          top: "50%",
                          left: "50%",
                          position: "fixed",
                          transform: "translate(-50%, -50%)", // perfect center
                        }}
                      >
                        <ClickAwayListener onClickAway={handleClosePopper}>
                          <Paper
                            sx={{
                              p: 2,
                              width: { xs: "280px", sm: "400px" },
                              backgroundColor: "rgba(255, 255, 255)",
                              boxShadow: "6px 6px 45px 0px rgba(0, 0, 0, 0.05)",
                            }}
                          >
                            <Stack spacing={2}>
                              {/* Search bar & button */}
                              <Box
                                display="flex"
                                flexDirection={{ xs: "column", sm: "row" }}
                                alignItems={{ xs: "stretch", sm: "center" }}
                                justifyContent={"center"}
                                width="100%"
                                gap={1}
                              >
                                <TextField
                                  fullWidth
                                  placeholder="Search images..."
                                  value={query}
                                  onChange={(e) => setQuery(e.target.value)}
                                  onKeyDown={(e) =>
                                    e.key === "Enter" && searchImages()
                                  }
                                  sx={{
                                    "& .MuiInputBase-root": {
                                      height: { xs: "40px", md: "40px" },
                                      border: "1px solid #D8D8D8",
                                      backgroundColor: "#F1F4F9",
                                      borderRadius: "4px",
                                      paddingLeft: "15px",
                                      paddingRight: "15px",
                                    },
                                    "& input": {
                                      fontSize: "18px",
                                      backgroundColor: "#F1F4F9",
                                      color: "#000",
                                      "&::placeholder": {
                                        color: "#A6A6A6",
                                        opacity: 1,
                                      },
                                    },
                                  }}
                                />
                                <Button
                                  onClick={searchImages}
                                  variant="contained"
                                  disabled={loading}
                                  sx={{
                                    maxWidth: { xs: "100%", sm: "100px" },
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
                                  {"Search"}
                                </Button>
                              </Box>

                              {/* Image results */}
                              {loading ? (
                                <Typography align="center">
                                  Searching...
                                </Typography>
                              ) : hasSearched && results?.length === 0 ? (
                                <Typography
                                  align="center"
                                  sx={{ color: "#A6A6A6", fontSize: 14, mt: 2 }}
                                >
                                  No images found
                                </Typography>
                              ) : results?.length > 0 ? (
                                <ImageList
                                  sx={{
                                    width: "100%",
                                    maxHeight: 250,
                                    overflowY: "auto",
                                  }}
                                  cols={cols}
                                  rowHeight={164}
                                >
                                  {results?.map((img) => (
                                    <ImageListItem key={img?.id}>
                                      <img
                                        srcSet={`${img.src.small}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${img.src.small}?w=164&h=164&fit=crop&auto=format`}
                                        alt={img.alt}
                                        loading="lazy"
                                        style={{
                                          cursor: "pointer",
                                          borderRadius: "6px",
                                        }}
                                        onClick={() => {
                                          setImage(img.src.medium);
                                          formik.setFieldValue(
                                            "image",
                                            img.src.medium
                                          );
                                          handleClosePopper();
                                        }}
                                      />
                                    </ImageListItem>
                                  ))}
                                </ImageList>
                              ) : null}
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
