import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/lab";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Box,
  Popper,
  ClickAwayListener,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { SCHOOL_INFORMATION_FORM } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import ImageUploader from "../ImageUploader";
import { schoolProfileValidationSchema } from "../../schemas/schoolProfile";
import {
  useCreateSchoolMutation,
  useEditSchoolMutation,
} from "../../services/school";
import { toast } from "react-toastify";
import { useGetMyOrganizationQuery } from "../../services/organization";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";
import { useSearchPhotosMutation } from "../../services/content";
import ImageZipButton from "../ImageZipButton";

const initialEventData = {
  name: "",
  address: "",
  phone: "",
  description: "",
  email: "",
  images: [],
};

const SchoolProfileForm = ({
  mode = "add", // "add" | "edit" | "preview"
  data = initialEventData,
}) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState(data?.images || []);
  const { data: organizationData } = useGetMyOrganizationQuery();

  const [createSchool, { isLoading: addLoading }] = useCreateSchoolMutation();
  const [editSchool, { isLoading: updateLoading }] = useEditSchoolMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopper, setShowPopper] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchPhotos] = useSearchPhotosMutation();

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const cols = isXs ? 2 : 3;

  const handleCreate = async (formdata, resetForm) => {
    try {
      const res = await createSchool(formdata);

      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something went wrong!");
        return;
      }

      if (res?.data) {
        toast.success(res?.data?.message || "School created successfully");
        if (inputRef?.current) inputRef.current.value = null;
        setImages([]);
        resetForm();
        navigate(`/dashboard/school-overview`);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  const handleUpdate = async (formdata, resetForm, id) => {
    try {
      const res = await editSchool({
        id: id,
        credentials: formdata,
      });

      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something went wrong!");
        return;
      }

      if (res?.data) {
        toast.success(res?.data?.message || "School updated successfully");
        if (inputRef?.current) inputRef.current.value = null;
        setImages([]);
        resetForm();
        navigate(`/dashboard/school-overview`);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  const { user } = useSelector((state) => state?.auth);
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

  const isPreview = mode === "preview";
  const isEdit = mode === "edit";
  const isAdd = mode === "add";

  const searchImages = async () => {
    if (!query) return;

    setHasSearched(true);
    setLoading(true);

    try {
      const data = await searchPhotos({ query }).unwrap();

      if (!data?.photos || data.photos.length === 0) {
        setResults([]);
        return;
      }

      setResults(data.photos);
    } catch (err) {
      console.error("RTK Query Error:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues:
      isEdit || isPreview
        ? {
            ...initialEventData,
            ...data,
            ...(organizationData?.is_trust && {
              password: "",
              confirm_password: "",
            }),
          }
        : {
            ...initialEventData,
            ...(organizationData?.is_trust && {
              password: "",
              confirm_password: "",
            }),
            ...(!organizationData?.is_trust && {
              email: user?.email || "",
            }),
          },
    validationSchema: schoolProfileValidationSchema(
      organizationData?.is_trust,
      isEdit,
    ),
    enableReinitialize: true,

    onSubmit: async (values, { resetForm }) => {
      const { id: orgIdFromData } = organizationData || {};

      const formdata = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (
          key !== "images" &&
          key !== "confirm_password" &&
          key !== "password" &&
          key !== "organization_id" &&
          key !== "id"
        ) {
          formdata.append(key, value);
        }
      });

      const organization_id = values.organization_id || orgIdFromData;
      if (organization_id) {
        formdata.append("organization_id", organization_id);
      }

      if (organizationData?.is_trust && values?.password) {
        formdata.append("password", values.password);
      }

      if (values?.images?.length > 0) {
        values.images.forEach((item) => {
          if (typeof item === "string") {
            formdata.append("images_urls", item);
          } else if (item?.file instanceof File) {
            formdata.append("images_files", item.file);
          }
        });
      }

      if (data?.id) {
        handleUpdate(formdata, resetForm, data?.id);
      } else {
        handleCreate(formdata, resetForm);
      }
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  const handleClosePopper = () => {
    setShowPopper(false);
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  useEffect(() => {
    setImages(data?.images || []);
  }, [data]);

  return (
    <Paper elevation={0} sx={paperStyle}>
      <form onSubmit={formik?.handleSubmit}>
        <Grid container columnGap={8} rowGap={2}>
          {fields(organizationData?.is_trust, isEdit, isPreview)?.map(
            ({ label, name, placeholder, type, size, disabled }, index) => (
              <Grid size={size} key={index}>
                <Stack width="100%" spacing={1.2}>
                  <Typography variant="h6" sx={inputLabelStyle}>
                    {label}
                  </Typography>
                  {name !== "images" ? (
                    name !== "date" ? (
                      <TextField
                        fullWidth
                        name={name}
                        placeholder={placeholder}
                        value={formik?.values?.[name] || ""}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        disabled={isPreview || disabled}
                        multiline={name === "description"}
                        rows={name === "description" ? 4 : 0}
                        sx={inputStyle(name)}
                        error={
                          formik?.touched?.[name] &&
                          Boolean(formik?.errors?.[name])
                        }
                        helperText={
                          formik?.touched?.[name] && formik?.errors?.[name]
                        }
                        type={
                          type === "password"
                            ? name === "confirm_password"
                              ? showConfirmPassword
                                ? "text"
                                : "password"
                              : showPassword
                                ? "text"
                                : "password"
                            : type
                        }
                        InputProps={
                          type === "password" && {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={
                                    name === "confirm_password"
                                      ? handleClickShowConfirmPassword
                                      : handleClickShowPassword
                                  }
                                  edge="end"
                                >
                                  {name === "confirm_password" ? (
                                    showConfirmPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )
                                  ) : showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }
                        }
                      />
                    ) : (
                      <DatePicker
                        name={name}
                        value={formik?.values?.[name] || ""}
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
                    // image uploader block
                    <>
                      <ImageUploader
                        images={images}
                        setImages={setImages}
                        inputRef={inputRef}
                        formik={formik}
                        mode={mode}
                      />
                      {formik?.touched?.images && formik?.errors?.images && (
                        <Typography
                          color="error"
                          fontSize={12}
                          m={"3px 14px !important"}
                        >
                          {formik?.errors?.images}
                        </Typography>
                      )}
                      {mode === "preview" && (
                        <Stack pt={1.5}>
                          <Box
                            display="flex"
                            justifyContent={"end"}
                            flexWrap={"wrap"}
                          >
                            <ImageZipButton
                              images={images || []}
                              zipName="school-images.zip"
                            />
                          </Box>
                        </Stack>
                      )}
                      {!isPreview && (
                        <Stack pt={1.5}>
                          <Box
                            display="flex"
                            justifyContent={"end"}
                            flexWrap={"wrap"}
                            gap={2}
                          >
                            <ImageZipButton
                              images={images || []}
                              zipName="school-images.zip"
                            />
                            <Button
                              variant="contained"
                              sx={{
                                color: "#fff",
                                maxWidth: {
                                  xs: "100%",
                                  sm: "48%",
                                  md: "148px",
                                },
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
                                ...uploadButtonStyle,
                                maxWidth: {
                                  xs: "100%",
                                  sm: "48%",
                                  md: "148px",
                                },
                              }}
                              onClick={() => inputRef?.current?.click()}
                            >
                              <Typography variant="h6" sx={buttonTypoStyle}>
                                {"Upload Image"}
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
                                backdropFilter: "blur(1px)",
                                zIndex: 1199,
                              }}
                              onClick={handleClosePopper}
                            />
                          )}
                          <Popper
                            anchorEl={null}
                            open={showPopper}
                            style={{
                              zIndex: 1200,
                              top: "50%",
                              left: "50%",
                              position: "fixed",
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <ClickAwayListener onClickAway={handleClosePopper}>
                              <Paper
                                sx={{
                                  p: 2,
                                  width: { xs: "280px", sm: "400px" },
                                  backgroundColor: "rgba(255, 255, 255)",
                                  boxShadow:
                                    "6px 6px 45px 0px rgba(0, 0, 0, 0.05)",
                                }}
                              >
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
                                      placeholder="Search images..."
                                      onChange={(e) =>
                                        setQuery(e?.target?.value)
                                      }
                                      onKeyDown={(e) =>
                                        e.key === "Enter" && searchImages()
                                      }
                                    />
                                    <Button
                                      disabled={loading}
                                      variant="contained"
                                      onClick={searchImages}
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
                                      sx={{
                                        color: "#A6A6A6",
                                        fontSize: 14,
                                        mt: 2,
                                      }}
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
                                              width: "100%",
                                              height: "100%",
                                              cursor: "pointer",
                                              borderRadius: "6px",
                                              opacity: images?.includes(
                                                img?.src?.medium,
                                              )
                                                ? 0.8
                                                : 1,
                                              border: images?.includes(
                                                img?.src?.medium,
                                              )
                                                ? "2px solid #4880FF"
                                                : "2px solid transparent",
                                            }}
                                            onClick={() => {
                                              const selectedImage =
                                                img?.src?.medium;
                                              let updatedImages;
                                              if (
                                                images?.includes(selectedImage)
                                              ) {
                                                updatedImages = images?.filter(
                                                  (image) =>
                                                    image !== selectedImage,
                                                );
                                              } else {
                                                updatedImages = [
                                                  ...images,
                                                  selectedImage,
                                                ];
                                              }
                                              setImages(updatedImages);
                                              formik.setFieldValue(
                                                "images",
                                                updatedImages,
                                                true,
                                              );
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
                        </Stack>
                      )}
                    </>
                  )}
                </Stack>
              </Grid>
            ),
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
                  loading={updateLoading}
                  disabled={updateLoading}
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
                loading={addLoading}
                disabled={addLoading}
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
