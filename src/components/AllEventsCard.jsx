import { Grid, Typography } from "@mui/material";
import EventContentCard from "./EventContentCard";

const AllEventsCard = ({ data, isLoading }) => {
  if (data?.length === 0 && !isLoading) {
    return <Typography>📭 No Contents Found</Typography>;
  }
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
