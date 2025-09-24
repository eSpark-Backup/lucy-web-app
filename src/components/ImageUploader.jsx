import { useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "../assets/icons/upload.svg";

const ImageUploader = ({
  image,
  setImage,
  ref,
  formik,
  disabled,
  uploading,
}) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      formik?.setFieldValue("image", file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
    }
  };

  const handleClear = () => {
    setImage(null);
    formik?.setFieldValue("image", null);
    if (ref?.current) ref.current.value = null;
  };

  useEffect(() => {
    if (typeof formik?.values?.image === "string") {
      setImage(formik.values.image);
    } else if (!formik?.values?.image) {
      setImage(null);
    }
  }, [formik?.values?.image]);

  return (
    <Box
      onDrop={disabled ? undefined : handleDrop}
      onDragOver={disabled ? undefined : (e) => e.preventDefault()}
      onClick={() => !disabled && !image && ref?.current?.click()}
      sx={{
        width: "100%",
        height: 200,
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        alignItems: !image ? "center" : "stretch",
        justifyContent: !image ? "center" : "flex-start",
        border: "1px dashed #c4c4c4ff",
        position: "relative",
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        "&:hover .delete-btn": { opacity: 1 },
      }}
    >
      {image ? (
        <>
          <Box
            sx={{
              width: "fit-content",
              height: 200,
              mx: "auto",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            <Box
              component="img"
              src={image}
              alt="preview"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "Contain",
              }}
            />
          </Box>
          {!disabled && !uploading && (
            <IconButton
              size="small"
              onClick={handleClear}
              sx={{
                width: 25,
                height: 25,
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "white",
                border: "1px solid #ccc",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </>
      ) : (
        <Box component={"img"} src={UploadIcon} />
      )}

      <input
        ref={ref}
        type="file"
        hidden
        accept="image/*"
        disabled={disabled}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default ImageUploader;
