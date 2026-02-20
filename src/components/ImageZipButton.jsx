import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useMultipleImagesDownloadMutation } from "../services/image";

const ImageZipButton = ({ images = [], zipName = "images.zip" }) => {
  const [downloadMultiple, { isLoading: isDownloading }] =
    useMultipleImagesDownloadMutation();

  const handleMultipleDownload = (multiple) => {
    const fileUrls = multiple
      ?.map((item) => (typeof item === "string" ? item : item?.preview || null))
      ?.filter(Boolean);

    if (fileUrls?.length > 0) {
      downloadMultiple({ fileUrls });
    }
  };

  return (
    <Button
      variant="contained"
      startIcon={!isDownloading && <DownloadIcon />}
      onClick={() => handleMultipleDownload(images)}
      disabled={!images?.length}
      loading={isDownloading}
      sx={{
        color: "#fff",
        maxWidth: { xs: "100%", md: "152px" },
        height: "34.39px",
        backgroundColor: "#4880FF",
        opacity: "90%",
        textWrap: "nowrap",
        "&:hover": {
          backgroundColor: "#4880FF",
        },
      }}
    >
      {isDownloading ? "Preparing ZIP..." : "Download ZIP"}
    </Button>
  );
};

export default ImageZipButton;
