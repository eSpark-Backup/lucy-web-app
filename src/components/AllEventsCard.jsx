import { Grid } from "@mui/material";
import EventContentCard from "./EventContentCard";

const AllEventsCard = () => {
  return (
    <Grid container columnGap={3} rowGap={4}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((item, index) => (
        <Grid size={{ xs: 12 }} key={index}>
          <EventContentCard
            title={"Design Conference"}
            description={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. "
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AllEventsCard;
