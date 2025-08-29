import { Box, Button, Grid, LinearProgress, Typography } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import EventCard from "../EventCard";
import { componentStyles } from "../../style/componentStyles";
import { useNavigate } from "react-router-dom";
import { useGetMyEventsQuery } from "../../services/event";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(duration);
dayjs.extend(relativeTime);

const EventList = () => {
  const { EventListStyles } = componentStyles || {};
  const { addMoreEventsButtonStyle, addMoreEventsButtonTypoStyle } =
    EventListStyles || {};
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const { data, isLoading, isSuccess, isError, error } = useGetMyEventsQuery();

  useEffect(() => {
    if (isSuccess) {
      const res = data?.map((item) => {
        // process each item
        const localDate = dayjs(item?.date_time)?.local();
        let label = "";
        if (localDate.isToday()) {
          label = "Today";
        } else if (localDate.isTomorrow()) {
          label = "Tomorrow";
        } else {
          label = localDate.format("MMM DD, YYYY");
        }
        const display = `${label} ${localDate.format("hh:mm A")}`;

        return {
          title: item?.name,
          todayTime: display,
          duration: `Duration: ${dayjs
            .duration(item?.time_span, "minutes")
            .humanize()}`,
          id: item?.id,
        };
      });
      setEvents(res);
    }

    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [data, isSuccess, isError, error]);

  if (isLoading) return <LinearProgress />;

  return (
    <Box>
      <FormHeader title={"Event Details"} />
      <Grid container maxWidth={920} rowGap={4} pt={0.5}>
        {events?.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <EventCard
              title={item?.title}
              todayTime={item?.todayTime}
              duration={item?.duration}
              id={item?.id}
            />
          </Grid>
        ))}
      </Grid>
      <Grid size={12} pt={3.5}>
        <Button
          type="submit"
          variant="contained"
          sx={addMoreEventsButtonStyle}
          onClick={() => navigate("/dashboard/calendar/events/add")}
        >
          <Typography variant="h5" sx={addMoreEventsButtonTypoStyle}>
            {"Add More Events"}
          </Typography>
        </Button>
      </Grid>
    </Box>
  );
};

export default EventList;
