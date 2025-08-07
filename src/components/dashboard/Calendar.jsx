import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CreatedEvents from "./calendar/CreatedEvents";
import EventCalandar from "./calendar/EventCalandar";
import FormHeader from "../forms/FormHeader";
import { useGetMyEventsQuery } from "../../services/event";

function Calendar() {
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
  useEffect(() => {
    if (isSuccess) {
      setCalendarEvents(
        data?.map((item) => {
          return {
            id: item?.id,
            title: item?.name,
            date: dayjs(item?.date_time).format("DD/MM/YYYY"),
            startTime: dayjs(item?.date_time).format("HH:MM a"),
            endTime: dayjs(item?.date_time)
              .add(item?.time_span, "minute")
              .format("HH:MM a"),
            duration: formatDuration(item?.time_span),
            attendees: [],
            image: item?.image,
          };
        })
      );
    }
    if (isError) {
      toast.error(error?.data?.meesage || "Something went wrong");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <>
      <FormHeader title={"Calendar"} />
      {isLoading ? (
        <Stack
          sx={{ minHeight: "100px" }}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress sx={{ color: "#194FFF" }} />
        </Stack>
      ) : (
        <>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
            className="calendar-grid"
          >
            {/* Created Events Section */}
            <Box flex={{ xs: "0 0 auto" }}>
              <CreatedEvents events={calendarEvents} />
            </Box>

            {/* Calendar Section */}
            <Box flex={1} width="100%">
              <Paper
                sx={{
                  borderRadius: 4,
                  p: 2,
                  bgcolor: "white",
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                  boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.1)",
                }}
              >
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
