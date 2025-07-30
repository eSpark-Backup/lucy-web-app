import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Box } from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import PopperCard from "./PopperCard";

const getEventClassNames = (event) => {
  const { status } = event.extendedProps;
  return status === "yes" ? ["event-yes"] : [];
};

const dateChunks = (date) => {
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  return { day, month, dayName };
};

const EventCalendar = ({ events }) => {
  const calendarRef = useRef(null);
  const popperRef = useRef(null);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [popupType, setPopupType] = useState(null);
  const [popupAnchor, setPopupAnchor] = useState(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [timeZone, setTimeZone] = useState("");
console.log("popupAnchor", popupAnchor);
  const weekDayHeaderContent = (args) => {
    const { day, month, dayName } = dateChunks(args.date);
    return (
      <Box sx={{ textAlign: "start", color: "#00141C" }}>
        <Box sx={{ fontSize: "24px" }}>{day}</Box>
        <Box sx={{ fontSize: "16px", fontWeight: "400" }}>
          {`${month}, ${dayName}`}
        </Box>
      </Box>
    );
  };

  const dayHeaderContent = (args) => {
    const { day, dayName } = dateChunks(args.date);
    return (
      <Box sx={{ textAlign: "start", color: "#00141C" }}>
        <Box sx={{ fontSize: "16px", fontWeight: "400" }}>{dayName}</Box>
        <Box sx={{ fontSize: "24px" }}>{day}</Box>
      </Box>
    );
  };

  const handleViewDidMount = () => {
    if (calendarRef.current) {
      const axisFrame = calendarRef.current.elRef.current.querySelector(
        ".fc-timegrid-axis-frame"
      );
      if (axisFrame && timeZone) {
        axisFrame.innerHTML = `<span class="timegrid-gmt">${timeZone}</span>`;
      }
    }
  };

  const handleMonthTitleClick = () => {
    const titleElement = document.querySelector(".fc-toolbar-title");
    if (titleElement) {
      setPopupAnchor(titleElement);
    }
  };

  useEffect(() => {
    const offsetMinutes = new Date().getTimezoneOffset();
    const sign = offsetMinutes > 0 ? "-" : "+";
    const hours = Math.abs(Math.floor(offsetMinutes / 60));
    setTimeZone(`GMT ${sign}${hours}`);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target) &&
        !event.target.closest(".MuiPopper-root")
      ) {
        setPopupAnchor(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const COLORS_MAP = {
    "user-1": "#6C63FF", // purple
    "user-2": "#00BFA6", // teal
    "user-3": "#FF5252", // red
    "user-4": "#FFAB00", // amber
  };
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={selectedDate.toDate()}
        ref={calendarRef}
        height="100%" // Important: make calendar fill parent height
        contentHeight="auto"
        expandRows={true} // Helps with dynamic sizing
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventDidMount={(info) => {
          const { userId } = info.event.extendedProps;
          const color = COLORS_MAP[userId] || "#6C63FF"; // fallback

          info.el.style.backgroundColor = `${color}35`;
          info.el.style.borderLeft = `4px solid ${color}`;
          info.el.style.opacity = "0.5";
          info.el.style.color = color;
          info.el.style.fontWeight = "600";
          info.el.style.padding = "6px 12px";
          info.el.style.fontSize = "16px";
          info.el.style.borderRadius = "0px";
          info.el.style.cursor = "pointer";
          info.el.style.whiteSpace = "nowrap";
          info.el.style.overflow = "hidden";
          info.el.style.textOverflow = "ellipsis";
          info.el.style.boxShadow = "none";

          info.el.addEventListener("mouseenter", () => {
            info.el.style.opacity = "0.5";
          });

          info.el.addEventListener("mouseleave", () => {
            info.el.style.opacity = "0.7";
          });
        }}
        datesSet={() => {
          const titleElement = document.querySelector(".fc-toolbar-title");
          const btnType = document.querySelector(".fc-button-active");

          if (btnType) {
            const type = btnType.classList.value.split("-")[1];
            setCurrentView(type);
          }

          if (titleElement) {
            titleElement.style.cursor = "pointer";
            titleElement.addEventListener("click", handleMonthTitleClick);
          }
        }}
        views={{
          timeGridWeek: {
            allDaySlot: false,
            dayHeaderContent: weekDayHeaderContent,
          },
          timeGridDay: {
            allDaySlot: false,
            dayHeaderContent: dayHeaderContent,
          },
        }}
        events={events}
        editable={false}
        selectable={true}
        select={(info) => {
          setPopupType("date");
          setPopupAnchor(info.jsEvent.target);
        }}
        eventClick={(info) => {
          setPopupType("event");
          setPopupAnchor(info.jsEvent.target);
        }}
        eventClassNames={(arg) => getEventClassNames(arg.event)}
        viewDidMount={handleViewDidMount}
        slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
        eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
        dayMaxEvents={3}
        firstDay={1}
      />

      <PopperCard
        type={popupType}
        anchorEl={popupAnchor}
        onClose={() => setPopupAnchor(null)}
        eventId={
          popupType === "event" && popupAnchor
            ? events.find((event) => event.title === popupAnchor.textContent)
                ?.id
            : null
        }
      />
    </>
  );
};

export default EventCalendar;
