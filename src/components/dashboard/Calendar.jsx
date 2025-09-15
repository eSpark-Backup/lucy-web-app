import { useEffect, useState } from "react";
import { Box, CircularProgress, Paper, Stack } from "@mui/material";
import { toast } from "react-toastify";
import CreatedEvents from "./calendar/CreatedEvents";
import EventCalandar from "./calendar/EventCalandar";
import FormHeader from "../forms/FormHeader";
import { useGetMyEventsQuery } from "../../services/event";
import { componentStyles } from "../../style/componentStyles";
import dayjs from "dayjs";
import { useGetAllSchoolsQuery } from "../../services/school";
import { useSelector } from "react-redux";

function Calendar() {
  const { CalendarScreenStyle } = componentStyles || {};
  const { mainBoxStyle, paperStyle } = CalendarScreenStyle || {};
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ${remainingMinutes} mint${
        remainingMinutes !== 1 ? "s" : ""
      }`;
    } else {
      return `${remainingMinutes} mint${remainingMinutes !== 1 ? "s" : ""}`;
    }
  };
  const [calendarEvents, setCalendarEvents] = useState([]);
  const { data, isLoading, isSuccess, isError, error } = useGetMyEventsQuery();
  const { user } = useSelector((state) => state?.auth);
  const is_trust = user?.profile?.organization?.is_trust;
  const { data: allSchools } = useGetAllSchoolsQuery(undefined, {
    skip: !is_trust,
  });

  useEffect(() => {
    if (is_trust) {
      if (allSchools?.data) {
        const allEvents = allSchools.data.flatMap((school) =>
          (school.events || []).map((item) => {
            const start = dayjs(item.date_time).local();
            let end;
            let allDay = false;

            if (item.time_span >= 1438 && item.time_span <= 1440) {
              end = start.endOf("day");
              allDay = true;
            } else {
              end = start.add(item.time_span, "minute");
            }

            return {
              id: item.id,
              title: item.name,
              start: start.toDate(),
              end: end.toDate(),
              allDay,
              duration: formatDuration(item.time_span),
              attendees: [],
              image: item.image,
              date: start.format("DD/MM/YYYY"),
            };
          })
        );
        setCalendarEvents(allEvents);
      }
    } else {
      if (isSuccess) {
        setCalendarEvents(
          data?.map((item) => {
            const start = dayjs(item.date_time).local();
            let end;
            let allDay = false;

            if (item.time_span >= 1438 && item.time_span <= 1440) {
              end = start.endOf("day");
              allDay = true;
            } else {
              end = start.add(item.time_span, "minute");
            }

            return {
              id: item.id,
              title: item.name,
              start: start.toDate(),
              end: end.toDate(),
              allDay,
              duration: formatDuration(item.time_span),
              attendees: [],
              image: item.image,
              date: start.format("DD/MM/YYYY"),
            };
          })
        );
      }

      if (isError) {
        toast.error(error?.data?.message || "Something went wrong");
      }
    }
  }, [is_trust, allSchools, data, isSuccess, isError, error]);

  return (
    <>
      <FormHeader title={"Calendar"} />
      {isLoading ? (
        <Stack justifyContent="center" alignItems="center" minHeight={"100px"}>
          <CircularProgress sx={{ color: "#194FFF" }} />
        </Stack>
      ) : (
        <>
          <Box className="calendar-grid" sx={mainBoxStyle}>
            {/* Created Events Section */}
            <Box flex={{ xs: "0 0 auto" }}>
              <CreatedEvents events={calendarEvents} />
            </Box>

            {/* Calendar Section */}
            <Box flex={1} width="100%">
              <Paper sx={paperStyle}>
                <EventCalandar events={calendarEvents} />
              </Paper>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default Calendar;
