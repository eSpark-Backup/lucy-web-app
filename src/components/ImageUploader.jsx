import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "../assets/icons/upload.svg";

const ImageUploader = ({ image, setImage, ref, formik }) => {
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
      formik?.setFieldValue("image", file);
    }
  };

  const handleClear = () => {
    setImage(null);
    if (ref?.current) ref.current.value = null;
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      sx={{
        border: "1px solid #D5D5D5",
        backgroundColor: "#F5F6FA",
        borderRadius: "6px",
        height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexDirection: "column",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onClick={() => !image && ref?.current?.click()}
    >
      {image ? (
        <>
          <Box
            component="img"
            src={image}
            alt="preview"
            sx={{ height: "80px", objectFit: "contain" }}
          />
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
        </>
      ) : (
        <Box component={"img"} src={UploadIcon} />
      )}

      <input
        ref={ref}
        type="file"
        hidden
        accept="image/*"
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default ImageUploader;
