import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { toast } from "react-toastify";

const ImageZipButton = ({ images = [], zipName = "images.zip" }) => {
  const [loading, setLoading] = useState(false);

  const downloadZip = async () => {
    if (!images.length) return toast.info("No images to download!");

    try {
      setLoading(true);

      const zip = new JSZip();
      const total = images.length;

      for (let i = 0; i < total; i++) {
        const item = images[i];

        if (item instanceof File) {
          zip.file(item.name, item);
        } else if (item?.file instanceof File) {
          zip.file(item.file.name, item.file);
        } else if (typeof item === "string") {
          const response = await fetch(item);
          const blob = await response.blob();
          const ext = item.split(".").pop().split(/\#|\?/)[0];
          zip.file(`image_${i + 1}.${ext}`, blob);
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, zipName);
    } catch (error) {
      console.error("Zip error:", error);
      toast.info("Something went wrong while creating zip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      startIcon={!loading && <DownloadIcon />}
      onClick={downloadZip}
      disabled={!images?.length}
      loading={loading}
      sx={{
        color: "#fff",
        maxWidth: { xs: "100%", md: "152px" },
        backgroundColor: "#4880FF",
        opacity: "90%",
        textWrap: "nowrap",
        "&:hover": {
          backgroundColor: "#4880FF",
        },
      }}
    >
      {loading ? "Preparing ZIP..." : "Download ZIP"}
    </Button>
  );
};

export default ImageZipButton;
