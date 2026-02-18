import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
  MenuItem,
  useTheme,
  useMediaQuery,
  Box,
  Popper,
  ClickAwayListener,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useFormik } from "formik";
import { eventValidationSchema } from "../../schemas/event";
import { EVENTFORM } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import ImageUploader from "../ImageUploader";
import { useEffect, useRef, useState } from "react";
import { useGetAllSchoolsQuery } from "../../services/school";
import { useSelector } from "react-redux";
import { useSearchPhotosMutation } from "../../services/content";
import dayjs from "dayjs";
import ImageZipButton from "../ImageZipButton";

const initialEventData = {
  event_name: "",
  event_type: "",
  description: "",
  start_date: "",
  end_date: "",
  images: [],
};

const EventForm = ({
  isEdit = false,
  data = initialEventData,
  isLoading,
  onSubmit = () => {},
}) => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const [showPopper, setShowPopper] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const start = search.get("start") || null;
  const end = search.get("end") || null;
  const inputRef = useRef(null);
  const { id } = useParams();
  const [images, setImages] = useState(data?.images || []);
  const { user } = useSelector((state) => state?.auth);
  const isSchoolRole = user?.role === "school";
  const is_trust = user?.profile?.organization?.is_trust;
  const [searchPhotos] = useSearchPhotosMutation();
  const { data: allSchools } = useGetAllSchoolsQuery(undefined, {
    skip: isSchoolRole,
  });

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const cols = isXs ? 2 : 3;

  const defaultSchoolEmail =
    allSchools?.data?.find((opt) => opt?.is_paid)?.email || "";
  const [selectedSchoolEmail, setSelectedSchoolEmail] =
    useState(defaultSchoolEmail);

  useEffect(() => {
    if (!isSchoolRole && defaultSchoolEmail) {
      setSelectedSchoolEmail(defaultSchoolEmail);
    }
  }, [allSchools, isSchoolRole]);

  useEffect(() => {
    setImages(data?.images || []);
  }, [data]);
  const { fields } = EVENTFORM || {};
  const { EventFormStyles } = componentStyles || {};
  const {
    paperStyle,
    inputLabelStyle,
    inputStyle,
    buttonTypoStyle,
    buttonStyle,
    uploadButtonStyle,
  } = EventFormStyles || {};

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
    initialValues: start
      ? {
          ...initialEventData,
          start_date: start
            ? start
            : data?.start_date
              ? dayjs(data.start_date).format("YYYY-MM-DD")
              : "",

          end_date: end
            ? end
            : data?.end_date
              ? dayjs(data.end_date).format("YYYY-MM-DD")
              : "",
          ...(!isSchoolRole && {
            school_email: data?.name || selectedSchoolEmail,
            show_email: data?.school_email || selectedSchoolEmail,
          }),
        }
      : {
          ...(data || initialEventData),
          ...(!isSchoolRole && {
            school_email: data?.school_email,
            show_email: data?.school_email,
          }),
        },
    validationSchema: eventValidationSchema(isSchoolRole),
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const { show_email, ...filteredValues } = values;

      if (inputRef?.current) {
        inputRef.current.value = null;
      }

      onSubmit(filteredValues, () => {
        resetForm();
        setImages(null);
      });
    },
  });

  const handleClosePopper = () => {
    setShowPopper(false);
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  return (
    <Paper elevation={0} sx={paperStyle}>
      <form onSubmit={formik?.handleSubmit}>
        <Grid container columnGap={8} rowGap={2}>
          {fields(is_trust, isSchoolRole)?.map(
            (
              { label, name, placeholder, type, size, disabled, is_editable },
              index,
            ) => (
              <Grid size={size} key={index}>
                <Stack width="100%" spacing={1.2}>
                  <Typography variant="h6" sx={inputLabelStyle}>
                    {label}
                  </Typography>
                  {name !== "images" ? (
                    <TextField
                      fullWidth
                      name={name}
                      type={type}
                      disabled={(isEdit && !is_editable) || disabled}
                      placeholder={placeholder}
                      select={type === "select"}
                      value={formik?.values?.[name] || ""}
                      onChange={(e) => {
                        formik.handleChange(e);
                        if (name === "school_email") {
                          return setSelectedSchoolEmail(e.target.value);
                        }
                      }}
                      onBlur={formik?.handleBlur}
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
                      InputLabelProps={{
                        shrink: true,
                      }}
                    >
                      {type === "select" &&
                        (allSchools?.data || [])
                          ?.filter((opt) => opt?.is_paid)
                          ?.map((opt) => (
                            <MenuItem key={opt?.email} value={opt?.email}>
                              {opt?.name}
                            </MenuItem>
                          ))}
                    </TextField>
                  ) : (
                    <>
                      <ImageUploader
                        images={images}
                        setImages={setImages}
                        inputRef={inputRef}
                        formik={formik}
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
                      <Stack width={"100%"} pt={1.5}>
                        <Box
                          display="flex"
                          justifyContent={"end"}
                          flexWrap={"wrap"}
                          gap={2}
                        >
                          <ImageZipButton
                            images={images || []}
                            zipName="event-images.zip"
                          />
                          <Button
                            variant="contained"
                            sx={{
                              color: "#fff",
                              maxWidth: { xs: "100%", sm: "48%", md: "148px" },
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
                              maxWidth: { xs: "100%", sm: "48%", md: "148px" },
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
                                    onChange={(e) => setQuery(e?.target?.value)}
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
                                    rowHeight={160}
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
                    </>
                  )}
                </Stack>
              </Grid>
            ),
          )}
          <Grid size={12} pt={2.5}>
            {isEdit ? (
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
                  sx={{ ...buttonStyle, marginLeft: "0px", width: "191px" }}
                >
                  <Typography variant="h5" sx={buttonTypoStyle}>
                    Save
                  </Typography>
                </Button>
                <Button
                  onClick={() =>
                    navigate(`/dashboard/calendar/events/${id}/contents`)
                  }
                  variant="contained"
                  sx={{
                    ...buttonStyle,
                    marginLeft: "0px",
                    width: "191px",
                    background: "#9C27B0",
                  }}
                >
                  <Typography variant="h5" sx={buttonTypoStyle}>
                    See Content
                  </Typography>
                </Button>
              </Stack>
            ) : (
              <Button
                loading={isLoading}
                disabled={isLoading}
                variant="contained"
                type="submit"
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

export default EventForm;
