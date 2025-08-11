import { Box, Grid, Paper, Typography } from "@mui/material";
import CreatedEvents from "./calendar/CreatedEvents";
import EventCalandar from "./calendar/EventCalandar";
import FormHeader from "../forms/FormHeader";

function Calendar() {
  const mockCalendarEvents = [
    {
      id: 1,
      title: "Design Conference",
      start: "2025-07-05T09:00:00",
      end: "2025-07-05T17:00:00",
      extendedProps: {
        status: "confirmed",
        userId: "user-1",
      },
      attendees: [
        "/avatar3.png",
        "/avatar7.png",
        "/avatar1.png",
        "/avatar2.png",
        "/avatar3.png",
      ],
    },
    {
      id: 2,
      title: "Team Sync Meeting",
      start: "2025-07-07T10:00:00",
      end: "2025-07-07T11:30:00",
      extendedProps: {
        status: "confirmed",
        userId: "user-2",
      },
      attendees: [
        "/avatar3.png",
        "/avatar7.png",
        "/avatar2.png",
        "/avatar4.png",
      ],
    },
    {
      id: 3,
      title: "Client Presentation",
      start: "2025-07-09T14:00:00",
      end: "2025-07-09T16:00:00",
      extendedProps: {
        status: "tentative",
        userId: "user-3",
      },
      attendees: [
        "/avatar3.png",
        "/avatar7.png",
        "/avatar1.png",
        "/avatar5.png",
        "/avatar6.png",
      ],
    },
    {
      id: 4,
      title: "Product Roadmap Workshop",
      start: "2025-07-12T09:30:00",
      end: "2025-07-12T12:00:00",
      extendedProps: {
        status: "confirmed",
        userId: "user-4",
      },
      attendees: [
        "/avatar3.png",
        "/avatar7.png",
        "/avatar3.png",
        "/avatar7.png",
        "/avatar8.png",
      ],
    },
    {
      id: 5,
      title: "Marketing Strategy Session",
      start: "2025-07-15T13:00:00",
      end: "2025-07-15T15:30:00",
      extendedProps: {
        status: "cancelled",
        userId: "user-5",
      },
      attendees: [
        "/avatar3.png",
        "/avatar7.png",
        "/avatar2.png",
        "/avatar9.png",
      ],
    },
    {
      id: 6,
      title: "HR Policy Review",
      start: "2025-07-18T10:00:00",
      end: "2025-07-18T12:00:00",
      extendedProps: {
        status: "confirmed",
        userId: "user-6",
      },
      attendees: [
        "/avatar3.png",
        "/avatar7.png",
        "/avatar1.png",
        "/avatar3.png",
        "/avatar6.png",
      ],
    },
    {
      id: 7,
      title: "Team Building Event",
      start: "2025-07-22T15:00:00",
      end: "2025-07-22T20:00:00",
      extendedProps: {
        status: "confirmed",
        userId: "user-7",
      },
      attendees: [
        "/avatar3.png",
        "/avatar7.png",
        "/avatar4.png",
        "/avatar5.png",
        "/avatar8.png",
        "/avatar9.png",
      ],
    },
    {
      id: 8,
      title: "CEO Town Hall",
      start: "2025-07-25T11:00:00",
      end: "2025-07-25T12:30:00",
      extendedProps: {
        status: "confirmed",
        userId: "user-8",
      },
      attendees: [
        "/avatar3.png",
        "/avatar7.png",
        "/avatar1.png",
        "/avatar2.png",
        "/avatar3.png",
        "/avatar4.png",
      ],
    },
  ];

  return (
    <>
      <FormHeader title={"Calendar"} />
      <Box
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        gap={2}
        className="calendar-grid"
      >
        {/* Created Events Section */}
        <Box flex={{ xs: "0 0 auto" }}>
          <CreatedEvents events={mockCalendarEvents} />
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
              boxShadow: "none",
              border: "0.3px solid rgba(185, 185, 185, 0.4)",
            }}
          >
            <EventCalandar events={mockCalendarEvents} />
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default Calendar;
