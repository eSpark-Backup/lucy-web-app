import { Box, Grid, Paper, Typography } from "@mui/material";
import CreatedEvents from "./calendar/CreatedEvents";
import EventCalandar from "./calendar/EventCalandar";
import FormHeader from "../forms/FormHeader";
import { mockCalendarEvents } from "../../constant";
import { getAllEvents } from "../../api/events";
import { useQuery } from "@tanstack/react-query";

const  Calendar=() => {
  const { data: events = [], isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });
  console.log("Fetched Events:", events);
  
  return (
    <>
      <FormHeader title={"Calendar"} />
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
        className="calendar-grid"
      >
        {/* Created Events Section */}
        <Box flex={{ xs: "0 0 auto" }}>
        
          <CreatedEvents events={events || mockCalendarEvents} 
          isError={isError}
          isLoading={isLoading}
          />
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
            <EventCalandar events={events || mockCalendarEvents}  />
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default Calendar;
