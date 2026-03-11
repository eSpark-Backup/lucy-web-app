import { Box, Card,  Container, Typography } from "@mui/material";
import { EngagingNewsletters, pressRelease, socialMediaPosts } from "../assets";

const TutorialCardSection = () => {
  const cards = [
    {
      id: 1,
      title: "Press Release",
      img: pressRelease,
    },
    {
      id: 2,
      title: "Social Media Posts",
      img: socialMediaPosts,
    },
    {
      id: 3,
      title: "Engaging Newsletters",
      img: EngagingNewsletters,
    },
  ];

  return (
    <Container
      sx={{
        pt: 2,
        pb: 4,
        width: "100%",
        maxWidth: { xs: "850px", lg: "980px" },
        mx: "auto",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: "15px",
      }}
    >
      {cards?.map((card) => (
        <Card
          key={card?.id}
          sx={{
            position: "relative",
            borderRadius: "15px",
            overflow: "hidden",
            width: "95%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mx: "auto",
          }}
        >
          <Box
            component="img"
            src={card?.img}
            alt={card?.title}
            sx={{
              height: {
                xs: 200,
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "#fff",
              borderRadius: "15px",
              px: { xs: 1.5, md: 2 },
              py: { xs: 1.2, md: 1.5 },
            }}
          >
            <Typography
              sx={{
                color: "#2a4483",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: {
                  xs: "14px",
                  lg: "18px",
                },
              }}
            >
              {card?.title}
            </Typography>
          </Box>
        </Card>
      ))}
    </Container>
  );
};

export default TutorialCardSection;
