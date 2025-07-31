import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import EventCard from "../EventCard";
import { componentStyles } from "../../style/componentStyles";

const EventList = () => {
  const { EventListStyles } = componentStyles || {};
  const { addMoreEventsButtonStyle, addMoreEventsButtonTypoStyle } =
    EventListStyles || {};

  return (
    <Box>
      <FormHeader title={"Event Details"} />
      <Grid container maxWidth={920} rowGap={4} pt={0.5}>
        {[1, 2, 3]?.map((item, index) => (
          <Grid size={6} key={index}>
            <EventCard
              title={"Design Conference"}
              todayTime={"Today 07:19 AM"}
              duration={"Duration: 2 hours"}
              id={1}
            />
          </Grid>
        ))}
      </Grid>
      <Grid size={12} pt={3.5}>
        <Button type="submit" variant="contained" sx={addMoreEventsButtonStyle}>
          <Typography variant="h5" sx={addMoreEventsButtonTypoStyle}>
            {"Add More Events"}
          </Typography>
        </Button>
      </Grid>
    </Box>
  );
};

export default EventList;
