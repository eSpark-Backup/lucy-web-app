import { Box, Stack, Typography } from "@mui/material";
import { tutorialThumbnail, tutorialVideo } from "../assets";
import { IconButton, Slider } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useRef, useState } from "react";
import TutorialCardSection from "./tutorial-card-section";

const TutotialSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={3} alignItems="center">
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "18px", lg: "23px" },
            color: "#2a4483",
            fontWeight: "bold",
            wordBreak: "break-word",
          }}
        >
          How It Works
        </Typography>
        <Box sx={{ width: "85%", maxWidth: "506px" }}>
          <VideoPlayer
            tutorialVideo={tutorialVideo}
            tutorialThumbnail={tutorialThumbnail}
          />
        </Box>
        <Box>
          <TutorialCardSection />
        </Box>
      </Stack>
    </Box>
  );
};

export default TutotialSection;

function VideoPlayer({ tutorialVideo, tutorialThumbnail }) {
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
    }
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const percentage = (video.currentTime / video.duration) * 100;
    setProgress(percentage || 0);
  };

  const handleSeek = (_, value) => {
    const video = videoRef.current;
    if (!video) return;

    const time = (value / 100) * video.duration;
    video.currentTime = time;
    setProgress(value);
  };

  return (
    <Box
      onClick={handlePlayPause}
      sx={{
        width: "100%",
        maxWidth: "506px",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <video
        ref={videoRef}
        width="100%"
        playsInline
        autoPlay
        muted
        loop
        poster={tutorialThumbnail}
        onTimeUpdate={handleTimeUpdate}
        style={{
          outline: "none",
        }}
      >
        <source src={tutorialVideo} type="video/mp4" />
      </video>

      {!playing && (
        <IconButton
          disableRipple
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            width: 70,
            height: 70,
            "&:hover": {
              opacity: 1,
              background: "rgba(0,0,0,0.6)",
            },
          }}
        >
          <PlayArrowIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}

      {playing && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "80px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
            pointerEvents: "none",
          }}
        />
      )}

      {playing && (
        <Slider
          value={progress}
          onChange={handleSeek}
          onClick={(e) => e.stopPropagation()}
          sx={{
            width: "90%",
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            color: "#fff",
          }}
        />
      )}
    </Box>
  );
}
