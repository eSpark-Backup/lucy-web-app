import { Box, Grid, LinearProgress } from "@mui/material";
import FormHeader from "../forms/FormHeader";
import EventCard from "../EventCard";
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
  const [events, setEvents] = useState([]);
  const { data, isLoading, isSuccess, isError, error } = useGetMyEventsQuery();

  useEffect(() => {
    if (isSuccess) {
      const public_events = data?.public_events || [];
      const user_events = data?.user_events || [];

      const allEvents = [...public_events, ...user_events];

      const res = allEvents?.map((item) => {
        const start = dayjs(item?.start_date);
        const end = dayjs(item?.end_date);

        const formattedRange = `${start.format("MMM DD, YYYY")} - ${end.format("MMM DD, YYYY")}`;

        return {
          title: item?.name,
          is_public: item?.is_public,
          duration: `Duration: ${formattedRange}`,
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
      <FormHeader title={"Events"} />
      <Grid container maxWidth={920} rowGap={4} pt={0.5}>
        {events?.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <EventCard
              is_public={item?.is_public}
              title={item?.title}
              duration={item?.duration}
              id={item?.id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventList;
