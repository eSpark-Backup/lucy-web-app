import { Grid } from "@mui/material";
import EventContentCard from "./EventContentCard";

const AllEventsCard = ({ data }) => {
  return (
    <Grid container columnGap={3} rowGap={4}>
      {data?.map((item, index) => (
        <Grid size={{ xs: 12 }} key={index}>
          <EventContentCard
            title={item?.title}
            description={item?.description}
            image={item?.image}
            id={item?.id}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default AllEventsCard;
