import { useNavigate, useSearchParams } from "react-router-dom";
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
import { useRef, useState } from "react";
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
import { useAddImageMutation } from "../../services/image";

const initialEventData = {
  name: "",
  address: "",
  phone: "",
  description: "",
  email: "",
  image: "",
};

const SchoolProfileForm = ({
  mode = "add", // "add" | "edit" | "preview"
  data = initialEventData,
}) => {
  const [search] = useSearchParams();
  const date = search.get("date") || null;
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [image, setImage] = useState();

  const {
    data: organizationData,
    isLoading: organizationLoading,
    isSuccess: organizationSuccess,
    isError: organizationError,
  } = useGetMyOrganizationQuery();

  const [createSchool, { isLoading: addLoading }] = useCreateSchoolMutation();
  const [editSchool, { isLoading: updateLoading }] = useEditSchoolMutation();
  const [imageUpload] = useAddImageMutation();

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
        setImage(null);
        resetForm();
        navigate(`/dashboard/school-overview`);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  const handleUpdate = async (formdata, resetForm) => {
    try {
      const res = await editSchool({
        id: formdata.id,
        credentials: formdata,
      });

      if (res?.error) {
        toast.error(res?.error?.data?.message || "Something went wrong!");
        return;
      }

      if (res?.data) {
        toast.success(res?.data?.message || "School updated successfully");
        if (inputRef?.current) inputRef.current.value = null;
        setImage(null);
        resetForm();
        navigate(`/dashboard/school-overview`);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

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

  const formik = useFormik({
    initialValues:
      isEdit || isPreview ? { ...initialEventData, ...data } : initialEventData,
    validationSchema: schoolProfileValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const { id: organization_id } = organizationData || {};

      let finalImage = values?.image;

      if (values.image && typeof values.image !== "string") {
        const formData = new FormData();
        formData.append("file", values.image);

        try {
          const res = await imageUpload({ body: formData });
          if (res?.data) {
            finalImage = res.data.filePath;
          } else {
            toast.error("Image upload failed!");
            return;
          }
        } catch (err) {
          toast.error("Image upload failed!");
          console.error(err);
          return;
        }
      }

      const objToSend = {
        ...values,
        image: finalImage,
        organization_id,
        id: data?.id,
      };

      if (!organizationLoading) {
        if (organizationError) {
          toast.error("Organization fetching is failed!");
        } else if (organizationSuccess) {
          if (isEdit) {
            await handleUpdate(objToSend, resetForm);
          } else {
            await handleCreate(objToSend, resetForm);
          }
        }
      }
    },
  });

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
                  loading={addLoading || updateLoading}
                  disabled={addLoading || updateLoading}
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
                loading={addLoading || updateLoading}
                disabled={addLoading || updateLoading}
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
