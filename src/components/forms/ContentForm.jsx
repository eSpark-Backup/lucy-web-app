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
  LinearProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { CONTENTFORM } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import { contentFormSchema } from "../../schemas/content";
import ImageUploader from "../ImageUploader";
import { useEffect, useRef, useState } from "react";
import EmailsInput from "../EmailsInput";
import {
  useAddContentMutation,
  useGetAllRecipientsQuery,
  useUpdateContentMutation,
} from "../../services/content";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useAddImageMutation } from "../../services/image";
import { useGetEventByIdQuery } from "../../services/event";
import { useAiContentMutation } from "../../services/ai";
import AiGenerate from "../modals/AiGenerate";

const initialEventData = {
  content_type: "Press Release",
  description: "",
  image: null,
  post_method: "",
  recipients: [],
};

const contentTypeOptions = {
  "Press Release": "press_release",
  "Instagram Post": "instagram_post",
  "Facebook Post": "facebook_post",
  "Newsletter Inclusion": "newsletter",
  Summary: "summary",
};

const ContentForm = ({
  // isEdit = false,
  data = initialEventData,
  contentId,
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
  const [image, setImage] = useState(data?.image);
  const [emails, setEmails] = useState(data?.recipients);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [suggestedEmails, setSuggestedEmails] = useState([]);

  // Pexels search
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPopper, setShowPopper] = useState(false);
  const [contentData, { isLoading }] = useAddContentMutation();
  const [editContent, { isLoading: editLoading }] = useUpdateContentMutation();
  const [eventName, setEventName] = useState("");
  const [aiContent, setAiContent] = useState("");
  const navigate = useNavigate();

  const { eventId } = useParams();

  const {
    data: eventData,
    isLoading: eventLoading,
    isSuccess,
    isError,
    error,
  } = useGetEventByIdQuery(eventId, {
    skip: !eventId,
    refetchOnMountOrArgChange: true,
  });

  const [aiPayload, { isLoading: aiLoading }] = useAiContentMutation();
  const {
    data: recipientsData,
    isLoading: recipientsLoading,
    isSuccess: recipientsSuccess,
  } = useGetAllRecipientsQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (eventData && eventData?.name) {
      setEventName(eventData?.name);
    }
  }, [eventData, isSuccess]);

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
      // console.log(values, "values");
      const selectedContentType = contentTypeOptions[values?.content_type];
      let body = {
        content_type: selectedContentType,
        content_recipients: emails,
        post_method: values?.post_method,
        text_content: values?.description,
        attachment: values?.image,
      };
      if (formik.values.image && typeof formik.values.image !== "string") {
        const formData = new FormData();
        formData.append("file", formik.values.image);
        imageUpload({ body: formData }).then((res) => {
          if (res?.data) {
            // formik.setFieldValue("image", res?.data?.filePath);
            body = { ...body, attachment: res?.data?.filePath };
          } else if (res?.error) {
            console.log(res?.error);
          }
        });
      }
      if (!contentId) {
        contentData({ body, eventId }).then((res) => {
          if (res?.data) {
            toast.success("Content added successfully");
            navigate(`/dashboard/calendar/events/${eventId}/contents`);
            return;
          } else if (res?.error) {
            toast.error(res?.error?.data?.message);
            return;
          }
        });
      } else {
        editContent({ body, eventId, contentId }).then((res) => {
          if (res?.data) {
            toast.success("Content updated successfully");
            navigate(`/dashboard/calendar/events/${eventId}/contents`);
            return;
          } else if (res?.error) {
            toast.error(res?.error?.data?.message);
            return;
          }
        });
      }

      // resetForm();
      // setImage(null);
      // setEmails([]);
      // if (inputRef?.current) inputRef.current.value = null;
      // onSubmit(values);
    },
  });

  const [imageUpload, {}] = useAddImageMutation();

  useEffect(() => {
    if (formik.values.image && typeof formik.values.image !== "string") {
      const formData = new FormData();
      formData.append("file", formik.values.image);
      imageUpload({ body: formData }).then((res) => {
        if (res?.data) {
          formik.setFieldValue("image", res?.data?.filePath);
        } else if (res?.error) {
          console.log(res?.error);
        }
      });
    }
  }, [formik.values.image]);

  const handleAiGenerate = async () => {
    try {
      const obj = {
        content_type: contentTypeOptions[formik.values.content_type],
        event_name: eventName,
        prompt_text: formik.values.description,
      };

      // Call the RTK mutation
      const res = await aiPayload({ body: obj });

      if (res?.data) {
        // console.log("✅ JSON Response:", res.data);
        setAiContent(res.data);
      } else if (res?.error) {
        if (typeof res.error.data === "string") {
          // console.log("✅ Text Response:", res.error.data);
          setAiContent(res?.error?.data);
        } else {
          console.error("❌ API Error:", res.error);
        }
      }
    } catch (error) {
      console.error("CATCH ERROR", error);
    }
  };

  useEffect(() => {
    if (aiContent) {
      setAiModalOpen(true);
    }
  }, [aiContent]);

  const handleKeep = (content) => {
    formik.setFieldValue("description", content);
    setAiContent("");
    setAiModalOpen(false);
  };

  useEffect(() => {
    if (recipientsData && recipientsSuccess) {
      setSuggestedEmails(recipientsData);
    }
  }, [recipientsData, recipientsSuccess]);

  useEffect(() => {
    console.log(emails);
  }, [emails]);

  if (eventLoading || recipientsLoading) {
    return <LinearProgress />;
  }

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
                    data={suggestedEmails}
                  />
                )}
                {name === "description" && (
                  <>
                    <Grid size={12} pt={1.5}>
                      <Button
                        variant="contained"
                        sx={aiButtonStyle}
                        onClick={handleAiGenerate}
                        loading={aiLoading}
                        disabled={aiLoading}
                      >
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
                            color: "#fff",
                            maxWidth: "148px",
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
                              <Box
                                display="flex"
                                alignItems="center"
                                width="100%"
                                gap={1}
                              >
                                <TextField
                                  placeholder="Search images..."
                                  value={query}
                                  onChange={(e) => setQuery(e.target.value)}
                                  onKeyDown={(e) =>
                                    e.key === "Enter" && searchImages()
                                  }
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
          <Button
            type="submit"
            variant="contained"
            sx={buttonStyle}
            loading={isLoading || editLoading}
          >
            <Typography variant="h6" sx={buttonTypoStyle}>
              {contentId ? "Save" : "Add"}
            </Typography>
          </Button>
        </Grid>
      </form>
      <AiGenerate
        open={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        enhancedContent={aiContent}
        onKeep={handleKeep}
      />
    </Paper>
  );
};

export default ContentForm;
