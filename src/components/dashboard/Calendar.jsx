import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import CreatedEvents from "./calendar/CreatedEvents";
import EventCalandar from "./calendar/EventCalandar";
function Calendar() {

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Calendar
      </Typography>

      <Grid container spacing={2} height={"80vh"} className="calendar-grid">
        <Grid
          item
          xs={3}
          sm={3}
          lg={3}
          //  sx={{ padding: 2 }}
        >
         
            <CreatedEvents/>
        </Grid>
        <Grid
          item
          xs={10}
          sm={10}
          lg={10}
          // sx={{ padding: 2 }}
        >
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
            <EventCalandar/>
            {/* <CustomCalendar  events={events} setEvents={setEvents}/> */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Calendar;
