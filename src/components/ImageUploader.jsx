import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "../assets/icons/upload.svg";

const ImageUploader = ({
  images = [],
  setImages,
  inputRef,
  formik,
  disabled = false,
  uploading = false,
  mode = "add",
}) => {
  const addFiles = (files) => {
    const newFiles = Array.from(files);

    const filteredFiles = newFiles.filter(
      (file) => !images.some((img) => img.file?.name === file.name),
    );

    const previews = filteredFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedImages = [...images, ...previews];

    setImages(updatedImages);
    formik.setFieldValue("images", updatedImages);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (disabled) return;
    addFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      addFiles(e.target.files);
      e.target.value = null;
    }
  };

  const handleRemove = (index) => {
    setImages((prev) => {
      const updated = prev?.filter((_, i) => i !== index);
      formik.setFieldValue("images", updated, true);
      return updated;
    });
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => {
        if (!disabled && images.length === 0) {
          inputRef?.current?.click();
        }
      }}
      sx={{
        width: "100%",
        borderRadius: "12px",
        border: "1px dashed #c4c4c4",
        p: 1.5,
        cursor: disabled
          ? "not-allowed"
          : images.length > 0
            ? "default"
            : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {images.length === 0 ? (
        <Box
          component="img"
          src={UploadIcon}
          sx={{
            height: 55,
            display: "block",
            mx: "auto",
            my: 3,
          }}
        />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 1.5,
          }}
        >
          {images?.map((img, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                height: 120,
                borderRadius: 1,
                overflow: "hidden",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              {img?.file && (
                <Box
                  component="img"
                  src={img?.preview}
                  // src={URL?.createObjectURL(img?.file)}
                  alt="preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
              {img && (
                <Box
                  component="img"
                  src={img}
                  alt="preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}

              {!disabled && !uploading && (
                <IconButton
                  size="small"
                  disabled={mode === "preview"}
                  onClick={() => handleRemove(index)}
                  sx={{
                    width: 20,
                    height: 20,
                    position: "absolute",
                    top: 2,
                    right: 2,
                    backgroundColor: "#4880FF",
                    opacity: "90%",
                    color: "#FFFFFF",
                    "&:hover": {
                      background:
                        "linear-gradient(0deg, #194FFF, #194FFF), linear-gradient(180deg, #4D76FF 0%, #1A4FFF 100%)",
                      color: "#FFF",
                    },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 14 }} />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        accept="image/*"
        disabled={disabled}
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default ImageUploader;
