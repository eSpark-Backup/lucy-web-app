import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import PopperCard from "./PopperCard";
import ModalCard from "./ModalCard";

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

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [popupType, setPopupType] = useState(null);
  const [popupAnchor, setPopupAnchor] = useState(null);
  const [timeZone, setTimeZone] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [activeId, setActiveId] = useState("");

  const calendarWrapperRef = useRef(null);

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

  useEffect(() => {
    const offsetMinutes = new Date().getTimezoneOffset();
    const sign = offsetMinutes > 0 ? "-" : "+";
    const hours = Math.abs(Math.floor(offsetMinutes / 60));
    setTimeZone(`GMT ${sign}${hours}`);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarWrapperRef.current &&
        !calendarWrapperRef.current.contains(event.target) &&
        popperRef.current &&
        !popperRef.current.contains(event.target)
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
    <Box
      ref={calendarWrapperRef}
      sx={{
        width: "100%",
        overflowX: "auto",
        "& .fc .fc-scrollgrid": {
          border: "1px solid rgba(63, 63, 63, 0.1)",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        },
        "& .fc-toolbar-title": {
          cursor: "default",
          pointerEvents: "none",
        },
        "& .fc-scrollgrid-sync-inner": {
          cursor: "pointer",
        },
        "@media(max-width: 1439px)": {
          "& .fc .fc-scrollgrid": {
            mt: 1,
            minWidth: "850px",
          },
          "& .fc-view-harness": {
            minWidth: "850px",
          },
          "& .fc-header-toolbar": {
            minWidth: "500px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          },
        },
      }}
    >
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={selectedDate.toDate()}
        height="100%"
        contentHeight="auto"
        expandRows={true}
        selectable={true}
        selectMirror={true}
        editable={false}
        events={events}
        firstDay={1}
        dayMaxEvents={3}
        slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
        eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "",
        }}
        eventContent={(arg) => {
          const { school_name } = arg.event.extendedProps;

          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <span style={{ color: "#6C63FF" }}>{arg.event.title}</span>
              {school_name && (
                <span
                  style={{ color: "black", fontStyle: "italic", opacity: 0.8 }}
                >
                  {school_name}
                </span>
              )}
            </Box>
          );
        }}
        select={(info) => {
          const today = dayjs().startOf("day");
          const startDate = dayjs(info.startStr);

          if (startDate.isBefore(today)) return;

          setPopupType("date");
          setPopupAnchor(null);

          setOpenModal({
            start: info.startStr,
            end: dayjs(info.endStr).subtract(1, "day").format("YYYY-MM-DD"),
          });
        }}
        eventClick={(info) => {
          setPopupType("event");
          setPopupAnchor(info.jsEvent.target);
          setActiveId(info.event.id);
        }}
        eventClassNames={(arg) => getEventClassNames(arg.event)}
        eventDidMount={(info) => {
          const { userId } = info.event.extendedProps;
          const color = COLORS_MAP[userId] || "#6C63FF";

          info.el.style.backgroundColor = `${color}35`;
          info.el.style.border = `0px`;
          info.el.style.borderLeft = `4px solid ${color}`;
          info.el.style.opacity = "0.7";
          info.el.style.color = color;
          info.el.style.fontWeight = "700";
          info.el.style.padding = "6px 12px";
          info.el.style.fontSize = "10px";
          info.el.style.whiteSpace = "nowrap";
          info.el.style.overflow = "hidden";
          info.el.style.textOverflow = "ellipsis";

          const titleEl = info.el.querySelector(".fc-event-title");
          if (titleEl) {
            titleEl.style.color = color;
            info.el.style.border = "0";
            info.el.style.borderLeft = `4px solid ${color}`;
          }
        }}
        views={{
          timeGridWeek: {
            allDaySlot: true,
            dayHeaderContent: weekDayHeaderContent,
          },
          timeGridDay: {
            allDaySlot: true,
            dayHeaderContent: dayHeaderContent,
          },
        }}
      />
      <PopperCard
        ref={popperRef}
        type={popupType}
        anchorEl={popupAnchor}
        onClose={() => setPopupAnchor(null)}
        eventId={activeId}
      />
      <ModalCard openModal={openModal} setOpenModal={setOpenModal} />
    </Box>
  );
};

export default EventCalendar;
