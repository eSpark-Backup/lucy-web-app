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
  Box,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import { CONTENTFORM } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import { contentFormSchema } from "../../schemas/content";
import { useEffect, useState } from "react";
import EmailsInput from "../EmailsInput";
import {
  useAddContentMutation,
  useGetAllRecipientsQuery,
  useUpdateContentMutation,
} from "../../services/content";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEventByIdQuery } from "../../services/event";
import { useAiContentMutation } from "../../services/ai";

const initialEventData = {
  content_types: [],
  text_content: [],
  description: "",
  post_method: "",
  recipients: [],
};

const ContentForm = ({
  data = initialEventData,
  contentId,
  eventName = "",
  setEventName = () => {},
}) => {
  const {
    fields,
    contentTypeOptions,
    aiButtonText,
    methodText,
    methodRadioButton,
    radioButtonsLable,
  } = CONTENTFORM;

  const {
    ContentFormStyles,
    authCheckBoxStyle,
    authCheckBoxIconStyle,
    authCheckBoxSpanStyle,
  } = componentStyles;
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
    methodTypoStyle,
    formControlStyle,
  } = ContentFormStyles;

  const [emails, setEmails] = useState(data?.recipients);
  const [suggestedEmails, setSuggestedEmails] = useState([]);

  const [contentData, { isLoading }] = useAddContentMutation();
  const [editContent, { isLoading: editLoading }] = useUpdateContentMutation();
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
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const cols = isXs ? 2 : 3;

  const formik = useFormik({
    initialValues: data,
    validationSchema: contentFormSchema,
    onSubmit: (values, { resetForm }) => {
      const selectedContentType = values?.content_types;

      const textArray = selectedContentType?.map((type) => {
        const found = values?.text_content?.find(
          (item) => item?.content_types === type,
        );
        return found?.text || "";
      });

      let body = {
        content_types: selectedContentType,
        content_recipients: emails,
        post_method: values?.post_method,
        text_content: textArray,
      };

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

  const handleAiGenerate = async () => {
    try {
      const obj = {
        content_types: formik.values.content_types,
        event_name: eventName,
        prompt_text: formik.values.description,
      };

      const res = await aiPayload({ body: obj });

      if (res?.data) {
        setAiContent(res.data);
      } else if (res?.error) {
        if (typeof res.error.data === "string") {
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
    if (recipientsData && recipientsSuccess) {
      setSuggestedEmails(recipientsData);
    }
  }, [recipientsData, recipientsSuccess]);

  useEffect(() => {
    formik.setFieldValue("recipients", emails);
  }, [emails]);

  useEffect(() => {
    if (aiContent && Array.isArray(aiContent)) {
      formik.setFieldValue("text_content", aiContent);
      formik.setFieldValue(
        "content_types",
        aiContent.map((item) => item.content_types),
      );
    }
  }, [aiContent]);

  if (eventLoading || recipientsLoading) {
    return <LinearProgress />;
  }

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
                    rows={name === "description" ? 5 : 0}
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
                  <>
                    <EmailsInput
                      name={name}
                      disabled={!formik?.values?.post_method}
                      emails={emails}
                      setEmails={setEmails}
                      placeholder={placeholder}
                      formik={formik}
                      data={suggestedEmails}
                    />
                    {formik.touched.recipients && formik.errors.recipients && (
                      <Typography color="error" fontSize={12} m={"3px 14px"}>
                        {formik.errors.recipients}
                      </Typography>
                    )}
                  </>
                )}
                {name === "description" && (
                  <>
                    <Grid size={12} pt={1.5}>
                      <Button
                        variant="contained"
                        sx={aiButtonStyle}
                        onClick={handleAiGenerate}
                        loading={aiLoading}
                        disabled={
                          aiLoading ||
                          formik?.values?.content_types?.length === 0
                        }
                      >
                        <Typography variant="h6" sx={buttonTypoStyle}>
                          {aiButtonText}
                        </Typography>
                      </Button>
                    </Grid>

                    <Grid size={12} pb={1.5}>
                      <Typography variant="h6" sx={radioButtonsLableStyle}>
                        {radioButtonsLable}
                      </Typography>
                      <Stack spacing={1} mt={1.5}>
                        {contentTypeOptions?.map((opt) => {
                          const current = formik?.values?.text_content?.find(
                            (c) => c?.content_types === opt?.name,
                          );

                          return (
                            <Box key={opt.name}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    icon={<Box sx={authCheckBoxStyle} />}
                                    checkedIcon={
                                      <Box sx={authCheckBoxIconStyle}>
                                        <Box
                                          component="span"
                                          sx={authCheckBoxSpanStyle}
                                        />
                                      </Box>
                                    }
                                    disableRipple
                                    sx={{ padding: 0 }}
                                    checked={formik?.values?.content_types?.includes(
                                      opt?.name,
                                    )}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        formik.setFieldValue("content_types", [
                                          ...formik.values.content_types,
                                          opt.name,
                                        ]);
                                        const exists =
                                          formik.values.text_content.some(
                                            (c) => c.content_types === opt.name,
                                          );
                                        if (!exists) {
                                          formik.setFieldValue("text_content", [
                                            ...formik.values.text_content,
                                            {
                                              content_types: opt.name,
                                              text: "",
                                            },
                                          ]);
                                        }
                                      } else {
                                        formik.setFieldValue(
                                          "content_types",
                                          formik.values.content_types.filter(
                                            (v) => v !== opt.name,
                                          ),
                                        );
                                      }
                                    }}
                                  />
                                }
                                label={
                                  <Typography variant="h6" sx={inputLabelStyle}>
                                    {opt.label}
                                  </Typography>
                                }
                                sx={{
                                  gap: "8px",
                                  marginRight: "16px",
                                  alignItems: "center",
                                }}
                              />

                              {formik?.values?.content_types?.includes(
                                opt?.name,
                              ) && (
                                <TextField
                                  multiline
                                  rows={5}
                                  fullWidth
                                  sx={{
                                    ...inputStyle(opt.name),
                                    p: 1.5,
                                    pl: 2.5,
                                    pr: 0,
                                  }}
                                  placeholder={opt?.placeholder}
                                  value={current?.text || ""}
                                  onChange={(e) => {
                                    const newTexts =
                                      formik.values.text_content.map((c) =>
                                        c.content_types === opt.name
                                          ? { ...c, text: e.target.value }
                                          : c,
                                      );
                                    formik.setFieldValue(
                                      "text_content",
                                      newTexts,
                                    );
                                  }}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              )}
                            </Box>
                          );
                        })}
                      </Stack>
                      {formik.touched.content_types &&
                        formik.errors.content_types && (
                          <Typography
                            variant="caption"
                            color="error"
                            m={"3px 14px"}
                          >
                            {formik.errors.content_types}
                          </Typography>
                        )}
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
                              m={"3px 14px"}
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
            loading={isLoading || editLoading || aiLoading}
            disabled={formik?.values?.content_types?.length === 0}
          >
            <Typography variant="h6" sx={buttonTypoStyle}>
              {contentId ? "Save" : "Add"}
            </Typography>
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default ContentForm;
