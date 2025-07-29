import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CustomCalendar = ({events, setEvents}) => {


  const onEventResize = ({ start, end, event }) => {
    const nextEvents = events.map((existingEvent) =>
      existingEvent === event ? { ...existingEvent, start, end } : existingEvent
    );
    setEvents(nextEvents);
  };

  const onEventDrop = ({ event, start, end }) => {
    const nextEvents = events.map((existingEvent) =>
      existingEvent === event ? { ...existingEvent, start, end } : existingEvent
    );
    setEvents(nextEvents);
  };

  return (
    
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: "80vh", width: "60vw" }}
      />
  );
};

export default CustomCalendar;
