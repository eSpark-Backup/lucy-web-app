import { useEffect, useState } from "react";
import { Box, CircularProgress, Paper, Stack } from "@mui/material";
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
  const { user } = useSelector((state) => state?.auth);
  const is_trust = user?.profile?.organization?.is_trust;
  const is_trust_school = user?.school?.organization?.is_trust;

  const role = user?.role;

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

  const { data: eventsData, isLoading: eventsLoading } = useGetMyEventsQuery(
    undefined,
    {
      skip: role !== "school",
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    },
  );

  const { data: allSchools, isLoading } = useGetAllSchoolsQuery(undefined, {
    skip: role === "school",
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const mapEventsToCalendar = (events = [], schoolName) =>
    events.map((item) => {
      const start = dayjs(item.start_date).local();
      let end;
      let allDay = false;

      if (item.end_date) {
        end = dayjs(item.end_date).local();

        if (item.time_span >= 1438 && item.time_span <= 1440) {
          end = end.add(1, "day");
          allDay = true;
        }
      } else {
        if (item.time_span >= 1438 && item.time_span <= 1440) {
          end = start.add(1, "day");
          allDay = true;
        } else {
          end = start.add(item.time_span, "minute");
        }
      }

      return {
        id: item.id,
        title: item.name,

        start: start.toDate(),
        end: end.toDate(),

        allDay,

        duration: formatDuration(item.time_span),
        attendees: [],
        image: item?.images?.[0],
        school_name: item?.school?.name || schoolName,
        is_public: item?.is_public,
      };
    });

  useEffect(() => {
    if (role !== "school") {
      let mergedEvents = [];

      if (allSchools?.data?.length) {
        mergedEvents = allSchools?.data?.flatMap((school) =>
          mapEventsToCalendar(school?.events || [], school?.name),
        );
      }
      setCalendarEvents([...mergedEvents]);
    } else {
      let mergedEvents = [];
      const combined = [
        ...(eventsData?.public_events || []),
        ...(eventsData?.user_events || []),
      ];
      if (combined.length) {
        mergedEvents = mapEventsToCalendar(combined);
      }
      setCalendarEvents([...mergedEvents]);
    }
  }, [
    is_trust,
    is_trust_school,
    allSchools,
    role,
    eventsData?.public_events,
    eventsData?.user_events,
  ]);

  return (
    <>
      <FormHeader title={"Calendar"} />
      {isLoading || eventsLoading ? (
        <Stack justifyContent="center" alignItems="center" minHeight={"100px"}>
          <CircularProgress sx={{ color: "#194FFF" }} />
        </Stack>
      ) : (
        <>
          <Box className="calendar-grid" sx={mainBoxStyle}>
            {/* Created Events Section */}
            {((is_trust_school === true && role === "school") ||
              (is_trust === false && role === "user")) && (
              <Box flex={{ xs: "0 0 auto" }}>
                <CreatedEvents events={calendarEvents} />
              </Box>
            )}

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
