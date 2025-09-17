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
  Box,
  LinearProgress,
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

const ContentForm = ({ data = initialEventData, contentId }) => {
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
    radioStyle,
    paperStyle,
    inputLabelStyle,
    inputStyle,
    buttonTypoStyle,
    buttonStyle,
    aiButtonStyle,
    radioButtonsLableStyle,
    recipientsFielStyle,
    searchButtonStyle,
    uploadButtonStyle,
    poperBackgroundStyle,
    popperStyle,
    searchPaperStyle,
    searchTextFieldStyle,
    imageSearchButtonStyle,
    imageListStyle,
    lazyImageStyle,
    methodTypoStyle,
    formControlStyle,
  } = ContentFormStyles;

  const inputRef = useRef(null);
  const [image, setImage] = useState(data?.image);
  const [emails, setEmails] = useState(data?.recipients);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [suggestedEmails, setSuggestedEmails] = useState([]);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const [hasSearched, setHasSearched] = useState(false);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const cols = isXs ? 2 : 3;

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
              "E4AB8hPKj3zShBgIuY1U3ZsNz7JFIeYyqmdOeJoYAENQLBhyBaPjnjUD",
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
    onSubmit: (values) => {
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
            console.error(res?.error);
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
    },
  });

  const [imageUpload] = useAddImageMutation();

  useEffect(() => {
    if (formik.values.image && typeof formik.values.image !== "string") {
      const formData = new FormData();
      formData.append("file", formik.values.image);
      imageUpload({ body: formData }).then((res) => {
        if (res?.data) {
          formik.setFieldValue("image", res?.data?.filePath);
        } else if (res?.error) {
          console.error(res?.error);
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

  const handleClosePopper = () => {
    setShowPopper(false);
    setQuery("");
    setResults([]);
    setHasSearched(false);
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
              label={item}
              value={item}
              key={index}
              sx={{ gap: "8px", marginRight: "16px", alignItems: "center" }}
              control={<Radio sx={radioStyle} />}
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
                    inputProps={recipientsFielStyle}
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
                        image={image}
                        ref={inputRef}
                        formik={formik}
                        setImage={setImage}
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
                          sx={searchButtonStyle}
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
                          sx={uploadButtonStyle}
                          onClick={() => !image && inputRef?.current?.click()}
                        >
                          <Typography variant="h6" sx={buttonTypoStyle}>
                            {uploadButtonText}
                          </Typography>
                        </Button>
                      </Box>
                      {showPopper && (
                        <Box
                          sx={poperBackgroundStyle}
                          onClick={handleClosePopper}
                        />
                      )}
                      <Popper
                        anchorEl={null}
                        open={showPopper}
                        style={popperStyle}
                      >
                        <ClickAwayListener onClickAway={handleClosePopper}>
                          <Paper sx={searchPaperStyle}>
                            <Stack spacing={2}>
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
                                  value={query}
                                  sx={searchTextFieldStyle}
                                  placeholder="Search images..."
                                  onChange={(e) => setQuery(e?.target?.value)}
                                  onKeyDown={(e) =>
                                    e.key === "Enter" && searchImages()
                                  }
                                />
                                <Button
                                  disabled={loading}
                                  variant="contained"
                                  onClick={searchImages}
                                  sx={imageSearchButtonStyle}
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
                                  sx={imageListStyle}
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
                                        style={lazyImageStyle}
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
                      <Typography variant="h6" sx={methodTypoStyle}>
                        {methodText}
                      </Typography>
                      <RadioGroup
                        name="post_method"
                        value={formik?.values?.post_method}
                        onChange={formik?.handleChange}
                      >
                        <FormControlLabel
                          value={methodRadioButton}
                          sx={formControlStyle}
                          control={<Radio sx={radioStyle} />}
                          label={methodRadioButton}
                        />
                        {formik?.touched?.post_method &&
                          formik?.errors?.post_method && (
                            <Typography
                              mb={2}
                              mt={-0.5}
                              color="error"
                              fontSize={12}
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
            sx={buttonStyle}
            variant="contained"
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
