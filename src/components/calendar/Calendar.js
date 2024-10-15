import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import toDate from "date-fns/toDate";
import parseISO from "date-fns/parseISO";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useMemo, useEffect, useState } from "react";
import { es } from "date-fns/locale";
import "./styles.css";
import { getLocalUserdata } from "services/auth/localStorageData";
import userServices from "services/httpService/userAuth/userServices";

require("globalize/lib/cultures/globalize.culture.es");

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = (props) => {
  const [schedule, setSchedule] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const data = getLocalUserdata();

  const lang = {
    es: {
      week: "Semana",
      work_week: "Semana de trabajo",
      day: "Día",
      month: "Mes",
      previous: "Atrás",
      next: "Siguiente",
      today: "Hoy",
      agenda: "El Diario",
      showMore: (total) => `+${total} más`,
    },
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await userServices.commonPostService("/GetSchedule", {
          studentId: data?.id,
          month: month,
        });
        if (response.data?.status === "Successfull") {
          const fetchedSchedule = response.data?.data?.map((task) => {
            const date = toDate(parseISO(task.Date));
            return {
              id: task.id,
              title: task.Task,
              start: date,
              end: date,
              bgColor: task.bgcolor,
              image: task.image,
            };
          });
          setSchedule(fetchedSchedule);
          console.log("data", fetchedSchedule);
        } else {
          console.log("Some error came fetching schedule");
        }
      } catch (err) {
        console.error("Error fetching schedule:", err);
      }
    };

    fetchSchedule();
  }, [month, data?.id]);

  const { defaultDate, messages, views, formats } = useMemo(
    () => ({
      defaultDate: new Date(),
      messages: lang["es"],
      views: {
        month: true,
        week: true,
      },
      formats: {
        dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, "dd", culture) +
          " - " +
          localizer.format(end, "dd LLLL yyyy", culture),
        dayHeaderFormat: (date, culture, localizer) =>
          localizer.format(date, "EEEE, dd MMMM yyyy", culture),
      },
    }),
    []
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event?.bgColor,
    };
    return {
      style: style,
    };
  };

  const renderTitle = (event) => {
    return (
      <span className="calendar-event-cell">
        {event?.image ? (
          <img
            className="calendar-event-cell-image"
            src={`https://neoestudio.net/${event?.image}`}
            alt=""
          />
        ) : null}
        <span>{event.title}</span>
      </span>
    );
  };

  return (
    <div className="calendar-container">
      <div className="month-picker"></div>
      <div className="calendar-container-child">
        <Calendar
          localizer={localizer}
          events={schedule}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'auto', minHeight: '550px', maxHeight: '80vh' }} // Allow height to adjust and set limits
          culture={"es"}
          messages={messages}
          defaultDate={defaultDate}
          views={views}
          popup
          components={{
            week: {
              header: ({ date, localizer }) =>
                localizer.format(date, "EEEE dd"),
            },
          }}
          formats={formats}
          eventPropGetter={eventStyleGetter}
          titleAccessor={renderTitle}
        />
      </div>
    </div>
  );
};

export default MyCalendar;
