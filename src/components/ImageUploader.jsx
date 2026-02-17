import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "../assets/icons/upload.svg";
import DownloadIcon from "@mui/icons-material/Download";

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

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = "preview-image.jpg";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
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
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "8px",
                    cursor: "pointer",

                    "&:hover .overlay": {
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={img?.preview}
                    alt="preview"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(72, 128, 255, 0.6)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DownloadIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(img?.preview);
                      }}
                      sx={{
                        color: "#fff",
                        fontSize: 40,
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                        "&:hover": {
                          transform: "scale(1.2)",
                        },
                      }}
                    />
                  </Box>
                </Box>
              )}
              {img && (
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: "8px",
                    cursor: "pointer",

                    "&:hover .overlay": {
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    alt="preview"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <Box
                    className="overlay"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(img);
                    }}
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(72, 128, 255, 0.6)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DownloadIcon
                      sx={{
                        color: "#fff",
                        fontSize: 40,
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </Box>
              )}

              {!disabled && !uploading && (
                <IconButton
                  size="small"
                  disabled={mode === "preview"}
                  onClick={() => handleRemove(index)}
                  sx={{
                    display: mode === "preview" ? "none" : "flex",
                    width: 25,
                    height: 25,
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
                  <CloseIcon sx={{ fontSize: 16 }} />
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
