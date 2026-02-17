import { Box, Typography, Button } from "@mui/material";
import thumbnail from "../assets/images/thumbnail.jpg";
import { useResendRecipientEmailMutation } from "../services/content";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/pagination";

const ContentPreview = ({ title, description, date, images, recipients }) => {
  const [emailData, { isLoading }] = useResendRecipientEmailMutation();
  const { eventId } = useParams();

  const contentData = title?.map((text, index) => ({
    text,
    description: description[index],
  }));

  const contentTypeOptions = {
    "Press Release": "press_release",
    "Instagram Post": "instagram_post",
    "Facebook Post": "facebook_post",
    "Newsletter Inclusion": "newsletter",
    "Governor Report Summary": "governor_summary",
  };

  const handleResendEmail = async () => {
    let contentType = title[0];
    contentType = contentTypeOptions[contentType];

    const body = {
      content_type: contentType,
      text_content: description,
      attachment: images,
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
      {images?.length > 0 ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={10}
          slidesPerView={1}
          style={{
            width: "100%",
            maxHeight: "400px",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.2)",
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`event-${index}`}
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                  borderRadius: "12px",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Box
          component="img"
          src={thumbnail}
          alt="event-image"
          sx={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: 2,
          }}
        />
      )}

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
