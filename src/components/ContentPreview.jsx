import { Box, Typography, Button } from "@mui/material";
import thumbnail from "../assets/images/thumbnail.jpg";
import { useResendRecipientEmailMutation } from "../services/content";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ContentPreview = ({ title, description, date, image, recipients }) => {
  const [emailData, { isLoading }] = useResendRecipientEmailMutation();
  const { eventId } = useParams();

  const contentData = title?.map((text, index) => ({
    text,
    description: description[index],
  }));

  const handleResendEmail = async (contentType, description) => {
    const body = {
      content_type: contentType,
      text_content: description,
      attachment: image,
      content_recipients: recipients,
      post_method: "Email",
    };
    try {
      const res = await emailData({ body, eventId });
      if (res?.data) {
        toast.success("Email resent successfully");
      } else if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "900px",
        p: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(255, 255, 255, 0.48)",
        boxShadow: "5px 5px 45px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "11.88px",
        gap: 4,
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={image || thumbnail}
        alt="event-image"
        sx={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "contain",
          borderRadius: "12px",
          boxShadow: 2,
        }}
      />

      {/* Date */}
      <Typography variant="body2" sx={{ color: "#6b7280", fontSize: "14px" }}>
        {new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>

      {/* Render all content blocks */}
      {contentData?.map((item, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              fontFamily: "Poppins",
              lineHeight: 1.3,
              textTransform: "capitalize",
              mb: 1,
            }}
          >
            {item.text}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              lineHeight: 1.7,
              color: "#202224",
              opacity: 0.9,
              fontWeight: 400,
              fontFamily: "Nunito Sans",
              whiteSpace: "pre-line",
            }}
          >
            {item.description}
          </Typography>
        </Box>
      ))}
      <Button
        sx={{ width: "fit-content", px: "15px" }}
        variant="primary"
        onClick={handleResendEmail}
        loading={isLoading}
        disabled={isLoading}
      >
        Send Email
      </Button>
    </Box>
  );
};

export default ContentPreview;
