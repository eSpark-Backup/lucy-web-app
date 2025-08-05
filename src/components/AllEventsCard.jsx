import { Grid } from "@mui/material";
import EventContentCard from "./EventContentCard";

const AllEventsCard = () => {
  return (
    <Grid container columnGap={3} rowGap={4}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]?.map((item, index) => (
        <Grid size={{ xs: 12, sm: "auto" }} key={index}>
          <EventContentCard
            title={"Design Conference"}
            description={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AllEventsCard;
