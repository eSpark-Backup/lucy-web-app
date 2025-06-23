import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import ReviewCard from "./review-card";
import { reviewCardsContent } from "../constant";
import { Masonry } from "@mui/lab";

const Reviews = () => {
  return (
    <Box sx={{ my: "50px" }}>
      <Typography
        sx={{
          fontSize: { xs: "24px", md: "40px", lg: "71px" },
          textAlign: "center",
          fontFamily: '"Aoboshi One", serif',
        }}
      >
        Kind word of Our Users
      </Typography>
      <Box sx={{ px: { xs: "30px", md: "50px", lg: "90px" } }}>
        <Masonry
          columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          spacing={2}
        >
          {reviewCardsContent.map((item, index) => (
            <ReviewCard
              key={index}
              image={item?.profile}
              name={item?.name}
              userName={item?.userName}
              tweet={item?.content}
            />
          ))}
        </Masonry>
      </Box>
    </Box>
  );
};

export default Reviews;
